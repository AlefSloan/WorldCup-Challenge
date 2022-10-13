import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { Icon, Input } from './../../components';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required!'),
  username: yup.string().required('Username is required!'),
  email: yup.string().email('Email is not valid').required('Email is required!'),
  password: yup.string().required('Password is required!')
})

export const SignUp = () => {
  const [auth, setAuth] = useLocalStorage('auth', {})
  
  const formik = useFormik({
    onSubmit: async (values) => {
      const res = await axios({
        method: 'post',
        baseURL: import.meta.env.VITE_API_URL,
        url: '/users',
        data: values
      })

      setAuth(res.data);
    },
    initialValues: {
      name: '',
      username: '',
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
          <h2 className='text-red-700 font-bold text-xl'>Crie sua conta</h2>
        </div>
        <form className='space-y-6 p-4'  onSubmit={ formik.handleSubmit }>
          <Input
            name='name'
            placeholder='Digite seu nome'
            label='Seu nome'
            type='text'
            error={ formik.touched.name && formik.errors.name }
            value={ formik.values.name }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
          />
          <Input 
            name='username'
            placeholder='Digite seu usuário'
            label='Seu nome de usuário'
            type='text'
            error={ formik.touched.username && formik.errors.username }
            value={ formik.values.username }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
          />
          <Input 
            name='email'
            placeholder='Digite seu e-mail'
            label='Seu e-mail'
            type='email'
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
          <button type='submit' disabled={!formik.isValid && formik.isSubmitting} className='w-full bg-red-300 font-bold text-center text-white border border-white px-6 py-4 rounded-xl disabled:opacity-50'>
          {formik.isSubmitting ? 'Criando a conta...' : 'Criar minha conta'}
          </button>
        </form>
      </main>
    </div>
  )
}