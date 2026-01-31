import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CadastrarFornecedor = () => {
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cep, setCep] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [numero, setNumero] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [uf, setUf] = useState('')

  const buscarCep = () => {
    if (cep.length === 8) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
          if (!response.data.erro) {
            setLogradouro(response.data.logradouro)
            setBairro(response.data.bairro)
            setCidade(response.data.localidade)
            setUf(response.data.uf)
          }
        })
        .catch(error => console.error("Erro ao buscar CEP: ", error))
    }
  }

  const salvarFornecedor = (e) => {
    e.preventDefault()

    const novoFornecedor = {
      nome,
      cnpj,
      email,
      telefone,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      uf
    }

    axios.post("http://localhost:3000/fornecedores", novoFornecedor)
      .then(() => navigate("/fornecedores?msg=cadastrado"))
      .catch(error => console.error("Erro ao cadastrar fornecedor: ", error))
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-white">
          <i className="bi bi-building me-2"></i>
          Novo Fornecedor
        </h2>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <form onSubmit={salvarFornecedor}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">CNPJ</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Telefone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <hr className="my-4" />
            <h5 className="mb-3">Endereço</h5>

            <div className="row">
              <div className="col-md-3">
                <div className="mb-3">
                  <label className="form-label">CEP</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    onBlur={buscarCep}
                    placeholder="Apenas números"
                  />
                </div>
              </div>
              <div className="col-md-7">
                <div className="mb-3">
                  <label className="form-label">Logradouro</label>
                  <input
                    type="text"
                    className="form-control"
                    value={logradouro}
                    onChange={(e) => setLogradouro(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="mb-3">
                  <label className="form-label">Número</label>
                  <input
                    type="text"
                    className="form-control"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Bairro</label>
                  <input
                    type="text"
                    className="form-control"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Cidade</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="mb-3">
                  <label className="form-label">UF</label>
                  <input
                    type="text"
                    className="form-control"
                    value={uf}
                    onChange={(e) => setUf(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn btn-dark">
                <i className="bi bi-check-lg me-2"></i>
                Salvar
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/fornecedores")}>
                <i className="bi bi-x-lg me-2"></i>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CadastrarFornecedor
