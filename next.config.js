const fs = require("fs");

module.exports = {
  webpack: (configuration) => {
    configuration.module.rules.push(
      {
        test: /\.md$/,
        use: "frontmatter-markdown-loader",
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "file-loader"],
      },
      {
          test: /\.ya?ml$/,
          use: 'js-yaml-loader',
        },
    );
    configuration.resolve.fallback = { fs: false, path: false };
    return configuration;
  },
  async exportPathMap(defaultPathMap) {
    return {
      ...defaultPathMap,
    };
  },
};
