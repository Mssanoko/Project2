DROP DATABASE clientsDB;
CREATE DATABASE clientsDB;

USE clientsDB;

-- create table burgers -- 
CREATE TABLE clients (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(80) NOT NULL,
    address VARCHAR(30) NOT NULL,
    email VARCHAR(80) NOT NULL,
    phone INT(12) NOT NULL,
    newClients BOOLEAN DEFAULT true,
    serviceID INT Foreign Key,
    PRIMARY KEY(id)
);

CREATE TABLE service (
    id AUTO_INCREMENT NOT NULL,
    clientName VARCHAR(30) NOT NULL,
    clientAddress , --how to pull from TABLE clients address--
    finishedJob VARCHAR(500) NOT NULL,
    invoicedAmount DECIMAL(8,2) NULL,
    paid BOOLEAN DEFAULT false,
    PRIMARY KEY(id)
)