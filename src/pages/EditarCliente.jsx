import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'

const EditarCliente = () => {

  const navigate = useNavigate()
  const { id } = useParams()

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

  useEffect(() => {
    axios.get(`http://localhost:3000/clientes/${id}`)
      .then(response => {
        setNome(response.data.nome)
        setCpf(response.data.cpf)
        setEmail(response.data.email)
        setTelefone(response.data.telefone)
        setCep(response.data.cep)
        setLogradouro(response.data.logradouro)
        setNumero(response.data.numero)
        setBairro(response.data.bairro)
        setCidade(response.data.cidade)
        setUf(response.data.uf)
      })
      .catch(error => console.error("Erro ao carregar cliente: ", error))
  }, [id])

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

  const atualizarCliente = (e) => {
    e.preventDefault()

    const clienteAtualizado = {
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

    axios.put(`http://localhost:3000/clientes/${id}`, clienteAtualizado)
      .then(() => navigate("/clientes?msg=editado"))
      .catch(error => console.error("Erro ao atualizar cliente: ", error))
  }

  return (
    <div>
      <h2 className="mb-4">Editar Cliente</h2>

      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <Form onSubmit={atualizarCliente}>
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
                Atualizar
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

export default EditarCliente
