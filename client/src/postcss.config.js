module.exports = {
    plugins: [
        require("postcss-import"),
        require("postcss-each")({}),
        require("postcss-for")({}),
        require("postcss-nested")({}),
        require("postcss-conditionals")({}),
        require("postcss-custom-media")({}),
        require("postcss-media-minmax")({}),
        require("postcss-mixins")({}),
        require("postcss-simple-vars")({}),
        require("css-mqpacker")({}),
        require("rucksack-css")({}),
        require("autoprefixer")({}),
        require("postcss-discard-comments")({})
        // require('cssnano')({}),
    ]
};