SET NAMES UTF8;
DROP DATABASE IF EXISTS X;
CREATE DATABASE X CHARSET=UTF8;
USE X;
CREATE TABLE shopcart(
    id INT PRIMARY key AUTO_INCREMENT,
    cid INT,
    title VARCHAR(255),
    price BIGINT,
    color VARCHAR(32),
    size VARCHAR(32),
    count INT,
    img VARCHAR(255),
    sum VARCHAR(25)
)
CREATE TABLE comment(
    id INT PRIMARY key AUTO_INCREMENT,
    tx VARCHAR(128),
    uname VARCHAR(128),
    ctime DATETIME,
    content VARCHAR(256)
)

CREATE TABLE users(
    id INT PRIMARY key AUTO_INCREMENT,
    uid INT AUTO_INCREMENT,
    name VARCHAR(100),
    uname VARCHAR(100),
    upwd VARCHAR(100),
    phone CHAR(20),
    gender BOOLEAN,
    tx VARCHAR(200)
)

CREATE TABLE login(
    id INT PRIMARY key AUTO_INCREMENT,
    uid INT AUTO_INCREMENT,
    uname VARCHAR(100),
    upwd VARCHAR(100),
)