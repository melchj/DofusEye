# a test script for sending requests to the api
import requests
import os

BASE = 'http://127.0.0.1:5000'

# load in .flaskenv variables manually
# TODO: this might break if SECRET_KEY in .flaskenv has quotes around it or something (i.e. SECRET_KEY='keyHere')
dir_path = os.path.dirname(os.path.realpath(__file__))
with open(os.path.join(dir_path, '.flaskenv'), 'r') as fh:
    vars_dict = dict(
        tuple(line.replace('\n', '').replace(' ', '').split('='))
        for line in fh.readlines() if not line.startswith('#')
    )
# print(vars_dict)
os.environ.update(vars_dict)
print(f"SECRET_KEY={os.environ.get('SECRET_KEY')}")

def reqGet(endpoint:str, query:str=''):
    url = BASE + endpoint
    if query is not '':
        url = url + '?' + query
    print(f"GET: {url}")
    response = requests.get(url, headers={"x-api-key" : os.environ.get('SECRET_KEY')})
    print(response)
    if response.ok:
        # print(response.json())
        return response.json()

def reqPost(endpoint:str, query:str=''):
    url = BASE + endpoint
    if query is not '':
        url = url + '?' + query
    print(f"POST: {BASE + url}")
    response = requests.post(url, headers={"x-api-key" : os.environ.get('SECRET_KEY')})
    print(response)
    if response.ok:
        # print(response.json())
        return response.json()

reqGet('/api/')
# reqGet('/api/aliases')
reqGet('/api/aliases','name=celunt')


# reqPost('/api/aliases', 'account_name=atest&character_name=ctest')
reqGet('/api/aliases', 'name=ctest')

reqGet('/api/fights/333')
reqGet('/api/fights', 'ids=33,25,366,453')

reqGet('/api/fightids/characters/celunt')
reqGet('/api/fights/characters/celunt')

