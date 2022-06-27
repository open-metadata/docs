const fs = require("fs");

{
  swcMinify: false
}

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
    return configuration;
  },
  async exportPathMap(defaultPathMap) {
    return {
      ...defaultPathMap,
    };
  },
};
