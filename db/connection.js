const mongoose = require("mongoose");
const dbModels = require("./models");
let primaryConnection;

const initConnection = async () => {
  const MONGODB_URL = process.env.MONGODB_URL;
  const mongoConnection = await mongoose
    .createConnection(MONGODB_URL, {
      waitQueueTimeoutMS: 5000,
      maxPoolSize: 20,
      minPoolSize: 2,
      maxIdleTimeMS: 60000,
    })
    .asPromise();

  primaryConnection = dbModels(mongoConnection);
};

/**
 * @returns {import('mongoose').Connection}
 */
const getConnection = () => primaryConnection;

module.exports = { initConnection, getConnection };
