# a test script for sending requests to the api
import requests

BASE = 'http://127.0.0.1:5000'

def reqGet(url:str):
    print(f"GET: {url}")
    response = requests.get(url)
    print(response)
    if response.ok:
        print(response.json())

def reqPost(url:str):
    print(f"POST: {url}")
    response = requests.post(url)
    print(response)
    if response.ok:
        print(response.json())

reqGet(BASE + '/')
# reqGet(BASE + '/aliases')
reqGet(BASE + '/aliases?name=celunt')

reqPost(BASE + '/aliases?account_name=atest&character_name=ctest')
reqGet(BASE + '/aliases?name=ctest')


# reqGet(BASE + '/fights/333')