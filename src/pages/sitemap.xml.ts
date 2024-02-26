import { CONFIG } from "../../site.config"
import { getPosts } from "src/apis"
import { filterPosts } from "src/libs/utils/notion"
import { TPost } from "src/types"

function generateSiteMap(posts: TPost[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${CONFIG.link}</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>${CONFIG.link}/resume</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>${CONFIG.link}/about</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
    </url>
     ${posts
       .map(({ slug, lastUpdateTime }) => {
         return `
       <url>
            <loc>${`${CONFIG.link}/${slug}`}</loc>
            <lastmod>${new Date(lastUpdateTime).toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
       </url>
     `
       })
       .join("")}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(ctx: any) {
  const posts = filterPosts(await getPosts())

  const sitemap = generateSiteMap(posts)

  ctx.res.setHeader("Content-Type", "text/xml")
  // we send the XML to the browser
  ctx.res.write(sitemap)
  ctx.res.end()

  return { props: { status: "ok!" } }
}

export default SiteMap
