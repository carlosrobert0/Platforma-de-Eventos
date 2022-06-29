import { Logo } from "../components/Logo";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCreateSubscriberMutation } from "../generated";

interface FormData {
  name: string;
  email: string;
}

const schema = yup.object({
  name: yup
    .string()
    .required('Seu nome é obrigatório'),
  email: yup
    .string()
    .email('Insira um email válido')
    .required('Seu email é obrigatório')
}).required();

export function Subscribe() {
  const [createSubscriber, { loading, error, reset }] = useCreateSubscriberMutation()

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  async function handleSubscribe({ name, email }: FormData) {
    await createSubscriber({
      variables: {
        name,
        email
      }
    })

    navigate('/event')
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />

          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>

          <form onSubmit={handleSubmit(handleSubscribe)} className="flex flex-col gap-2 w-full">
            <input
              {...register("name")} 
              className="bg-gray-900 rounded px-5 h-14"
              type="text" 
              placeholder="Seu nome completo"
            />
            {errors.name && <p className="text-red-500 leading-relaxed">{errors.name?.message}</p>}
            <input 
              {...register("email")} 
              className="bg-gray-900 rounded px-5 h-14"
              type="email" 
              placeholder="Digite seu e-mail"
              onChange={reset}
            />
            {error && <p className="text-red-500 leading-relaxed">E-mail já cadastrado</p>}
            {errors.email && <p className="text-red-500 leading-relaxed">{errors.email?.message}</p>}

            <button 
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>

      <img src="/src/assets/code-mockup.png" className="mt-10" alt="" />
    </div>
  )
}