type GetProductsProps = {
  filters?: any
  isGetPhotos?: boolean
  isGetVariations?: boolean
}

const GetProducts = ({
  filters,
  isGetPhotos,
  isGetVariations,
}: GetProductsProps) => `query query($limit: Int) {
  products (
    pagination: { limit: $limit }
    sort: "name:ASC"
    filters: ${filters !== undefined ? filters : `{}`}
  ) {
    data {
      id
      attributes {
        name
        slug
        price
        sale_price
        on_sale
        excerpt
        description
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
        ${!isGetPhotos ? `` : `photos {
          data { 
            attributes {
              url
              alternativeText
              caption
              name
            }
          }
        }`}
        categories {
          data {
            id,
            attributes {
              name
              slug
              ${!isGetVariations ? `` : `variations {
                data {
                  id
                  attributes {
                    name
                    variation_details {
                      data {
                        id
                        attributes {
                          name
                          price
                          description
                          is_default
                        }
                      }
                    }
                  }
                }
              }`}
            }
          }
        }
      }
    }
  }
}`

const GetSlugs = () => `query {
  products {
    data {
      attributes {
        slug
      }
    }
  }
}`

export { GetProducts, GetSlugs }