export function Home() {
  return (
    <div className='h-screen bg-red-700 p-4 text-white flex flex-col items-center space-y-6'>
      <header className='container max-w-5xl p-4 flex justify-center'>
        <img className='w-40' src='/images/logo-wine.svg' />
      </header>
      <main className="container max-w-5xl p-6 flex-1 p-4 flex items-center flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className='md:flex-1 flex justify-center'>
          <img className='w-full' src='/images/login-img.png'/>
        </div>
        <div className='md:flex-1 flex flex-col space-y-6'>
          <h1 className='text-3xl text-center md:text-left font-bold'>
            Dê o seu palpite na Copa do Mundo do Catar 2022!
          </h1>
          <button className='bg-white text-red-700 text-xl px-8 py-5 rounded-xl'>
            Criar minha conta
          </button>
          <button className='text-white border border-white text-xl px-8 py-5 rounded-xl'>
            Login
          </button>
        </div>
      </main>
    </div>
  )
}