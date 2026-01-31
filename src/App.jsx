import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Inicial from './pages/Inicial'
import Fornecedores from './pages/Fornecedores'
import CadastrarFornecedor from './pages/CadastrarFornecedor'
import EditarFornecedor from './pages/EditarFornecedor'
import Produtos from './pages/Produtos'
import CadastrarProduto from './pages/CadastrarProduto'
import EditarProduto from './pages/EditarProduto'
import Clientes from './pages/Clientes'
import CadastrarCliente from './pages/CadastrarCliente'
import EditarCliente from './pages/EditarCliente'

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
        <Navbar />
        <div className="container py-4">
          <Routes>
            <Route path="/" element={<Inicial />} />
            <Route path="/fornecedores" element={<Fornecedores />} />
            <Route path="/cadastrar-fornecedor" element={<CadastrarFornecedor />} />
            <Route path="/editar-fornecedor/:id" element={<EditarFornecedor />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/cadastrar-produto" element={<CadastrarProduto />} />
            <Route path="/editar-produto/:id" element={<EditarProduto />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/cadastrar-cliente" element={<CadastrarCliente />} />
            <Route path="/editar-cliente/:id" element={<EditarCliente />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
