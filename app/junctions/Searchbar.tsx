import Form from 'next/form'
import SearchReset from './SearchReset'
import { Search } from 'lucide-react'

export default function Searchbar({query} : {query?: string}) {
  return (
    <div className='text-black relative '>
        <Form className='flex ' action="/" scroll={false}>
           <input className='border rounded-[5px] w-[20em] p-1 search-form' name='query' defaultValue="" placeholder='Search' />
           <div className='relative flex left-[-2em] gap-[5px]'>
            {query && <SearchReset/>}
            <button type="submit">
              <Search className='size-5 relative left-[-1em]'/>
            </button>
           </div>
        </Form>
    </div>
  )
}
