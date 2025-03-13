import React from 'react'

const Ping = () => {
  return (
    <div className='relative'>
        <div className='absolute -left-6 -top-0'>
            <span className='flex size-[14px]'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-700 opacity-75'></span>
                <span className='relative inline-flex size-[14px] rounded-full bg-red-700/55'></span>
            </span>
        </div>
    </div>
  )
}

export default Ping