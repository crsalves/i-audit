-- Create Section
DROP DATABASE IF EXISTS `i_audit`;
CREATE DATABASE IF NOT EXISTS `i_audit`;
USE `i_audit`;

--  Tables section
CREATE TABLE IF NOT EXISTS `member`(
	`member_id` INT NOT NULL AUTO_INCREMENT,
	`member_email` VARCHAR(50) DEFAULT NULL,
	`member_password` VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`member_id`)
);

CREATE TABLE IF NOT EXISTS `bank`(
	`bank_id` INT NOT NULL AUTO_INCREMENT,
    	`bank_name` VARCHAR(30) DEFAULT NULL,
    PRIMARY KEY (`bank_id`)
);

CREATE TABLE IF NOT EXISTS `account_type`(
	`account_type_id` INT NOT NULL AUTO_INCREMENT,
    	`account_type` VARCHAR(30) DEFAULT NULL,
    PRIMARY KEY (`account_type_id`)
);

CREATE TABLE IF NOT EXISTS `account`(
	`account_id` INT NOT NULL AUTO_INCREMENT,
	`account_type_id` INT,
    	`member_id` INT,
    	`bank_id` INT,
    	PRIMARY KEY (`account_id`),
    	FOREIGN KEY (`account_type_id`) REFERENCES `account_type`(`account_type_id`),
    	FOREIGN KEY (`member_id`) REFERENCES `member`(`member_id`),
	FOREIGN KEY (`bank_id`) REFERENCES `bank`(`bank_id`)
);

CREATE TABLE IF NOT EXISTS `category_type`(
	`category_type_id` INT NOT NULL AUTO_INCREMENT,
    	`category_type` VARCHAR(30) DEFAULT NULL,
    PRIMARY KEY (`category_type_id`)
);

CREATE TABLE IF NOT EXISTS `transaction_type`(
	`transaction_type_id` INT NOT NULL AUTO_INCREMENT,
    	`transaction_type` VARCHAR(30) DEFAULT NULL,
    PRIMARY KEY (`transaction_type_id`)
);

-- DROP TABLE `transaction`;
CREATE TABLE IF NOT EXISTS `transaction`(
    	`transaction_id` INT NOT NULL AUTO_INCREMENT,
	`account_id` INT NOT NULL,
	`transaction_type_id` INT,
    `category_type_id` INT,
    `transaction_date` DATETIME DEFAULT NULL,
    `transaction_value` DECIMAL DEFAULT 0.00,
    PRIMARY KEY (`transaction_id`, `account_id`),
            FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`),
        FOREIGN KEY (`transaction_type_id`) REFERENCES `transaction_type`(`transaction_type_id`),
		FOREIGN KEY (`category_type_id`) REFERENCES `category_type`(`category_type_id`)
);

-- -- Insert Section
INSERT INTO `i_audit`.`bank`(`bank_name`)
VALUES("RBC");
INSERT INTO `i_audit`.`bank`(`bank_name`)
VALUES("Scotia Bank");
INSERT INTO `i_audit`.`bank`(`bank_name`)
VALUES("Itau");
Select * from bank;

INSERT INTO `i_audit`.`account_type`(`account_type`)
VALUES("Chequing");
INSERT INTO `i_audit`.`account_type`(`account_type`)
VALUES("Saving");
INSERT INTO `i_audit`.`account_type`(`account_type`)
VALUES("Credit Card");
Select * from account_type;

INSERT INTO `i_audit`.`transaction_type`(`transaction_type`)
VALUES("Debit");
INSERT INTO `i_audit`.`transaction_type`(`transaction_type`)
VALUES("Credit");
Select * from transaction_type;

INSERT INTO `i_audit`.`category_type`(`category_type`)
VALUES("Cash Back");
INSERT INTO `i_audit`.`category_type`(`category_type`)
VALUES("Education");
INSERT INTO `i_audit`.`category_type`(`category_type`)
VALUES("Electricity");
INSERT INTO `i_audit`.`category_type`(`category_type`)
VALUES("Entertainment");
INSERT INTO `i_audit`.`category_type`(`category_type`)
VALUES("Food");
INSERT INTO `i_audit`.`category_type`(`category_type`)
VALUES("House Rent");
INSERT INTO `i_audit`.`category_type`(`category_type`)
VALUES("Internet");
INSERT INTO `i_audit`.`category_type`(`category_type`)
VALUES("Personal Care");
INSERT INTO `i_audit`.`category_type`(`category_type`)
VALUES("Phone");
INSERT INTO `i_audit`.`category_type`(`category_type`)
VALUES("Salary");
INSERT INTO `i_audit`.`category_type`(`category_type`)
VALUES("Transportation");
Select * from category_type;
