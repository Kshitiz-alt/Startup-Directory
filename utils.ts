import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// To merge multiple TW classes which are passed as objs 
export function cn(...inputs:ClassValue[]){
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

//props identifiers when going through mapping
export interface StartupCardType {
    id: number;
    img: string;
    desc: string;
    name?: string;
    title?: string;
    createdAt?: Date;
    Views?: number;
    author?: { id: number , name: string };
    category?: string;
  }