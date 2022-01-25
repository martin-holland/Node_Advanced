"use strict";

const mariadb = require("mariadb");

async function testA() {
  const connection = await mariadb.createConnection({
    host: "localhost",
    port: 3306,
    user: "zeke",
    password: "secret",
    database: "employeedb",
    allowPublicKeyRetrieval: true, //mysql users add this
  });
  console.log("####### Test 1 ########");
  let result = await connection.query("select * from employee");
  console.log(result);

  delete result.meta;
  console.log(result);

  for (let person of result) {
    console.log(`${person.firstname}: ${person.salary} €`);
  }

  console.log("######### test 2 ########");
  result = await connection.query(
    "select firstname,lastname from employee where employeeId=?",
    [1]
  );
  // "select firstname,lastname from employee where employeeId in(?,?)",
  // [1,2]
  //   );
  delete result.meta;
  console.log(result);

  // console.log("####### test 3 insert #######");
  // result = await connection.query("insert into employee values(?,?,?,?,?)", [
  //   3,
  //   "Bill",
  //   "Bond",
  //   "secr",
  //   9999,
  // ]);

  console.log(result);

  //   console.log("##### test 4 delete #####");
  //   // Always put where in the delete, if you do not: ALL DATA WILL BE DELETED
  //   result = await connection.query("delete from employee where employeeId=?", [
  //     4,
  //   ]);
  //   console.log(result);

  console.log("### test update ###");
  result = await connection.query(
    "update employee set department=?, salary=? where employeeId=?",
    ["admin", 7000, 3]
  );
  // to be db engine: update employe set department='admin', salary=7000 where employeeId=3
  console.log(result);

  connection.end();
}

testA();
