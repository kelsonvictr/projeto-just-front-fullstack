import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_BASE_URL from '../config/api'

const ExemploUsoAPI = () => {
  const navigate = useNavigate()

  // Exemplo de GET
  const buscarFornecedores = () => {
    axios.get(`${API_BASE_URL}/fornecedores`)
      .then(response => console.log(response.data))
      .catch(error => console.error(error))
  }

  // Exemplo de POST
  const criarFornecedor = (dados) => {
    axios.post(`${API_BASE_URL}/fornecedores`, dados)
      .then(response => console.log('Criado:', response.data))
      .catch(error => console.error(error))
  }

  // Exemplo de PUT
  const atualizarFornecedor = (id, dados) => {
    axios.put(`${API_BASE_URL}/fornecedores/${id}`, dados)
      .then(response => console.log('Atualizado:', response.data))
      .catch(error => console.error(error))
  }

  // Exemplo de DELETE
  const deletarFornecedor = (id) => {
    axios.delete(`${API_BASE_URL}/fornecedores/${id}`)
      .then(() => console.log('Deletado'))
      .catch(error => console.error(error))
  }

  return <div>Exemplo de uso da API</div>
}

export default ExemploUsoAPI
