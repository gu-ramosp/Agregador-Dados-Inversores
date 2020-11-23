#python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. agregador.proto
import os
import re
from datetime import datetime
import pandas as pd 
import data_fetcher
from data_fetcher import fetchDataFTP, fetchDataLocal

def _makeAgregation(aggr_request_data):
    try:
        aggr_request_data['erro'] = False
        regex_string, data_inicio, data_fim = makeRegexString(aggr_request_data)
        complete_df = fetchDataFTP(regex_string,data_inicio, data_fim) if data_fetcher.ftp_params else fetchDataLocal(regex_string,data_inicio, data_fim)
        complete_df = complete_df.loc[complete_df["mod"] == 1]
        print(f'\nDataset final apresenta o seguinte número de linhas e colunas respectivamente: {complete_df.shape}')
        print(f'Amostra do dataset final:\n {complete_df.head()}')

        print("\nIniciando Agregações")
        for key, value in aggr_request_data.items():
            if value!="" and (key=="whs" or key== "ene"):
                valor_final = complete_df.loc[complete_df["timestamp_iso"] == complete_df.timestamp_iso.max()][key].values[0]
                valor_inicial = complete_df.loc[complete_df["timestamp_iso"] == complete_df.timestamp_iso.min()][key].values[0]
                valor_total = valor_final - valor_inicial
                aggr_request_data[key] = str(valor_total)
            elif(value!="" and (key in complete_df.columns) ):
                print(f'Realizando agregação {value} da variável {key}')
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
    except Exception as e:
        aggr_request_data['erro'] = True
        print(e)

    print(f'\nResultado das agregações: {aggr_request_data}\n')
    return aggr_request_data


def makeRegexString(aggr_request_data):
    try:
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
    
    except Exception as e:
        print("faltando dados na requisição")

    return pattern, data_inicio, data_fim
