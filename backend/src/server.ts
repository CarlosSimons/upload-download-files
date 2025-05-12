import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'path'
import multipart from '@fastify/multipart'
import { fileRoutes } from './routes/fileRoutes'
import cors from '@fastify/cors'

const app = Fastify({
  logger: true,
})

// CORS liberado pra tudo (melhoraria isso em produção depois)
app.register(cors, {
  origin: '*'
})

// Servindo arquivos da pasta uploads
app.register(fastifyStatic, {
  root: path.join(__dirname, 'uploads'),
  prefix: '/uploads/',
})

// Configurando multipart com limite de tamanho — exemplo: 5 MB
app.register(multipart, {
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  }
})

// Registra as rotas
app.register(fileRoutes)

app.get('/', async (request, reply) => {
  return { message: 'API funcionando!' }
})

// Centraliza erros de requisição, incluindo de tamanho de arquivo
app.setErrorHandler((error, request, reply) => {
  if (error.code === 'FST_REQ_FILE_TOO_LARGE') {
    return reply.status(413).send({ error: 'Arquivo excede o limite de 5 MB.' })
  }

  console.error(error)
  reply.status(500).send({ error: 'Erro interno no servidor.' })
})

// Inicia servidor
app.listen({ port: 3334 }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`🚀 Servidor rodando em: ${address}`)
})
