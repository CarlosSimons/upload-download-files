import { useState, FormEvent } from 'react'
import { api } from './services/api'

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  async function handleUpload(event: FormEvent) {
    event.preventDefault()

    if (!selectedFile) {
      alert('Selecione um arquivo antes de enviar.')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await api.post('/upload', formData)
      alert(`Upload realizado: ${response.data.filename}`)
    } catch (error) {
      alert('Erro ao fazer upload.')
      console.error(error)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Upload de Arquivo</h1>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default App
