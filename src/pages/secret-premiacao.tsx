import { saveAs } from 'file-saver'
import Image from 'next/image'
import { ReactNode } from 'react'
import { IoMdTrophy } from 'react-icons/io'
import { TbAward } from 'react-icons/tb'

import { DownloadButton } from '../components/DownloadButton'

type MentionProps = {
  image: {
    src: string
    alt: string
  }
  gameUrl: string
  gameName: string
  authors: {
    teacher: string
    student: string
    school: string
    state: string
  }
}

type WinnerProps = {
  title: string
  desc: string
} & MentionProps

function Winner({ title, desc, image, gameUrl, gameName, authors }: WinnerProps) {
  return (
    <div className="text-white text-center p-6 rounded-xl relative overflow-hidden shadow h-full">
      <div
        className="absolute inset-0 z-10 bg-repeat "
        style={{ backgroundImage: `url('/assets/images/bg_pattern.jpg')` }}
      />

      <div className="absolute inset-0 z-20 mix-blend-overlay" style={{ background: '#1ca0b1' }} />

      <div className="z-50 relative h-full">
        <h2 className="text-xl md:text-2xl font-bold inline-flex items-center gap-2">
          <IoMdTrophy />
          {title}
        </h2>
        <div className="bg-white rounded-md mb-6">
          <p className="text-green-800">{desc}</p>
        </div>

        <a href={gameUrl} rel="noopener noreferrer" target="_blank">
          <Image src={image.src} alt={image.alt} width={1242} height={650} />
        </a>

        <h3 className="text-lg md:text-xl my-6">
          <strong>{gameName}</strong>
        </h3>
        <p>
          <strong>Autores:</strong>
        </p>

        <p>
          <strong>Professor:</strong> {authors.teacher}
        </p>
        <p>
          <strong>Aluno(a):</strong> {authors.student}
        </p>
        <p>
          <strong>Escola:</strong> {authors.school}
        </p>
        <p>
          <strong>UF:</strong> {authors.state}
        </p>
      </div>
    </div>
  )
}

function Winners() {
  const winners: WinnerProps[] = [
    {
      title: 'Vencedores do 1º ano',
      desc: 'Energia limpa e renovável',
      image: {
        src: '/assets/images/winner-1.png',
        alt: 'Vencedores do 1º ano'
      },
      gameUrl: 'https://fazgame.com.br/published_games/2604',
      gameName: 'Vento Áureo',
      authors: {
        teacher: 'Mariana Rodrigues de Almeida',
        student: 'Vinícius Cardoso',
        school: 'Centro educacional Sesi de Caçapava - CE 207',
        state: 'SP'
      }
    },
    {
      title: 'Vencedores do 2º ano',
      desc: 'Energia como vetor de desenvolvimento local',
      image: {
        src: '/assets/images/winner-2.png',
        alt: 'Vencedores do 2º ano'
      },
      gameUrl: 'https://fazgame.com.br/published_games/2662',
      gameName: 'Um futuro eletrizante',
      authors: {
        teacher: 'Ricardo de Magalhães Simões',
        student: 'Renata Machado',
        school: 'Instituto Federal de Educação, Ciências e Tecnologia - Campus Cachoeiro',
        state: 'ES'
      }
    }
  ]

  return (
    <div className="grid gap-8 md:grid-cols-2 mb-12">
      {winners.map((winner, i) => (
        <Winner key={i} {...winner} />
      ))}
    </div>
  )
}

function Mention({ image, gameUrl, gameName, authors }: MentionProps) {
  return (
    <div>
      <a href={gameUrl} rel="noopener noreferrer" target="_blank">
        <Image src={image.src} alt={image.alt} width={1242} height={650} />
      </a>

      <h3 className=" mb-2">
        <strong>{gameName}</strong>
      </h3>
      <p>
        <strong>Autores:</strong>
      </p>

      <p>
        <strong>Professor:</strong> {authors.teacher}
      </p>
      <p>
        <strong>Aluno(a):</strong> {authors.student}
      </p>
      <p>
        <strong>Escola:</strong> {authors.school}
      </p>
      <p>
        <strong>UF:</strong> {authors.state}
      </p>
    </div>
  )
}

function MentionBox({ children }: { children: ReactNode }) {
  return (
    <div className="border-8 border-neutral-600 rounded-xl px-4 py-6 text-center text-neutral-600">
      {children}
    </div>
  )
}

function MentionList({ children }: { children: ReactNode }) {
  return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">{children}</div>
}

function MentionTitle({ title }: { title: string }) {
  return (
    <h2 className="inline-flex items-center gap-2 font-bold text-xl md:text-3xl">
      <TbAward />
      {title}
    </h2>
  )
}

function MentionSubtitle({ subtitle }: { subtitle: string }) {
  return <p className="md:text-xl">{subtitle}</p>
}

function Mentions() {
  const mentionsFirstYear: MentionProps[] = [
    {
      image: {
        src: '/assets/images/mention-1-1.png',
        alt: 'Menção do 1º ano'
      },
      gameUrl: 'https://fazgame.com.br/published_games/2607',
      gameName: 'Jornada das 5 peças',
      authors: {
        teacher: 'Gizele Gondim de Souza',
        student: 'Giovane Oliveira Carvalho',
        school: 'Colégio Militar da Polícia Militar 1',
        state: 'AM'
      }
    },
    {
      image: {
        src: '/assets/images/mention-1-2.png',
        alt: 'Menção do 1º ano'
      },
      gameUrl: 'https://fazgame.com.br/published_games/2541',
      gameName: 'Em Busca de Energia',
      authors: {
        teacher: 'Olavo José Luiz Junior',
        student: 'Pedro Henrique Baron Goettens ',
        school: 'Instituto Federal do Paraná campus Assis Chateaubriand',
        state: 'PR'
      }
    },
    {
      image: {
        src: '/assets/images/mention-1-3.png',
        alt: 'Menção do 1º ano'
      },
      gameUrl: 'https://fazgame.com.br/published_games/2562',
      gameName: 'Solução eólica',
      authors: {
        teacher: 'Francisco Fernandes Neto',
        student: 'Mariana Ozana de Oliveira e Silva dos Santos',
        school: 'Escola Técnica Estadual Adolpho Bloch',
        state: 'RJ'
      }
    },
    {
      image: {
        src: '/assets/images/mention-1-4.png',
        alt: 'Menção do 1º ano'
      },
      gameUrl: 'https://fazgame.com.br/published_games/2547',
      gameName: 'João e a energia eólica',
      authors: {
        teacher: 'Eduardo Alberto Felippsen',
        student: 'Lázaro Marques Dourado Arent',
        school: 'Instituto Federal do Paraná Campus Assis Chateaubriand',
        state: 'PR'
      }
    }
  ]

  const mentionsSecondYear: MentionProps[] = [
    {
      image: {
        src: '/assets/images/mention-2-1.png',
        alt: 'Menção do 2º ano'
      },
      gameUrl: 'https://fazgame.com.br/published_games/2561',
      gameName: 'Energia... do sol?',
      authors: {
        teacher: 'Marcelo da Silva Carvalho',
        student: 'Débora Isabelle da Silva Souza',
        school: 'Colégio Modelo',
        state: 'PR'
      }
    },
    {
      image: {
        src: '/assets/images/mention-2-2.png',
        alt: 'Menção do 2º ano'
      },
      gameUrl: 'https://fazgame.com.br/published_games/2516',
      gameName: 'Energia Limpa Salva Vidas',
      authors: {
        teacher: 'Karina Rodrigues Ferreira',
        student: 'Geovana Alves Ferreira da Silva',
        school: 'Escola Estadual Fernão Dias Paes',
        state: 'SP'
      }
    },
    {
      image: {
        src: '/assets/images/mention-2-3.png',
        alt: 'Menção do 2º ano'
      },
      gameUrl: 'https://fazgame.com.br/published_games/2583',
      gameName: 'Sol em Tupi',
      authors: {
        teacher: 'Thiago da Silva Cavalcante',
        student: 'Jediael Calebe de Castro Rosas',
        school: "Escola Estadual Sant'Ana",
        state: 'AM'
      }
    },
    {
      image: {
        src: '/assets/images/mention-2-4.png',
        alt: 'Menção do 2º ano'
      },
      gameUrl: 'https://www.fazgame.com.br/published_games/2629',
      gameName: 'Solaris',
      authors: {
        teacher: 'Andreia Regina Gallego Martins',
        student: 'Clara Campos Braz Ferreira',
        school: 'Colégio Notre Dame',
        state: 'SP'
      }
    }
  ]

  return (
    <div className="space-y-10">
      <MentionBox>
        <MentionTitle title="Menções honrosas do 1º ano" />
        <MentionSubtitle subtitle="Energia limpa e renovável" />
        <MentionList>
          {mentionsFirstYear.map((mention, i) => (
            <Mention key={i} {...mention} />
          ))}
        </MentionList>
      </MentionBox>

      <MentionBox>
        <MentionTitle title="Menções honrosas do 2º ano" />
        <MentionSubtitle subtitle="Energia como vetor de desenvolvimento local" />
        <MentionList>
          {mentionsSecondYear.map((mention, i) => (
            <Mention key={i} {...mention} />
          ))}
        </MentionList>
      </MentionBox>
    </div>
  )
}

export default function Premiacao() {
  return (
    <>
      <Winners />
      <Mentions />

      <DownloadButton
        dark
        onClick={() => saveAs('/assets/pdfs/notas.pdf', `/assets/pdfs/notas.pdf`)}
      >
        Baixar notas
      </DownloadButton>
    </>
  )
}
