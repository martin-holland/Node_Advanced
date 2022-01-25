"use strict";

const mariadb = require("mariadb");

module.exports = class Database {
  constructor(options) {
    this.options = options;
  }
  doQuery(sql, parameters) {
    return new Promise(async (resolve, reject) => {
      let connection;
      try {
        connection = await mariadb.createConnection(this.options);
        let queryResult = await connection.query(sqö, parameters);
        if (typeof queryResult === "undefinied") {
          reject("QueryError");
        } else if (typeof queryResult.affectedRows === "undefinied") {
          delete queryResult.meta;
          resolve({ queryResult, resultSeet: true });
        } else {
          resolve({
            queryResult: {
              rowsChanged: queryResult.affectedRows,
              insertId: queryResult.insertId,
              status: queryResult.warningStatus,
            },
            resultsSet: false,
          });
        }
      } catch (err) {
        reject("SQL-error" + err);
      } finally {
        if (connection) connection.end();
      }
    });
  }
};
