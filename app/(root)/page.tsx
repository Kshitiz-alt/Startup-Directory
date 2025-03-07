import { StartupCardType } from '@/utils';
import Gridcards from '../junctions/Gridcards'
import Searchbar from "../junctions/Searchbar";
// import { Grids } from "./props";
import { client } from '@/sanity/lib/client';
import { startup_queries } from '@/sanity/lib/queries';




export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query

  const Grids = await client.fetch(startup_queries)
  // console.log(JSON.stringify(Grids, null, 2))

  return (
    <>
      <section className="h-[100vh] flex bg-white bg-fixed relative z-[1] max-sm:h-[80vh]">
        {/* <div className="w-1/2 p-20 relative top-[-3em]">
          <Image className="rounded-full" src="/Logo2.jpg" width={600} height={600} alt="" />
        </div> */}
        <div className="w-full flex flex-col justify-center items-center relative top-[1em] text-black ">
          <h1 className="text-[2em] relative top-[-2em] font-bold md:text-[1.7em] max-sm:text-[1em] max-sm:top-[-4em]">CONNECT WITH VISIONARY ENTREPRENEURS</h1>
          <h2 className="text-[1.2em] relative top-[-3em] font-semibold md:text-[1.3em] max-sm:top-[-3em] max-sm:text-[1em]">Vote start-Ups and Pitch your point of views!</h2>
          <Searchbar query={query} />
        </div>
      </section>
      <section className="min-h-[80vh] md:min-h-screen bg-[rgba(255,116,116,0.9)] w-full md:h-[420vh]">
        <p className="text-center text-3xl p-7">
          {query ? `Results as follows ${query}` : "all startups"}
        </p>
        <div className='grid grid-cols-3 md:grid-cols-2 max-sm:grid-cols-1 w-[80%] justify-self-center gap-[1em] text-black'>
          {Grids?.length > 0 ? (
            Grids.map((post:StartupCardType) =>(
                <Gridcards key={post._id} post={post}/>
            ))
          ):(
            <p> No Startups are listed here</p>
          )}

        </div>
       
      </section>
    </>
  );
}
