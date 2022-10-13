import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocalStorage } from 'react-use'

const validationSchema = yup.object().shape({
  homeTeamScore: yup.number().required().test((value) => value >= 0),
  awayTeamScore: yup.number().required().test((value) => value >= 0),
})

export const Card = ({ gameId, homeTeam, awayTeam, gameTime, homeTeamScore, awayTeamScore, disabled }) => {
  const [auth] = useLocalStorage('auth');
  const formik = useFormik({
    onSubmit: (values) => {
      axios({
        method: 'post',
        baseURL: import.meta.env.VITE_API_URL,
        url: '/hunches',
        headers: {
          authorization: `Bearer ${ auth.accessToken }`
        }, 
        data: {
          ...values,
          gameId
        }
      })
    },
    initialValues: {
      homeTeamScore,
      awayTeamScore,
    },
    validationSchema
  })

  return (
    <div className='border border-gray-300 rounded-xl p-4 text-center space-y-4'>
      <span className='text-gray-700 font-bold text-sm md:text-base'>{gameTime}</span>
      
      <form className='flex justify-center space-x-6 items-center'>
        <span className='uppercase'>{homeTeam}</span>
        <img src={`./flags/${homeTeam}.png`}/>
        
        <input
          className='bg-red-300/[0.2] text-red-700 font-bold text-xl w-14 h-14 text-center'
          type='number'
          name='homeTeamScore'
          value={ formik.values.homeTeamScore }
          onChange={formik.handleChange}
          onBlur={formik.handleSubmit}
          disabled={disabled}
        />
        <span className='text-red-500 font-bold'>X</span>
        <input
          className='bg-red-300/[0.2] text-red-700 font-bold text-xl w-14 h-14 text-center'
          type='number'
          name='awayTeamScore'
          value={ formik.values.awayTeamScore }
          onChange={formik.handleChange}
          onBlur={formik.handleSubmit}
          disabled={disabled}
        />

        <img src={`./flags/${awayTeam}.png`} />
        <span className='uppercase'>{awayTeam}</span>
      </form>
    </div>
  )
}