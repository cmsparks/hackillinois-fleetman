import sqlite3
from threading import Thread, Lock

conn = sqlite3.connect('fleet_data.db', check_same_thread=False)

cursor = conn.cursor()

mutex = Lock()

def db_acq_lock():
    mutex.acquire()
    return conn, cursor

def db_rel_lock():
    mutex.release()
