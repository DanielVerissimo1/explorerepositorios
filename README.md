<h1 align="center">
  <img width="40" alt="logo" src="public/Github.png" />
  <br/>
  <p>GitHub Explorer</p>
  <p>
    <img src="https://img.shields.io/github/last-commit/DanielVerissimo1/explorerepositorios?style=for-the-badge&logo=git&logoColor=white&color=10b981" alt="Last Commit">
    <img src="https://img.shields.io/github/languages/top/DanielVerissimo1/explorerepositorios?style=for-the-badge&color=10b981" alt="Top Language">
    <img src="https://img.shields.io/github/languages/count/DanielVerissimo1/explorerepositorios?style=for-the-badge&color=10b981" alt="Languages Count">
  </p>
</h1>

**GitHub Explorer** é uma aplicação web desenvolvida com **Next.js 15** e **TypeScript**, que permite buscar perfis do GitHub, visualizar informações do usuário e explorar seus repositórios públicos de forma simples e intuitiva.

---

## 📸 Visualização do Projeto

<p align="center">
  <img alt="preview" src="public/thambnail.png" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 80%;">
</p>

---

## 🚀 Funcionalidades

| Funcionalidade | Descrição |
|----------------|-----------|
| 🔍 **Busca de Usuários** | Pesquise perfis do GitHub pelo nome de usuário |
| 👤 **Perfil do Usuário** | Visualize avatar, bio, repositórios, seguidores e seguindo |
| 📦 **Listagem de Repositórios** | Veja os repositórios públicos com estrelas, forks e issues |
| ⚡ **Rota Dinâmica** | Página dedicada por usuário via `/user/[username]` |
| 🔄 **Loading & Erros** | Feedback visual de carregamento e tratamento de erros |
| 🔍 **SEO Otimizado** | Metadados e Open Graph configurados no `layout.tsx` |

---

## 🛠️ Tecnologias Utilizadas

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios">
  <img src="https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white" alt="Radix UI">
  <img src="https://img.shields.io/badge/Lucide-F56565?style=for-the-badge&logoColor=white" alt="Lucide React">
  <img src="https://img.shields.io/badge/GitHub_API-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub API">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</div>

---

## 📚 Conceitos Aplicados

- Next.js 15 com App Router
- TypeScript com tipagem estrita
- Consumo da API REST do GitHub com Axios
- Roteamento dinâmico com `[username]` para perfis de usuário
- Componentização e separação de responsabilidades
- Tailwind CSS com design responsivo
- Otimização de imagens com `next/image`
- SEO com metadados e Open Graph no `layout.tsx`
- Tratamento de erros com feedback visual

---

## ▶️ Como Rodar o Projeto

Após clonar o repositório, siga os passos abaixo:

```bash
# Instalar as dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev

# Gerar o build de produção
npm run build

# Iniciar em modo produção
npm start
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📁 Arquitetura do Projeto

```
explorerepositorios/
│
├── public/
│   ├── Github.png             # Imagem de fundo
│   ├── Github.svg
│   └── thambnail.png          # Preview do projeto
│
├── src/
│   ├── app/
│   │   ├── user/
│   │   │   └── [username]/    # Página dinâmica de perfil do usuário
│   │   │       ├── layout.tsx
│   │   │       └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx         # Layout raiz com metadados SEO
│   │   ├── loading.tsx        # Tela de carregamento global
│   │   ├── notFound.tsx       # Página 404
│   │   └── page.tsx           # Página principal com busca
│   │
│   ├── components/
│   │   ├── github/
│   │   │   ├── EmptyState.tsx     # Estado vazio da busca
│   │   │   ├── RepoCard.tsx       # Card de repositório
│   │   │   ├── SearchSection.tsx  # Seção de busca
│   │   │   ├── UserCard.tsx       # Card de usuário nos resultados
│   │   │   └── UserProfile.tsx    # Perfil completo do usuário
│   │   ├── shared/
│   │   │   ├── ErrorDisplay.tsx   # Exibição de erros
│   │   │   ├── Header.tsx         # Cabeçalho da aplicação
│   │   │   └── LoadingSpinner.tsx # Spinner de carregamento
│   │   ├── ui/
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── input.tsx
│   │   └── Footer.tsx
│   │
│   └── lib/
│       ├── githubApi.ts       # Instância Axios configurada para a API do GitHub
│       ├── types.ts           # Tipagens TypeScript (GitHubUser, GitHubRepo, etc.)
│       └── utils.ts
│
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

<p align="center">Feito com 💚 por <strong>Daniel Verissimo</strong></p>
