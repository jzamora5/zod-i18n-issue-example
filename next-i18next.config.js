const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  debug: true,
  localePath:
    typeof window === "undefined"
      ? path.resolve("./public/locales")
      : "/locales",
  reloadOnPrerender: true,
};
