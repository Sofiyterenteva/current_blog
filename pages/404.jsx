import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Error = () => {
const router = useRouter();

  useEffect(() => {
      setTimeout(() => {
          router.push('/');
      }, 3000);
  }, [router]);
  return (
    <div>Ooops, 404</div>
  )
  }
  export default Error;
