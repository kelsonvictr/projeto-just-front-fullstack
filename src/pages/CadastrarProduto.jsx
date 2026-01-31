import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'

const CadastrarProduto = () => {

  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [fornecedorId, setFornecedorId] = useState('')
  const [fornecedores, setFornecedores] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/fornecedores")
      .then(response => setFornecedores(response.data))
      .catch(error => console.error("Erro ao carregar fornecedores: ", error))
  }, [])

  const salvarProduto = (e) => {
    e.preventDefault()

    const novoProduto = {
      nome,
      descricao,
      preco: Number(preco),
      quantidade: Number(quantidade),
      fornecedorId: Number(fornecedorId)
    }

    axios.post("http://localhost:3000/produtos", novoProduto)
      .then(() => navigate("/produtos?msg=cadastrado"))
      .catch(error => console.error("Erro ao cadastrar produto: ", error))
  }

  return (
    <div>
      <h2 className="mb-4">Novo Produto</h2>

      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <Form onSubmit={salvarProduto}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome do Produto</Form.Label>
                  <Form.Control
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fornecedor</Form.Label>
                  <Form.Select
                    value={fornecedorId}
                    onChange={(e) => setFornecedorId(e.target.value)}
                    required
                  >
                    <option value="">Selecione um fornecedor</option>
                    {fornecedores.map(fornecedor => (
                      <option key={fornecedor.id} value={fornecedor.id}>
                        {fornecedor.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preço (R$)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Quantidade em Estoque</Form.Label>
                  <Form.Control
                    type="number"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-2 mt-4">
              <Button variant="dark" type="submit">
                Salvar
              </Button>
              <Button variant="outline-secondary" onClick={() => navigate("/produtos")}>
                Cancelar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CadastrarProduto
