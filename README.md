
# Upload e Download de Arquivos — Desafio Técnico

Esta aplicação consiste em um sistema fullstack para envio, listagem e download de arquivos, com validação de tipos permitidos e geração de link direto para download.

---

## Tecnologias Utilizadas

### Backend:
- Node.js
- Fastify
- fastify-multipart
- TypeScript
- tsx
- Vite (utilizado para o frontend)

### Frontend:
- React
- TypeScript
- Tailwind CSS
- Vite

### Testes:
- Cypress

---

## Como Executar o Projeto

### Backend

1. Acesse a pasta `backend`
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm run dev
   ```

O backend ficará disponível em: [http://localhost:3334](http://localhost:3334)

---

### Frontend

1. Acesse a pasta `frontend`
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação:
   ```bash
   npm run dev
   ```

O frontend ficará disponível em: [http://localhost:5173](http://localhost:5173)

---

## Funcionalidades

- Upload de arquivos (`.txt`, `.pdf`, `.jpeg`, `.png`, `.docx`)
- Validação de tipos permitidos no upload
- Listagem dos arquivos enviados
- Link de download forçado para todos os arquivos
- Testes automatizados com Cypress

---

## Rotas da API

### POST `/upload`
Realiza o upload de um arquivo para o servidor.

**Tipos permitidos:** `text/plain`, `image/png`, `image/jpeg`, `application/pdf`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

**Resposta:**
```json
{
  "message": "Upload realizado com sucesso!",
  "filename": "nome-do-arquivo.ext",
  "downloadUrl": "http://localhost:3334/download/nome-do-arquivo.ext"
}
```

---

### GET `/uploads`
Retorna a lista de arquivos disponíveis para download.

**Resposta:**
```json
[
  {
    "filename": "arquivo.txt",
    "downloadUrl": "http://localhost:3334/download/arquivo.txt"
  },
  ...
]
```

---

### GET `/download/:filename`
Realiza o download forçado de um arquivo.

---

## Testes Automatizados

Para executar os testes com Cypress:

1. Acesse a pasta `frontend`
2. Execute:
   ```bash
   npx cypress open
   ```
3. No painel do Cypress, selecione e execute os testes disponíveis.

---

## Estrutura de Pastas

```
📦 backend
 ┣ 📂 src
 ┃ ┣ 📜 server.ts
 ┃ ┣ 📜 fileRoutes.ts
 ┣ 📂 uploads (gerada automaticamente)
 ┣ 📜 package.json
 ┣ 📜 tsconfig.json

📦 frontend
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 FileList.tsx
 ┃ ┣ 📜 App.tsx
 ┣ 📂 cypress
 ┣ 📜 package.json
 ┣ 📜 vite.config.ts
```

---

## Observações

- Arquivos de tipos não permitidos são rejeitados com mensagem adequada.
- Todos os downloads são forçados para o dispositivo do usuário.
- A aplicação utiliza Fastify no backend pela sua performance e simplicidade.
- Testes end-to-end asseguram a funcionalidade integrada entre frontend e backend.

---

## Autor

Carlos Eduardo da Silva Simões  
[LinkedIn](https://www.linkedin.com/in/carloseduardosimoes/)
