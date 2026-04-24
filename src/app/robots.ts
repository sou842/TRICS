import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/supervisor/'],
    },
    sitemap: 'https://trics.com/sitemap.xml',
  }
}
