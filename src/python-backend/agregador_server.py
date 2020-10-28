#python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. agregador.proto
import grpc 
import concurrent
from concurrent import futures
import agregador_pb2
import agregador_pb2_grpc
import os
import re
from datetime import datetime
import pandas as pd 
from ftplib import FTP
import ftputil

ftp_params = None
local_files_path = None
DEBUG_FTP_HOST = '127.0.0.1'
DEBUG_FTP_USER = 'Gustavo'
DEBUG_FPT_PASSWORD = 'password'

#TODO: Lógica de buscas de dados duplicada para FPT e Local. Optimizar

def main():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    agregador_pb2_grpc.add_AggregationServicer_to_server(AggregationServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("(Versão 0.8) Servidor iniciado escutando na porta 50051")
    server.wait_for_termination()


def _makeAgregation(aggr_request_data):
    print("dentro _makeAgregation")
    regex_string, data_inicio, data_fim = makeRegexString(aggr_request_data)
    complete_df = fetchDataFTP(regex_string,data_inicio, data_fim) if ftp_params else fetchDataLocal(regex_string,data_inicio, data_fim)
    complete_df = complete_df.loc[complete_df["mod"] == 1]

    for key, value in aggr_request_data.items():
        print(f'key: {key}, value:  {value}')
        if value!="" and (key=="whs" or key== "ene"):
            valor_final = complete_df.loc[complete_df["timestamp_iso"] == complete_df.timestamp_iso.max()][key].values[0]
            valor_inicial = complete_df.loc[complete_df["timestamp_iso"] == complete_df.timestamp_iso.min()][key].values[0]
            valor_total = valor_final - valor_inicial
            aggr_request_data[key] = str(valor_total)
        elif(value!="" and (key in complete_df.columns) ):
            print(f'key: {key}, value:  {value}\n')
            if(value=="mean"):
                aggr_request_data[key] = str( complete_df[key].mean())
            elif(value=="median"):
                aggr_request_data[key] = str( complete_df[key].median())
            elif(value=="sum"):
                aggr_request_data[key] = str( complete_df[key].sum())
            elif(value=="max"):
                aggr_request_data[key] = str( complete_df[key].max())
            else:
                aggr_request_data[key] = str( complete_df[key].min())
            print(value)

    print(aggr_request_data)
    return aggr_request_data


def makeRegexString(aggr_request_data):
    data_inicio = aggr_request_data['data_inicio']
    data_fim    = aggr_request_data['data_fim']
    cidade   = aggr_request_data['cidade']
    data_inicio = datetime.strptime(data_inicio, '%Y-%m-%d')
    data_fim = datetime.strptime(data_fim , '%Y-%m-%d')
    exclusion_lista_tech = []
    string_CDTE =  r'cdte'  if aggr_request_data['CDTE']  else ''
    string_CIGS =  r'cigs'  if aggr_request_data['CIGS'] else ''
    string_MONO =  r'mon\d' if aggr_request_data['MONO'] else ''
    string_POLI =  r'pol\d' if aggr_request_data['POLI'] else ''

    if(cidade=="todas"):
        pattern = re.compile(r'\w\w-'+ f'({string_CDTE}|{string_CIGS}|{string_MONO}|{string_POLI})'+ r'-\d\d-\d\d-\d\d')
    else:
        pattern = re.compile(f'{cidade}-'+ f'({string_CDTE}|{string_CIGS}|{string_MONO}|{string_POLI})' + r'-\d\d-\d\d-\d\d')
    print(pattern)
    return pattern, data_inicio, data_fim


def fetchDataLocal(regex_string,data_inicio,data_fim):
    print('fetchDataLocal')
    global local_files_path
    dataframes_list = []

    try:
        for path, dirs, files in os.walk(local_files_path):    
            #Lê arquivos com pandas e adiciona todos em um df
            for file in files:
                # Filtra apenas diretórios que satisfazem parâmetros de busca, adicionando-os em um dataframe
                if regex_string.match(file[:-4]):
                    try:
                        data_file = datetime.strptime(file[8:-4], '%y-%m-%d')
                        if(data_file > data_inicio and data_file < data_fim):
                            dataframes_list.append(normalizeDataframes(os.path.join(path,file)))
                    except:
                        print(f"Erro ao ler arquivo:\n{file}\n\n\n")
        complete_df = pd.concat(dataframes_list,ignore_index=True)
        print(complete_df.shape)
        print(complete_df.head())
        return complete_df
    except Exception as e:
        print(f"erro:{e}")
        return ("Ocorreu um ero ao buscar arquivos para agregação.\nVerifique se o diretório realmente contém os arquivos.\nErro: {e}")
    

def fetchDataFTP(regex_string,data_inicio,data_fim):
    print('fetchDataFTP')
    global ftp_params 
    dataframes_list = []

    try:
        with ftputil.FTPHost(ftp_params.host, ftp_params.usuario, ftp_params.senha) as host:
            for path, dirs, files in host.walk(host.curdir):
                for file in files:
                # Filtra apenas diretórios que satisfazem parâmetros de busca, adicionando-os em um dataframe
                    if regex_string.match(file[:-4]):
                        try:
                            data_file = datetime.strptime(file[8:-4], '%y-%m-%d')
                            if(data_file > data_inicio and data_file < data_fim):
                                with host.open(host.path.join(path,file), "r", encoding="utf8") as remote_file:
                                    dataframes_list.append(normalizeDataframes(remote_file))
                        except Exception as e:
                            print(e)
            complete_df = pd.concat(dataframes_list,ignore_index=True)
            print(complete_df.shape)
            print(complete_df.head())
            return complete_df
    except Exception as e:
            print(f"erro:{e}")
            return ("Ocorreu um ero ao buscar arquivos para agregação.\nVerifique se o diretório realmente contém os arquivos.\nErro: {e}")


def normalizeDataframes(file):
    try:
        df = pd.read_csv(file, encoding='utf8')
        if(len(df.columns) == 12):
            df['lim'] = '100%'
            df['fac'] =  1.00
        return df
    except Exception as e:
        print(e)


class AggregationServicer(agregador_pb2_grpc.AggregationServicer):
    def SendParamsFTP(self, request, context):
        global ftp_params
        global local_files_path 
        ftp_params = request
        local_files_path = None
        print(ftp_params)
        response = agregador_pb2.simpleStringResponse()
        try:
            with FTP(request.host,timeout=1) as ftp:
                ftp.login(user=request.usuario, passwd=request.senha)
                conn_res =  '203'
        except Exception as e:
            print(e)
            conn_res = "erro"
        response.resposta = conn_res
        print(ftp_params)
        return response


    def SendDataPath(self, request, context):
        global ftp_params
        global local_files_path 
        print("Dentro SendDataPath")
        local_files_path = request.req
        ftp_params = None
        print(request)
        response = agregador_pb2.simpleStringResponse()
        response.resposta = "Chamou SendDataPath "
        return response
    

    def MakeAggregation(self, request, context):
        print("Fazendo agregações")
        print(request)

        #FIXME:  É, tá assim porque não sei como interar protobuffers e a documentação não ajuda
        aggr_req_dict = {}
        aggr_req_dict['data_inicio'] = request.data_inicio
        aggr_req_dict['data_fim'] = request.data_fim
        aggr_req_dict['cidade'] = request.cidade
        aggr_req_dict['vdc'] = request.vdc
        aggr_req_dict['idc'] = request.idc
        aggr_req_dict['vac'] = request.vac
        aggr_req_dict['iac'] = request.iac
        aggr_req_dict['frq'] = request.freq
        aggr_req_dict['pac'] = request.pac
        aggr_req_dict['ene'] = request.ene
        aggr_req_dict['whs'] = request.whs
        aggr_req_dict['CDTE'] = request.CDTE
        aggr_req_dict['CIGS'] = request.CIGS
        aggr_req_dict['MONO'] = request.MONO
        aggr_req_dict['POLI'] = request.POLI

        aggregations = _makeAgregation(aggr_req_dict)

        #FIXME: É, tá assim porque não sei como interar protobuffers e a documentação não ajuda (2)
        response = agregador_pb2.Agregregation()
        response.data_inicio= aggregations['data_inicio']
        response.data_fim= aggregations['data_fim']
        response.cidade= aggregations['cidade']
        response.vdc= aggregations['vdc']
        response.idc= aggregations['idc']
        response.vac = aggregations['vac']
        response.iac = aggregations['iac']
        response.freq = aggregations['frq']
        response.pac = aggregations['pac']
        response.ene = aggregations['ene']
        response.whs = aggregations['whs']

        print("finalizou request")
        return response


main()