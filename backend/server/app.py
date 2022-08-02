import pandas as pd
from flask import Flask, jsonify
# from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
# api = Api(app)


pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)
pd.set_option('display.max_colwidth', -1)
data = pd.read_excel('result.xlsx')
df = pd.DataFrame(data)

df = df.dropna(subset=['Lat','Lon'])

@app.route('/', methods=['GET', 'POST'])
def parse_request():
  
   return df.to_json(orient='records')