const liveServer = require('live-server');

const params = {
  port :5500,
  host :'localhost',
  root : './client',
  open : false
}

liveServer.start(params);