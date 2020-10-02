var PROTO_PATH = __dirname + '/../protos/agregador.proto';

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

function main(request) {
  var client = new hello_proto.Aggregation('localhost:50051', grpc.credentials.createInsecure());

  console.log(request)

  client.SendParamsFTP(request, (err, response)=> {
    console.log('Greeting:', response);
    this.help = response

  });
  console.log('Essa merda é assincrona mesmo')

  return  this.help

}

module.exports.main = main;

// main();