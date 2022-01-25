# Database class

This database class is a general purpose class for creating and using MariaDB/MySQL queries. The constructor takes all necessary information needed to open a database connection as a parameter object. The layer is used between the database engine and our application.

The constructor takes one parameter, Example:

```js
const options = {
    host: 'localhost',
    port: 3306,
    user: 'zeke',
    password: 'secret',
    database: 'employeedb',
    allowPublicKeyRetrieval: true; //mysql users add this
}
```

## Usage

```js
const db = new Database(options);
```

The **doQuery(sql, parameters)** method has two parameters:

- `sql`: is a sql statement as a string
- `parameters`: an array of query parameters to be used in place of the question marks `?`in the sql statement. Parameters may also be omitted if the sql statement has no placeholder `?`in it.

### Further Usage

#### No parameters needed

```js
const result = await db.doQuery("select * from employee");
```

Return value of select:
for example:

```js
{
    queryResult: [
        {
            employeeId: 1,
            firstname: 'Matt',
            lastname: 'River',
            department: 'ICT',
            salary:
        }
    ],
    resultSet: true;
}
```

#### insert, update, delete etc.

##### Insert

```js
const result = await db.doQuery("insert into employee values(?,?,?,?,?)", [
  6,
  "Petra",
  "Bond",
  "admin",
  9000,
]);
```

Return value is an object:

```js
{
    queryResult: {row:Changed:1, insertId: 0, status: 0},
    resultSet: false
}
```
