let participantes = [
  {
    nome: "Felipe Morais",
    email: "felipe@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 00),
  },
  {
    nome: "João Pereira",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 3, 15, 17, 50),
    dataCheckIn: null
  },
  {
    nome: "Ana Silva",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 1, 10, 14, 30),
    dataCheckIn: new Date(2024, 1, 12, 18, 15),
  },
  {
    nome: "Lucas Santos",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 4, 05, 16, 45),
    dataCheckIn: new Date(2024, 4, 08, 20, 30),
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 0, 20, 12, 00),
    dataCheckIn: null
  },
  {
    nome: "Ricardo Fonseca",
    email: "ricardo@gmail.com",
    dataInscricao: new Date(2024, 6, 18, 09, 10),
    dataCheckIn: new Date(2024, 6, 20, 13, 00),
  },
  {
    nome: "Patrícia Lopes",
    email: "patricia@gmail.com",
    dataInscricao: new Date(2024, 7, 24, 11, 25),
    dataCheckIn: new Date(2024, 7, 27, 14, 55),
  },
  {
    nome: "Eduardo Nascimento",
    email: "eduardo@gmail.com",
    dataInscricao: new Date(2024, 8, 29, 15, 35),
    dataCheckIn: new Date(2024, 9, 02, 19, 05),
  },
  {
    nome: "Tânia Gomes",
    email: "tania@gmail.com",
    dataInscricao: new Date(2024, 10, 13, 10, 20),
    dataCheckIn: null
  },
  {
    nome: "Bruno Carvalho",
    email: "bruno@gmail.com",
    dataInscricao: new Date(2024, 11, 08, 08, 55),
    dataCheckIn: new Date(2024, 11, 11, 11, 30),
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if (participante.dataCheckIn == null) {
    dataCheckIn = `<button data-email="${participante.email}" onclick="fazerCheckIn(event)">Confirmar CheckIn</button>`
  }

  return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>
        ${dataInscricao}
      </td>
      <td>
        ${dataCheckIn}
      </td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosFormulario = new FormData(event.target)

  const participante = {
    nome: dadosFormulario.get('nome'),
    email: dadosFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o CheckIn ?'
  if (confirm(mensagemConfirmacao) == false) {
    return 
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}