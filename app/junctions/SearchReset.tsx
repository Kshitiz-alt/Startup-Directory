"use client"

export default function SearchReset() {
    const reset = () => {
        const form = document.querySelector("#search-form") as HTMLFormElement
        if(form) form.reset()
    }
    return (
        <button type='reset' onClick={reset}>
            X
        </button>
    )
}
