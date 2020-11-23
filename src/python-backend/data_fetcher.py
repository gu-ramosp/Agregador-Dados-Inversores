import pandas as pd 
import os
from ftplib import FTP
import ftputil
from datetime import datetime


# TODO: Lógica de buscas de dados duplicada para FPT e Local. Optimizar


ftp_params = None
local_files_path = None


def fetchDataLocal(regex_string,data_inicio,data_fim):
    print('Fazendo busca dos arquivos na máquina local:')
    global local_files_path
    dataframes_list = []
    progresso = 0

    try:
        for path, dirs, files in os.walk(local_files_path):    
            #Lê arquivos com pandas e adiciona todos em um df
            for file in files:
                # Filtra apenas diretórios que satisfazem parâmetros de busca, adicionando-os em um dataframe
                if regex_string.match(file[:-4]):
                    try:
                        data_file = datetime.strptime(file[8:-4], '%y-%m-%d')
                        if(data_file > data_inicio and data_file < data_fim):
                            progresso+=1
                            print(f'{progresso} arquivos processados')
                            dataframes_list.append(normalizeDataframes(os.path.join(path,file)))
                    except:
                        print(f"Erro ao ler arquivo:\n{file}\nNome do arquivo diferente do padrão especificado pelo regex")
        if dataframes_list == []:
            print('Diretório escolhido não contém dados')
        complete_df = pd.concat(dataframes_list,ignore_index=True)
        return complete_df
    
    except Exception as e:
        return ("Ocorreu um ero ao buscar arquivos para agregação.\nVerifique se o diretório realmente contém os arquivos.\nErro: {e}")
    

def fetchDataFTP(regex_string,data_inicio,data_fim):
    print('Fazendo busca dos arquivos em um Servidor FTP:')
    global ftp_params 
    dataframes_list = []
    progresso = 0

    try:
        with ftputil.FTPHost(ftp_params.host, ftp_params.usuario, ftp_params.senha, ftp_params.porta) as host:
            if(ftp_params.servidor_labens == "true"):
                host.chdir('importados')
            for path, dirs, files in host.walk(host.curdir):
                for file in files:
                    # Filtra apenas diretórios que satisfazem parâmetros de busca, adicionando-os em um dataframe
                    if regex_string.match(file[:-4]):
                        try:
                            data_file = datetime.strptime(file[8:-4], '%y-%m-%d')
                            if(data_file > data_inicio and data_file < data_fim):
                                progresso+=1
                                print(f'{progresso} arquivos processados')
                                with host.open(host.path.join(path,file), "r", encoding="utf8") as remote_file:
                                    dataframes_list.append(normalizeDataframes(remote_file))
                        except Exception as e:
                            # print(f"Erro ao ler arquivo:\n{file}\n{e}")
                            pass

            complete_df = pd.concat(dataframes_list,ignore_index=True)
            return complete_df

    except Exception as e:
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