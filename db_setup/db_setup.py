import sqlite3
import mysql.connector
import csv

class csvrd(object):
    def makeDB(self):
        conn = sqlite3.connect('fleet_data.db')
        cur = conn.cursor() 
        cur.execute("""DROP TABLE IF EXISTS FleetStatistics""")
        cur.execute("""CREATE TABLE IF NOT EXISTS FleetStatistics(
                AssetId INT,
                Date DATE,
                AssetType VARCHAR,
                TotalHours REAL,
                TotalFuel REAL,
                FuelPct REAL,
                Lat REAL,
                Lng REAL,
                PRIMARY KEY (AssetId, Date)
        )""")

    def readFile(self, filename):
        conn = sqlite3.connect('fleet_data.db')
        cur = conn.cursor() 
        filename.encode('utf-8')
        i = 0
        with open(filename) as f:
            reader = csv.reader(f)
            next(reader)
            for field in reader:
                i += 1
                if(i % 10000 == 0):
                    print(i)
                cur.execute("INSERT INTO FleetStatistics VALUES (%s,%s,%s,%s,%s,%s,%s,%s);", field)

        conn.commit()
        conn.close()

c = csvrd()
c.makeDB()
c.readFile('./db_setup/hack_illinois_part1.csv')
c.readFile('./db_setup/hack_illinois_part2.csv')
