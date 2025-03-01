import React from 'react'
import Navbar from '../junctions/Navbar'

export default function layout({children} : {children : React.ReactNode}) {
  return (
    <main>
        <Navbar/>
        {children}
    </main>
  )
}
