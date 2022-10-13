import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { format, formatISO } from 'date-fns';
import { useLocalStorage, useAsyncFn, useAsync } from 'react-use';

import { Icon, Card, DateSelect } from '~/components'

export const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)));
  const [auth, setAuth] = useLocalStorage('auth', {})

  const hunches = useAsync(async () => {
    const res = await axios({
      method: 'get',
      baseURL: import.meta.env.VITE_API_URL,
      url: `/${params.username}`,
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
  
  const logout = () => {
    setAuth({});
    navigate('/');
  }

  const isLoading = !(!games.loading && !games.error && !hunches.loading && !hunches.error)
  return (
    <>
      <header className='bg-red-300 text-white p-4'>
        <div className='container max-w-3xl flex justify-between items-center p-4'>
          <img src='./images/logo-red.svg' className='w-32'/>
          {auth?.user?.id && (
            <div onClick={ logout } className='p-4 cursor-pointer'>
              SAIR
            </div> 
          )}
        </div>
      </header>
      <main>
        <section className='bg-red-300 text-white p-4'>
          <div className='container max-w-3xl space-y-6 p-4'>
            <a href='/dashboard' className='block'>
              <Icon name='leftArrow' className='w-8'/>
            </a>
            <h2 className='text-white text-2xl font-bold'>{!isLoading && hunches.value.name }</h2>
          </div>  
        </section>
        <div className='container max-w-3xl flex flex-col p-4 items-center'>
          <h2 className='self-start text-red-300 font-bold text-2xl'>Seus Palpites</h2>
          <DateSelect currentDate={ currentDate } onChange={ setDate } />
        </div>
        <section id='content' className='container max-w-3xl p-4 space-y-6'>
          {isLoading && 'Carregando jogos...'} 
          {games.error && 'Ops! Algo deu errado.'}

          {!isLoading && games.value?.map(game => (
            console.log(hunches),
            <Card
              gameId={ game.gameId }
              homeTeam={ game.homeTeam }
              awayTeam={ game.awayTeam }
              gameTime={ format(new Date(game.gameTime), 'H:mm') }
              homeTeamScore={hunches?.value?.hunches?.[game.id]?.homeTeamScore || ''}
              awayTeamScore={hunches?.value?.hunches?.[game.id]?.awayTeamScore || ''}
              key={ game.id }
              disabled={true}
            />
          ))}
        </section>
      </main>
    </>
  )
}