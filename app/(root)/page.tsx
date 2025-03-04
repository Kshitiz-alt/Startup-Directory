import Image from "next/image";
import Searchbar from "../junctions/Searchbar";



export default async function Home({searchParams} : {searchParams: Promise<{query?:string}>}) {
  const query = (await searchParams).query
  return (
    <>
      <section className="h-[200vh] flex bg-white bg-fixed relative z-[1]">
        <div className="w-1/2 p-20 relative top-[-3em]">
          <Image className="rounded-full" src="/Logo2.jpg" width={600} height={600} alt=""/>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center relative top-[-22em] text-black">
          <h1 className="text-[2em] relative top-[-2em] font-bold">CONNECT WITH VISIONARY ENTREPRENEURS</h1>
          <h2 className="text-[1.2em] relative top-[-3em] font-semibold">Vote start-Ups and Pitch your point of views!</h2>
          <Searchbar query={query}/>
        </div>
      </section>
    </>
  );
}
