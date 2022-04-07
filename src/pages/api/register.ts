import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import { prisma } from '../../services/prisma'
import { sendEmail } from '../../utils/sendMail'

type RegisterRequest = {
  name: string
  email: string
  phone?: string
  // address: string
  // neighborhood: string
  // city: string
  state: string
  // rg: string
  // cpf: string
  // birthdate: string
  course: string
  // schoolGrade: string
  schoolName: string
  // students: {
  //   name: string
  //   // address: string
  //   // neighborhood: string
  //   // city: string
  //   state?: string
  //   // birthdate: string
  //   schoolGrade?: string
  //   schoolName?: string
  // }[]
  // files: {
  //   authorization: string
  //   rg: string
  //   cpf: string
  // }
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
        teacher: {
          create: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            state: data.state,
            course: data.course,
            schoolName: data.schoolName
          }
        }
        // students: {
        //   createMany: {
        //     data: data.students.map(student => ({
        //       name: student.name,
        //       state: student.state,
        //       schoolGrade: student.schoolGrade,
        //       schoolName: student.schoolName
        //     }))
        //   }
        // }
      },
      select: {
        id: true,
        teacher: true,
        // students: true,
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
        <p>Estado: ${data.state}</p>
        <p>Matéria que leciona: ${data.course}</p>
        <p>Nome da escola: ${data.schoolName}</p>
        <br />


      `
    })

    res.status(201).json(newRegister)
  })

export default handler
