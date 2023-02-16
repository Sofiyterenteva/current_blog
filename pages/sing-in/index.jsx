import Link from 'next/link'
import React from 'react'
import { Button } from '../../components/Header/UI/Button/Button'
import {Input} from '../../components/Header/UI/Input/Input'
import css from './sign-in.module.css'
import { useState } from 'react'
import { postFetch } from '../../utils/Fetch'
import { setCookie } from '../../utils/setCokies'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Layout } from '../../components/Layout/Layout'

const SingIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
  }, []);

  function FormHandler(e){
    e.preventDefault(); //чтобы не перезагружалась страница
    setLoading(true);
      postFetch('https://norma.nomoreparties.space/api/auth/login', {
      email, 
      password,
    }).then((res) => {
      console.log(postFetch);
      setCookie('accessToken', res.accessToken, 2);
      setCookie('refreshToken', res.refreshToken); 
      setLoading(false);
      router.push('/');
    });
  }


  return (
    <Layout title='Sing in'>
    <form className={css.form} onSubmit={FormHandler}>
    <fieldset className={css.form__inputs}>
      <legend>Войдите в аккаунт</legend>
        <Input 
          onChange={e => setEmail(e.target.value)} 
          type='email' 
          placeholder='Почта' 
          required 
          value={email}
        >
          Почта
        </Input>
        <Input 
          onChange={e => setPassword(e.target.value)} 
          type='password' 
          placeholder='Пароль' 
          required 
          value={password}
        >
          Пароль
        </Input>
      <Link href='/register'>Зарегистрироваться</Link>
      <Button type='submit' disabled={isLoading}>{isLoading ? '...' : 'Войти'}Войти</Button>
    </fieldset>
    </form>
    </Layout>
  )
}

export default SingIn