import React from 'react';
import { Layout } from '../components/Layout/Layout';
import {Nav} from '../components/Header/Nav/Nav'
import css from './index.module.css'
import {Button} from '../components/Header/UI/Button/Button'
import {Card} from '../components/Cards/Card'
import { getCookie } from '../utils/setCokies';
import { useEffect, useState } from 'react';
import { getFetch, postFetch } from '../utils/Fetch';
import { setCookie} from '../utils/setCokies';


// import {cardsMock} from '../constants/mock.js'

const IndexPage = ({ data }) => {
  const [userInfo, setUserInfo] = useState({email: '', name: ''});

  useEffect(() => {
    const sendUser = () => {
      getFetch('https://norma.nomoreparties.space/api/auth/user', getCookie('accessToken')).then(
        res => {
          setUserInfo({email: res.user.email, name: res.user.name});
      });
    };

    if(getCookie('refreshToken')){
      if(!getCookie('accessToken')){
        postFetch('https://norma.nomoreparties.space/api/auth/token', {
          token: getCookie('refreshToken'),
        }).then(res => {
          console.log('update res', res);
          setCookie('accessToken', res.accessToken, 1);
          setCookie('refreshToken', res.refreshToken); 
          sendUser();
      });
    } else{
        sendUser();
      }
    }
  }, []);

    return(
      <Layout title='Главная' onlyUnAuth>
        <header>
          <Nav />
        </header>
        <main className={css.main}>
          <div className={css.main__title}>
            <h1 className={css.main__logo}>My blog</h1>
            <Button>Let's read</Button>
            <div className={css.main__info}>
              <span className={css.main__logo}>{userInfo.email}</span>
              <span className={css.main__logo}>{userInfo.name}</span>
            </div>
          </div>
          <section className={css.cards}>
            {/* {cardsMock.map(card => ( */}
              {/* <Card key={card.id} {...card} /> */}
            {data.map((el,i)=>(
              <Card key={i} id={i} {...el} />
            ))}
          </section>
        </main>
      </Layout>
    )
};


// при первом запросе на наш сайт будет вызывать эту функцию и будет брать данные
export async function getStaticProps(coxtext){
  let result = await fetch('http://localhost:3000/api/socials')
  .then(res =>{
     if (res.ok) return res.json();
     else throw Error(res.statusText);
    })
    .catch(err => console.error(err));

    result = result.map(a => ({ ...a, data: ''})) //сокращаем данные, чтобы не грузить на клиент лишнее

if (!Array.isArray(result)) {
  return{
    props:{
      data: [],
    },
    revalidate: 100,
  };
}

  return{
    props:{
      data: [...result],
    },
    revalidate: 100,
  };
}


export default IndexPage;
  