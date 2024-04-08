module.exports = {
  extends: ["plugin:yml/standard", "plugin:markdown/recommended"],
  ignorePatterns: ["_site/", "!.*.js", "!.github/"],
  overrides: [
    {
      files: ["**/*.md"],
      processor: "markdown/markdown",
    }
  ],
};
