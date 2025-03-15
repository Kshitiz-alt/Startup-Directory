import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from 'zod'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Date function for when the card is created
export function formatDate(date: string){
  return new Date(date).toLocaleDateString('en-US',{
      month:"long",
      day:"numeric",
      year:"numeric"
  })
}

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}

export const formSchema = z.object({
  title: z.string().min(3).max(20),
  description: z.string().min(20).max(300),
  category: z.string().min(3).max(20),
  link: z
  .string()
  .url()
  .refine(async(url) => {
    try{
      const res = await fetch(url,{method:"HEAD"})
      const contentType = res.headers.get("content-Type")
      return contentType?.toLowerCase().startsWith('image/')
        
    }catch{
      return false

    }
  }),
  // pitch: z.string().min(10)

})