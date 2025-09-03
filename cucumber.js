module.exports = {
  default: {
    require: ["./steps/**/*.ts"],          // step definitions
    requireModule: ["ts-node/register"],   // run TypeScript directly
    paths: ["./features/**/*.feature"],    // feature files
    format: [
      "progress",                          // simple progress bar
      "summary",                           // scenario/step summary
      "html:reports/cucumber-report.html"  // optional HTML report
    ],
    publishQuiet: true
  },
};
