/*
Created by dathoc.net/cv
Apr 28, 2024.
*/
const masterhost = "../_shared/";
const {dbhns,dbhsd} = require('../database/database')

const fs = require('fs');

const dateFormat = require('dateformat')
//const util = require('util');
const axios = require('axios');

var currentGtoken = "";
var currentrule = 3;
//var currentUsername = "";

/*
var cassandra = require('cassandra-driver');
const clientScylla = new cassandra.Client({
  contactPoints: ['localhost:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'ks1'
});
*/
//===========================================================================================
//API
//Bạn cần quyền Quản trị để thực thi!

//const dbaccess = "http://admin:123@localhost:5984"
/*
var savecourse= async (userid,googletoken,role,appid,ctup,cid,cname,ccat,cimg,cprice,ctype,cteacher,cteachcv,ctimerange,ctinemin,ctimemax,cdemo,cspec,ccontent,clink,cfeat,cgroup,crelated,cklrelated,ccomm,cjob,cstat,crate,cpview) => {
	try {
		//validate token expire
		let oktoken = await checkYESTokExp(googletoken);
		if(!oktoken){
			//validate user is existed
			let okduser = await toUserfromTok(googletoken);
			if(okduser){
				//check rule
				let okdrule = await checkRole(userid);
				if(okdrule){
					return await dbshopraw.list({include_docs: true}).then(async(body) => {
						//console.log(body.rows);
						if(body.rows.length > 0) return {result: '0', message:body.rows, role:role}
						else return  {result: '1', message:'Không tìm thấy!'}
					})
				}
				else
				return {result: '1',message: `Bạn không đủ quyền để thực thi!`}
			}	
			else
				return {result: '1',message: `Người dùng không tồn tại!`}
		}
		else
			return {result: '1',message: `Phiên làm việc không được xác nhận.\nBạn cần đăng nhập lại để sử dụng!`}
    } catch(error) {
		return {result: '1',message: `Error: ${error}`}
    }
}

function errMessInternal(error,res){
    console.log('------Err internal----------------' + error);
    res.json(`Hệ thống đang gặp vấn đề xử lý, bạn thử lại lần sau/ Internal error, try again later.`)
}
function errMessNotAllow(error,res){
    console.log('------Err NotAllow----------------' + error);
    res.json(`Dathoc.NET: Truy cập của bạn trái phép! Request is not allowed!`)
}


var getprodraw= async (userid,googletoken,role,appid,idobject) => {
	try {
		//validate token expire
		let oktoken = await checkYESTokExp(googletoken);
		if(!oktoken){
			//validate user is existed
			let okduser = await toUserfromTok(googletoken);
			if(okduser){
				let okdrule = await checkRole(userid);
				if(okdrule){
					//console.log("---------PROD RAW-------111-----");
					//return await dbprodraw.list({include_docs: true}).then(async(body) => {
						//console.log("--------------PROD COUNT-----------"+ body.rows.length);

						//"http://admin:123@192.168.1.215:5984/prodraw2/_design/my_prodview1/_view/my_prodfilter?limit=2000"
						//filter with first 500 prod
						var configPrd = {
							method: 'get',
							url: 'http://admin:123@127.0.0.1:5984/prodraw2/_design/my_prodview2/_view/my_prodfilter?limit=500',
							headers: {},
							data : {}
						};

						return await axios(configPrd)
						.then(async(resp1) => {
							console.log("---------PROD RAW---------------");
							console.log(resp1.data.rows.length);
							return {result: '0',message: resp1.data.rows,totalrec:resp1.data.total_rows, role:role}
						});	

						//console.log(body.rows.length);
						//if(body.rows.length > 0) return {result: '0', message:body.rows}
						//else return  {result: '1', message:'Không tìm thấy!'}
					//})
				}
				else
					return {result: '1',message: `Bạn không đủ quyền để thực thi!`}

			}	
			else
				return {result: '1',message: `Người dùng không tồn tại!`}
		}
		else
			return {result: '1',message: `Phiên làm việc không được xác nhận.\nBạn cần đăng nhập lại để sử dụng!`}
    } catch(error) {
		return {result: '1',message: `Error: ${error}`}
    }
}

var addProdBlack= async (userid,googletoken,role,appid,idobject,prodid) => {
	try {
		//validate token expire
		let oktoken = await checkYESTokExp(googletoken);
		if(!oktoken){
			//validate user is existed
			let okduser = await toUserfromTok(googletoken);
			if(okduser){
				//check rule
				let okdrule = await checkRole(userid);
				if(okdrule){
					//check Admin/Mode rule
					let okdAdminrule = await checkRoleAdmin(userid);
					let okdModrule = await checkRoleMod(userid);
					if(okdAdminrule){
						return await dbshopraw.list({include_docs: true}).then(async(body) => {
							//console.log(body.rows);
							if(body.rows.length > 0) return {result: '0', message:body.rows}
							else return  {result: '1', message:'Không tìm thấy!'}
						})
					}
					else
					return {result: '1',message: `Bạn cần quyền Quản trị để thực thi!`}
				}
				else
				return {result: '1',message: `Bạn không đủ quyền để thực thi!`}
			}	
			else
				return {result: '1',message: `Người dùng không tồn tại!`}
		}
		else
			return {result: '1',message: `Phiên làm việc không được xác nhận.\nBạn cần đăng nhập lại để sử dụng!`}
    } catch(error) {
		return {result: '1',message: `Error: ${error}`}
    }
}

var abc= async (userid,googletoken,role,appid,idobject) => {
	try {
		//validate token expire
		let oktoken = await checkYESTokExp(googletoken);
		if(!oktoken){
			//validate user is existed
			let okduser = await toUserfromTok(googletoken);
			if(okduser){
				//check rule
				let okdrule = await checkRole(userid);
				if(okdrule){
					//check Admin/Mode rule
					let okdAdminrule = await checkRoleAdmin(userid);
					let okdModrule = await checkRoleMod(userid);
					if(okdAdminrule){
						return await dbshopraw.list({include_docs: true}).then(async(body) => {
							//console.log(body.rows);
							if(body.rows.length > 0) return {result: '0', message:body.rows}
							else return  {result: '1', message:'Không tìm thấy!'}
						})
					}
					else
					return {result: '1',message: `Bạn cần quyền Quản trị để thực thi!`}
				}
				else
				return {result: '1',message: `Bạn không đủ quyền để thực thi!`}
			}	
			else
				return {result: '1',message: `Người dùng không tồn tại!`}
		}
		else
			return {result: '1',message: `Phiên làm việc không được xác nhận.\nBạn cần đăng nhập lại để sử dụng!`}
    } catch(error) {
		return {result: '1',message: `Error: ${error}`}
    }
}


*/
//===========================================================================================


//check google login
var valgoogle= async (userid,googletoken,uid,role,appid) => {
    try {
/*		
		//search check userid
		currentGtoken = googletoken;
		currentUsername = userid;
		//console.log(currentGtoken);
		
		//calculate mem use
		var usedmem = process.memoryUsage().heapUsed / 1024 / 1024;
		var memtotal = Math.round(usedmem * 100) / 100;

		//check tok existed
		var existedTok = '';
		var exprev = '';
		
		
		// check & validate Google user
		return admin
		.auth()
		.verifyIdToken(currentGtoken)
		.then((decodedToken) => {
		//console.log("------"+uid);	
		console.log("----------Authorized------------------------" + decodedToken.uid);
			//if(decodedToken.uid == "WX9a53kaQ4RPrE0Iy6FJt2WFLo42"){
				//hera2 app
				if(appid == "2"){
					//check user in DB
					// if user existed
					//console.log("----RULE-----------------" + role + "------" + userid );
					if (((userid.indexOf("admin@dathoc") !=-1) && (decodedToken.uid == "aaa")) || ((userid.indexOf("wtptester1")!=-1) && (decodedToken.uid == "bbb")) )
						currentrule = 1;
					//else if (userid.indexOf("wtptester2") !=-1)
						//currentrule = "2";
					else
						currentrule = 3;
					return dbu.get(userid).then(async(body5) => {
						console.log('----OK USER---------'+userid);
						//console.log("---------------------" +role+"...");
						//find userid, replace token
						const q = {
							selector: {
								userid: { "$eq": userid}
							},
							limit:10
						};
						exprev = '';
						//find token and replace
						return dbexp.get(googletoken).then(async(body6) => {
							console.log('----OK TOKEN---------'+userid);
							//console.log("---------------------" + googletoken.substring(0,20)+"...");
							return {result: '0',message:currentrule};
						//if not found token
						}).catch(async(err) => {
							//again find user
							console.log('----TOKEN NOT --------'+userid);
							return await dbexp.find(q).then(async(body2) => {
								if(body2.docs.length >0){
									exprev = body2.docs[0]._rev;
									//remove token
									await dbexp.destroy(body2.docs[0]._id,exprev).then(async(body7) => {})
									return {result: '0',message:currentrule};

								}else{
									return {result: '0',message:currentrule}
								}
							}).then(async(exprev) => {
								if(exprev != ""){
									//console.log("---------------------" + userid);
									return await dbexp.insert({_id:googletoken,rule:currentrule,userid:userid,stat:1,timecreated:dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")}).then(async(body6,err) => {
										return {result: '0',message:currentrule}						
									})
								}else return {result: '1',message:"Người dùng không tồn tại!"};	
							})
						})
					//user not existed	
					}).catch(async(err) => {	
						//console.log("---------------------" + userid.substring(0,20)+"...");	
						console.log('----NOT USER--------'+userid);		
						return dbu.insert({_id: userid, rule:currentrule, timecreated:dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")}).then(async(body3) => {
							return await dbexp.insert({_id:googletoken, rule:currentrule,userid:userid, stat:1,timecreated:dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")}).then(async(body4) => {
								return {result: '0',message:currentrule}
							});
						})
					})

				}else return {result: '1',message:"Phiên làm việc không hợp lệ. Bạn đăng nhập lại!"}
			//}else return {result: '1',message:"Phiên làm việc không hợp lệ. Bạn đăng nhập lại!"}
		})
		.catch((error) => {return {result: '1',message:"Phiên làm việc không hợp lệ. Bạn đăng nhập lại!"}; });

	*/	
    } catch(error) {
		return {result: '1',message:"Phiên làm việc không hợp lệ. Bạn đăng nhập lại!"}
        //throw error
    }
}


/*

//add exp token
const addtokexp = async (ActUserjsonObject) => {
	try {
			return dbexp.insert({_id: ActUserjsonObject.token,email:ActUserjsonObject.id, stat:ActUserjsonObject.stat}).then((body) => {
				//console.log("Done logging-----------" +idobject.id+" --- added!")
				return ("New tok from --- "+JSON.stringify(ActUserjsonObject)+" --- added!")
			})
			//return rep
	}catch(error) {
			return error.message
	}
}
//check token YES expired
var checkYESTokExp= async (token) => {
    try {
		return dbexp.get(token).then((body) => {
			let currentstat = body.stat;
			//console.log(currentstat);
			if(currentstat == 1){
				return false
			} else {
				return true
			}
		}).catch((err) => {
			return true
		})

    } catch(error) {
        throw error
    }
}

//check user existed
var checkUser = async (email) => {
    try {
		return dbu.get(email).then((body) => {
			return true
		}).catch((err) => {
			return false
		})
    } catch(error) {
        throw error
    }
}

//to user from token
var toUserfromTok = async (token) => {
    try {
		return dbexp.get(token).then(async(body) => {
			let okUser = await checkUser(body.userid);
			if(okUser)
				return body.userid
			else
				return false
		}).catch((err) => {
			return false
		})
    } catch(error) {
        throw error
    }
}
//get current user role
var checkRole = async (email) => {
    try {
		return dbu.get(email).then((body) => {	
			if(Number(body.rule) >=0)
				return true
			else return false	
		}).catch((err) => {
			return false
		})
    } catch(error) {
        throw error
    }
}
var checkRoleAdmin = async (email) => {
    try {
		return dbu.get(email).then((body) => {	
			if (Number(body.rule) == 1)
				return true
			else return false	
		}).catch((err) => {
			return false
		})
    } catch(error) {
        throw error
    }
}
var checkRoleMod = async (email) => {
    try {
		return dbu.get(email).then((body) => {	
			if (Number(body.rule) == 2)
				return true
			else return false	
		}).catch((err) => {
			return false
		})
    } catch(error) {
        throw error
    }
}
var exptok= async (tokenkey,appid) => {
    try {
		return await dbexp.get(tokenkey).then(async(body) => {
			var cRecID = body._id;
			var cRev = body._rev;
			var cRule = body.rule;
			var cState = body.status;
			return await dbexp.insert({_id:cRecID, _rev:cRev,rule:cRule,status:0,timecreated:dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")}).then((body) => {
				return {result: '0',message:"Bạn đã đăng xuất. Cám ơn đã dùng ứng dụng!"}
			})	
				
		}).catch((err) => {
			return false
		})
    } catch(error) {
        throw error
    }
}

//check token live
var checkTok = async (token) => {
    try {
		return await dbexp.get(token).then(async(body) => {
			var cState = body.status;
			if(cState == 1)
				return true
			else
				return false	
		}).catch((err) => {
			return false
		})	
    } catch(error) {
        throw error
	}
}	


const jwt = require("jsonwebtoken");
const loginUser = async (email, password,idobject) => {
    try {
		if(email.trim() == "" || password.trim() == "")
			return {result: '1',message:'Login needs ID and password!'}
		else	
			return {result: '0',message:3, id: 'abc', earn:270000, token:'abctoken', his:'abchis'}	
    } catch(error) {
        return {result: '1',message:error};
    }
}

//insert new user
var currunixtime = Math.floor(new Date().getTime() / 1000);
const registerUser = async (recover,email,password,confpass,idobject) => {
    try {
			currunixtime = Math.floor(new Date().getTime() / 1000);
			return dbuser.get(email).then((body) => {
				//console.log(body);
				return {result: '1',message:'User is existed! Take a new ID.'}
			}).catch(async(err) => {
				
				if(recover.trim() =="")
					return {result: '1',message:'Member should have email to recover!'}

				else if(password.length < 8)
					return {result: '1',message:'Password should be 8 chars!'}

				else if(password.trim() != confpass.trim())
					return {result: '1',message:'Confirm password and password should be the same!'}
					
				else if(email.trim() == "" || password.trim() == "" || recover.indexOf("@") == -1 || recover.indexOf(".") == -1)
					return {result: '1',message:'Member needs ID unique, recover email, and password to login/recover!'}

				else if(!(recover.indexOf("@") != -1 && recover.indexOf(".") != -1))
					return {result: '1',message:'Recover email should be corrected!'}

				else

					return {result: "0",message:"New member #"+email+"# created!"}
			})
    } catch(error) {
        return {result: '1',message:error};
    }
}
*/
module.exports = {
	valgoogle
}
