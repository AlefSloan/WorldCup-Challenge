import { Icon, Card, DateSelect } from '~/components'

export const Profile = () => {
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
            <a href='/dashboard' className='block'>
              <Icon name='leftArrow' className='w-8'/>
            </a>
            <h2 className='text-white text-2xl font-bold'>Alef Sloan Rosado</h2>
          </div>  
        </section>
        <div className='container max-w-3xl flex flex-col p-4 items-center'>
          <h2 className='self-start text-red-300 font-bold text-2xl'>Seus Palpites</h2>
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