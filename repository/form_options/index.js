const { FormNotAvailable } = require("../../errors/form-options");

const connection = require("../../db/connection").getConnection();
const { models } = connection;
const { form } = models;

const insertNewForm = ({ formData }) => new form(formData).save();

const fieldsAndValuesByForm = async ({ formId }) => {
  const r = await form.aggregate([
    [
      {
        $match: {
          formId: parseInt(formId),
          active: true,
        },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          fields: {
            $map: {
              input: {
                $filter: {
                  input: "$fields",
                  as: "f",
                  cond: { $eq: ["$$f.active", true] },
                },
              },
              as: "f",
              in: {
                active: "$$f.active",
                values: {
                  $filter: {
                    input: "$$f.values",
                    as: "v",
                    cond: { $eq: ["$$v.active", true] },
                  },
                },
              },
            },
          },
        },
      },
    ],
  ]);

  if (r.length === 0) {
    throw new FormNotAvailable("We could not find the form");
  }

  return r[0];
};

module.exports = { insertNewForm, fieldsAndValuesByForm };
