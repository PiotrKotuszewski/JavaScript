-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema tin_project
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tin_project
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tin_database` DEFAULT CHARACTER SET utf8 ;
USE `tin_database` ;

-- -----------------------------------------------------
-- Table `tin_project`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tin_database`.`user` ;

CREATE TABLE IF NOT EXISTS `tin_database`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `is_active` TINYINT(1) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tin_project`.`discovery`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tin_database`.`discovery` ;

CREATE TABLE IF NOT EXISTS `tin_database`.`discovery` (
  `discovery_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(250) NOT NULL,
  `url` VARCHAR(200) NOT NULL,
  `user_id` INT NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `up_vote` INT NOT NULL,
  `down_vote` INT NOT NULL,
  `vote_count` INT NOT NULL,
  PRIMARY KEY (`discovery_id`, `user_id`),
  UNIQUE INDEX `discovery_id_UNIQUE` (`discovery_id` ASC),
  UNIQUE INDEX `url_UNIQUE` (`url` ASC),
  INDEX `fk_discovery_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_discovery_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `tin_database`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tin_project`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tin_database`.`role` ;

CREATE TABLE IF NOT EXISTS `tin_database`.`role` (
  `role_name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  UNIQUE INDEX `role_name_UNIQUE` (`role_name` ASC),
  PRIMARY KEY (`role_name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tin_project`.`vote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tin_database`.`vote` ;

CREATE TABLE IF NOT EXISTS `tin_database`.`vote` (
  `vote_id` INT NOT NULL AUTO_INCREMENT,
  `discovery_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `type` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`vote_id`, `discovery_id`, `user_id`),
  INDEX `fk_user_has_discovery_discovery1_idx` (`discovery_id` ASC),
  INDEX `fk_user_has_discovery_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_discovery_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `tin_database`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_discovery_discovery1`
    FOREIGN KEY (`discovery_id`)
    REFERENCES `tin_database`.`discovery` (`discovery_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tin_project`.`user_role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tin_database`.`user_role` ;

CREATE TABLE IF NOT EXISTS `tin_database`.`user_role` (
  `role_name` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`role_name`, `username`),
  INDEX `fk_role_has_user_role1_idx` (`role_name` ASC),
  INDEX `fk_user_role_user_username_idx` (`username` ASC),
  CONSTRAINT `fk_role_has_user_role1`
    FOREIGN KEY (`role_name`)
    REFERENCES `tin_database`.`role` (`role_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_role_user_username`
    FOREIGN KEY (`username`)
    REFERENCES `tin_database`.`user` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- Set Default role_name in user_role Table
ALTER TABLE `tin_database`.`user_role`
DROP FOREIGN KEY `fk_role_has_user_role1`;
ALTER TABLE `tin_database`.`user_role`
CHANGE COLUMN `role_name` `role_name` VARCHAR(45) NOT NULL DEFAULT 'Użytkownik' ;
ALTER TABLE `tin_database`.`user_role`
ADD CONSTRAINT `fk_role_has_user_role1`
  FOREIGN KEY (`role_name`)
  REFERENCES `tin_database`.`role` (`role_name`);

-- Add description to user_role Table
ALTER TABLE `tin_database`.`user_role`
ADD COLUMN `description` VARCHAR(255) NULL AFTER `username`;


-- EXAMPLE DATA
INSERT INTO tin_database.role (role_name, description) VALUES ('Użytkownik', 'Możliwość dodania znaleziska, edytowania usuniecia swojego znaleziska, ocenianie znalezisk');
INSERT INTO tin_database.role (role_name, description) VALUES ('Admin', 'Możliwość dodania znaleziska, edytowania usuniecia swojego znaleziska, usuwania postow wszystkich uzytkownikow, blokowanie uzytkownikow');
INSERT INTO tin_database.role (role_name, description) VALUES ('Zablokowany', 'Przegladanie postów');

-- AFTER REGISTRATION ADMIN
UPDATE tin_database.user_role SET role_name = 'Admin' WHERE username = 'Admin';