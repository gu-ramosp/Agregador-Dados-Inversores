var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var PROTO_PATH = __dirname + '/../protos/agregador.proto';

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


function SendDataPath(request){

  client.SendDataPath({req: request}, (err, response)=> {
    console.log("request sendo enviada", request)
    console.log('SendDataPath_cli:', response);
    this.response = response
  });
  
  console.log('Essa merda é assincrona mesmo')
  return  this.response
}


function SendParamsFTP(request){

  client.SendParamsFTP(request, (err, response)=> {
    console.log('SendParamsFTP_cli:', response);
    this.help = response
  });
  
  console.log('Essa merda é assincrona mesmo')
  return  this.help
}


module.exports.SendDataPath = SendDataPath;
module.exports.SendParamsFTP = SendParamsFTP;
module.exports.client = client;


