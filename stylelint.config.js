module.exports = {
  extends: "stylelint-config-recommended",
  rules: {
    "at-rule-no-unknown": [
      true,
      { ignoreAtRules: [
        "extends",
        "tailwind",
        "layer"
      ] }
    ],
    "no-duplicate-selectors": null,
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["global"] }
    ],
    "selector-type-no-unknown": [
      true,
      { ignoreTypes: [/^ion-/u] }
    ]
  }
};
