import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Fastify from 'fastify'
import multipart from '@fastify/multipart'
import { fileRoutes } from '../src/routes/fileRoutes'
import path from 'path'
import { FormData } from 'formdata-node'
import { fileFromPath } from 'formdata-node/file-from-path'
import { request } from 'undici'

let app: any
let serverUrl: string

beforeAll(async () => {
  app = Fastify()
  app.register(multipart)
  app.register(fileRoutes)
  await app.listen({ port: 3334 })
  serverUrl = 'http://localhost:3334'
})

afterAll(async () => {
  await app.close()
})

describe('Upload de arquivos', () => {
  it('deve fazer upload de um arquivo válido', async () => {
  const form = new FormData()
  form.set(
    'file',
    await fileFromPath(path.join(__dirname, 'fixtures', 'teste.txt'), {
      type: 'text/plain'
    })
  )

  const response = await request(`${serverUrl}/upload`, {
    method: 'POST',
    body: form,
    headers: form.headers
  })

  expect(response.statusCode).toBe(200)
  const body = await response.body.json()
  expect(body).toHaveProperty('message', 'Upload realizado com sucesso!')
})


  it('deve recusar um arquivo com tipo inválido', async () => {
    const form = new FormData()
    form.set('file', await fileFromPath(path.join(__dirname, 'fixtures', 'invalido.mp3')))

    const response = await request(`${serverUrl}/upload`, {
      method: 'POST',
      body: form,
      headers: form.headers
    })

    expect(response.statusCode).toBe(400)
    const body = await response.body.json()
    expect(body.error).toMatch(/Tipo de arquivo não permitido/)
  })

  it('deve retornar erro se nenhum arquivo for enviado', async () => {
    const form = new FormData()

    const response = await request(`${serverUrl}/upload`, {
      method: 'POST',
      body: form,
      headers: form.headers
    })

    expect(response.statusCode).toBe(400)
    const body = await response.body.json()
    expect(body.error).toBe('Nenhum arquivo enviado.')
  })
})
