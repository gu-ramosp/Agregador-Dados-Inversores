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

module.exports.client = client;


