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
            "fuel_used": tfuel * (0.01*pctfuel),
            "lat": lat,
            "lng": lng
        })

    return assetdata

def fill_assetdata_rows_simple2(cursor):
    assetdata = []
    for (aid, atype) in cursor:
        assetdata.append({
            "asset_id": aid,
            "asset_type": atype
        })

    return assetdata

def fill_assetdata_rows_simple(cursor):
    assetdata = []
    for (aid, date, lat, lng) in cursor:
        assetdata.append({
            "asset_id": aid,
            "date": date,
            "lat": lat,
            "lng": lng
        })

    return assetdata

# Get all of an assets' data
@app.route('/fleet/assets/all', methods=['GET'])
def get_all_assetids():
    conn, cursor = db_acq_lock()

    query = "SELECT DISTINCT AssetId, AssetType FROM FleetStatistics LIMIT 1000"
    print(query)
    cursor.execute(query)
    data = fill_assetdata_rows_simple2(cursor)
    
    db_rel_lock()

    return jsonify({
        'data': data
    })


# Get all of an assets' data
@app.route('/fleet/id/<asset_id>', methods=['GET'])
def get_assetdata_by_id(asset_id):
    conn, cursor = db_acq_lock()

    query = "SELECT * FROM FleetStatistics WHERE AssetId = ?"
    print(query)
    params = (str(asset_id), )
    cursor.execute(query, params)
    data = fill_assetdata_rows(cursor)

    query = """SELECT avg(Lat) as avgLat,
        avg(Lng) as avgLng,
        max(Lat) as maxLat,
        min(Lat) as minLat,
        max(Lng) as maxLng,
        min(Lng) as minLng
        FROM FleetStatistics WHERE AssetId = ?"""
    cursor.execute(query, params)
    geoinfo = { }
    for (lat, lng, maxLat, minLat, maxLng, minLng) in cursor:
        geoinfo = {
            'lat': lat,
            'lng': lng,
            'maxLat': maxLat,
            'minLat': minLat,
            'maxLng': maxLng,
            'minLng': minLng,
        }

    db_rel_lock()

    return jsonify({
        'geoinfo': geoinfo,
        'data': data
    })

# Get all assets' most recent locations
@app.route('/fleet/all', methods=['GET'])
def get_all_recent():
    conn, cursor = db_acq_lock()

    query = """SELECT t1.AssetId, t1.Date, t1.Lat, t1.Lng 
        FROM FleetStatistics t1 WHERE t1.date = (
            SELECT max(date)
            FROM FleetStatistics t2
            WHERE t1.AssetId = t2.AssetId
        ) LIMIT 1000"""

    cursor.execute(query)
    data = fill_assetdata_rows_simple(cursor)
    
    geoinfo = {
        'lat': 0,
        'lng': 0,
        'maxLat': 0,
        'minLat': 0,
        'maxLng': 0,
        'minLng': 0,
    }

    db_rel_lock()

    return jsonify({
        'geoinfo': geoinfo,
        'data': data
    })

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
