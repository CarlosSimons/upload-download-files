import { useState } from 'react'
import { FileList } from './components/FileList'

const apiUrl = 'http://localhost:3334'

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadUrl, setUploadUrl] = useState<string>('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) {
      alert('Selecione um arquivo primeiro!')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        setUploadUrl(result.downloadUrl)
        alert('Upload realizado com sucesso!')
        window.location.reload() // recarrega pra atualizar a lista
      } else {
        alert(result.error || 'Erro no upload')
      }
    } catch (error) {
      console.error('Erro no upload:', error)
      alert('Erro ao tentar enviar o arquivo.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload e Download de Arquivos</h1>

      <div className="mb-4">
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          className="ml-2 px-4 py-1 bg-blue-600 text-white rounded"
        >
          Enviar
        </button>
      </div>

      {uploadUrl && (
        <p>
          Arquivo enviado!{' '}
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            Baixar arquivo
          </a>
        </p>
      )}

      <FileList />
    </div>
  )
}

export default App
