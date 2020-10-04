# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import agregador_pb2 as agregador__pb2


class AggregationStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.SendDataPath = channel.unary_unary(
                '/Aggregation/SendDataPath',
                request_serializer=agregador__pb2.simpleStringRequest.SerializeToString,
                response_deserializer=agregador__pb2.simpleStringResponse.FromString,
                )
        self.SendParamsFTP = channel.unary_unary(
                '/Aggregation/SendParamsFTP',
                request_serializer=agregador__pb2.infoFTP_Request.SerializeToString,
                response_deserializer=agregador__pb2.simpleStringResponse.FromString,
                )
        self.MakeAggregation = channel.unary_unary(
                '/Aggregation/MakeAggregation',
                request_serializer=agregador__pb2.AggregationRequest.SerializeToString,
                response_deserializer=agregador__pb2.AggregationResponse.FromString,
                )
        self.sendGraphData = channel.unary_unary(
                '/Aggregation/sendGraphData',
                request_serializer=agregador__pb2.simpleStringRequest.SerializeToString,
                response_deserializer=agregador__pb2.AggregationResponse.FromString,
                )


class AggregationServicer(object):
    """Missing associated documentation comment in .proto file."""

    def SendDataPath(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def SendParamsFTP(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def MakeAggregation(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def sendGraphData(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_AggregationServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'SendDataPath': grpc.unary_unary_rpc_method_handler(
                    servicer.SendDataPath,
                    request_deserializer=agregador__pb2.simpleStringRequest.FromString,
                    response_serializer=agregador__pb2.simpleStringResponse.SerializeToString,
            ),
            'SendParamsFTP': grpc.unary_unary_rpc_method_handler(
                    servicer.SendParamsFTP,
                    request_deserializer=agregador__pb2.infoFTP_Request.FromString,
                    response_serializer=agregador__pb2.simpleStringResponse.SerializeToString,
            ),
            'MakeAggregation': grpc.unary_unary_rpc_method_handler(
                    servicer.MakeAggregation,
                    request_deserializer=agregador__pb2.AggregationRequest.FromString,
                    response_serializer=agregador__pb2.AggregationResponse.SerializeToString,
            ),
            'sendGraphData': grpc.unary_unary_rpc_method_handler(
                    servicer.sendGraphData,
                    request_deserializer=agregador__pb2.simpleStringRequest.FromString,
                    response_serializer=agregador__pb2.AggregationResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'Aggregation', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class Aggregation(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def SendDataPath(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/Aggregation/SendDataPath',
            agregador__pb2.simpleStringRequest.SerializeToString,
            agregador__pb2.simpleStringResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def SendParamsFTP(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/Aggregation/SendParamsFTP',
            agregador__pb2.infoFTP_Request.SerializeToString,
            agregador__pb2.simpleStringResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def MakeAggregation(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/Aggregation/MakeAggregation',
            agregador__pb2.AggregationRequest.SerializeToString,
            agregador__pb2.AggregationResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def sendGraphData(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/Aggregation/sendGraphData',
            agregador__pb2.simpleStringRequest.SerializeToString,
            agregador__pb2.AggregationResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
