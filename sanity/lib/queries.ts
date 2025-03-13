import { groq } from "next-sanity"


export const startup_Queries = groq`
  *[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author -> name match $search ] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id, name, image, bio
    },
    views,
    description,
    category,
    image
  }
`;
export const startup_Details = groq`
  *[_type=="startup" && _id == $id][0]{
  _id,
  title,
  slug,
  _createdAt,
  author -> {
      _id, name, image, bio,username
    },
  views,
  description,
  category,
  image,
    pitch
}
`;
export const startup_Views = groq`
*[_type=="startup" && _id == $id][0]{
 _id,
 views
}
`;

export const author_database = groq`
*[_type=="startup" && _id == $id][0]{
 _id,
 id,
 name,
 username,
 email,
 image,
 bio
}
`;