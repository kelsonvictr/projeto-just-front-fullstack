import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'

const EditarProduto = () => {

  const navigate = useNavigate()
  const { id } = useParams()

  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [fornecedorId, setFornecedorId] = useState('')
  const [fornecedores, setFornecedores] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3000/produtos/${id}`)
      .then(response => {
        setNome(response.data.nome)
        setDescricao(response.data.descricao)
        setPreco(response.data.preco)
        setQuantidade(response.data.quantidade)
        setFornecedorId(response.data.fornecedorId)
      })
      .catch(error => console.error("Erro ao carregar produto: ", error))

    axios.get("http://localhost:3000/fornecedores")
      .then(response => setFornecedores(response.data))
      .catch(error => console.error("Erro ao carregar fornecedores: ", error))
  }, [id])

  const atualizarProduto = (e) => {
    e.preventDefault()

    const produtoAtualizado = {
      nome,
      descricao,
      preco: Number(preco),
      quantidade: Number(quantidade),
      fornecedorId: Number(fornecedorId)
    }

    axios.put(`http://localhost:3000/produtos/${id}`, produtoAtualizado)
      .then(() => navigate("/produtos?msg=editado"))
      .catch(error => console.error("Erro ao atualizar produto: ", error))
  }

  return (
    <div>
      <h2 className="mb-4">Editar Produto</h2>

      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <Form onSubmit={atualizarProduto}>
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
                Atualizar
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

export default EditarProduto
