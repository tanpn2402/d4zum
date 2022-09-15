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
          <meta name="keywords" content="d4zum" />
          <meta name="author" content="d4zum" />
          <link rel="shortcut icon" href="favicon/favicon.ico" />
          <meta name="format-detection" content="telephone=no" />
          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@d4zum" />
          <meta name="twitter:creator" content="@d4zum" />
          {/* jquery */}
          <script src="/js/jquery-3.3.1.min.js" />
          {/* highlighjs */}
          <link rel="stylesheet" href="/css/hljs.default.min.css" />
          <script src="/js/highlight.min.js"></script>
          {/* ckeditor */}
          <script src="/js/translations/vi.js"></script>
          <script src="/js/ckeditor.js"></script>
          {/* perfect scrollbar */}
          <script src="/js/perfect-scrollbar.min.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="/js/chatwood.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument