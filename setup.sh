export flask_app=fleetman_server
export flask_env=development
pip install -e .
python3 ./db_setup/db_setup.py
cd frontend
npm i
cd ..
./run.sh
