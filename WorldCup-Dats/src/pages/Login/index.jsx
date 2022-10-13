import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Icon, Input } from '~/components';
import { useLocalStorage } from 'react-use';
import { Navigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
  email: yup.string().email('Email is not valid').required('Email is required!'),
  password: yup.string().required('Password is required!')
})

export const Login = () => {
  const [auth, setAuth] = useLocalStorage('auth', {})
  
  const formik = useFormik({
    onSubmit: async (values) => {
      const res = await axios({
        method: 'get',
        baseURL: import.meta.env.VITE_API_URL,
        url: '/login',
        auth: {
          username: values.email,
          password: values.password
        }
      });

      setAuth(res.data);
    },
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema
  });
  
  if (auth?.user?.id) {
    return <Navigate to='/dashboard' replace={ true } />
  }

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
        <form className='space-y-6 p-4' onSubmit={ formik.handleSubmit }>
          <Input
            name='email'
            placeholder='Digite seu e-mail'
            label='Seu email'
            type='text'
            error={ formik.touched.email && formik.errors.email }
            value={ formik.values.email }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
          />
          <Input 
            name='password'
            placeholder='Digite sua senha'
            label='Sua senha'
            type='password'
            error={ formik.touched.password && formik.errors.password }
            value={ formik.values.password }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
          />
          <button type='submit' disabled={!formik.isValid || formik.isSubmitting} className='w-full bg-red-300 font-bold text-center text-white border border-white px-6 py-4 rounded-xl disabled:opacity-50'>
            {formik.isSubmitting ? 'Logando...' : 'Entrar'}
          </button>
        </form>
      </main>
    </div>
  )
}