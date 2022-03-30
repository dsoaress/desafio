import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import safeJsonStringify from 'safe-json-stringify'
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword'

import { prisma } from '../../services/prisma'

const EmailPasswordAuthNoSSR = dynamic(
  new Promise(res => res(EmailPassword.EmailPasswordAuth)) as any,
  { ssr: false }
)

const Admin = ({ data }: { data: any }) => {
  console.log(data)

  return (
    <EmailPasswordAuthNoSSR>
      <h1>Admin</h1>
    </EmailPasswordAuthNoSSR>
  )
}

export default Admin

export const getServerSideProps: GetServerSideProps = async () => {
  const rawData = await prisma.register.findMany({
    include: {
      students: true,
      teacher: true
    }
  })
  const stringifiedData = safeJsonStringify(rawData)
  const data = JSON.parse(stringifiedData)

  return {
    props: { data }
  }
}
