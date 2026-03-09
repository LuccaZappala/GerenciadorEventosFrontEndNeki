# 💻 Gerenciador de Eventos Neki - Web

Este é o módulo **Web** do sistema de Gerenciamento de Eventos, desenvolvido para o processo seletivo da Neki. A aplicação oferece um painel administrativo completo para gestão de eventos, com foco em usabilidade e performance.

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar o ambiente em sua máquina local.

## 📋 Pré-requisitos

- **Node.js** (versão 18 ou superior)
- Gerenciador de pacotes **npm** ou **yarn**

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
# Entrar na pasta do projeto web
cd gerenciador-eventos-web

# Instalar dependências
npm install
```

## ▶️ Execução

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
npm start
```

Acesse:

```
http://localhost:5173
```

ou a porta indicada no terminal.

## ✨ Funcionalidades em Destaque

### 🔐 Área Logada
Proteção de rotas e armazenamento de sessão via **localStorage**.

### 🖼️ Preview de Imagem
Sistema de **modal para visualização de imagens em tamanho real** ao clicar nos cards.

### 📂 Upload de Arquivos
Conversão de imagens para **Base64 via FileReader API**, garantindo que os dados sejam compatíveis com a versão Mobile.

### ⚡ CRUD de Eventos

- Listagem dinâmica filtrada por administrador
- Edição inteligente (campos bloqueados ou abertos conforme a necessidade)
- Exclusão com confirmação de segurança

### ✅ Validação Robusta
Sistema que impede o salvamento de eventos com **campos obrigatórios vazios**, garantindo a integridade do banco de dados.

## 🛠️ Stack Tecnológica

- **React.js com Vite** (para um build rápido)
- **TypeScript** (Segurança e tipagem de dados)
- **Styled Components** (Estilização baseada em componentes / CSS-in-JS)
- **Axios** (Consumo da API REST em Java)
- **React Router Dom** (Gerenciamento de rotas)

## 🔗 Integração com Backend

A aplicação está configurada para consumir uma **API REST rodando em**:

```
http://localhost:8080
```

Certifique-se de que o **backend em Java/Spring Boot esteja ativo** antes de realizar as operações de salvar ou excluir.

## 👨‍💻 Desenvolvedor

Projeto desenvolvido por **Lucca Zappala Jurado**.
