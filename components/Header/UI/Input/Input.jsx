import React from 'react'
import css from './Input.module.css'

export const Input = ({children, ...props}) => {
  return (
    <label className={css.input}>
        <span>{children}</span>
        <input {...props}/> 
    </label>
    
  )
}
