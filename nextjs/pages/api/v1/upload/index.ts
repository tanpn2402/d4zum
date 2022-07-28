// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCookie } from "cookies-next"
import type { NextApiRequest, NextApiResponse } from 'next'
import JWT from "jsonwebtoken"
import { create } from "@services/graphql/api/Post.api"
import IJwtAuthenticateData from "@interfaces/IJwtAuthenticateData"
import IPost from "@interfaces/IPost"
import { upload } from "@services/graphql/api/File.api"

type Data = {
  error?: string,
  data?: IPost[]
}

/** The File interface provides information about files and allows JavaScript in a web page to access their content. */
interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

declare var File: {
  prototype: File;
  new(fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.headers["content-type"]);
  if (req.method === "POST" && req.headers["content-type"]?.includes?.("multipart/form-data")) {
    console.log(req.body);

    let resp = await upload({ file: new File(req.body, "name") });
    console.log(resp);

    res.status(200).send({})
  }
  else {
    res.status(405).send({ error: "MethodNotAllowed" });
  }
}
