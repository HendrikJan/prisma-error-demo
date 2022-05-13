CREATE DATABASE IF NOT EXISTS `test`;
CREATE USER IF NOT EXISTS 'development'@'%' IDENTIFIED BY 'secret';
CREATE USER IF NOT EXISTS 'development'@'nodejs.prisma_demo' IDENTIFIED BY 'secret';
CREATE USER IF NOT EXISTS 'development'@'localhost' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON *.* TO 'development'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'development'@'nodejs.prisma_demo';
GRANT ALL PRIVILEGES ON *.* TO 'development'@'%';
FLUSH PRIVILEGES;

SET GLOBAL slow_query_log_file = '/var/log/mysql/slow_query_log.log';
SET GLOBAL long_query_time = 2;
SET GLOBAL slow_query_log = 'ON';