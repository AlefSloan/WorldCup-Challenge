import { Icon, Card, DateSelect } from '~/components'

export const Dashboard = () => {
  return (
    <>
      <header className='bg-red-300 text-white p-4'>
        <div className='container max-w-3xl flex justify-between items-center p-4'>
          <img src='./images/logo-red.svg' className='w-32'/>
          <a href='/profile'>
            <Icon name='profile' className='w-10' />
          </a>
        </div>
      </header>
      <main>
        <section className='bg-red-300 text-white p-4'>
          <div className='container max-w-3xl space-y-6 p-4'>
            <span className='text-white'>Olá Alef!</span>
            <h2 className='text-white text-2xl font-bold'>Qual é o seu palpite?</h2>
          </div>
        </section>
        <div className='flex justify-center'>
          <DateSelect />
        </div>
        <section id='content' className='container max-w-3xl p-4 space-y-6'>
          <Card
            timeA={{ slug: 'sui'}}
            timeB={{ slug: 'cam'}}
            match={{ time: '7:00' }}
          />
          <Card
            timeA={{ slug: 'bra'}}
            timeB={{ slug: 'arg'}}
            match={{ time: '7:00' }}
          />
          <Card
            timeA={{ slug: 'equ'}}
            timeB={{ slug: 'cat'}}
            match={{ time: '7:00' }}
          />
        </section>
      </main>
    </>
  )
}