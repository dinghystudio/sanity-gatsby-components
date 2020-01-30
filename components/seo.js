import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({ title, description, keywords = [], imageUrl, lang, meta }) {
  const { site } = useStaticQuery(graphql`
    query SEOQuery {
      site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
        title
        description
        keywords
        author
        image {
          asset {
            url
          }
        }
      }
    }
  `)

  console.log(site)

  const metaTitle = title || site.title
  const metaDescription = description || site.description
  const metaKeywords = keywords || site.keywords
  const metaImageUrl = imageUrl || site.image.asset.url

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={metaTitle}
      titleTemplate={metaTitle === site.title ? '%s' : `%s | ${site.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription
        },
        {
          property: 'og:title',
          content: metaTitle
        },
        {
          property: 'og:description',
          content: metaDescription
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:image',
          content: metaImageUrl
        },
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:creator',
          content: site.author
        },
        {
          name: 'twitter:title',
          content: metaTitle
        },
        {
          name: 'twitter:description',
          content: metaDescription
        },
        {
          property: 'twitter:image',
          content: metaImageUrl
        }
      ]
        .concat(
          metaKeywords && metaKeywords.length > 0
            ? {
                name: 'metaKeywords',
                content: keywords.join(', ')
              }
            : []
        )
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: 'de',
  meta: [],
  keywords: []
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired
}

export default SEO
