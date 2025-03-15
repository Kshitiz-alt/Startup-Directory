
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import Gridcards, { StartupCardType } from '../junctions/Gridcards'
import Searchbar from "../junctions/Searchbar";
// import { Grids } from "./props";
// import { client } from '@/sanity/lib/client';
import { startup_Queries } from '@/sanity/lib/queries';
import { Bird } from 'lucide-react';
import { auth } from '@/auth';




export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query
  const params = { search: query || null }
  const session = await auth()
  console.log(session?.id)

  // const Grids = await client.fetch(startup_queries)
  const { data: Grids } = await sanityFetch({ query: startup_Queries, params })

  return (
    <>
      <section className="h-[80vh] flex bg-gradient-to-t from-[rgba(255,116,116,0.9)] to-white  bg-fixed relative z-[1] max-sm:h-[80vh]">

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
            Grids.map((post: StartupCardType) => (
              <Gridcards key={post._id} post={post} />
            ))
          ) : (
            <p className='text-white flex flex-row text-[2em]'>
              Is this a bird you searching?
              <Bird className='relative size-[3em]'/>...?
            </p>
          )}
          </div>


      </section>
      <SanityLive />
    </>
  );
}
