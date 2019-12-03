import calendar
import time
from operator import itemgetter
from flask import Flask,request, jsonify
from flask_restful import Resource, Api
from bandwidths import BANDWIDTHS
from functools import reduce

app = Flask(__name__)
api = Api(app)

class BandWidths(Resource):
    def get(self, device_uuid):
        end_time = int(request.args.get('end_time')) if not (request.args.get('end_time') is None) else int(calendar.timegm(time.gmtime())) 
        window_time = int(request.args.get('window_time')) if not (request.args.get('window_time') is None) else 60
        num_windows = int(request.args.get('num_windows')) if not (request.args.get('num_windows') is None) else 10

        deviceBandwidths = sorted(list(filter(lambda x: x['device_id'] == device_uuid, BANDWIDTHS)), key=itemgetter('timestamp'))

        bytes_toServer = []
        bytes_fromServer = []

        res = dict()

        base_timestamp = min(x['timestamp'] for x in deviceBandwidths)
        global previous_timestamp
        previous_timestamp = base_timestamp
        
        for i in range(1, num_windows):
            maxRangeTimestamp = base_timestamp + (window_time * i)
            bandwidthRange = list(filter(lambda x: (x['timestamp'] <= end_time ) and (x['timestamp'] <= maxRangeTimestamp) and (x['timestamp'] >= previous_timestamp), deviceBandwidths))
            
            btsDict = dict()
            btsDict['sumOfBytes'] = sum(x['bytes_ts'] for x in bandwidthRange)
            btsDict['timestamp'] = maxRangeTimestamp

            bfsDict = dict()
            bfsDict['sumOfBytes'] = sum(x['bytes_fs'] for x in bandwidthRange)
            bfsDict['timestamp'] = maxRangeTimestamp

            bytes_toServer.append(btsDict)
            bytes_fromServer.append(bfsDict)
            previous_timestamp += window_time

        res['bts'] = bytes_toServer
        res['bfs'] = bytes_fromServer
        return res

api.add_resource(BandWidths, '/bandwidths/<string:device_uuid>')

if __name__ == '__main__':
    app.run(debug=True)

