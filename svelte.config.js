module.exports = {
  preprocess: require("svelte-preprocess")({
    plugins: [require("autoprefixer")],
  }),
};
