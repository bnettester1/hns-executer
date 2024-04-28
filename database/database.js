/*
Created by anhpt@
Mar 8, 2024.
*/
const couchdbUrl = "http://admin:aa@1.1.1.1:5984";


const nano = require('nano')(couchdbUrl);
const dbhns = nano.use('dbhns');
const dbhsd = nano.use('dbhsd');
module.exports = {
    dbhns,dbhsd
}
