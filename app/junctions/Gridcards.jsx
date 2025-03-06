"use client"

import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils";
import { useRef } from "react";
import { motion, stagger, useInView } from "framer-motion";
import { EyeIcon } from "lucide-react";
import { div } from "framer-motion/client";


const Gridcards = ({ post }) => {
  // const { createdAt, Views, author: {id, name} }

  const ref = useRef("")
  const animation = useInView(ref)
  return (
    <div ref={ref}>

      <motion.div className="bg-white w-full h-[33em] max-sm:h-[30em] rounded-2xl drop-shadow-sm"
        animate={animation ? { x: 0, opacity: 1 } : { x: -1000, opacity: 0 }}
        transition={{ duration: .5 }}
      >
        <div className="flex justify-between p-4 mb-[-10px]">
          <p className="flex justify-center bg-gray-300 p-1 rounded-[5px]">
            {formatDate(post.createdAt)}
          </p>
          <div className="flex gap-[.3em]">
            <EyeIcon />
            <span>{post?.Views}</span>
          </div>
        </div>
        <div className="flex justify-between p-4">
          <Link href={`/user/${post?.author?.id}`}>
            <p>{post.author?.name}</p>
          </Link>
          <Link href={`/user/${post?.author?.id}`}>
            <Image className="rounded-full" width={60} height={60} src="https://placehold.co/48x48" alt="placeholder" />
          </Link>
        </div>
        <Link href={`/startup/${post.id}`}>
          <h3 className="pb-3 pl-3 font-bold relative top-[-2em] text-[1.2em]">{post?.title}</h3>
        </Link>
        <p className="p-3 relative top-[-3.3em]">{post.desc}</p>
        <Image className="justify-self-center rounded-3xl p-4 relative top-[-4.2em]" width={450} height={400} src={post.img} alt="" />
        <div className="relative top-[-4em] p-4 flex justify-between">
          <Link href={`/?query=${post.category.toLowerCase()}`}> 
            {post.category}
          </Link>
          <button className="rounded-2xl text-blue-500">
            <Link href={`/startup/${post.id}`}>
            Details
            </Link>
          </button>
        </div>
      </motion.div>
    </div>

  )
}

export default Gridcards