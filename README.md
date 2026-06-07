# 💕 Dia dos Namorados - Para Thiane

Um site romântico e interativo criado com muito amor para celebrar nosso dia especial.

## 🌟 Características

✨ **Mensagem de Dedicação Personalizada** - Uma mensagem especial no topo da página
🎵 **Música Automática** - A música toca ao entrar (com opção de pausar)
📸 **Carrossel de Fotos** - Galeria automática com 8 fotos nossas
💫 **Animações Românticas** - Pétalas de rosas e girassóis caindo
💕 **Contador de Dias** - Mostra quantos dias estamos juntos
🌹 **Galeria Interativa** - Clique nas fotos para ampliar
📤 **Botão Compartilhar** - Compartilhe com facilidade
🎨 **Design Responsivo** - Funciona perfeitamente em desktop e mobile

## 🚀 Como Publicar no GitHub Pages

### Passo 1: Criar o Repositório
1. Vá para [github.com](https://github.com)
2. Clique no `+` no canto superior direito e selecione "New repository"
3. Nomeie como: `dia-namorados`
4. Escolha "Public" (para publicar na web)
5. **Não** inicie com README (já temos os arquivos)
6. Clique em "Create repository"

### Passo 2: Fazer Upload dos Arquivos via GitHub Web
1. Na página do repositório, clique em "Add file" > "Upload files"
2. Faça upload de toda a pasta `docs/` com seus conteúdos:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `assets/images/` (com as 8 fotos)
   - `assets/audio/` (com a música)
3. Commit com mensagem: "Initial commit - Dia dos Namorados"

### Passo 3: Ativar GitHub Pages
1. Vá para "Settings" (Configurações) do repositório
2. Na esquerda, clique em "Pages"
3. Em "Source", selecione:
   - **Branch**: `main`
   - **Pasta**: `/docs`
4. Clique "Save"
5. O GitHub mostrará a URL do seu site: `(https://browndark.github.io/dia-namorados/)`

### Passo 4: Aguardar Deploy
- Pode levar alguns minutos (geralmente menos de 2 minutos)
- Você verá um check verde ao lado da branch quando estiver pronto
- Acesse a URL para ver seu site ao vivo!

## 📝 Personalizações Possíveis

Se quiser modificar depois:
- **Mensagem de Dedicação**: Edite `index.html`, procure por `dedication-text`
- **Cores**: Em `styles.css`, ajuste as variáveis CSS (`:root`)
- **Velocidade do Carrossel**: Em `script.js`, procure por `5500` (em ms)
- **Data de Relacionamento**: Em `script.js`, procure por `relationshipStartDate`

## 🎨 Customizações CSS Principais

```css
--primary-color: #ff1744;       /* Rosa vermelho - paixão */
--secondary-color: #ff6e40;     /* Laranja - energia */
--accent-color: #ffb74d;        /* Dourado - preciosidade */
```

## 💡 Easter Egg
Pressione a tecla "I" 3 vezes para ver uma chuva de corações! 💕

## 📱 Compatibilidade
- ✅ Chrome/Edge/Firefox (Desktop)
- ✅ Safari (Mac/iOS)
- ✅ Navegadores Mobile (iOS Safari, Chrome Mobile)
- ⚠️ Internet Explorer não é suportado (use navegador moderno)

## 🎯 Próximos Passos

1. **Via GitHub Web** (Mais Fácil):
   - Acesse seu repositório no GitHub
   - Clique em "Add file" > "Upload files"
   - Selecione todos os arquivos da pasta `docs/`
   - Commit e ative GitHub Pages

2. **Via Git Local** (Mais Controle):
   ```bash
   git clone https://github.com/seu-username/dia-namorados.git
   # Copie os arquivos para a pasta
   git add .
   git commit -m "Initial commit - Dia dos Namorados"
   git push
   ```

## 💕 Observações Importantes

- **Browsers Mobile**: Alguns navegadores bloqueiam autoplay de áudio. O usuário pode clicar no ícone de música para tocar.
- **Hospedagem**: GitHub Pages é gratuito e mantém seu projeto seguro
- **Certificado SSL**: GitHub Pages fornece HTTPS automaticamente
- **Domínio Customizado**: Você pode usar um domínio próprio se tiver (veja Settings > Pages)

---*
