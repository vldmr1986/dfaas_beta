# SYSTEM REQUIREMENTS:
- NODE JS: v. 16+
- MARIADB:  10.8.3
- Ansible (should be linked to python3)
- python3

1. Install backend packages
```
cd backend
npm install
```
2. Env variables: 
There are 2 env files(you should create these 2 files on the server(inside the backend folder):
 - .env.integration
 - .env.prod
So it convenient to switch between integration and production environments(see package.json): 
 - integration: npm run intg
 - production: npm run prod

Info of each env file (use info of your DB, these values just for example)
```
PORT=443
DB_USERNAME=sd
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=db
// Get this info from backend team (each env
tenantId
issuer
api_client_id
api_client_secret
```

If need to create a new database with the tables (values provided for example)
```
DB_NAME=db
DB_TABLE_NAME=auth
```
3. Certificates (get valid certificates - Mitra)
Put 2 files (cert.crt, key.key) into folder "/backend/certificates"
4. Create DB [OPTIONAL]  (it will create db with the name in .env.<NODE_ENV>)
```
npm run create_db
```
5. Build client (from the root project folder)
```
cd client && npm run build
```
6. Run server (from the root project folder)
```
cd backend && npm run prod 
```
7. Open port <PORT> (from .env.<NODE_ENV>)
