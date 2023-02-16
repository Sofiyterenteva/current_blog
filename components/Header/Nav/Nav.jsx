import React from 'react';
import css from './Nav.module.css'
import {ButtonLink} from '../UI/ButtonLink/ButtonLink'
import { eraseCookie, getCookie } from '../../../utils/setCokies';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { postFetch } from '../../../utils/Fetch';

export const Nav = () => {
    const [isLogin, setLogin] = useState(!!getCookie('refreshToken'));
    const router = useRouter();

   useEffect(() => {
    setLogin(!!getCookie('refreshToken'));
   }, [getCookie('refreshToken')]);

   function logout(e){
    e.preventDefault();
    postFetch('https://norma.nomoreparties.space/api/auth/logout', {
        token: getCookie('refreshToken'),
    }).then((res) => {
        eraseCookie('refreshToken');
        eraseCookie('accessToken');
        router.reload();
    });
   }

    return(
      <nav className={css.nav}>
        <h1 className={css.nav__logo}>Logo</h1>
        <ul className={css.nav__list}>
            <li>
                <ButtonLink href='/profile'>Профиль</ButtonLink>
            </li>
            {!isLogin && (
            <li>
                <ButtonLink href='/sing-in'>Вход</ButtonLink>
            </li>
            )}
            {isLogin && (
            <li>
                <ButtonLink href='' onClick={logout}>Выход</ButtonLink>
            </li>
            )}
            <li>
                <ButtonLink href='/contacts'>Контакты</ButtonLink>
            </li>
            <li>
                <ButtonLink href='/about'>О нас</ButtonLink>
            </li>
        </ul>
      </nav>
    )
};