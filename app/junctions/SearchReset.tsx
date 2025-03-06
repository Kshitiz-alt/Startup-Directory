"use client"

import { X } from "lucide-react"

export default function SearchReset() {
    const reset = () => {
        const form = document.querySelector("#search-form") as HTMLFormElement
        if(form) form.reset()
    }
    return (
        <button className="relative left-[-1em]" type='reset' onClick={reset}>
            <X className="size-5"/>
        </button>
    )
}
