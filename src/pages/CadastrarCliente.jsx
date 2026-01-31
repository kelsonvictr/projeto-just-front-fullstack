import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'

const CadastrarCliente = () => {

  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
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

  const salvarCliente = (e) => {
    e.preventDefault()

    const novoCliente = {
      nome,
      cpf,
      email,
      telefone,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      uf
    }

    axios.post("http://localhost:3000/clientes", novoCliente)
      .then(() => navigate("/clientes?msg=cadastrado"))
      .catch(error => console.error("Erro ao cadastrar cliente: ", error))
  }

  return (
    <div>
      <h2 className="mb-4">Novo Cliente</h2>

      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <Form onSubmit={salvarCliente}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
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
                  <Form.Label>CPF</Form.Label>
                  <Form.Control
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <hr className="my-4" />
            <h5 className="mb-3">Endereço</h5>

            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>CEP</Form.Label>
                  <Form.Control
                    type="text"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    onBlur={buscarCep}
                    placeholder="Apenas números"
                  />
                </Form.Group>
              </Col>
              <Col md={7}>
                <Form.Group className="mb-3">
                  <Form.Label>Logradouro</Form.Label>
                  <Form.Control
                    type="text"
                    value={logradouro}
                    onChange={(e) => setLogradouro(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                    type="text"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Bairro</Form.Label>
                  <Form.Control
                    type="text"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>UF</Form.Label>
                  <Form.Control
                    type="text"
                    value={uf}
                    onChange={(e) => setUf(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-2 mt-4">
              <Button variant="dark" type="submit">
                Salvar
              </Button>
              <Button variant="outline-secondary" onClick={() => navigate("/clientes")}>
                Cancelar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CadastrarCliente
