import React from 'react'
import { Link } from 'react-router-dom'

const Inicial = () => {
  return (
    <div>
      <div className="text-center mb-5 p-5 bg-white rounded shadow">
        <h1 className="display-4 fw-bold text-dark mb-3">Sistema de Gestão</h1>
        <p className="lead text-muted">
          Gerencie seus fornecedores, produtos e clientes de forma simples e intuitiva.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 text-center">
            <div className="card-body p-4">
              <div className="mb-3">
                <i className="bi bi-building text-primary" style={{ fontSize: '4rem' }}></i>
              </div>
              <h5 className="card-title fw-bold mb-3">Fornecedores</h5>
              <p className="card-text text-muted mb-4">
                Cadastre e gerencie seus fornecedores com informações de contato e endereço completo.
              </p>
              <Link to="/fornecedores" className="btn btn-dark w-100">
                Acessar
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 text-center">
            <div className="card-body p-4">
              <div className="mb-3">
                <i className="bi bi-box-seam text-success" style={{ fontSize: '4rem' }}></i>
              </div>
              <h5 className="card-title fw-bold mb-3">Produtos</h5>
              <p className="card-text text-muted mb-4">
                Controle seu estoque com cadastro de produtos, preços e quantidades disponíveis.
              </p>
              <Link to="/produtos" className="btn btn-dark w-100">
                Acessar
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 text-center">
            <div className="card-body p-4">
              <div className="mb-3">
                <i className="bi bi-people text-info" style={{ fontSize: '4rem' }}></i>
              </div>
              <h5 className="card-title fw-bold mb-3">Clientes</h5>
              <p className="card-text text-muted mb-4">
                Mantenha o cadastro atualizado dos seus clientes com dados e endereço completos.
              </p>
              <Link to="/clientes" className="btn btn-dark w-100">
                Acessar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inicial
