#python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. agregador.proto
import grpc 
import concurrent
from concurrent import futures
import agregador_pb2
import agregador_pb2_grpc
import os
import re
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


def _makeAgregation(aggr_request_data):
    # complete_df = fetchData(DATA_PATH,PERIODO,TIPO_INVERSOR)
    print("dentro _makeAgregation")
    complete_df = ftp_params if fetchDataFTP(aggr_request_data) else fetchDataLocal(aggr_request_data)

    print(complete_df.shape)
    complete_df = complete_df.loc[complete_df["mod"] == 1]
    print(complete_df.shape)
    
    for key, value in aggr_request_data.items():
        if value!="" and (key=="whs" or key== "ene"):
            #TODO: achar um jeito melhor de escrever isso, e terminar essa lógica de agregação
            print(complete_df.loc[complete_df["timestamp_iso"] == complete_df.timestamp_iso.max()]['whs'].values[0])
            print(complete_df.loc[complete_df["timestamp_iso"] == complete_df.timestamp_iso.min()]['whs'].values[0]) 
            pass
        elif(value!=""):
            #TODO: Fazer agregação
            aggr_request_data[key] = "4"
            pass
        print(f"key:{key},value: {value}")

    return aggr_request_data


def connectFTP(domain,user,password):
    ftp = FTP(domain)
    ftp.login(user=user, passwd=password)
    print()
    print(ftp.getwelcome())
    print()
    print(ftp.pwd())

    ftp.dir()        


def fetchDataLocal(aggr_request_data):
    global local_files_path
    print('fetchDataLocal')
    print(local_files_path)
    dataframes_list = []
    # TODO: Converter string de periodo para lista de anos e meses separados
    data_inicio = aggr_request_data['data_inicio'][2:]
    data_fim    = aggr_request_data['data_fim'][2:]
    tech_type   = aggr_request_data['tech_type']
    print(data_inicio,data_fim)
    print(tech_type)

    if(tech_type=="todas"):
        pattern = re.compile(r'\w\w-\w\w\w\w-(\d\d-\d\d-\d\d|\d\d-\d\d-\d\d)')
    else:
        #TODO Mono e Poli é mon1 mon2 e pol1 pol2 ajustar essa porcaria
        pattern = re.compile(r'\w\w-'+f'{tech_type.lower()}' + r'-(\d\d-\d\d-\d\d' + r'|\d\d-\d\d-\d\d)')

    try:
        # Filtra apenas diretórios que satisfazem parâmetros de busca, adicionando-os em um dataframe
        for path, dirs, files in os.walk(local_files_path):
            # dirs[:] = [d for d in dirs
            #             if d  in  ['2019']
            #             or d  in ['08','11']
            #             or d  in ['inversores'] 
            #             or d  in 'cdte']

            #Lê arquivos com pandas e adiciona todos em um df
            for file in files:
                #TODO pegar parte numerica e convert to date time, comparar se esta intevalo  
                if(pattern.match(file[:-4])):
                    print(file)
                    dataframes_list.append(normalizeDataframes(os.path.join(path,file)))
        complete_df = pd.concat(dataframes_list,ignore_index=True)
        print(complete_df.shape)
        print(complete_df.head())
        return complete_df
    except Exception as e:
        print(f"erro:{e}")
        return ("Ocorreu um ero ao buscar arquivos para agregação.\nVerifique se o diretório realmente contém os arquivos.\nErro: {e}")
    

def fetchDataFTP(aggr_request_data):
    print('fetchDataFTP')
    pass

def normalizeDataframes(file):
    df = pd.read_csv(file, encoding='utf8')
    if(len(df.columns) == 12):
        df['lim'] = '100%'
        df['fac'] =  1.00
    return df


class AggregationServicer(agregador_pb2_grpc.AggregationServicer):
    def SendParamsFTP(self, request, context):
        global ftp_params
        global local_files_path 
        print("Dentro SendParamsFTP")
        ftp_params = request
        local_files_path = None
        response = agregador_pb2.simpleStringResponse()
        response.resposta = "Chamou SendParamsFTP "
        print(ftp_params)
        return response


    def SendDataPath(self, request, context):
        global ftp_params
        global local_files_path 
        print("Dentro SendDataPath")
        local_files_path = request.req
        ftp_params = None
        print(request.req)
        print(request)
        response = agregador_pb2.simpleStringResponse()
        response.resposta = "Chamou SendDataPath "
        return response
    

    def MakeAggregation(self, request, context):
        print("Fazendo agregações")
        
        # É, tá assim porque não sei como interar protobuffers e a documentação não ajuda
        aggr_req_dict = {}
        aggr_req_dict['data_inicio'] = request.data_inicio
        aggr_req_dict['data_fim'] = request.data_fim
        aggr_req_dict['tech_type'] = request.tech_type
        aggr_req_dict['vdc'] = request.vdc
        aggr_req_dict['idc'] = request.idc
        aggr_req_dict['vac'] = request.vac
        aggr_req_dict['iac'] = request.iac
        aggr_req_dict['freq'] = request.freq
        aggr_req_dict['pac'] = request.pac
        aggr_req_dict['ene'] = request.ene
        aggr_req_dict['whs'] = request.whs

        aggregations = _makeAgregation(aggr_req_dict)

        # É, tá assim porque não sei como interar protobuffers e a documentação não ajuda ()
        response = agregador_pb2.Agregregation()
        response.data_inicio= aggregations['data_inicio']
        response.data_fim= aggregations['data_fim']
        response.tech_type= aggregations['tech_type']
        response.vdc= aggregations['vdc']
        response.idc= aggregations['idc']
        request.vac = aggregations['vac']
        request.iac = aggregations['iac']
        request.freq = aggregations['freq']
        request.pac = aggregations['pac']
        request.ene = aggregations['ene']
        request.whs = aggregations['whs']

        return response


main()