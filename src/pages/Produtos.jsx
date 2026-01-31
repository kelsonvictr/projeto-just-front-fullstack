import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Produtos = () => {
  const [produtos, setProdutos] = useState([])
  const [fornecedores, setFornecedores] = useState([])
  const [mensagem, setMensagem] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    carregarProdutos()
    carregarFornecedores()
    
    const msg = searchParams.get('msg')
    if (msg === 'cadastrado') {
      setMensagem('Produto cadastrado com sucesso!')
    } else if (msg === 'editado') {
      setMensagem('Produto atualizado com sucesso!')
    }
    
    if (msg) {
      setSearchParams({})
    }
  }, [searchParams, setSearchParams])

  const carregarProdutos = () => {
    axios.get("http://localhost:3000/produtos")
      .then(response => setProdutos(response.data))
      .catch(error => console.error("Erro ao carregar produtos: ", error))
  }

  const carregarFornecedores = () => {
    axios.get("http://localhost:3000/fornecedores")
      .then(response => setFornecedores(response.data))
      .catch(error => console.error("Erro ao carregar fornecedores: ", error))
  }

  const getNomeFornecedor = (fornecedorId) => {
    const fornecedor = fornecedores.find(f => f.id === fornecedorId)
    return fornecedor ? fornecedor.nome : "Não informado"
  }

  const excluirProduto = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      axios.delete(`http://localhost:3000/produtos/${id}`)
        .then(() => {
          setMensagem("Produto excluído com sucesso!")
          carregarProdutos()
        })
        .catch(error => console.error("Erro ao excluir produto: ", error))
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 text-white">
          <i className="bi bi-box-seam me-2"></i>
          Produtos
        </h2>
        <Link to="/cadastrar-produto" className="btn btn-light">
          <i className="bi bi-plus-lg me-2"></i>
          Novo Produto
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
        {produtos.map(produto => (
          <div className="col-md-6 col-lg-4" key={produto.id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="card-title fw-bold mb-0">
                    <i className="bi bi-box text-success me-2"></i>
                    {produto.nome}
                  </h5>
                  <span className={`badge ${produto.quantidade > 10 ? 'bg-success' : produto.quantidade > 0 ? 'bg-warning' : 'bg-danger'}`}>
                    {produto.quantidade} un.
                  </span>
                </div>
                <p className="text-muted small mb-3">{produto.descricao}</p>
                <h4 className="text-success mb-3">R$ {Number(produto.preco).toFixed(2)}</h4>
                <p className="mb-0">
                  <small className="text-muted d-block">Fornecedor</small>
                  <i className="bi bi-building me-2"></i>
                  {getNomeFornecedor(produto.fornecedorId)}
                </p>
              </div>
              <div className="card-footer bg-white border-0">
                <div className="d-flex gap-2">
                  <Link to={`/editar-produto/${produto.id}`} className="btn btn-outline-secondary btn-sm flex-grow-1">
                    <i className="bi bi-pencil me-1"></i>
                    Editar
                  </Link>
                  <button className="btn btn-outline-danger btn-sm flex-grow-1" onClick={() => excluirProduto(produto.id)}>
                    <i className="bi bi-trash me-1"></i>
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {produtos.length === 0 && (
        <div className="card text-center p-5 shadow-sm border-0">
          <div className="card-body">
            <i className="bi bi-inbox display-1 text-muted mb-3"></i>
            <h5 className="text-muted">Nenhum produto cadastrado</h5>
            <p className="text-muted mb-0">Clique em "Novo Produto" para começar.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Produtos
