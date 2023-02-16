import React from 'react'
import css from './Card.module.css'
import Link from 'next/link'

export const Card = ({title, img, id, url}) => {
  return (
    <div className={css.card}>
        {url && (
            <div className={css.card__image}>
            {'  '}
            <img src={url} />
        </div>
        )}
        <div className={css.card__content}>
            <div className={css.card__about}>
               <div>inf</div>
            </div>
            <Link href={`/blog/${id}`} className={css.card__description}>  
                <h2>{title}</h2>
            </Link> 
        </div>
    </div>
  )
}
