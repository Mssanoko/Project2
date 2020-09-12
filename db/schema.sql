DROP DATABASE IF Exists clientsDB;
CREATE DATABASE clientsDB;

USE clientsDB;

-- create table clients-- 
CREATE TABLE clients (
    id INT AUTO_INCREMENT NOT NULL,
    clientName VARCHAR(80) NOT NULL,
    address VARCHAR(30) NOT NULL,
    email VARCHAR(80) NOT NULL,
    phone INT(12) NOT NULL,
    newClients BOOLEAN DEFAULT true,
    invoiceID INT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (invoiceID) REFERENCES invoice(id) ON DELETE CASCADE
);

-- create table invoice-- 
CREATE TABLE invoice (
    id INT AUTO_INCREMENT NOT NULL,
    clientName VARCHAR(30) NOT NULL,
    jobAddress VARCHAR(30) NOT NULL, -- how to pull from TABLE clients address? --
    jobDescription VARCHAR(500) NOT NULL,
    jobStartDate VARCHAR(10) NOT NULL,
    jobFinishDate VARCHAR(10) NOT NULL,
    invoicedAmount DECIMAL(8,2) NULL,
    invoiceDue INT NULL,
    paid BOOLEAN DEFAULT false,
    PRIMARY KEY(id)
)