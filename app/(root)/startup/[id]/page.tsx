import { client } from '@/sanity/lib/client'
import { startup_Details } from '@/sanity/lib/queries'
import { formatDate } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import MarkdownIt from 'markdown-it'
import Views from '@/app/junctions/Views'

export const experimental_ppr = true
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id
    const post = await client.fetch(startup_Details, { id })
    if (!post)
        return (
            notFound()
        )
        const md = MarkdownIt()
        const parsedContent = md.render(post?.pitch || "")
    return (
        <>
            <section className='min-h-[40vh] p-[10px] bg-white'>
                <p className='w-[9%] h-[50px] justify-self-center text-black text-[17px] Date font-bold'>{formatDate(post?._createdAt)}</p>
                <div className='p-4'>
                    <p className='w-full text-center text-white bg-black shadow-[10px_5px_20px_rgba(0,0,0,0.5),-8px_5px_10px_rgba(0,0,0,0.5)] justify-self-center text-5xl font-semibold'>
                        {post.title} 
                    </p>
                    <p className='p-[10px] justify-self-center text-gray-500/70'>{post.description}</p>
                </div>
            </section>
            <hr className='text-black' />
            <section className='min-w-[40vh] p-[5em] bg-gradient-to-b from-[rgba(255,116,116,0.9)] to-white'>
                <Image className='justify-self-center rounded-[40px]' width={600} height={600} src={post.image} alt="" />
                <div className='space-y-6 gap-[1em] max-w-4xl flex items-center mx-auto'>
                    <Image className='rounded-full' width={100} height={100} src={post.author.image} alt="" />
                    <div className='flex-col'>
                        <Link href={`/user/${post.author._id}`}>
                            <p className='text-[2em] text-black hover:underline'>{post.author.name}</p>
                            <p className='text-[1.1em] text-black/45 hover:underline'>@{post.author.username}</p>
                        </Link>
                    </div>
                    <p className='text-black ml-[30em] Category font-semibold'>{post.category}</p>
                </div>
                <div>
                    <h1 className='text-black font-extrabold p-[30px] text-3xl ml-[7em]'>Pitch Details</h1>
                    {
                        parsedContent ? (
                            <article className='text-black justify-self-center min-h-0 max-w-prose p-10 '
                            dangerouslySetInnerHTML={{__html: parsedContent}}
                            />
                                
                        ) : (
                            <p className='text-black justify-self-center'>No Details</p>
                        )
                    }
                </div>
                <hr className='w-[85%] text-gray-700/70 justify-self-center' />
                <Suspense fallback="loading....">
                    <Views id={id}/>
                </Suspense>

            </section>



        </>
    )
}

export default page