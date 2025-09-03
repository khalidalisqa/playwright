module.exports = {
  default: {
    require: ["./steps/**/*.ts"],       // ✅ load steps
    requireModule: ["ts-node/register"], // ✅ allow TS execution
    paths: ["./features/**/*.feature"],  // ✅ feature files
    format: ["progress"],
    publishQuiet: true,
  },
};
