// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { siteConfig } from "~/lib/config";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />

          {/* SEO Meta Tags */}
          <title>{siteConfig.title}</title>
          <meta name="description" content={siteConfig.description} />
          <meta name="author" content={siteConfig.author.name} />
          <link rel="canonical" href={siteConfig.url} />

          {/* Open Graph Tags */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={siteConfig.title} />
          <meta property="og:description" content={siteConfig.description} />
          <meta property="og:url" content={siteConfig.url} />
          <meta property="og:site_name" content={siteConfig.name} />
          {siteConfig.ogImage && (
            <meta property="og:image" content={`${siteConfig.url}${siteConfig.ogImage}`} />
          )}

          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={siteConfig.title} />
          <meta name="twitter:description" content={siteConfig.description} />
          {siteConfig.author.twitter && (
            <meta name="twitter:creator" content={siteConfig.author.twitter} />
          )}
          {siteConfig.ogImage && (
            <meta name="twitter:image" content={`${siteConfig.url}${siteConfig.ogImage}`} />
          )}

          {/* Font Preconnect */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
