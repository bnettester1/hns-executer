/*
Created by dathoc.net/cv
Apr 28, 2024.
*/
const express = require('express')
const app = express()
var path = require('path');

//Nhúng middleware body-parser vào Express
var bodyParser = require('body-parser')

//secure server by helmet: https://helmetjs.github.io/
var helmet = require('helmet')
//app.use(helmet())

//secure server from DDOS by rate limit: https://www.npmjs.com/package/express-rate-limit
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 600, // limit each IP to 300 requests per window
 message:
    "Thông Báo: There are too many connections from your IP, please try again after 15 mins!\nIPからの接続が多すぎます。15分後にもう一度やり直してください。"
});
app.use(limiter);

//allow other sitea can query to
var cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({limit: '1mb', extended: true}))
app.use(bodyParser.json({limit: '1mb', extended: true}))

//Tuỳ biến Router
var serveIndex = require('serve-index');
app.use(express.static(__dirname + "/../web"))
app.engine('html', require('ejs').renderFile);
app.use('/shared', express.static('web/_shared'), serveIndex('web/_shared', {'icons': true}))

const server = require('http').createServer(app);
/*
var https = require('https');
var fs = require('fs');
var https_options = {
key: fs.readFileSync("tg.key"),
cert: fs.readFileSync("tg.crt"),
ca: [
fs.readFileSync('tg.csr'),
fs.readFileSync('tg.csr')
] };
*/
//const server = https.createServer(https_options, app)
//.listen(8443)

//apply socketio from ends
const io = require('socket.io')(server);
const usersRouter  = require('./routers/usersRouter')(io)
app.use('/', usersRouter)
app.use(require("./routers/usersRouter")(io));

app.use((req, res, next) => {
    const error = new Error("Thông Báo: Truy cập của bạn không tồn tại! Your request is not existed!");
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(
        "Thông Báo: Truy cập của bạn không tồn tại! Your request is not existed!");
    });

io.on('connection', client => {
    client.on('tg_mess', data =>{
        console.log('Transfer sock data ------------------------');
        console.log(data)
        //io.send(data);
        io.emit('tg_mess',data);
    })
});
//start server
server.listen(8076);
