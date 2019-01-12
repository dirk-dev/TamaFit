DROP DATABASE IF EXISTS TamaFit_db;
CREATE DATABASE TamaFit_db;
USE TamaFit_db;

CREATE TABLE accounts (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_name VARCHAR(20) NOT NULL,
    user_password VARCHAR(20) NOT NULL
);

CREATE TABLE workouts (
    id INT AUTO_INCREMENT NOT NULL,
    workout_log VARCHAR(100) NOT NULL,
    time_stamp DATE NOT NULL,
    user_Id INT NOT NULL,
    PRIMARY KEY (id)
);