import StartupForm from '@/app/junctions/StartupForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
    const session = await auth()

    if(!session) redirect('/')
  return (
    <>
    <section className='min-h-[50vh] w-full bg-gradient-to-t from-white to-[rgba(255,116,116,0.9)] '>
        <h1 className='text-5xl font-extrabold text-white justify-self-center relative top-[2em] bg-black p-6'>Submit Your Start-up pitch</h1>
    </section>
    <StartupForm/>
    </>
  )
}

export default page