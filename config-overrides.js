/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */
const { alias, configPaths } = require("react-app-rewire-alias");

module.exports = function override(config) {
    alias({
        ...configPaths("./base-tsconfig.json"),
    })(config);
    return config;
};