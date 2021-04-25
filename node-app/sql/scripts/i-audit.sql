CREATE DATABASE IF NOT EXISTS `i_audit`;
USE `i_audit`;

--  Tables section
CREATE TABLE IF NOT EXISTS `member`(
	`member_id` INT NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(50) DEFAULT NULL,
	`password` VARCHAR(255) DEFAULT NULL,
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

CREATE TABLE IF NOT EXISTS `transaction`(
    	`transaction_id` INT NOT NULL AUTO_INCREMENT,
	`account_id` INT,
	`category_type_id` INT,
    PRIMARY KEY (`transaction_id`, `account_id`),
    	FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`),
	FOREIGN KEY (`category_type_id`) REFERENCES `category_type`(`category_type_id`)
);

