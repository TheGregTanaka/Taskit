CREATE SCHEMA IF NOT EXISTS `taskitDb`;

CREATE USER IF NOT EXISTS 'taskit'@'localhost' IDENTIFIED BY 'Task123';
GRANT CREATE, DROP, DELETE, INSERT, SELECT, UPDATE ON `taskitDb`.* TO 'taskit'@'localhost';
ALTER USER 'taskit'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Task123';
CREATE USER IF NOT EXISTS 'taskit'@'%' IDENTIFIED BY 'Task123';
GRANT CREATE, DROP, DELETE, INSERT, SELECT, UPDATE ON `taskitDb`.* TO 'taskit'@'%';
ALTER USER 'taskit'@'%' IDENTIFIED WITH mysql_native_password BY 'Task123';
FLUSH PRIVILEGES;

USE `taskitDb`;

CREATE TABLE IF NOT EXISTS typeTask
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    type VARCHAR(128)
);
CREATE UNIQUE INDEX typeTask_id_uindex ON typeTask (id);

CREATE TABLE IF NOT EXISTS statusTask
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    status VARCHAR(128)
);
CREATE UNIQUE INDEX statusTask_id_uindex ON statusTask (id);

CREATE TABLE IF NOT EXISTS userProfile
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    name VARCHAR(128) NOT NULL,
    profilePicture VARCHAR(128),
    phone VARCHAR(20),
    bio LONGTEXT
);
CREATE UNIQUE INDEX userProfile_id_uindex ON userProfile (id);
CREATE UNIQUE INDEX user_email_uindex ON userProfile (email);

CREATE TABLE IF NOT EXISTS task
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(64) NOT NULL,
    typeID INT NOT NULL,
    statusID INT DEFAULT 1 NOT NULL,
    description LONGTEXT,
    offeredPrice FLOAT,
    negotiable BOOL DEFAULT FALSE  NOT NULL,
    taskerID INT NOT NULL,
    workerID INT,
    datePosted DATE,
    dateCompleted DATE,
    rating INT,
    CONSTRAINT task_type_fk FOREIGN KEY (typeID) REFERENCES typeTask (id),
    CONSTRAINT task_status_fk FOREIGN KEY (statusID) REFERENCES statusTask (id),
    CONSTRAINT task_tasker_fk FOREIGN KEY (taskerID) REFERENCES userProfile (id),
    CONSTRAINT task_worker_fk FOREIGN KEY (workerID) REFERENCES userProfile (id)
);
CREATE UNIQUE INDEX task_id_uindex ON task (id);
