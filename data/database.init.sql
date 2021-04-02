CREATE SCHEMA IF NOT EXISTS `taskitDb`;

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
    bio LONGTEXT,
	token VARCHAR(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL
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
    price FLOAT,
    taskerID INT NOT NULL,
    workerID INT,
    datePosted DATE,
    dateCompleted DATE,
	img VARCHAR(128),
	address VARCHAR(128),
	lat FLOAT(10,6),
	lng FLOAT(10,6),
	redirect VARCHAR(128),
	remotePossible BOOL DEFAULT FALSE,
    CONSTRAINT task_type_fk FOREIGN KEY (typeID) REFERENCES typeTask (id),
    CONSTRAINT task_status_fk FOREIGN KEY (statusID) REFERENCES statusTask (id),
    CONSTRAINT task_tasker_fk FOREIGN KEY (taskerID) REFERENCES userProfile (id),
    CONSTRAINT task_worker_fk FOREIGN KEY (workerID) REFERENCES userProfile (id)
);
CREATE UNIQUE INDEX task_id_uindex ON task (id);

CREATE TABLE IF NOT EXISTS review
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    rating float NOT NULL,
    description LONGTEXT,
    taskID INT,
    CONSTRAINT review_task_id_fk FOREIGN KEY (taskID) REFERENCES task (id)
    ON DELETE CASCADE
);
CREATE UNIQUE INDEX review_id_uindex ON review (id);


#insert initial data
INSERT INTO typeTask 
(`type`)
VALUES
("Yard Work"),
("Cleaning"),
("Repair"),
("Auto"),
("Tech"),
("Misc");

INSERT INTO statusTask 
(`status`)
VALUES
("Pending"),
("Accepted"),
("Complete");


# seed data
INSERT INTO `userProfile` 
	(`email`, `password`, `name`)
VALUES
	("testTasker@ineedhelp.com", "$2b$10$yXOiW/cgWb8rC3zOtFzRveYAYKiWC5npqjO/zCuOwusRttR.t5Fxm", "Theo Tasker"),
	("mario@plumber.com", "$2b$10$yXOiW/cgWb8rC3zOtFzRveYAYKiWC5npqjO/zCuOwusRttR.t5Fxm", "Mario Pipes"),
	("greenthumb@yourgardener.net", "$2b$10$yXOiW/cgWb8rC3zOtFzRveYAYKiWC5npqjO/zCuOwusRttR.t5Fxm", "Forrest Green"),
	("gregory.tanaka@colorado.edu", "$2b$10$yXOiW/cgWb8rC3zOtFzRveYAYKiWC5npqjO/zCuOwusRttR.t5Fxm", "Gregory Tanaka");

INSERT INTO task
	(`title`, `typeID`, `statusID`, `description`, `price`, `taskerID`, `workerID`, `datePosted`, `dateCompleted`)
VALUES
	("Rake my leaves", 1, 1, "I need someone to rake the leaves in my yard", 20, 1, NULL, '2021-02-08', NULL),
	("Hook up my speakers", 5, 2, "I need help setting up my new audio system.", 20, 1, 4, '2021-02-09', NULL),
	("Wash my car", 4, 3, "My car is dirty! Help!", 20, 1, 2, '2021-03-29', '2021-04-01'),
	("Mow My Lawn", 1, 3, "Grass is getting too long", 15, 1, 3, '2021-03-01', '2021-03-03'),
	("Need Party Clown", 6, 3, "Looking for entertainment for my kid's birthday", 70, 3, 4, '2021-03-15', '2021-03-20');


INSERT INTO review
	(`rating`, `description`, `taskID`)
VALUES
	(5.0, "My car has never been cleaner", 3),
	(3.5, "Pretty good, but lines could be straighter", 4),
	(1.0, "Greg's a real clown", 5);