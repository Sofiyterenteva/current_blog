import { useRouter } from 'next/router'
import React from 'react'
import css from './blog.module.css'
import Head from 'next/head'

const BlogPage = props => {
  return (
<>
    <Head>
        <title>{props.title}</title>
    </Head>
    <div className={css.wrapper}>
    <h1>{props.title}</h1>
    <div className={css.tags}>
        {props.tags.map(tag => (
        <span>{tag}</span>
        ))}
    </div>
    <article className={css.article} dangerouslySetInnerHTML={{__html: props.data}}></article>;
  </div>
</>
)};

export default BlogPage; 

export async function getStaticProps(context){
    const pageId = context.params.id;
    const page = await fetch(`http://localhost:3000/api/blog/${pageId}`).then(res => res.json());
   
    return{
        props: page,
    };
}
export async function getStaticPaths(){
    const pageLength = await fetch('http://localhost:3000/api/blog/length').then(res => res.json());
    const res = Array.from(pageLength).map((el, i) => {
        return { params: { id: String(1) } };
    })
    return{
        paths: res,
        fallback: false,
    }
}