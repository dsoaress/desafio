import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import safeJsonStringify from 'safe-json-stringify'
import EmailPassword, { signOut } from 'supertokens-auth-react/recipe/emailpassword'

import { prisma } from '../../services/prisma'
import { Register } from '../../types/ApiResponse'
import { formatDate } from '../../utils/formatDate'

const EmailPasswordAuthNoSSR = dynamic(
  new Promise(res => res(EmailPassword.EmailPasswordAuth)) as any,
  { ssr: false }
)

type AdminProps = {
  data: Register[]
}

function Th({ children }: { children: ReactNode }) {
  return <th className="p-2 px-4">{children}</th>
}

function Td({ children }: { children: ReactNode }) {
  return <td className="p-2 px-4 text-center">{children}</td>
}

const Admin = ({ data }: AdminProps) => {
  const { push } = useRouter()

  async function onLogout() {
    await signOut()
    push('/')
  }

  return (
    <EmailPasswordAuthNoSSR>
      <a className="cursor-pointer" onClick={onLogout}>
        Sair
      </a>
      <h1 className="text-2xl font-bold mb-8">Registros</h1>

      <table className="w-full">
        <thead className="border-b">
          <tr>
            <Th>#</Th>
            <Th>Nome professor</Th>
            <Th>Email professor</Th>
            <Th>Data de registro</Th>
            <Th>Ver detalhes</Th>
          </tr>
        </thead>
        <tbody>
          {data.map(register => (
            <tr className="border-b" key={register.id}>
              <Td>{register.id}</Td>
              <Td>{register.teacher.name}</Td>
              <Td>{register.teacher.email}</Td>
              <Td>{formatDate(register.createdAt)}</Td>
              <Td>
                <Link href={`/admin/${register.id}`}>
                  <a>Link</a>
                </Link>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </EmailPasswordAuthNoSSR>
  )
}

export default Admin

export const getServerSideProps: GetServerSideProps = async () => {
  const rawData = await prisma.register.findMany({
    include: {
      teacher: true
    }
  })
  const stringifiedData = safeJsonStringify(rawData)
  const data = JSON.parse(stringifiedData)

  return {
    props: { data }
  }
}
