"use strict";

const { error, successfully } = require("../../utils/services/status");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  check_isActive: async (ctx) => {
    // const id = ctx.params.id;
    console.log(ctx.params, "ctx.params");
    const { idSmartCode } = ctx.params;
    const smartCode = await strapi
      .query("smart-code")
      .findOne({ id: idSmartCode });
    console.log(smartCode);
    if (!smartCode) {
      return error({ status: 400, message: "key no valid" });
    }
    if (!smartCode.isActive || !smartCode.users) {
      return "livuLink";
    }
    if (smartCode.status && smartCode.users) {
      return successfully(200, smartCode.users);
    }

    return smartCode;
  },
};
