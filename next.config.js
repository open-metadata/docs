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
        // use: 'js-yaml-loader', 
        use: 'raw-loader' // Use raw-loader to load YAML as a string to preserve comments
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
