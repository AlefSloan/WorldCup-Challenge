import { Icon, Input } from '~/components';

export const Login = () => {
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
          <h2 className='text-red-700 font-bold text-xl'>Entre na sua conta</h2>
        </div>
        <form className='space-y-6 p-4'>
          <Input
            name='email'
            placeholder='Digite seu e-mail'
            label='Seu email'
            type='text'
          />
          <Input 
            name='password'
            placeholder='Digite sua senha'
            label='Sua senha'
            type='password'
          />
          <a href='/dashboard' className='block w-full bg-red-300 font-bold text-center text-white border border-white px-6 py-4 rounded-xl'>
            Entrar na conta
          </a>
        </form>
      </main>
    </div>
  )
}