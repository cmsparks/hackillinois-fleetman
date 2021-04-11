export flask_app=fleetman_server
export flask_env=development
cd frontend
npm run build
cd ..
flask run
