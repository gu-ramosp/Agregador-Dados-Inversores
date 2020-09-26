var PROTO_PATH = __dirname + '/proto/agregador.proto';

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

function main() {
  var client = new hello_proto.Aggregation('localhost:50051', grpc.credentials.createInsecure());

  client.MakeAggregation({req:"jdkljf"}, function(err, response) {
    console.log('Greeting:', response);
  });
}

main();
