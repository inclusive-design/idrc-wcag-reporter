module.exports = {
    extends: ["stylelint-config-xo"],
    plugins: ["stylelint-order"],
    ignoreFiles: ["_site/**/*.css"],
    rules: {
        "custom-property-pattern": null,
        "import-notation": "string",
        "selector-class-pattern": null,
        "order/properties-alphabetical-order": true,
        "selector-type-no-unknown": [true, { ignore: ["custom-elements"] }]
    }
};
