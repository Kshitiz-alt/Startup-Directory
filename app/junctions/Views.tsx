import React from 'react'
import Ping from './Ping'
import { startup_Views } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { writeClient } from '@/sanity/lib/writeClient'
import { after} from 'next/server' 

const Views = async ({id} : {id:string}) => {
        const { views : totalViews }= await client
        .withConfig({useCdn: false})
        .fetch(startup_Views,{id}) 

        after(async() =>  await writeClient
        .patch(id)
        .set({views: totalViews + 1})
        .commit()
        )
    
  return (
    <div className='absolute right-6'>
    
    <div className='absolute -top-3 -right-2'>
        <Ping/>
    </div>
    <div>
        <p>
            <span className='font-black text-black p-[6px] Views'>Views:{totalViews}</span>
        </p>

    </div>
    </div>
  )
}

export default Views