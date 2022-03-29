import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import { prisma } from '../../services/prisma'
import { sendEmail } from '../../utils/sendMail'

type RegisterRequest = {
  name: string
  email: string
  phone: string
  address: string
  neighborhood: string
  city: string
  state: string
  rg: string
  cpf: string
  birthdate: string
  course: string
  schoolGrade: string
  schoolName: string
  students: {
    name: string
    address: string
    neighborhood: string
    city: string
    state: string
    birthdate: string
    schoolGrade: string
    schoolName: string
  }[]
  files: {
    authorization: string
    rg: string
    cpf: string
  }
}

const getTeacher = async (email: string) => {
  const teacher = await prisma.teacher.findUnique({
    where: { email }
  })

  return { teacher }
}

const handler = nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    const { email } = req.query as { email: string }
    const { teacher } = await getTeacher(email)

    res.json({ teacher })
  })

  .post(async (req, res) => {
    const data = req.body as RegisterRequest
    const { teacher } = await getTeacher(data.email)

    if (teacher) {
      return res.status(400).json({
        error: 'Email already registered'
      })
    }

    const newRegister = await prisma.register.create({
      data: {
        authorization: data.files.authorization,
        rg: data.files.rg,
        cpf: data.files.cpf,
        teacher: {
          create: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            neighborhood: data.neighborhood,
            city: data.city,
            state: data.state,
            rg: data.rg,
            cpf: data.cpf,
            birthdate: data.birthdate,
            course: data.course,
            schoolGrade: data.schoolGrade,
            schoolName: data.schoolName
          }
        },
        students: {
          createMany: {
            data: data.students.map(student => ({
              name: student.name,
              address: student.address,
              neighborhood: student.neighborhood,
              city: student.city,
              state: student.state,
              birthdate: student.birthdate,
              schoolGrade: student.schoolGrade,
              schoolName: student.schoolName
            }))
          }
        }
      },
      select: {
        id: true,
        teacher: true,
        students: true,
        createdAt: true
      }
    })

    sendEmail({
      subject: 'Novo registro',
      html: `
        <h1>Novo registro</h1>

        <h2>Dados do(a) professor(a)</h2>
        <p>Nome: ${data.name}</p>
        <p>Email: ${data.email}</p>
        <p>Telefone: ${data.phone}</p>
        <p>Endereço: ${data.address}</p>
        <p>Bairro: ${data.neighborhood}</p>
        <p>Cidade: ${data.city}</p>
        <p>Estado: ${data.state}</p>
        <p>RG: ${data.rg}</p>
        <p>CPF: ${data.cpf}</p>
        <p>Data de nascimento: ${data.birthdate}</p>
        <p>Matéria que leciona: ${data.course}</p>
        <p>Série escolar que leciona: ${data.schoolGrade}</p>
        <p>Nome da escola: ${data.schoolName}</p>
        <p>Autorização: <a href="${data.files.authorization}">Link</a></p>
        <p>RG: <a href="${data.files.rg}">Link</a></p>
        <p>CPF: <a href="${data.files.cpf}">Link</a></p>

        <br />

        <h2>Dados dos(as) alunos(as)</h2>
        ${data.students
          .map(
            (student, index) => `
              <h3>Aluno(a) ${index + 1}</h3>
              <p>Nome: ${student.name}</p>
              <p>Endereço: ${student.address}</p>
              <p>Bairro: ${student.neighborhood}</p>
              <p>Cidade: ${student.city}</p>
              <p>Estado: ${student.state}</p>
              <p>Data de nascimento: ${student.birthdate}</p>
              <p>Série escolar: ${student.schoolGrade}</p>
              <p>Nome da escola: ${student.schoolName}</p>
            `
          )
          .join('<br />')}
      `
    })

    res.status(201).json(newRegister)
  })

export default handler
