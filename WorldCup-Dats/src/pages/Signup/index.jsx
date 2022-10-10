import { Icon } from './../../components';

export const SignUp = () => {
  const Input = ({ name, label, ...props }) => (
    <div className='flex flex-col'>
      <label htmlFor={ name } className='text-sm font-bold text-gray-500 mb-2'>{label}</label>
        <input {...props} name={ name } id={ name } className='p-3 border border-gray-700 rounded-xl focus:outline focus:outline-2 focus:outline-gray-500'/>
    </div>
  )

  return (
    <div className='flex flex-col'>
      <header className='border border-b-red-300 p-4 flex justify-center'>
        <img src='/images/logo-blue.svg'/>
      </header>
      <main className='p-4 container max-w-2xl'>
        <div className='flex p-4 space-x-4 items-center'>
          <a href='/'>
            <Icon name='leftArrow' className='h-8' />
          </a>
          <h2 className='text-red-700 font-bold text-xl'>Crie sua conta</h2>
        </div>
        <form className='space-y-6 p-4'>
          <Input
            name='nome'
            placeholder='Digite seu nome'
            label='Seu nome'
            type='text'
          />
          <Input 
            name='usuario'
            placeholder='Digite seu usuário'
            label='Seu nome de usuário'
            type='text'
          />
          <Input 
            name='email'
            placeholder='Digite seu e-mail'
            label='Seu e-mail'
            type='email'
          />
          <Input 
            name='password'
            placeholder='Digite sua senha'
            label='Sua senha'
            type='password'
          />
          <button href='/login' className='w-full bg-red-300 font-bold text-center text-white border border-white px-6 py-4 rounded-xl'>
            Criar minha conta
          </button>
        </form>
      </main>
    </div>
  )
}