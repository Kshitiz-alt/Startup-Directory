"use client"

import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utilsAndValidations";
import { useRef } from "react";
import { motion,  useInView } from "framer-motion";
import { EyeIcon } from "lucide-react";
import { Author, Startup } from "@/sanity/types";

export type StartupCardType = Omit<Startup , "author"> & {author?:Author}

const Gridcards = ({ post } : {post:StartupCardType}) => {
  const { _createdAt, views, title, category, _id, image, description, author } = post;
const authorId = author?.id;
const authorImage = author?.image;
const authorName = author?.name;

  const ref = useRef(null)
  const animation = useInView(ref)
  return (
    <div ref={ref}>

      <motion.div className="bg-white w-full h-[33em] max-sm:h-[30em] rounded-2xl drop-shadow-sm"
        animate={animation ? { x: 0, opacity: 1 } : { x: -1000, opacity: 0 }}
        transition={{ duration: .5 }}
      >
        <div className="flex justify-between p-4 mb-[-10px]">
          <p className="flex justify-center bg-gray-300 p-1 rounded-[5px]">
            {formatDate(_createdAt)}
          </p>
          <div className="flex gap-[.3em]">
            <EyeIcon />
            <span>{views}</span>
          </div>
        </div>
        <div className="flex justify-between p-4">
          <Link href={`/user/${authorId}`}>
            <p>{authorName}</p>
          </Link>
          <Link href={`/user/${authorId}`}>
            <Image className="rounded-full w-auto h-auto" width={60} height={60} src={authorImage ?? "https://placehold.co/48x48"} alt="placeholder" />
          </Link>
        </div>
        <Link href={`/startup/${post._id}`}>
          <h3 className="pb-3 pl-3 font-bold relative top-[-2em] text-[1.2em]">{title}</h3>
        </Link>
        <p className="p-3 relative top-[-3.3em]">{description}</p>
        <Image className="justify-self-center rounded-3xl p-4 relative top-[-4.2em]" width={310} height={310} src={image ?? "https://placehold.co/600x400"} alt="" />
        <div className="relative top-[-4em] max-sm:top-[-4.9em] p-4 flex justify-between">
          <Link className="font-semibold" href={`/?query=${category?.toLowerCase()}`}> 
            {post.category}
          </Link>
          <button className="rounded-2xl text-blue-500">
            <Link href={`/startup/${_id}`}>
            Details
            </Link>
          </button>
        </div>
      </motion.div>
    </div>

  )
}

export default Gridcards