#python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. agregador.proto
import os
import re
import grpc 
import concurrent
import ftputil
import data_fetcher
import agregador_pb2
import agregador_pb2_grpc
from   ftplib     import FTP
from   concurrent import futures
from   datetime   import datetime
from   agregador  import _makeAgregation


# TODO: Realizar Validação dos dados recebidos no front-end
# TODO: Verificar porque erro "421 Could not create socket" ocorre ao buscar alguns arquivos no FTP.

def main():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    agregador_pb2_grpc.add_AggregationServicer_to_server(AggregationServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("(Versão 1.0) Servidor iniciado escutando na porta 50051\n")
    server.wait_for_termination()


class AggregationServicer(agregador_pb2_grpc.AggregationServicer):

    #TODO: Mudar nome da função para ParamsFTP (Faz mais sentido ao ver a função nesse script)
    def SendParamsFTP(self, request, context):
        print('ruim')
        data_fetcher.ftp_params = request
        print("mal")
        data_fetcher.local_files_path = None
        print(f'Recebeu parâmetros para conexão com servidor FTP:\n{data_fetcher.ftp_params}')
        response = agregador_pb2.simpleStringResponse()
        try:
            with FTP(request.host,timeout=1) as ftp:
                ftp.login(user=request.usuario, passwd=request.senha)
                conn_res =  '203'
        except Exception as e:
            print(e)
            conn_res = "erro"
        response.resposta = conn_res
        return response


    #TODO: Mudar nome da função para setDataPath (Faz mais sentido ao ver a função nesse script)
    def SendDataPath(self, request, context):
        data_fetcher.local_files_path = request.req
        data_fetcher.ftp_params = None
        print(f"Recebeu Path dos arquivos a serem agregados: {data_fetcher.local_files_path}\n")
        response = agregador_pb2.simpleStringResponse()
        response.resposta = "Chamou SendDataPath "
        return response
    

    def MakeAggregation(self, request, context):
        print(f"Fazendo agregações com os seguintes parâmetros:\n{request}")

        #FIXME:  É, tá assim porque não sei como interar protobuffers e a documentação não ajuda
        aggr_req_dict = {}
        aggr_req_dict['data_inicio'] = request.data_inicio
        aggr_req_dict['data_fim'   ] = request.data_fim
        aggr_req_dict['cidade'     ] = request.cidade
        aggr_req_dict['vdc'        ] = request.vdc
        aggr_req_dict['idc'        ] = request.idc
        aggr_req_dict['vac'        ] = request.vac
        aggr_req_dict['iac'        ] = request.iac
        aggr_req_dict['frq'        ] = request.freq
        aggr_req_dict['pac'        ] = request.pac
        aggr_req_dict['ene'        ] = request.ene
        aggr_req_dict['whs'        ] = request.whs
        aggr_req_dict['CDTE'       ] = request.CDTE
        aggr_req_dict['CIGS'       ] = request.CIGS
        aggr_req_dict['MONO'       ] = request.MONO
        aggr_req_dict['POLI'       ] = request.POLI

        aggregations = _makeAgregation(aggr_req_dict)

        #FIXME: É, tá assim porque não sei como interar protobuffers e a documentação não ajuda (2)
        response = agregador_pb2.Agregregation()
        response.data_inicio = aggregations['data_inicio']
        response.data_fim    = aggregations['data_fim'   ]
        response.cidade      = aggregations['cidade'     ]
        response.vdc         = aggregations['vdc'        ]
        response.idc         = aggregations['idc'        ]
        response.vac         = aggregations['vac'        ]
        response.iac         = aggregations['iac'        ]
        response.freq        = aggregations['frq'        ]
        response.pac         = aggregations['pac'        ]
        response.ene         = aggregations['ene'        ]
        response.whs         = aggregations['whs'        ]
        response.erro        = aggregations['erro']

        print("Execução da requisição encerrada\n\n")
        return response


main()