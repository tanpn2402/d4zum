import IPhoto from "@interfaces/IPhoto";
import UploadFileEntity from "@services/entity/UploadFile.entity";
import graphQL from "./api";
import UtilParser from "./UtilParser";

interface UploadProps {
  file: any
}

export async function upload({
  file
}: UploadProps): Promise<IPhoto | null> {
  console.log(file);
  let resp = await graphQL<{
    file: {
      data: UploadFileEntity
    }
  }>(
    `mutation ($file: Upload!) {
      file: upload(file: $file) {
        data {
          id
          attributes {
            name
            alternativeText
            url
          }
        }
      }
    }
    `, {
    variables: {
      file: file
    }
  }, process.env.GRAPHQL_BEARER_TOKEN_WRITE)

  if (!resp.errors) {
    return UtilParser<IPhoto, UploadFileEntity>(resp.data?.file?.data)
  }
  else {
    return null
  }
}