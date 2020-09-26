import os
import pandas as pd 
from ftplib import FTP

# TODO: Substituir por dados recebidos do electron
#  Opções que serão pegas da interface no electron
FTP_DOMAIN = "127.0.0.1"
FTP_USER = 'Gustavo'
FPT_PASSWORD = ''
DATA_PATH = "./data"
PERIODO = "19-07-29_19-07-29"
TIPO_INVERSOR = ['cdte']
AGREGATIONS = [{'vdc:"média'},{'energia_diaria':'total'}] 
CIDADES = []

0
def main():
    #makeAgregation(DATA_PATH,PERIODO,TIPO_INVERSOR, AGREGATIONS)
    connectFTP(FTP_DOMAIN,FTP_USER,FPT_PASSWORD)

def makeAgregation(DATA_PATH,PERIODO,TIPO_INVERSOR, AGREGATIONS):
    complete_df = fetchData(DATA_PATH,PERIODO,TIPO_INVERSOR)
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
    
   
    

if __name__ == "__main__":
    main()