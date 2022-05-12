const currentYear = new Date().getFullYear()

export const footer = {
  logo: {
    src: '/assets/images/logo_footer.png',
    alt: 'FazGame Eletrobras'
  },
  social: [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/desafiofazgameeletrobras60/'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/desafiofazgameeletrobras60/'
    }
  ],
  firstSection: {
    title: 'Mapa do site',
    links: [
      {
        title: 'Apresentação',
        url: '/',
        isActive: true
      },
      // {
      //   title: 'Trilhas',
      //   url: '/trilhas',
      //   isActive: false
      // },
      {
        title: 'Regulamento',
        url: '/regulamento',
        isActive: true
      },
      // {
      //   title: 'Inscrições',
      //   url: '/inscricoes',
      //   isActive: true
      // },
      {
        title: 'Media kit',
        url: '/assets/files/media-kit.zip',
        isActive: true
      },
      {
        title: 'FAQ',
        url: '/faq',
        isActive: true
      }
    ]
  },
  secondSection: {
    title: 'Contato',
    firstBlock: {
      title: 'Dúvidas e sugestões:',
      email: 'duvidas@fazgame.com.br'
    }
  },
  thirdSection: {
    firstBlock: {
      title: 'Realização',
      logo: {
        src: '/assets/images/faz_game.png',
        alt: 'FazGame Eletrobras',
        url: 'https://www.fazgame.com.br'
      }
    },
    secondBlock: {
      title: 'Patrocínio',
      logos: [
        {
          src: '/assets/images/eletrobras_hor.png',
          alt: 'Eletrobras',
          url: 'https://eletrobras.com/pt/Paginas/Home.aspx'
        },
        {
          src: '/assets/images/mme_hor.png',
          alt: 'Ministério de Minas e Energia',
          url: 'https://www.gov.br/mme/pt-br'
        }
      ]
    }
  },
  legal: `© ${currentYear} Desafio Fazgame Eletrobras60`
}
