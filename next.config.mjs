/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce a fully static site into the `out/` folder on `next build`.
  output: 'export',

  // The static export has no server, so the built-in Image Optimizer is disabled.
  images: {
    unoptimized: true,
  },

  // Emit each route as a folder with index.html (e.g. /workshops/index.html),
  // which resolves cleanly on any static host (Hostinger, cPanel, Netlify, S3).
  trailingSlash: true,
};

export default nextConfig;
