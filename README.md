# 🎙 Interview Assistant

Copiloto de entrevistas em tempo real para macOS.  
Captura a voz do entrevistador, transcreve com Whisper e gera respostas com GPT-4o — tudo numa janela flutuante no topo da sua tela.

---

## Pré-requisitos

1. **Node.js** instalado no Mac  
   → Baixe em: https://nodejs.org (versão LTS)

2. **Chave de API da OpenAI**  
   → Crie em: https://platform.openai.com/api-keys

---

## Instalação (faça uma vez só)

Abra o Terminal e rode:

```bash
cd ~/Desktop/interview-assistant
npm install
```

Aguarde alguns minutos — vai baixar o Electron e as dependências.

---

## Como usar

### 1. Iniciar o app

```bash
cd ~/Desktop/interview-assistant
npm start
```

### 2. Configuração
- Cole sua **OpenAI API Key** (`sk-...`)
- Escolha o idioma: **Inglês** ou **Italiano**
- (Opcional) Informe o cargo/vaga para respostas mais personalizadas
- Clique em **Iniciar Assistente →**

### 3. Durante a entrevista
- Uma **barra flutuante** aparece no topo da tela, sempre visível
- Quando o entrevistador fizer uma pergunta:
  - **Segure ESPAÇO** enquanto ele fala (ou clique em ⏺ Gravar)
  - **Solte ESPAÇO** quando ele terminar
  - Em 2–3 segundos a resposta sugerida aparece
- Use **ESC** ou o botão **Limpar** para resetar
- Arraste a barra para reposicionar na tela
- O app **lembra o contexto** das perguntas anteriores da entrevista

---

## Atalhos

| Tecla | Ação |
|-------|------|
| `Espaço` (segurar) | Gravar pergunta |
| `Espaço` (soltar) | Parar e processar |
| `Esc` | Limpar resposta atual |

---

## Dicas

- **Microfone do Mac** capta bem a voz do entrevistador em chamadas de vídeo (Zoom, Meet, Teams)
- Em entrevistas presenciais, deixe o Mac próximo ao entrevistador
- A janela é **semi-transparente** e **sempre no topo** — visível mesmo em fullscreen
- O botão **⚙** volta para a tela de configuração sem fechar o app

---

## Custo estimado (OpenAI)

- Whisper: ~$0.006 por minuto de áudio
- GPT-4o: ~$0.005 por resposta
- **Uma entrevista de 1h** ≈ $0.50–1.00 no total

---

## Estrutura do projeto

```
interview-assistant/
├── package.json
├── src/
│   ├── main.js        # Processo principal Electron
│   ├── config.html    # Tela de configuração
│   └── overlay.html   # Janela flutuante principal
└── README.md
```
