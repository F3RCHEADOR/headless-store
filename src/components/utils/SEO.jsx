import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => (
  <Helmet>
    {title && <title>{title}</title>}
    {description && <meta name="description" content={description} />}
    {url && <link rel="canonical" href={url} />}
    {/* Open Graph */}
    {title && <meta property="og:title" content={title} />}
    {description && <meta property="og:description" content={description} />}
    {url && <meta property="og:url" content={url} />}
    {image && <meta property="og:image" content={image} />}
    <meta property="og:type" content="website" />
    {/* Twitter Card */}
    {title && <meta name="twitter:title" content={title} />}
    {description && <meta name="twitter:description" content={description} />}
    {image && <meta name="twitter:image" content={image} />}
    <meta name="twitter:card" content="summary_large_image" />
  </Helmet>
);

export default SEO; 