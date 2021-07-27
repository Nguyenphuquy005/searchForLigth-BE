"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async create(data, { files } = {}) {
    const validData = await strapi.entityValidator.validateEntityCreation(
      strapi.models.submission,
      data
    );
    const allSubmission = await strapi.query("submission").find();
    if (allSubmission.filter((e) => e.email === validData.email).length !== 0) {
      return { error: "Just one postcard per user, please" };
    }
    if (allSubmission.length > 150) {
      return { error: "Sorry we have got enough 150 submissions" };
    } else {
      const entry = await strapi.query("submission").create(validData);
      const error = await strapi.services.utils.sendGrid(data, "WELCOME");
      if (error) {
        return { error: error.response.body.errors[0].message };
      }
      if (files) {
        await strapi.entityService.uploadFiles(entry, files, {
          model: "submission",
        });
        return this.findOne({ id: entry.id });
      }
      return entry;
    }
  },
};
