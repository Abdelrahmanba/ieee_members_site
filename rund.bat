@ECHO OFF
cd api 
START npm run dev 
START npm run db
CD ..\client
START npm start
EXIT