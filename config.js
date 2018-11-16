// Pull MSSQL Docker container,
// to run local instance of MSSQL Server DB

// BASH / LINUX
// sudo docker pull mcr.microsoft.com/mssql/server:2017-latest
// WINDOWS POWERSHELL
// docker pull mcr.microsoft.com/mssql/server:2017-latest
/* 
BASH / LINUX  (Backticks cmd line break linux): 
sudo docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=some-good-pw' \
   -p 1433:1433 --name sql-instance \
   -d mcr.microsoft.com/mssql/server:2017-latest

POWERSHELL / WINDOWS (Backticks cmd line break windows):
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=some-good-pw" `
   -p 1433:1433 --name sql-instance `
   -d mcr.microsoft.com/mssql/server:2017-latest

SINGLE LINE: 
sudo docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=some-good-pw' -p 1433:1433 --name sql-instance -d mcr.microsoft.com/mssql/server:2017-latest
*/

/*
MYSQL (For testing)
docker run --name auth-test -e MYSQL_ROOT_PASSWORD=some-good-pw -e MYSQL_DATABASE=users -p 3307:3307 -d mysql:5.7
*/

// const config = {
//   secret: "your-jwt-secret",
//   DATABASE_NAME: "sql-instance",
//   DATABASE_USER: "root", // whatever your username is
//   DATABASE_PASSWORD: "some-good-pw",
//   DATABASE_HOST: "127.0.0.1",
//   DATABASE_PORT: 1433
// };

const config = {
  secret: "your-jwt-secret",
  DATABASE_NAME: "users",
  DATABASE_USER: "root", // whatever your username is
  DATABASE_PASSWORD: "some-good-pw",
  DATABASE_HOST: "localhost",
  DATABASE_PORT: 3307,
  DATABASE_DIALECT: "mysql"
};

module.exports = config;
