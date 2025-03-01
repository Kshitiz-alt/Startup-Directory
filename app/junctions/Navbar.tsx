import { auth, signOut, signIn } from "@/auth"

import Link from "next/link"


const Navbar = async() => {
    const session = await auth()
  return (
    <header className="bg-white px-5 py-5 p-12 shadow-sm ">
        <nav className=" flex justify-between items-center h-[50px] text-black">
            <Link href="/">Home</Link>
            <div className="flex gap-[5em] justify-center items-center">
                {session && session?.user ? (
                    <>
                      <Link href="/startup/create">
                        <span>Create</span>
                      </Link>
                      <form action={async() => {
                        "use server"
                      await signOut({ redirectTo: "/" })
                      
                      }}>
                        <button type="submit">LogOut</button>
                      </form>
                      <Link href={`/user/${session?.id}`}>
                       <span>{session?.user?.name}</span>
                      </Link>
                    </>
                ) : (
                    <form action={async() => {
                        "use server"
                        await signIn( "github")}
                        }>
                        <button type="submit">Login</button>
                    </form>
                )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar