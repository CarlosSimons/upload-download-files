import { FastifyInstance } from "fastify";
import fs from 'fs';
import path from 'path';

const uploadfolder = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadfolder)) {
  fs.mkdirSync(uploadfolder);
}

export async function fileRoutes(fastify: FastifyInstance) {
  fastify.post('/upload', async (request, reply) => {
    const data = await request.file()

    if (!data) {
      return reply.status(400).send({ error: 'Nenhum arquivo enviado.' })
    }

    const allowedTypes = [
      'text/plain',
      'image/png',
      'image/jpeg',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (!allowedTypes.includes(data.mimetype)) {
      return reply.status(400).send({
        error: `Tipo de arquivo não permitido. Tipos aceitos: ${allowedTypes.join(', ')}.`
      })
    }

    try {
      const fileBuffer = await data.toBuffer()
      const filePath = path.join(uploadfolder, data.filename)
      fs.writeFileSync(filePath, fileBuffer)

      return reply.send({
        message: 'Upload realizado com sucesso!',
        filename: data.filename,
        downloadUrl: `http://localhost:3334/download/${data.filename}`
      })
    } catch (err) {
      console.error(err)
      return reply.status(500).send({ error: 'Erro ao salvar o arquivo.' })
    }
  })

  fastify.get('/uploads', async (request, reply) => {
    try {
      const files = fs.readdirSync(uploadfolder)
      const fileList = files.map(filename => ({
        filename,
        downloadUrl: `http://localhost:3334/download/${filename}`
      }))
      return reply.send(fileList)
    } catch (err) {
      console.error(err)
      return reply.status(500).send({ error: 'Erro ao listar arquivos.' })
    }
  })

  fastify.get('/download/:filename', async (request, reply) => {
    const { filename } = request.params as { filename: string }
    const filePath = path.join(uploadfolder, filename)

    if (!fs.existsSync(filePath)) {
      return reply.status(404).send({ error: 'Arquivo não encontrado.' })
    }

    return reply
      .header('Content-Disposition', `attachment; filename="${filename}"`)
      .send(fs.createReadStream(filePath))
  })

  // 💥 Rota DELETE para excluir arquivo
  fastify.delete('/delete/:filename', async (request, reply) => {
    const { filename } = request.params as { filename: string }
    const filePath = path.join(uploadfolder, filename)

    if (!fs.existsSync(filePath)) {
      return reply.status(404).send({ error: 'Arquivo não encontrado.' })
    }

    try {
      fs.unlinkSync(filePath)
      return reply.send({ message: 'Arquivo excluído com sucesso!' })
    } catch (err) {
      console.error(err)
      return reply.status(500).send({ error: 'Erro ao excluir o arquivo.' })
    }
  })
}
