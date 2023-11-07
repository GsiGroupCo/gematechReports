import IdentyForm from '@/Components/forms/Auth/IdentyForm/IdentyForm'
import React, { useEffect } from 'react'

import bg_login from '../../../../public/img/DSC_1498.jpg'
import LoginForm from '@/Components/forms/Auth/LoginForm/LoginForm'
import { Toaster, toast } from 'sonner'

export default function Login({ error }) {
  
  useEffect(() => {
    if(error){
      toast.error(error)
    }
  }, [error])

  return (
    <main className='w-full h-screen flex '>
        <Toaster richColors position='top-center'/>
        <div className='w-full sd:w-[15%] sm:w-[500px] h-auto md:h-full flex flex-col  justify-center'>
            <LoginForm/>
        </div>
        <div className=" hidden  sd:flex w-full h-full md:flex flex-col justify-center items-center justify-items-center">
            <img src={bg_login} alt="bg_login" className = "w-full h-full object-cover"/>
        </div>
    </main>
  )
}
