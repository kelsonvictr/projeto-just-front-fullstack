import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          <i className="bi bi-shop me-2"></i>
          Sistema de Gestão
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="bi bi-house-door me-1"></i>
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/fornecedores" className="nav-link">
                <i className="bi bi-building me-1"></i>
                Fornecedores
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/produtos" className="nav-link">
                <i className="bi bi-box-seam me-1"></i>
                Produtos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/clientes" className="nav-link">
                <i className="bi bi-people me-1"></i>
                Clientes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
