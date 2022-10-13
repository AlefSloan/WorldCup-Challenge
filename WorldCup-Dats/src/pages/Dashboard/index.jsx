import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { format, formatISO } from 'date-fns';
import { useLocalStorage, useAsyncFn, useAsync } from 'react-use';

import { Icon, Card, DateSelect } from '~/components'

export const Dashboard = () => {
  const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)));
  const [auth] = useLocalStorage('auth', {});
  
  const hunches = useAsync(async () => {
    const res = await axios({
      method: 'get',
      baseURL: import.meta.env.VITE_API_URL,
      url: `/${auth.user.username}`,
    })

    const hunches = res.data.hunches.reduce((acc, hunch) => {
      acc[hunch.gameId] = hunch;
      return acc;
    }, {})

    return {
      ...res.data,
      hunches
    };
  })

  const [games, doFetch] = useAsyncFn(async (params) => { 
    const res = await axios({
      method: 'get',
      baseURL: import.meta.env.VITE_API_URL,
      url: '/games',
      params
    })
    return res.data;
  })
  
  useEffect(() => {
    doFetch({ gameTime: currentDate })
  }, [currentDate])

  if (!auth?.user?.id) {
    return <Navigate to='/' replace={ true } />
  }

  const isLoading = !(!games.loading && !games.error && !hunches.loading && !hunches.error)

  return (
    <>
      <header className='bg-red-300 text-white p-4'>
        <div className='container max-w-3xl flex justify-between items-center p-4'>
          <img src='./images/logo-red.svg' className='w-32'/>
          <a href={`/${auth.user.username}`}>
            <Icon name='profile' className='w-10' />
          </a>
        </div>
      </header>
      <main>
        <section className='bg-red-300 text-white p-4'>
          <div className='container max-w-3xl space-y-6 p-4'>
            <span className='text-white'>{`Olá ${auth.user.name}`}</span>
            <h2 className='text-white text-2xl font-bold'>Qual é o seu palpite?</h2>
          </div>
        </section>
        <div className='flex justify-center'>
          <DateSelect currentDate={ currentDate } onChange={ setDate } />
        </div>
        <section id='content' className='container max-w-3xl p-4 space-y-6'>
            {isLoading && 'Carregando jogos...'} 
            {games.error && 'Ops! Algo deu errado.'}
            
            {!isLoading && games.value?.map(game => (
              <Card
                gameId={ game.id }
                homeTeam={ game.homeTeam }
                awayTeam={ game.awayTeam }
                gameTime={ format(new Date(game.gameTime), 'H:mm') }
                key={ game.id }
                homeTeamScore={hunches?.value?.hunches?.[game.id]?.homeTeamScore || ''}
                awayTeamScore={hunches?.value?.hunches?.[game.id]?.awayTeamScore || ''}
                disabled={false}
              />
            ))}
        </section>
      </main>
    </>
  )
}