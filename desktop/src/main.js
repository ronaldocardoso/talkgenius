const { app, BrowserWindow, ipcMain, screen, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs');

app.name = 'TalkGenius';

let overlayWindow = null;
let configWindow = null;
let currentConfig = {};

function getEffectiveConfig(overrideConfig) {
  let config = overrideConfig || {};
  const configPath = path.join(__dirname, '..', 'config.json');
  if (fs.existsSync(configPath)) {
    try {
      const diskConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      config = { ...diskConfig, ...config };
    } catch (e) {
      console.error('Erro ao ler config.json no getEffectiveConfig:', e);
    }
  }
  return config;
}

function registerOverlayShortcuts() {
  try {
    globalShortcut.unregisterAll();
    
    // Atalhos globais Option+Space / Alt+Space para gravar de qualquer aplicativo (Zoom, Meet, etc)
    globalShortcut.register('Option+Space', () => {
      if (overlayWindow && !overlayWindow.isDestroyed()) {
        overlayWindow.webContents.send('toggle-recording-global');
      }
    });

    globalShortcut.register('Alt+Space', () => {
      if (overlayWindow && !overlayWindow.isDestroyed()) {
        overlayWindow.webContents.send('toggle-recording-global');
      }
    });

    // Teclas de atalho rápido F8 e F9 (funcionam globalmente de qualquer janela)
    try {
      globalShortcut.register('F8', () => {
        if (overlayWindow && !overlayWindow.isDestroyed()) {
          overlayWindow.webContents.send('toggle-recording-global');
        }
      });
      globalShortcut.register('F9', () => {
        if (overlayWindow && !overlayWindow.isDestroyed()) {
          overlayWindow.webContents.send('toggle-recording-global');
        }
      });
    } catch (e) {}

    // Atalho global alternativo Cmd+Shift+Space
    globalShortcut.register('CommandOrControl+Shift+Space', () => {
      if (overlayWindow && !overlayWindow.isDestroyed()) {
        overlayWindow.webContents.send('toggle-recording-global');
      }
    });

    // Atalho global Cmd+Shift+X para limpar
    globalShortcut.register('CommandOrControl+Shift+X', () => {
      if (overlayWindow && !overlayWindow.isDestroyed()) {
        overlayWindow.webContents.send('clear-all-global');
      }
    });
  } catch (err) {
    console.error('Erro ao registrar atalhos globais:', err);
  }
}

function createOverlay(config) {
  currentConfig = getEffectiveConfig(config);
  const { width: screenWidth } = screen.getPrimaryDisplay().workAreaSize;
  
  const rawSize = currentConfig && currentConfig.windowSize ? currentConfig.windowSize : { width: 780, height: 380 };
  const size = {
    width: Math.max(480, rawSize.width || 780),
    height: Math.max(300, rawSize.height || 380)
  };

  overlayWindow = new BrowserWindow({
    width: size.width,
    height: size.height,
    minWidth: 480,
    minHeight: 260,
    x: Math.floor((screenWidth - size.width) / 2),
    y: 0,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: true,
    skipTaskbar: true,
    focusable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  overlayWindow.setIgnoreMouseEvents(false);
  overlayWindow.loadFile(path.join(__dirname, 'overlay.html'));

  // Mantém sempre no topo mesmo em fullscreen
  overlayWindow.setAlwaysOnTop(true, 'screen-saver');
  overlayWindow.setVisibleOnAllWorkspaces(true);

  overlayWindow.webContents.on('did-finish-load', () => {
    overlayWindow.webContents.send('init', currentConfig);
    overlayWindow.focus();
  });

  registerOverlayShortcuts();
}

function createConfig() {
  globalShortcut.unregisterAll();
  configWindow = new BrowserWindow({
    width: 520,
    height: 680,
    resizable: false,
    title: 'TalkGenius — Configuração',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  configWindow.loadFile(path.join(__dirname, 'config.html'));
  configWindow.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createConfig();
});

app.on('window-all-closed', () => {
  globalShortcut.unregisterAll();
  app.quit();
});

// Foco na janela vindo da overlay para garantir eventos de teclado
ipcMain.on('focus-window', () => {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    overlayWindow.focus();
  }
});

// Config fechada → abre overlay
ipcMain.on('start-assistant', (event, config) => {
  if (configWindow) {
    configWindow.close();
    configWindow = null;
  }
  createOverlay(config);
});

// Overlay pede para fechar
ipcMain.on('quit', () => {
  globalShortcut.unregisterAll();
  app.quit();
});

// Overlay pede para reconfigurar
ipcMain.on('reconfig', () => {
  if (overlayWindow) {
    overlayWindow.close();
    overlayWindow = null;
  }
  createConfig();
});

// Mover a janela arrastando de qualquer ponto da tela
ipcMain.on('move-window-by', (event, { deltaX, deltaY }) => {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    const bounds = overlayWindow.getBounds();
    overlayWindow.setBounds({
      x: Math.round(bounds.x + deltaX),
      y: Math.round(bounds.y + deltaY),
      width: bounds.width,
      height: bounds.height
    });
  }
});

// Redimensionamento em tempo real da janela vindo da overlay
ipcMain.on('resize-window-live', (event, size) => {
  if (overlayWindow && size && size.width && size.height) {
    overlayWindow.setSize(Math.round(size.width), Math.round(size.height));
  }
});

// Grava o novo tamanho da janela no config.json na raiz do projeto
ipcMain.on('save-window-size', (event, size) => {
  const configPath = path.join(__dirname, '..', 'config.json');
  if (fs.existsSync(configPath)) {
    try {
      const data = fs.readFileSync(configPath, 'utf8');
      const config = JSON.parse(data);
      config.windowSize = size;
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
      console.log('Novas dimensões de janela salvas no config.json:', size);
    } catch (e) {
      console.error('Falha ao salvar as dimensões da janela no config.json:', e);
    }
  }
});

// Processa o áudio e gera resposta por streaming usando o Gemini (Flash ou Pro)
ipcMain.on('process-audio-stream', async (event, params) => {
  try {
    const effectiveConfig = getEffectiveConfig(params);
    const apiKey = params.apiKey || effectiveConfig.apiKey;
    const model = params.model || effectiveConfig.model || 'gemini-2.5-flash';
    const language = params.language || effectiveConfig.language || 'pt';
    const role = params.role || effectiveConfig.role;
    const resume = params.resume || effectiveConfig.resume;
    const jobDesc = params.jobDesc || effectiveConfig.jobDesc;
    const history = params.history || [];

    if (!apiKey || (!apiKey.startsWith('AIza') && !apiKey.startsWith('AIzaSy'))) {
      event.reply('stream-chunk', {
        type: 'error',
        error: '🔑 Chave da API do Gemini inválida!\n\nA chave atual cadastrada não é uma chave válida do Google Gemini (que deve começar com "AIzaSy...").\n\nPor favor, clique no botão ⚙ (Engrenagem / Configurações) no topo da janela e insira sua Gemini API Key válida (obtida gratuitamente em https://aistudio.google.com).'
      });
      return;
    }

    // Converte o buffer recebido para base64 direto
    const base64Str = Buffer.from(params.audioBuffer).toString('base64');

    const langName = {
      'pt': 'Portuguese',
      'en': 'English',
      'es': 'Spanish',
      'it': 'Italian'
    }[language] || 'Portuguese';

    // Prompt básico do sistema
    let systemPrompt = `You are an expert interview coach helping a candidate during a live job interview.
The candidate is interviewing for: ${role || 'a software/tech position'}.
${resume ? `The candidate's resume/profile:\n"""\n${resume}\n"""` : ''}
${jobDesc ? `The job description/requirements:\n"""\n${jobDesc}\n"""` : ''}
The interviewer is speaking in ${langName}.

Your job is two-fold:
1. Transcribe what the interviewer said in the audio recording, in ${langName}.
2. Formulate a suggested response for the candidate.

Respond in ${langName}.
You MUST format your output EXACTLY like this:
[TRANSCRIPT]: <your transcription of the interviewer's voice>
[ANSWER]: <your suggested response for the candidate>

Rules for the answer:
- Keep the answer concise (aim for 3-5 sentences), complete, punchy, direct, and impressive. Make sure the response is a fully completed thought and does not cut off mid-sentence.
- Use first person ("I did...", "I believe...", "In my experience...").
- Do NOT use bullet points. Just natural spoken language.
- If it's a behavioral question, use the STAR method briefly.
- If it's a technical question, give a clear, correct answer.
- Incorporate the candidate's resume/profile and job description where relevant to make the answer personalized and convincing.
- Start directly with the answer, no preamble.`;

    if (model === 'gemini-2.5-pro') {
      systemPrompt += `

Additional rules for Gemini 2.5 Pro:
- Deliver maximum strategic depth: construct responses that make the candidate sound like a seasoned lead/staff engineer, principal designer, or senior product manager.
- Focus heavily on business impact: mention relevant metrics, scalability principles, or trade-offs (e.g., 'balancing speed vs quality', 'measuring KPIs like latency or conversion rates').
- Structuring: Make the first sentence a hook that immediately shows expertise. Follow up with a concrete engineering or management paradigm, and close with a results-oriented statement.`;
    }

    const contents = [];
    if (history && history.length > 0) {
      for (const h of history) {
        contents.push({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [
        {
          inlineData: {
            mimeType: 'audio/webm',
            data: base64Str
          }
        },
        {
          text: 'Listen to this audio recording of the interviewer. Transcribe what they said exactly under [TRANSCRIPT]: and then provide the suggested answer under [ANSWER]:'
        }
      ]
    });

    const modelMapping = {
      'gemini-2.5-pro': 'gemini-1.5-pro',
      'gemini-2.5-flash': 'gemini-2.0-flash',
      'gemini-2.0-pro': 'gemini-1.5-pro',
      'gemini-pro': 'gemini-1.5-pro',
      'gemini-flash': 'gemini-2.0-flash'
    };
    const rawModel = model || effectiveConfig.model || 'gemini-2.0-flash';
    const activeModel = modelMapping[rawModel] || rawModel;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:streamGenerateContent?alt=sse&key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 1200
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      let errorMsg = `Erro na API do Gemini (${response.status}): ${errText}`;
      if (errText.includes('API_KEY_INVALID') || errText.includes('API key not valid') || response.status === 400) {
        errorMsg = '🔑 Sua chave da API do Gemini é inválida ou expirou. Por favor, clique no botão ⚙ (Configurações) no canto superior direito e insira sua chave válida obtida no Google AI Studio (aistudio.google.com).';
      }
      event.reply('stream-chunk', { type: 'error', error: errorMsg });
      return;
    }

    const decoder = new TextDecoder();
    let buffer = '';

    const reader = response.body.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // Mantém o pedaço incompleto no buffer

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.replace('data: ', '').trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const data = JSON.parse(jsonStr);
            const textChunk = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textChunk) {
              event.reply('stream-chunk', { type: 'chunk', text: textChunk });
            }
          } catch (e) {
            // Ignora linhas malformadas no SSE
          }
        }
      }
    }

    event.reply('stream-chunk', { type: 'end' });

  } catch (err) {
    console.error('Erro na requisição Gemini:', err);
    event.reply('stream-chunk', { type: 'error', error: err.message });
  }
});
