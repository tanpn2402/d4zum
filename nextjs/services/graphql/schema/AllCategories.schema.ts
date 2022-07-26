const AllPosts = `query query($limit: Int) {
  categories (
    pagination: { limit: $limit }
    sort: "name:ASC"
  ) {
    data {
      id,
      attributes {
        name
        slug
        content
        parent_category
        createdAt
        publishedAt
        cover {
          data { 
            attributes {
              url
              alternativeText
              caption
              name
            }
          }
        }
      }
    }
  }
}`
export default AllPosts