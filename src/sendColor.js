"use strict"

var mqtt    = require('mqtt');

module.exports = (req, done) => {
  let counter = 0;
  var ops = {
    port: 1883,
    host: "iot.eclipse.org"
  };

  var client  = mqtt.connect(ops);
  client.on('message', (topic, msg)=> {
    console.log(topic,msg);

  });
  client.on('connect', () => {
    console.log("Connected");
    let r = req.r;
    let g = req.g;
    let b = req.b;
    for(let i = 0;i<8;i++) {
      client.publish("pimoroni/blinkt", "rgb,"+i+","+r+","+g+","+b,{qos:1}, cb);
    }
  });
  let cb = () => {
    console.log(counter);
    if(++counter == 8) {
      done();
    } 
  };
};

// module.exports({r:255,g:0,b:0});
