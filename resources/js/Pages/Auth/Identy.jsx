import IdentyForm from '@/Components/forms/Auth/IdentyForm/IdentyForm'
import React, { useEffect } from 'react'

import bg_login from '../../../../public/img/DSC_1498.jpg'
import { Toaster, toast } from 'sonner'

export default function Login({error}) {

  useEffect(() => {
    if(error){
      toast.error(error)
    }
  }, [error])

  return (
    <main className='w-full h-screen overflow-hidden bg-gray-800 flex flex-col justify-around items-center '>
      <div className='w-full h-full'>
        <img src={bg_login} alt="background_login" className='w-full h-full object-cover' />
      </div>
      <div className='absolute bg-white rounded-md w-[360px] md:w-[500px] h-[500px] flex justify-center items-center shadow shadow-black '>
        <IdentyForm/>
      </div>
    </main>
  )
}
