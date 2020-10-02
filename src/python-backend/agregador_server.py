import grpc 
import concurrent
from concurrent import futures

import agregador_pb2
import agregador_pb2_grpc

class AggregationServicer(agregador_pb2_grpc.AggregationServicer):
    def MakeAggregation(self, request, context):
        print("we got something")
        response = agregador_pb2.AggregationResponse()
        response.resposta = "Sayaka: hey hey hey "
        return response

    def SendParamsFTP(self, request, context):
        print("Dentro SendParamsFTP")
        response = agregador_pb2.AggregationResponse()
        response.resposta = "Chamou SendParamsFTP "
        return response


    def SendDataPath(self, request, context):
        print("Dentro SendDataPath")
        response = agregador_pb2.AggregationResponse()
        response.resposta = "Chamou SendDataPath "
        return response
       

def main():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    agregador_pb2_grpc.add_AggregationServicer_to_server(AggregationServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("servidor iniciado escutando na porta 50051")
    server.wait_for_termination()

main()