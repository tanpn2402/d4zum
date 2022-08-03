import graphQL from "./api";
import ICategory from "@interfaces/ICategory";
import CategoryEntity from "@services/entity/Category.entity";
import UtilParser from "./UtilParser";

export function parseCategory(category: CategoryEntity): ICategory {
  return UtilParser<ICategory, CategoryEntity>(category)
}

interface GetProps {
  slug?: string
}

export async function get({
  slug
}: GetProps): Promise<ICategory[] | null> {
  let resp = await graphQL<{
    categories: {
      data: CategoryEntity[]
    }
  }>(
    `query query($slug: String) {
      categories (
        filters: {
          slug: {
            eq: $slug
          }
        }
        sort: "createdAt:ASC"
        pagination: {
          limit: -1
        }
      ) {
        data {
          id,
          attributes {
            name
            slug
            description
            color
          }
        }
      }
    }`, {
    variables: {
      "slug": slug
    }
  })

  if (resp.data?.categories?.data) {
    return resp.data?.categories?.data?.map?.(category => parseCategory(category))
  }
  else {
    return null
  }
}