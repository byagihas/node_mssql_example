'use strict';

require('dotenv').config();

const sql = require("mssql");

const config = {
    user : '',
    password : '',
    server : '',
    database : ''
};

const queryDB = (query) => {
    if(query.match(/[NOLOCK]/gi)) {
        sql.connect(config, (err) => {
            if(err) { console.log(err) };
            let sqlRequest= new sql.Request();
            let SQLQuery = query;

            sqlRequest.query(SQLQuery, (err, data) => {
                if(err) { console.log(err) };
                console.log(data);
                console.table(data.recordset);
                console.log(data.rowsAffected);
                console.log(data.recordset[0]);
            });
        });
    } else {
        console.log('No NOLOCK detected, exiting');
    };
};

queryDB('SELECT TOP 1 FROM dbo.ProductData WITH (NOLOCK) WHERE PRODUCTID = \'{\'};');

module.exports = queryDB;