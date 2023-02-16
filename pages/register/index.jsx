import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout/Layout';
import css from '../sing-in/sign-in.module.css'
import { Input } from '../../components/Header/UI/Input/Input';
import Link from 'next/link';
import { Button } from '../../components/Header/UI/Button/Button';
import { useEffect } from 'react';
import { postFetch } from '../../utils/Fetch';
import { setCookie } from '../../utils/setCokies';


  const index = () => {
  const [name, setName] = useState('');
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
      postFetch('https://norma.nomoreparties.space/api/auth/register', {
      email, 
      password,
      name,
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
      <legend>Зарегистрируйтесь</legend>       
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
          onChange={e => setName(e.target.value)} 
          type='text' 
          placeholder='Имя' 
          required 
          value={name}
        >
          Имя
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
      <Link href='/sing-in'>Войти</Link>
      <Button type='submit' disabled={isLoading}>
        {isLoading ? '...' : 'Зарегистрироваться'}</Button>
    </fieldset>
    </form>
    </Layout>
  )
}
export default index;