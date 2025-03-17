# test
This project needs an existing running MySQL server and node 22. I expected the mysql to just have the default root credentials, but if that is not the case please change the files:
- [data-source.ts](backend%2Fdata-source.ts)
- [migrate.ts](backend%2Fsrc%2Fmigrate.ts)

## Setup
- Run `npm install` on the root.
- Run `npm run setup` - It will install necessary packages for both frontend and backend
- To start the application and create the database for the backend just run `npm run start`
- Open  http://localhost:4200/