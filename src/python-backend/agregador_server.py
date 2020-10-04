import grpc 
import concurrent
from concurrent import futures
import agregador_pb2
import agregador_pb2_grpc
import os
import pandas as pd 
from ftplib import FTP

ftp_params = None
local_files_path = None

def main():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    agregador_pb2_grpc.add_AggregationServicer_to_server(AggregationServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("servidor iniciado escutando na porta 50051")
    server.wait_for_termination()


def _makeAgregation(DATA_PATH,PERIODO,TIPO_INVERSOR, AGREGATIONS):
    # complete_df = fetchData(DATA_PATH,PERIODO,TIPO_INVERSOR)
    print("dentro_")
    ftp_params if print("chamou ftp") else print("chamou local")
    #TODO: Fazer cada agregação em AGREGATIONS e retornar lista com elas


def connectFTP(domain,user,password):
    ftp = FTP(domain)
    ftp.login(user=user, passwd=password)
    print()
    print(ftp.getwelcome())
    print()
    print(ftp.pwd())

    ftp.dir()        


def fetchData(DATA_PATH,PERIODO,TIPO_INVERSOR):

    dataframes_list = []
    # TODO: Converter string de periodo para lista de anos e meses separados
    YEARS = ['2019']
    MESES = ['08','11']

    try:
        # Filtra apenas diretórios que satisfazem parâmetros de busca, adicionando-os em um dataframe
        for path, dirs, files in os.walk(DATA_PATH):
            dirs[:] = [d for d in dirs
                        if d  in YEARS 
                        or d  in MESES
                        or d  in ['inversores'] 
                        or d  in TIPO_INVERSOR]
            #Lê arquivos com pandas e adiciona todos em um df
            for file in files:
                dataframes_list.append(normalizeDataframes(os.path.join(path,file)))
        complete_df = pd.concat(dataframes_list,ignore_index=True)
        print(complete_df.shape)
        print(complete_df.head())
        return complete_df
    except Exception as e:
        print(f"erro:{e}")
        return ("Ocorreu um ero ao buscar arquivos para agregação.\nVerifique se o diretório realmente contém os arquivos.\nErro: {e}")
    

def normalizeDataframes(file):
    df = pd.read_csv(file, encoding='utf8')
    if(len(df.columns) == 12):
        df['lim'] = '100%'
        df['fac'] =  1.00
    return df

def outer():
    global ftp_params
    print("chamou outer")
    print(ftp_params)
    ftp_params if print("chamou ftp") else print("chamou local")


class AggregationServicer(agregador_pb2_grpc.AggregationServicer):
    def SendParamsFTP(self, request, context):
        global ftp_params
        print("Dentro SendParamsFTP")
        response = agregador_pb2.simpleStringResponse()
        response.resposta = "Chamou SendParamsFTP "
        ftp_params = request
        outer()
        print(ftp_params)
        return response

    def SendDataPath(self, request, context):
        global local_files_path 
        local_files_path = request.req
        print("Dentro SendDataPath")
        print(request.req)
        print(request)
        response = agregador_pb2.simpleStringResponse()
        response.resposta = "Chamou SendDataPath "
        return response
    
    def MakeAggregation(self, request, context):
        print("we got something")
        response = agregador_pb2.AggregationResponse()
        response.resposta = "Sayaka: hey hey hey "
        _makeAgregation()
        return response

       
main()