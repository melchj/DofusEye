# a test script for sending requests to the api
import requests

BASE = 'http://127.0.0.1:5000'

def reqGet(url:str):
    url = BASE + url
    print(f"GET: {url}")
    response = requests.get(url)
    print(response)
    if response.ok:
        print(response.json())

def reqPost(url:str):
    url = BASE + url
    print(f"POST: {BASE + url}")
    response = requests.post(url)
    print(response)
    if response.ok:
        print(response.json())

reqGet('/api/')
# reqGet('/api/aliases')
reqGet('/api/aliases?name=celunt')

reqPost('/api/aliases?account_name=atest&character_name=ctest')
reqGet('/api/aliases?name=ctest')


reqGet('/api/fights/333')
reqGet('/api/fights?ids=33,25,366,453')

reqGet('/api/fightids/character/celunt')
reqGet('/api/fights/character/celunt')
