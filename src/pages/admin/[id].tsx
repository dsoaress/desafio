import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import safeJsonStringify from 'safe-json-stringify'
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword'

import { prisma } from '../../services/prisma'
import { Register } from '../../types/ApiResponse'
import { formatDate } from '../../utils/formatDate'

const EmailPasswordAuthNoSSR = dynamic(
  new Promise(res => res(EmailPassword.EmailPasswordAuth)) as any,
  { ssr: false }
)

type RegisterIdProps = {
  data: Register
}

const RegisterId = ({ data }: RegisterIdProps) => {
  const [loading, setLoading] = useState(true)
  const { push } = useRouter()

  useEffect(() => {
    if (loading && !data?.id) push('/admin')
    else setLoading(false)
  }, [data, loading, push])

  if (loading) return null

  return (
    <EmailPasswordAuthNoSSR>
      <div className="mb-4">
        <button onClick={() => push('/admin')}>Voltar</button>
        <h1 className="text-2xl font-bold">Registro #{data.id}</h1>
      </div>

      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <p>Data de registro: {formatDate(data.createdAt)}</p>
          <h2 className="text-lg mt-4 mb-2 font-bold">Arquivos</h2>
          <p>
            Autorização:{' '}
            <a href={data.authorization} target="_blank" rel="noopener noreferrer">
              Link
            </a>
          </p>
          <p>
            RG:{' '}
            <a href={data.rg} target="_blank" rel="noopener noreferrer">
              Link
            </a>
          </p>
          <p>
            CPF:{' '}
            <a href={data.cpf} target="_blank" rel="noopener noreferrer">
              Link
            </a>
          </p>

          <h2 className="text-lg mt-4 mb-2 font-bold">Dados professor</h2>
          <p>Nome: {data.teacher.name}</p>
          <p>Email: {data.teacher.email}</p>
          <p>Telefone: {data.teacher.phone}</p>
          <p>Bairro: {data.teacher.neighborhood}</p>
          <p>Cidade: {data.teacher.city}</p>
          <p>Estado: {data.teacher.state}</p>
          <p>RG: {data.teacher.rg}</p>
          <p>CPF: {data.teacher.cpf}</p>
          <p>Data de nascimento: {data.teacher.birthdate}</p>
          <p>Matéria que leciona: {data.teacher.course}</p>
          <p>Série: {data.teacher.schoolGrade}</p>
          <p>Escola: {data.teacher.schoolName}</p>
        </div>

        <div>
          <h2 className="text-lg mb-2 font-bold">Dados do(s) aluno(s)</h2>
          {data.students.map(student => (
            <div key={student.id}>
              <p>Nome: {student.name}</p>
              <p>Endereço: {student.address}</p>
              <p>Bairro: {student.neighborhood}</p>
              <p>Cidade: {student.city}</p>
              <p>Estado: {student.state}</p>
              <p>Aniversário: {student.birthdate}</p>
              <p>Série: {student.schoolGrade}</p>
              <p>Escola: {student.schoolName}</p>
            </div>
          ))}
        </div>
      </div>
    </EmailPasswordAuthNoSSR>
  )
}

export default RegisterId

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query as { id: string }

  const rawData = await prisma.register.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      students: true,
      teacher: true
    }
  })

  if (!rawData?.id) {
    return {
      props: { notFound: true }
    }
  }

  const stringifiedData = safeJsonStringify(rawData)
  const data = JSON.parse(stringifiedData)

  return {
    props: { data }
  }
}
