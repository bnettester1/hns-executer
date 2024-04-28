# hns-executer
A V1.2 of MetageneViet.

Demo live: https://dathoc.net/mm/
Refer doc:https://dathoc.net/mmdoc


# setup
0. Setup Nodejs, this should be linux Ubuntu 22, 8gb ram, 50gb hdd
Nodejs setup: https://nodejs.org/en/download
Ubuntu linux setup: https://ubuntu.com/download

1. Git clone https://github.com/bnettester1/hns-executer.git
cd hns-executer
npm i
npm i -g nodemon

2. Setup database Couchbase
On ubuntu linux, having docker, run
```
sudo docker run --restart unless-stopped -d --name couchdb -p 5984:5984 -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=123 couchdb
```

3. Setup Handshake protocol network
On ubuntu linux, having docker, run
```
sudo docker run --name hsd   -m 4g  --publish 12037:12037 --publish 12039:12039 --volume $HOME/.hsd:/root/.hsd    ghcr.io/handshake-org/hsd:latest    --http-host 0.0.0.0  --wallet-http-host=0.0.0.0  --api-key=kool --spv
```

4. Setup messenger
On ubuntu linux, having docker, run
```
docker run -d --name kj_mqtt --restart unless-stopped  -p 1883:1883 -p 8083:8083 -p 8084:8084 -p 8883:8883 -p 18083:18083 emqx/emqx
```

5. Create accounts on Handshake node to implement
- Create shop
- Chat

6. Run host
cd hns-executer
nodemon

# run 
Open browser, goto: localhost:8076
