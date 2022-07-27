import "../styles/styles.scss"
import type { AppContext, AppProps } from "next/app"
import Head from "next/head"
import { hasCookie, setCookie } from "cookies-next"
import App from "next/app"
import { generateUuid } from "@utils/helper"

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta name="viewport" content="viewport-fit=cover" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    </Head>
    <Component {...pageProps} />
  </>
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  // console.log(appContext.ctx.req.headers);
  // const reqHeaders = appContext.ctx.req.headers;
  // const clientIP = reqHeaders["x-real-ip"] || reqHeaders["x-forwarded-for"]
  // const clientUserAgent = reqHeaders["user-agent"]

  let isHasUuid = hasCookie("token", {
    req: appContext.ctx.req,
    res: appContext.ctx.res,
  });
  if (!isHasUuid) {
    const uuid = generateUuid()
    setCookie("token", uuid, {
      req: appContext.ctx.req,
      res: appContext.ctx.res,
      maxAge: 365 * 24 * 60 * 60
    });
  }

  return { ...appProps }
}

export default MyApp
