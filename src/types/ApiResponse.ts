export type Teacher = {
  id: string
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
}

// export type Student = {
//   id: number
//   name: string
//   // address: string
//   // neighborhood: string
//   // city: string
//   state?: string
//   // birthdate: string
//   schoolGrade?: string
//   schoolName?: string
// }

export type Register = {
  id: number
  validated: boolean
  teacher: Teacher
  // students: Student[]
  // authorization: string
  // rg: string
  // cpf: string
  createdAt: string
}
