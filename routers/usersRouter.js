/*
Created by dathoc.net/cv
Apr 28, 2024.
*/
const express = require('express');
const router = express.Router();

const rooths = 'https://x:kool@c0e5a242f2ac.ngrok.app';
const rootw = 'https://x:kool@b1d79a6b8c8f.ngrok.app';

const {
	exptok,valgoogle
} = require('../implements/implements')
const masterhost = "../web/_shared/";
const {dbhns,dbhsd} = require('../database/database')
var path    = require("path");
const fs = require('fs');

const requestIp = require('request-ip');

var reqip = "";
const axios = require('axios');
const dateFormat = require('dateformat');

const { exec } = require('child_process');

//const dbaccess = "http://admin:123@localhost:5984";

//get ip & integrating counts
var geoip = require('geoip-lite');
 /*

//=============================SPEAKER===========================================================
var player = require('play-sound')(opts = {});
async  function playAlert(){
    player.play("alarm.wav", function(err) {if (err && !err.killed) throw err});
								
}
//playAlert();
broker = '0.tcp.ap.ngrok.io'
port = 14700
# topic, clientid
topic = "tg_mess"  # ONLY 1 TOPIC to send to server 
client_id = f'test-{random.randint(0, 1000)}' #each client has one different client_id, should not b the same
username = 'usermq'
password = '7982123'
*/
var PubDataOut = "";
function exeProcess(cmdObj){
    try {
    ()=>
        console.log("---EXE PROCESS-------------------------------------------------");
        exec(cmdObj, (err, stdout, stderr) => {
            console.log("DATA OUT------------------------------" + stdout)
            //console.log("DATA ERR------------------------------" + stderr)
            //return stdout
        });
    } catch(error) {
    	console.log("PROCESS ERROR------------------------------" + error)
        
    }
}

//=============================MWTT===========================================================
const mqtt = require('mqtt')
const protocol = 'mqtt'
const host = '0.tcp.ap.ngrok.io'
const port = '14700'
const topic = 'tg_mess'
const clientId = `web_${Math.random().toString(16).slice(3)}`
const connectUrl = `${protocol}://${host}:${port}`
const clientMQ = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'usermq',
    password: '7982123',
    reconnectPeriod: 1000,
})
//=============================FUNCTIONS===========================================================

function errMessInternal(error,res){
    console.log('------Err internal----------------' + error);
    //sendMQ(clientMQ,error);
	//throw "Hệ thống đang gặp vấn đề xử lý, bạn thử lại lần sau/ Internal error, try again later.";
    res.json(`Thông Báo: Hệ thống đang gặp vấn đề xử lý, bạn thử lại lần sau/ Internal error, try again later.`)
}
function errMessNotAllow(error,res){
    console.log('------Err NotAllow----------------' + error);
    //sendMQ(clientMQ,error);
	//throw "Truy cập của bạn đang trái phép! Your request is not allowed!";
    res.json(`Thông Báo: Truy cập của bạn trái phép! Request is not allowed!`)
}

// check all api stat done
var statStep = 0;
var statIn = 0;

function doRoute(routerMain,apiRoute,refRoute, linkRoute,typeroute){
    
    routerMain.get(apiRoute, async (req, res)=>{
        try {
            return res.redirect(linkRoute) //await validateCall(req, res,refRoute,linkRoute,typeroute);
        } catch(error) {
            errMessInternal(error,res)
        }
	})
}


function sendMQ(client,message){
    //console.log('MQTT --------- sending to admin!' + message);
    //message = message.toString().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''); //.replace(/[^\w\s]/g, '');
    sysMess = {
        from:'Server System',
        mess:message
    }
    if(("abc_ " +message).length > 5){
        client.publish(topic, JSON.stringify(sysMess), { qos: 0, retain: false }, (error) => {
            if (error) {
                console.log('MQTT --------- sending to admin!' + error);
            }
        })
    }
}

var path    = require("path");
let reqPath = path.join(__dirname, '../../web');

async function signTXT(txt){
/*
id="dat2wallet"
passphrase="1234asdf"
tx="00033333"
curl $ROOTW/wallet/$id/sign \
  -X POST \
  --data '{"tx": "'$tx'", "passphrase":"'$passp123'"}'
*/
	let repAdd = await axios({url: rootw + `/wallet/`+id+`/account/default`,
	method: 'GET',
	data:{}})
	.then(async(resp1) => {
	    console.log('------------------------');
	    console.log(resp1.data.receiveAddress);
	    return resp1.data.receiveAddress
	});

	return repAdd
};

async function createShop(id,shop,value){
/*`
name="dat2wallet"
message="`+shop+`"
curl $ROOTW \
  -X POST \
  --data '{
    "method": "signmessagewithname",
    "params": [ "'$name'", "'$message'" ]
  }'
    `;
*/
	await sendTXT(id, value)
	.then(async(txtStatus) => {
		console.log(txtStatus.tx);
	})
	

	let repSign = await axios({url: rootw,
	method: 'POST',
	data:{
	    "method": "signmessagewithname",
	    "params": [ id, shop ]
	  }
	})
	.then(async(resp1) => {
	    console.log('------------------------');
	    console.log(resp1.data);
	    return resp1.data
	});
	return repSign
};

async function getRecAdd(id){
	let repAdd = await axios({url: rootw + `/wallet/`+id+`/account/default`,
	method: 'GET',
	data:{}})
	.then(async(resp1) => {
	    console.log('------------------------');
	    console.log(resp1.data.receiveAddress);
	    return resp1.data.receiveAddress
	});

	return repAdd
};

async function sendTXT(id, value){
/*
    cmdObj = `
id="dat2wallet"
passphrase="1234abc"
rate=5000
value=100000
address="`+add+`"

curl $ROOTW/wallet/$id/send \
  -X POST \
  --data '{
    "passphrase":"'$passp123'",
    "rate":'$rate',
    "outputs":[
      {"address":"'$address'", "value":'$value'}
    ]
  }' 
    `;
*/    
    	let toAdd = await getRecAdd(id);
    	
    	let repTXT = await axios({url: rootw + `/wallet/`+id+`/send`,
	method: 'POST',
	data:{"passphrase":"passp1234",
	    "rate": 5000,
	    "outputs":[
	      {"address":toAdd, "value":value}
	    ]
	    }})
	.then(async(resp1) => {
	    console.log('------------------------');
	    console.log(resp1.data);
	    return resp1.data
	});

	return repTXT
}
sendTXT("koolwallet", 10000)
var oldMess ="";
var oldMessId ="";
var myMess;
//============================================================================================
// to EXPORT
module.exports = function(io) {
    clientMQ.on('connect', () => {
        //console.log('MQTT-------------------------Connected')
        clientMQ.subscribe([topic], () => {
            //console.log(`MQTT-------------------------Subscribe to topic '${topic}'`)
        });
        clientMQ.on('message', (topic, payload) => {
            console.log('MQTT-------------------------Connected')
            myMess = JSON.parse(payload);
            io.emit('tg_mess',myMess);
        })    
    });    
    doRoute(router,'/','homepage', '/../../web',1);
	

    // /darcam/_design/dy/_view/c
    router.post('/createShop', async (req, res) =>{
        let {shopimg,shopadd,shopdetail} = req.body;
        try {
            let resObj = await createShop("koolwallet",(shopimg+shopadd+shopdetail).replace(" ",""));
            res.json(resObj) 
        } catch(error) {
            errMessInternal(error,res)
        }
    });

	
//============================== STAT============================
    router.post('/valgoogle', async (req, res) =>{
		let {userid,googletoken,uid,role,appid} = req.body;
        try {
            if(validateCall2(req, res,"get count",""))
            {
                var appname = "hera2";
                console.log("-----from ip: " +reqip+"---" + userid+ "---LOGIN "+appname+"--- at "+ dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")+"-----")
                let rep = await valgoogle(userid,googletoken,uid,role,appid)
        
                res.json({
                        rep
                })	
            }else errMessNotAllow('..valgoogle',res)
                
		} catch(error) {
			errMessInternal(error,res)
		}
	});


    return router;
}
