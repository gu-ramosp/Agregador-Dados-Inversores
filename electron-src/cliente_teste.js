var PROTO_PATH = __dirname + './../proto/agregador.proto';
const electron = require('electron')
const {ipcRenderer} = electron;

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition);

var client = new hello_proto.Aggregation('localhost:50051', grpc.credentials.createInsecure());


function main() {
  client.MakeAggregation({req:"jdkljf"}, function(err, response) {
    console.log('Greeting:', response);
  });
}

const f = function(){
    console.log("this is a function inside cliente")
}


module.exports.main = main;