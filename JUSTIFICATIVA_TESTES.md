# Desafio Upload e Download de Arquivos — Justificativa de Implementação e Testes

## 📌 Funcionalidades Prioritárias para o Teste

Para este desafio, foram priorizadas as seguintes funcionalidades:

- ✅ Upload de arquivos com validação de tipo permitido e tamanho máximo de 5 MB.
- ✅ Listagem de arquivos enviados.
- ✅ Download forçado dos arquivos para o dispositivo do usuário.
- ✅ Mensagens de erro claras para casos de upload inválido.
- ✅ Testes automatizados no backend, validando:
  - Upload bem-sucedido.
  - Upload de tipo inválido.
  - Upload sem arquivo.
- ✅ Documentação (`README.md`) com instruções de instalação e uso.

## 📌 Justificativa Crítica sobre os Testes Realizados

Os testes realizados focaram principalmente no **backend**, mais precisamente nas operações críticas para garantir a segurança e o funcionamento básico da API:

- **Teste de upload válido**: garante que arquivos com extensões e tamanhos válidos sejam aceitos e armazenados corretamente.
- **Teste de tipo inválido**: assegura que arquivos não permitidos sejam rejeitados, prevenindo problemas de segurança.
- **Teste sem arquivo**: valida a robustez da API contra requisições malformadas ou tentativas de upload sem conteúdo.

🔍 Esses testes foram priorizados pois o backend é a camada responsável por manter a integridade e segurança dos arquivos armazenados e precisa ser resiliente a falhas e abusos.

---

**Obs:** Não foram incluídos testes automatizados no frontend por limitação de tempo, mas a aplicação foi manualmente validada em ambiente local, incluindo upload, download e listagem de arquivos.

---

📅 Entregue em: 2024-05-11  
👤 Desenvolvedor: Carlos Eduardo da Silva Simões (Kadu)
