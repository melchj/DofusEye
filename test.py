# a test script that gets info from the api
import requests

BASE = 'http://127.0.0.1:5000'

def reqGet(endpoint:str):
    print(f"GET: {endpoint}")
    response = requests.get(endpoint)
    print(response.json())


reqGet(BASE + '/')
# reqGet(BASE + '/aliases')
reqGet(BASE + '/aliases?name=celunt')

# reqGet(BASE + '/fights/333')