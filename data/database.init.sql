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
    address VARCHAR(128),
    city VARCHAR(128),
    state VARCHAR(128),
    zip VARCHAR(20),
    country VARCHAR(128),
    CONSTRAINT task_type_fk FOREIGN KEY (typeID) REFERENCES typeTask (id),
    CONSTRAINT task_status_fk FOREIGN KEY (statusID) REFERENCES statusTask (id),
    CONSTRAINT task_tasker_fk FOREIGN KEY (taskerID) REFERENCES userProfile (id)
    ON DELETE CASCADE,
    CONSTRAINT task_worker_fk FOREIGN KEY (workerID) REFERENCES userProfile (id)
    ON DELETE SET NULL
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
("Confirmation Required"),
("Pending Payment"),
("Complete");


# seed data
INSERT INTO `userProfile` 
(`email`, `password`, `name`, `phone`, `bio`)
VALUES
("testTasker@ineedhelp.com", "$2b$10$yXOiW/cgWb8rC3zOtFzRveYAYKiWC5npqjO/zCuOwusRttR.t5Fxm", "Theo Tasker", "123-456-7890", "Hello I'm Theo. I'm glad you're taking an interest in me."),
("gregory.tanaka@colorado.edu", "$2b$10$yXOiW/cgWb8rC3zOtFzRveYAYKiWC5npqjO/zCuOwusRttR.t5Fxm", "Gregory Tanaka", "777-888-9999", "Hi I'm Greg. I'm glad you're taking an interest in me.");


INSERT INTO task
(`typeID`, `statusID`, `price`, `taskerID`, `workerID`, `datePosted`, `dateCompleted`, `title`,  `description`, `address`, `city`, `state`, `zip`, `country`)
VALUES
(5, 5, 20, 1, 2,    '2021-02-09', '2021-03-09', "Hook up my speakers", "I need help setting up my new audio system.", "1669 Euclid Ave", "Boulder", "CO", "80309", "USA"),
(4, 5, 10, 1, 2,    '2021-03-29', '2021-04-01', "Wash my car", "My car is dirty! Help!", "409 4th Ave", "Longmont", "CO", "80501", "USA"),
(1, 5, 15, 1, 2,    '2021-03-01', '2021-03-03', "Mow My Lawn", "Grass is getting too long", "1265 Boston Ave", "Longmont", "CO", "80501", "USA"),
(6, 5, 70, 1, 2,    '2021-03-15', '2021-03-20', "Need Party Clown", "Looking for entertainment for my kid\'s birthday", "2922 Baseline Rd", "Boulder", "CO", "80303", "USA"),
(1, 1, 20, 2, NULL, '2021-02-08', NULL, "Rake my leaves", "I need someone to rake the leaves in my yard", "University of Colorado Boulder", "Boulder", "CO", "", ""),
(2, 1, 40, 1, NULL, '2021-03-21', NULL, "Looking for window washer", "I need help washing my windows.", "2811 Walnut St Unit 150", "Denver", "CO", "80205", "USA"),
(3, 1, 70, 1, NULL, '2021-03-15', NULL, "Fix deck railing", "Railing on my deck needs to be fixed", "500 Linden St", "Fort Collins", "CO", "80524", "USA"),
(4, 1, 40, 1, NULL, '2021-03-21', NULL, "Oil Change", "Car needs fresh oil", "800 E Lincoln Ave", "Fort Collins", "CO", "80524", "USA"),
(5, 1, 40, 1, NULL, '2021-03-21', NULL, "Help configure my Access Point", "Help me set up my wifi.", "2801 Tower Rd", "Aurora", "CO", "80011", "USA"),
(6, 1, 40, 1, NULL, '2021-03-21', NULL, "Walk my dog", "Fido needs some exercise.", "2811 Walnut St Unit 150", "Denver", "CO", "80205", "USA"),
(5, 2, 80, 1, 2,    '2021-04-01', NULL, "Deploy my web app", "Help me put my web application online", "1265 Boston Ave", "Longmont", "CO", "80501", "USA"),
(3, 3, 50, 2, 1,    '2021-04-02', '2021-04-03', "Fence Repair", "The fence in my yard is falling appart. I need someone to fix it up.", "409 4th Ave", "Longmont", "CO", "80501", "USA"),
(2, 4, 35, 2, 1,    '2021-04-01', '2021-04-03', "Shampoo Carpets", "My rugs need washing", "2922 Baseline Rd", "Boulder", "CO", "80303", "USA");

INSERT INTO review
(`rating`, `description`, `taskID`)
VALUES
(1.0, "I can't hear anything!", 1),
(5.0, "My car has never been cleaner", 2),
(3.5, "Pretty good, but lines could be straighter", 3),
(1.0, "Greg's a real clown, just not the kind I was looking for...", 4);
