USE `taskitDb`;

CREATE TABLE `taskitDb`.`typeUser`
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    type VARCHAR(128)
);
CREATE UNIQUE INDEX typeUser_id_uindex ON typeUser (id);

CREATE TABLE `taskitDb`.`typeTask`
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    type VARCHAR(128)
);
CREATE UNIQUE INDEX typeTask_id_uindex ON typeTask (id);

CREATE TABLE userProfile
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    typeID INT NOT NULL,
    name VARCHAR(128) NOT NULL,
    profilePicture VARCHAR(128),
    phone VARCHAR(20),
    bio LONGTEXT,
    CONSTRAINT user_type_fk FOREIGN KEY (typeID) REFERENCES typeUser (id)
);
CREATE UNIQUE INDEX userProfile_id_uindex ON userProfile (id);
CREATE UNIQUE INDEX user_email_uindex ON userProfile (email);

CREATE TABLE task
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(64) NOT NULL,
    typeID INT NOT NULL,
    description LONGTEXT,
    offeredPrice FLOAT,
    negotiable BOOL DEFAULT FALSE  NOT NULL,
    complete BOOL DEFAULT FALSE  NOT NULL,
    postedBy INT NOT NULL,
    completedBy INT,
    CONSTRAINT task_type_fk FOREIGN KEY (typeID) REFERENCES typeTask (id),
    CONSTRAINT task_postedBy_fk FOREIGN KEY (postedBy) REFERENCES userProfile (id)
);
CREATE UNIQUE INDEX task_id_uindex ON task (id);


