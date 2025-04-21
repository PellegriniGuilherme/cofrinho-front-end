# Cofrinho · Front-end

Bem-vindo ao Cofrinho! 💰  
Este é o front-end da aplicação Cofrinho, uma plataforma de controle financeiro pessoal com uma interface amigável e moderna.

> ⚙️ Veja também o [repositório do back-end (Laravel)](https://github.com/PellegriniGuilherme/cofrinho-back-end)
> 🐽 Veja também o [repositório do piggy-ui](https://github.com/PellegriniGuilherme/piggy-ui)

---

## ✨ Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- [Piggy UI](https://github.com/PellegriniGuilherme/piggy-ui)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [i18next](https://www.i18next.com/)

---

## 🚀 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/PellegriniGuilherme/cofrinho-front-end.git
cd cofrinho-front-end
```

### 2. Instalar as dependências

```bash
yarn install
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env.local` com base no exemplo:

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` para apontar para a API do Laravel:

```env
NEXT_PUBLIC_API_URL=http://localhost
```

---

## ⚙️ Back-end (Laravel + Sail)

O back-end está disponível em:  
🔗 [https://github.com/PellegriniGuilherme/cofrinho-back-end](https://github.com/PellegriniGuilherme/cofrinho-back-end)

### Instalação do back-end com Laravel Sail

```bash
git clone https://github.com/PellegriniGuilherme/cofrinho-back-end.git
cd cofrinho-back-end

cp .env.example .env

./vendor/bin/sail up -d --build
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
```

> 🐳 Certifique-se de que você tenha Docker instalado para usar o Laravel Sail.

---

## 📁 Estrutura do Projeto

```
cofrinho-front-end/
├── public/                # Arquivos públicos
├── src/
│   ├── api/               # Serviços de API
│   ├── components/        # Componentes reutilizáveis
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Páginas da aplicação
│   ├── stores/            # Zustand stores
│   ├── translations/      # Arquivos i18n
│   └── utils/             # Funções utilitárias
├── .env.local             # Variáveis de ambiente
└── tailwind.config.ts     # Configuração do Tailwind
```

---

## 📜 Scripts Úteis

```bash
yarn dev        # Inicia o servidor de desenvolvimento
yarn build      # Compila a aplicação para produção
yarn lint       # Executa o linter
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou pull request.

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.