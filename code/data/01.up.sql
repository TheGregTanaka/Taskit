# initial data
INSERT INTO typeTask 
(`type`)
VALUES
("Yard Work"),
("Cleaning"),
("Repair"),
("Auto"),
("Tech"),
("Misc");

INSERT INTO typeUser 
(`type`)
VALUES
("Tasker"),
("Worker"),
("Admin");


# seed data
INSERT INTO `userProfile` 
	(`email`, `password`, `typeID`, `name`)
VALUES
	("testTasker@ineedhelp.com", "588+9PF8OZmpTyxvYS6KiI5bECaHjk4ZOYsjvTjsIho=", 1, "Theo Tasker"),
	("mario@plumber.com", "588+9PF8OZmpTyxvYS6KiI5bECaHjk4ZOYsjvTjsIho=", 2, "Mario Pipes"),
	("greenthumb@yourgardener.net", "588+9PF8OZmpTyxvYS6KiI5bECaHjk4ZOYsjvTjsIho=", 2, "Forrest Green"),
	("gregory.tanaka@colorado.edu", "588+9PF8OZmpTyxvYS6KiI5bECaHjk4ZOYsjvTjsIho=", 3, "Gregory Tanaka");

INSERT INTO task
	(`title`, `typeID`, `description`, `offeredPrice`, `postedBy`)
VALUES
	("Rake my leaves", 1, "I need someone to rake the leaves in my yard", 20, 1);
