// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface IChatConfig {
  url: String,
  srcPath: String,
  token: String,
  provider?: String
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const config: IChatConfig = {
    url: process.env.EXTENSION_CHAT_URL,
    srcPath: process.env.EXTENSION_CHAT_SRC_PATH,
    token: process.env.EXTENSION_CHAT_TOKEN,
  }

  if (config && config.url) {
    res.status(200).send(config);
  }
  else {
    res.status(500).send({ error: "MethodNotAllowed" });
  }
}
