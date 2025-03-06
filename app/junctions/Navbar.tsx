import { auth, signOut, signIn } from "@/auth"
import Link from "next/link"


const Navbar = async() => {
    const session = await auth()
    console.log(session);
  return (
    <header className= "w-full bg-white/70 px-5 py-5 p-12 shadow-sm fixed z-[10] ">
        <nav className=" flex justify-between items-center h-[15px]  text-black">
            <Link href="/">
            {/* <Image className="rounded-full" src="/Logo.png" width={50} height={50} alt=""/> */}
              Home
            </Link>
            <div className="flex gap-[5em] justify-center items-center min-md:gap-[1em] max-sm:gap-[10px]">
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
                      <Link href={`/user/${session?.user?.id}`}>
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