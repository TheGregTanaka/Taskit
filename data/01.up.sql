# initial data
USE `taskitDb`;

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
	("testTasker@ineedhelp.com", "588+9PF8OZmpTyxvYS6KiI5bECaHjk4ZOYsjvTjsIho=", "Theo Tasker"),
	("mario@plumber.com", "588+9PF8OZmpTyxvYS6KiI5bECaHjk4ZOYsjvTjsIho=", "Mario Pipes"),
	("greenthumb@yourgardener.net", "588+9PF8OZmpTyxvYS6KiI5bECaHjk4ZOYsjvTjsIho=", "Forrest Green"),
	("gregory.tanaka@colorado.edu", "588+9PF8OZmpTyxvYS6KiI5bECaHjk4ZOYsjvTjsIho=", "Gregory Tanaka");

INSERT INTO task
	(`title`, `typeID`, `statusID`, `description`, `offeredPrice`, `taskerID`, `workerID`, `datePosted`)
VALUES
	("Rake my leaves", 1, 1, "I need someone to rake the leaves in my yard", 20, 1, NULL, '2021-02-08'),
	("Hook up my speakers", 5, 2, "I need help setting up my new audio system.", 20, 1, 4, '2021-02-09');


INSERT INTO review
	(`rating`, `description`)
VALUES
	(5.0, "description 1"),
	(4.0, "description 2"),
	(3.5, "description 3"),
	(4.5, "description 4'"),
	(1.0, "description 5");