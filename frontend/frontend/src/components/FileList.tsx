import React, { useEffect, useState } from 'react'

type FileItem = {
  filename: string
  downloadUrl: string
}

const apiUrl = 'http://localhost:3334'

export function FileList() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch(`${apiUrl}/uploads`)
        if (!response.ok) {
          console.error('Erro ao buscar arquivos:', response.status)
          setFiles([])
        } else {
          const data = await response.json()
          setFiles(data)
        }
      } catch (error) {
        console.error('Erro ao buscar arquivos:', error)
        setFiles([])
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [])

  if (loading) return <p>Carregando arquivos...</p>

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Arquivos disponíveis</h2>
      {files.length === 0 ? (
        <p>Nenhum arquivo enviado ainda.</p>
      ) : (
        <ul className="space-y-2">
          {files.map((file) => (
            <li key={file.filename} className="border p-2 rounded flex justify-between items-center">
              📄 {file.filename}
              <div className="flex gap-4">
                <a
                  href={file.downloadUrl}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Baixar
                </a>
                <button
                  onClick={() => handleDelete(file.filename)}
                  className="text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  async function handleDelete(filename: string) {
    if (!window.confirm(`Confirma apagar o arquivo "${filename}"?`)) return

    try {
      const response = await fetch(`${apiUrl}/delete/${filename}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setFiles(files.filter(file => file.filename !== filename))
        alert('Arquivo excluído!')
      } else {
        const result = await response.json()
        alert(result.error || 'Erro ao excluir arquivo.')
      }
    } catch (error) {
      console.error('Erro ao excluir:', error)
      alert('Erro ao excluir arquivo.')
    }
  }
}
