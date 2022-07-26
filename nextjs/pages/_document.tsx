import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="keywords" content="HTML5 Template" />
          <meta name="description" content="Forum - Responsive HTML5 Template" />
          <meta name="author" content="Forum" />
          <link rel="shortcut icon" href="favicon/favicon.ico" />
          <meta name="format-detection" content="telephone=no" />
        </Head>
        <body>
          <Main />
          <NextScript />

          <script src="/js/jquery-3.3.1.min.js" />
        </body>
      </Html>
    )
  }
}

export default MyDocument