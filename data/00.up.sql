USE `taskitDb`;

CREATE TABLE typeTask
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    type VARCHAR(128)
);
CREATE UNIQUE INDEX typeTask_id_uindex ON typeTask (id);

CREATE TABLE statusTask
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    status VARCHAR(128)
);
CREATE UNIQUE INDEX statusTask_id_uindex ON statusTask (id);

CREATE TABLE userProfile
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

CREATE TABLE task
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
