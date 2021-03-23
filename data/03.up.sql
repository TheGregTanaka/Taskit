ALTER TABLE `taskitDb`.`task` ADD img VARCHAR(128);
ALTER TABLE `taskitDb`.`task` ADD address VARCHAR(80);
ALTER TABLE `taskitDb`.`task` ADD lat FLOAT(10,6);
ALTER TABLE `taskitDb`.`task` ADD lng FLOAT(10,6);
ALTER TABLE `taskitDb`.`task` ADD redirect VARCHAR(128);
ALTER TABLE `taskitDb`.`task` ADD remotePossible BOOL DEFAULT FALSE;
ALTER TABLE `taskitDb`.`userProfile` MODIFY COLUMN token varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL;

