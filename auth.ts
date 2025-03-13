import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { author_database } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/writeClient"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
        async signIn({user : {name, email, image}, profile : {id, login, bio}}){
          const existingUser = await client.fetch(author_database,{id} : {
            id: profile?.id
            })
        if(!existingUser) {
          await writeClient.create({
            _type:"author",
            id: id,
            name: name,
            username: login,
            email: email,
            image: image,
            bio: bio || ""
          })
        }
  }
})