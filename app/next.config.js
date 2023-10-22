/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: {
    module: {
      rules: [
        {
          test: /\.zok$/i,
          loader: "raw-loader",
          options: {
            esModule: false,
          },
        },
      ],
    },
  },
};

module.exports = nextConfig;
