import { groq } from "next-sanity"


export const startup_queries = groq`
  *[_type == "startup" && defined(slug.current)] | order(_createdAt desc) {
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

  