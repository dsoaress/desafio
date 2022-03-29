export const register = {
  alertTop: {
    initial: {
      message:
        'Preencha todos os campos abaixo para participar do <strong>Desafio FazGame Eletrobras60</strong>',
      color: '#1ca0b1'
    },
    success: {
      message: 'Inscrição realizada com sucesso!',
      color: '#009f36'
    }
  },
  alertTeacher: {
    message: 'Dados do Docente',
    color: '#005e67'
  },
  alertStudent: {
    message: 'Dados do Aluno',
    addMore: 'Tem mais duplas? Clique aqui para cadastrar um novo aluno',
    color: '#005e67'
  },
  files: {
    firstBlock: {
      message: {
        label: 'Download de arquivos essenciais',
        color: '#005e67'
      },
      subButtons: {
        first: {
          label: 'Declaração da escola (Docente e Aluno)',
          file: '/assets/pdfs/declaracao_escola.pdf'
        },
        second: {
          label: 'Autorização do uso de imagem e som para maiores de idade',
          file: '/assets/pdfs/autorizacao_maiores.pdf'
        },
        third: {
          label: 'Autorização do uso de imagem e som para menores de idade',
          file: '/assets/pdfs/autorizacao_menores_idade.pdf'
        }
      }
    },
    secondBlock: {
      message: {
        label: 'Upload de arquivos essenciais',
        color: '#005e67'
      },
      subButtons: {
        first: {
          label: 'Autorização do uso de imagem e som para maiores de idade',
          color: 'gray'
        },
        second: {
          label: 'Cópia de identidade',
          color: 'gray'
        },
        third: {
          label: 'Cópia do CPF',
          color: 'gray'
        }
      }
    }
  }
}
