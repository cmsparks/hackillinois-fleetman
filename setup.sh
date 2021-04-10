export FLASK_APP=fleetman_server
export FLASK_ENV=development
pip install -e .
python3 ./db_setup/db_setup.py
cd frontend
npm i
cd ..
./run.sh
