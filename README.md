# SYSTEM REQUIREMENTS:
- NODE JS: v. 16+
- MARIADB:  10.8.3
- Ansible
- python3

1. Install backend packages
```
npm install
```
2. Env variables:
```
PORT=8080
DB_USERNAME=sd
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=db
```
If need to create a new database with the tables (values provided for example)
```
DB_NAME=db
DB_TABLE_NAME=auth
```

3. Create DB [OPTIONAL]
```
npm run create_db
```
4. Build client (from the root project folder)
```
cd client && npm run build
```
5. Run server (from the root project folder)
```
cd backend && npm start 
```
6. Open port 8080
