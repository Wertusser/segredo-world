/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  },
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
