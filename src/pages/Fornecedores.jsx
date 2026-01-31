import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([])
  const [mensagem, setMensagem] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    carregarFornecedores()
    
    const msg = searchParams.get('msg')
    if (msg === 'cadastrado') {
      setMensagem('Fornecedor cadastrado com sucesso!')
    } else if (msg === 'editado') {
      setMensagem('Fornecedor atualizado com sucesso!')
    }
    
    if (msg) {
      setSearchParams({})
    }
  }, [searchParams, setSearchParams])

  const carregarFornecedores = () => {
    axios.get("http://localhost:3000/fornecedores")
      .then(response => setFornecedores(response.data))
      .catch(error => console.error("Erro ao carregar fornecedores: ", error))
  }

  const excluirFornecedor = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
      axios.delete(`http://localhost:3000/fornecedores/${id}`)
        .then(() => {
          setMensagem("Fornecedor excluído com sucesso!")
          carregarFornecedores()
        })
        .catch(error => console.error("Erro ao excluir fornecedor: ", error))
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 text-white">
          <i className="bi bi-building me-2"></i>
          Fornecedores
        </h2>
        <Link to="/cadastrar-fornecedor" className="btn btn-light">
          <i className="bi bi-plus-lg me-2"></i>
          Novo Fornecedor
        </Link>
      </div>

      {mensagem && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="bi bi-check-circle me-2"></i>
          {mensagem}
          <button type="button" className="btn-close" onClick={() => setMensagem('')}></button>
        </div>
      )}

      <div className="row g-4">
        {fornecedores.map(fornecedor => (
          <div className="col-md-6 col-lg-4" key={fornecedor.id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  <i className="bi bi-building text-primary me-2"></i>
                  {fornecedor.nome}
                </h5>
                <p className="mb-2">
                  <small className="text-muted d-block">CNPJ</small>
                  {fornecedor.cnpj}
                </p>
                <p className="mb-2">
                  <small className="text-muted d-block">Email</small>
                  <i className="bi bi-envelope me-2"></i>
                  {fornecedor.email}
                </p>
                <p className="mb-2">
                  <small className="text-muted d-block">Telefone</small>
                  <i className="bi bi-telephone me-2"></i>
                  {fornecedor.telefone}
                </p>
                <p className="mb-0">
                  <small className="text-muted d-block">Localização</small>
                  <i className="bi bi-geo-alt me-2"></i>
                  {fornecedor.cidade}/{fornecedor.uf}
                </p>
              </div>
              <div className="card-footer bg-white border-0">
                <div className="d-flex gap-2">
                  <Link to={`/editar-fornecedor/${fornecedor.id}`} className="btn btn-outline-secondary btn-sm flex-grow-1">
                    <i className="bi bi-pencil me-1"></i>
                    Editar
                  </Link>
                  <button className="btn btn-outline-danger btn-sm flex-grow-1" onClick={() => excluirFornecedor(fornecedor.id)}>
                    <i className="bi bi-trash me-1"></i>
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {fornecedores.length === 0 && (
        <div className="card text-center p-5 shadow-sm border-0">
          <div className="card-body">
            <i className="bi bi-inbox display-1 text-muted mb-3"></i>
            <h5 className="text-muted">Nenhum fornecedor cadastrado</h5>
            <p className="text-muted mb-0">Clique em "Novo Fornecedor" para começar.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Fornecedores
