from fleetman_server import app
from .db import (db_acq_lock, db_rel_lock)
from flask import (jsonify)

def fill_assetdata_rows(cursor):
    assetdata = []
    for (aid, date, atype, thours, tfuel, pctfuel, lat, lng) in cursor:
        assetdata.append({
            "asset_id": aid,
            "date": date,
            "asset_type": atype,
            "total_hours": thours,
            "total_fuel": tfuel,
            "pct_fuel": pctfuel,
            "lat": lat,
            "lng": lng
        })

    return assetdata

# Get all of an assets' data
@app.route('/fleet/id/<asset_id>', methods=['GET'])
def get_assetdata_by_id(asset_id):
    conn, cursor = db_acq_lock()

    query = "SELECT * FROM FleetStatistics WHERE AssetId = ?"
    print(query)
    params = (str(asset_id), )
    cursor.execute(query, params)
    data = fill_assetdata_rows(cursor)

    db_rel_lock()
    return jsonify({'data':data})

# Get all data from a date
@app.route('/fleet/date/<date>', methods=['GET'])
def get_assetdata_by_date(date):
    conn, cursor = db_acq_lock()

    orders = []
    query = "SELECT * FROM FleetStatistics WHERE Date = ?"
    params = (str(date), )
    cursor.execute(query, params)
    data = fill_assetdata_rows(cursor)

    db_rel_lock()
    return jsonify({'data': data})
