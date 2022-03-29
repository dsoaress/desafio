import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'
import { saveAs } from 'file-saver'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useS3Upload } from 'next-s3-upload'
import { ButtonHTMLAttributes, FormEvent, Fragment, ReactNode, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { IconType } from 'react-icons'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { BsExclamationTriangle } from 'react-icons/bs'
import { CgSoftwareDownload, CgSoftwareUpload } from 'react-icons/cg'
import { FaBookReader, FaRegFilePdf, FaUserTie } from 'react-icons/fa'
import { HiOutlinePlusCircle } from 'react-icons/hi'
import InputMask from 'react-input-mask'
import * as yup from 'yup'

import { register as registerData } from '../../_data/register'
import { Alert } from '../components/Alert'
import { Input } from '../components/Input'
import { api } from '../services/api'

type Inputs = {
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

type GridProps = {
  children: ReactNode
  className?: string
}

type ButtonProps = {
  children: ReactNode
  icon?: IconType
  color: string
} & ButtonHTMLAttributes<HTMLButtonElement>

function Grid({ children, className }: GridProps) {
  return <div className={cn('grid md:grid-cols-2 md:gap-10', className)}>{children}</div>
}

function adjust(value: string) {
  const digits = !value ? '' : value.replace(/[^\d]/g, '')

  if (!digits || digits.length < 10) return value

  const split = digits.length === 10 ? 6 : 7
  const max = digits.length > 11 ? 11 : digits.length

  return `(${digits.substring(0, 2)}) ${digits.substring(2, split)}-${digits.substring(split, max)}`
}

const maskBuilder = (value: string) => {
  if (!value || value.length == 0) return ''

  const a = adjust(value)
  return a.length >= 6 && a[5] === '9' ? '(99) 99999-9999' : '(99) 9999-9999'
}

function Button({ children, icon: Icon, color, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'text-neutral-50 relative text-center p-4 flex flex-col items-center justify-center rounded-md w-full hover:opacity-90 transition-opacity duration-300',
        className,
        { 'pl-16': Icon }
      )}
      style={{ backgroundColor: color }}
      {...props}
    >
      {!!Icon && (
        <div className="absolute top-0 bottom-1/2 left-4 translate-y-1/2 ">
          <Icon size={26} />
        </div>
      )}
      {children}
    </button>
  )
}

function DownloadButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-[#1ca0b1] p-2 rounded-md text-center relative transition-opacity duration-200 hover:opacity-90 flex flex-col text-white"
      type="button"
      {...props}
    >
      <div className="flex items-center justify-center h-16 w-16 mx-auto mb-2">
        <FaRegFilePdf size={56} />
      </div>
      <span className="mb-2 font-semibold text-white block text-xs w-full">Download</span>
      <span className="text-white text-xs leading-none flex justify-center items-center flex-1">
        {children}
      </span>
    </button>
  )
}

function FileInput({
  label,
  name,
  onChange
}: {
  label: string
  name: string
  onChange: (e: FormEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="bg-neutral-700 p-2 rounded-md text-center relative transition-opacity duration-200 hover:opacity-90 flex flex-col">
      <div className="text-neutral-700 bg-white rounded-full flex items-center justify-center h-16 w-16 mx-auto mb-2">
        <CgSoftwareUpload size={62} />
      </div>
      <span className="mb-2 font-semibold text-white block text-xs">Upload</span>
      <span className="text-white text-xs leading-none flex justify-center items-center flex-1">
        {label}
      </span>
      <input
        className="opacity-0 absolute inset-0 cursor-pointer"
        name={name}
        type="file"
        onChange={onChange}
      />
    </div>
  )
}

const schema = yup.object({
  name: yup.string().required('O nome é obrigatório'),
  email: yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
  phone: yup.string().required('O telefone é obrigatório'),
  address: yup.string().required('O endereço é obrigatório'),
  neighborhood: yup.string().required('O bairro é obrigatório'),
  city: yup.string().required('A cidade é obrigatória'),
  state: yup.string().required('O estado é obrigatório'),
  rg: yup.string().required('O RG é obrigatório'),
  cpf: yup.string().required('O CPF é obrigatório'),
  birthdate: yup.string().required('A data de nascimento é obrigatória'),
  course: yup.string().required('O curso é obrigatório'),
  schoolGrade: yup.string().required('A série escolar é obrigatória'),
  schoolName: yup.string().required('O nome da escola é obrigatório'),
  students: yup.array().of(
    yup.object({
      name: yup.string().required('O nome é obrigatório'),
      address: yup.string().required('O endereço é obrigatório'),
      neighborhood: yup.string().required('O bairro é obrigatório'),
      city: yup.string().required('A cidade é obrigatória'),
      state: yup.string().required('O estado é obrigatório'),
      birthdate: yup.string().required('A data de nascimento é obrigatória'),
      schoolGrade: yup.string().required('A série escolar é obrigatória'),
      schoolName: yup.string().required('O nome da escola é obrigatório')
    })
  ),
  files: yup.object({
    authorization: yup.string().required('O upload dos arquivos são obrigatórios'),
    rg: yup.string().required('O upload dos arquivos são obrigatórios'),
    cpf: yup.string().required('O upload dos arquivos são obrigatórios')
  })
})

const Inscricoes: NextPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [studentsCount, setStudentsCount] = useState(1)
  const [files, setFiles] = useState<{
    authorization?: string
    rg?: string
    cpf?: string
  }>()

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<Inputs>({ resolver: yupResolver(schema) })
  const { uploadToS3 } = useS3Upload()
  const { push } = useRouter()

  const email = watch('email')

  useEffect(() => {
    if (email?.trim()) {
      api.get('/register', { params: { email } }).then(({ data }) => {
        data?.teacher?.email
          ? setError('email', { message: 'Este e-mail já está cadastrado' })
          : clearErrors('email')
      })
    }
  }, [clearErrors, email, setError])

  useEffect(() => {
    if (files?.authorization) setValue('files.authorization', files.authorization)
    if (files?.rg) setValue('files.rg', files.rg)
    if (files?.cpf) setValue('files.cpf', files.cpf)
  }, [files, setValue])

  const handleFileChange = async (event: FormEvent<HTMLInputElement>) => {
    const field = event.currentTarget.name as 'authorization' | 'rg' | 'cpf'
    const file = event.currentTarget.files?.[0]

    const loadingFile = toast.loading('Carregando arquivo...')

    if (file) {
      try {
        const { url } = await uploadToS3(file)
        setFiles({ ...files, [field]: url })
        toast.success('Arquivo enviado com sucesso', {
          id: loadingFile
        })
      } catch (error) {
        toast.error('Erro ao enviar arquivo, por favor tente novamente')
        console.error(error, {
          id: loadingFile
        })
      }
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      await api.post('/register', data)
      setIsSubmitted(true)
      toast.success(registerData.alertTop.success.message)
      reset()
      push('/inscricoes#top')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="form">
      <Alert
        icon={isSubmitted ? AiOutlineCheckCircle : BsExclamationTriangle}
        message={registerData.alertTop[isSubmitted ? 'success' : 'initial'].message}
        color={registerData.alertTop[isSubmitted ? 'success' : 'initial'].color}
        className="mb-4"
      />

      <Alert
        icon={FaUserTie}
        message={registerData.alertTeacher.message}
        color={registerData.alertTeacher.color}
        className="mb-4"
      />

      <Grid>
        <div>
          <Input
            label="Nome"
            {...register('name')}
            error={errors.name?.message}
            disabled={isSubmitted}
          />
          <Input
            label="Matéria que leciona"
            {...register('course')}
            error={errors.course?.message}
            disabled={isSubmitted}
          />
          <Input
            label="Série escolar que leciona"
            {...register('schoolGrade')}
            error={errors.schoolGrade?.message}
            disabled={isSubmitted}
          />
          <Controller
            name="birthdate"
            control={control}
            // @ts-ignore
            render={({ field }) => (
              <InputMask
                mask="99/99/9999"
                value={field.value}
                onChange={field.onChange}
                disabled={isSubmitted}
              >
                {(inputProps: any) => (
                  <Input
                    label="Data de nascimento"
                    error={errors.birthdate?.message}
                    {...inputProps}
                  />
                )}
              </InputMask>
            )}
          />
          <Input
            label="R.G."
            {...register('rg')}
            error={errors.rg?.message}
            disabled={isSubmitted}
          />
          <Controller
            name="cpf"
            control={control}
            // @ts-ignore
            render={({ field }) => (
              <InputMask
                mask="999.999.999-99"
                value={field.value}
                onChange={field.onChange}
                disabled={isSubmitted}
              >
                {(inputProps: any) => (
                  <Input label="CPF" error={errors.cpf?.message} {...inputProps} {...inputProps} />
                )}
              </InputMask>
            )}
          />
          <Input
            label="Nome da escola"
            {...register('schoolName')}
            error={errors.schoolName?.message}
          />
        </div>

        <div>
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            disabled={isSubmitted}
          />
          <Controller
            name="phone"
            control={control}
            // @ts-ignore
            render={({ field }) => (
              <InputMask mask="(99) 99999-9999" value={field.value} onChange={field.onChange}>
                {(inputProps: any) => (
                  <Input label="Telefone" error={errors.phone?.message} {...inputProps} />
                )}
              </InputMask>
            )}
          />
          <Input
            label="Endereço"
            {...register('address')}
            error={errors.address?.message}
            disabled={isSubmitted}
          />
          <Input
            label="Bairro"
            {...register('neighborhood')}
            error={errors.neighborhood?.message}
            disabled={isSubmitted}
          />
          <Input
            label="Cidade"
            {...register('city')}
            error={errors.city?.message}
            disabled={isSubmitted}
          />
          <Input
            label="Estado"
            {...register('state')}
            error={errors.state?.message}
            disabled={isSubmitted}
          />
        </div>
      </Grid>

      {Array.from(Array(studentsCount))?.map((_, index) => (
        <Fragment key={index}>
          <Alert
            icon={FaBookReader}
            message={registerData.alertStudent.message}
            color={registerData.alertStudent.color}
            className="mt-8 mb-4"
          />

          <Grid>
            <div>
              <Input
                label="Nome"
                {...register(`students.${index}.name`)}
                error={errors.students?.[index]?.name?.message}
                disabled={isSubmitted}
              />
              <Controller
                name={`students.${index}.birthdate`}
                control={control}
                // @ts-ignore
                render={({ field }) => (
                  <InputMask
                    mask="99/99/9999"
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSubmitted}
                  >
                    {(inputProps: any) => (
                      <Input
                        label="Data de nascimento"
                        error={errors.students?.[index]?.birthdate?.message}
                        {...inputProps}
                      />
                    )}
                  </InputMask>
                )}
              />
              <Input
                label="Nome da escola"
                {...register(`students.${index}.schoolName`)}
                error={errors.students?.[index]?.schoolName?.message}
                disabled={isSubmitted}
              />
              <Input
                label="Série escolar"
                {...register(`students.${index}.schoolGrade`)}
                error={errors.students?.[index]?.schoolGrade?.message}
                disabled={isSubmitted}
              />
            </div>

            <div>
              <Input
                label="Endereço"
                {...register(`students.${index}.address`)}
                error={errors.students?.[index]?.address?.message}
                disabled={isSubmitted}
              />
              <Input
                label="Bairro"
                {...register(`students.${index}.neighborhood`)}
                error={errors.students?.[index]?.neighborhood?.message}
                disabled={isSubmitted}
              />
              <Input
                label="Cidade"
                {...register(`students.${index}.city`)}
                error={errors.students?.[index]?.city?.message}
                disabled={isSubmitted}
              />
              <Input
                label="Estado"
                {...register(`students.${index}.state`)}
                error={errors.students?.[index]?.state?.message}
                disabled={isSubmitted}
              />
            </div>
          </Grid>
        </Fragment>
      ))}

      {studentsCount < 5 && (
        <Button
          onClick={() => setStudentsCount(studentsCount + 1)}
          color={registerData.alertStudent.color}
          icon={HiOutlinePlusCircle}
          type="button"
        >
          {registerData.alertStudent.addMore}
        </Button>
      )}

      <Grid className="mt-12">
        <div>
          <Alert
            icon={CgSoftwareDownload}
            color={registerData.files.firstBlock.message.color}
            message={registerData.files.firstBlock.message.label}
          />
          <div className="grid gap-2 grid-cols-3 my-8">
            <DownloadButton
              onClick={() =>
                saveAs(
                  registerData.files.firstBlock.subButtons.first.file,
                  `${registerData.files.firstBlock.subButtons.first.label}.pdf`
                )
              }
            >
              {registerData.files.firstBlock.subButtons.first.label}
            </DownloadButton>
            <DownloadButton
              onClick={() =>
                saveAs(
                  registerData.files.firstBlock.subButtons.second.file,
                  `${registerData.files.firstBlock.subButtons.second.label}.pdf`
                )
              }
            >
              {registerData.files.firstBlock.subButtons.second.label}
            </DownloadButton>
            <DownloadButton
              onClick={() =>
                saveAs(
                  registerData.files.firstBlock.subButtons.third.file,
                  `${registerData.files.firstBlock.subButtons.third.label}.pdf`
                )
              }
            >
              {registerData.files.firstBlock.subButtons.third.label}
            </DownloadButton>
          </div>
        </div>

        <div>
          <Alert
            icon={CgSoftwareUpload}
            color={registerData.files.secondBlock.message.color}
            message={registerData.files.secondBlock.message.label}
          />

          <div className="grid gap-2 grid-cols-3 my-8">
            <FileInput
              label={registerData.files.secondBlock.subButtons.first.label}
              name="authorization"
              onChange={handleFileChange}
            />

            <FileInput
              label={registerData.files.secondBlock.subButtons.second.label}
              name="rg"
              onChange={handleFileChange}
            />

            <FileInput
              label={registerData.files.secondBlock.subButtons.third.label}
              name="cpf"
              onChange={handleFileChange}
            />

            <span
              className={cn('text-center text-xs mt-1 block', {
                'text-red-500': errors.files?.authorization?.message
              })}
            >
              {files?.authorization ? <strong>Arquivo carregado</strong> : 'Nenhum arquivo'}
            </span>

            <span
              className={cn('text-center text-xs mt-1 block', {
                'text-red-500': errors.files?.rg?.message
              })}
            >
              {files?.rg ? <strong>Arquivo carregado</strong> : 'Nenhum arquivo'}
            </span>

            <span
              className={cn('text-center text-xs mt-1 block', {
                'text-red-500': errors.files?.cpf?.message
              })}
            >
              {files?.cpf ? <strong>Arquivo carregado</strong> : 'Nenhum arquivo'}
            </span>
          </div>
        </div>
      </Grid>

      <Button type="submit" disabled={isSubmitted} color={registerData.alertTop.initial.color}>
        Finalizar formulário e enviar
      </Button>
    </form>
  )
}

export default Inscricoes
