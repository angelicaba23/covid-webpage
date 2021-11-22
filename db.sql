CREATE SCHEMA `covid` ;

CREATE TABLE `covid`.`users` (
  `idusers` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `cc` VARCHAR(45) NOT NULL,
  `role` INT NOT NULL,
  `user` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idusers`));

CREATE TABLE `covid`.`cases` (
  `idcase` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `cc` VARCHAR(45) NOT NULL,
  `gender` INT NOT NULL,
  `birthdate` DATE NOT NULL,
  `addresshome` VARCHAR(45) NOT NULL,
  `addresswork` VARCHAR(45) NOT NULL,
  `resultcovid` INT NOT NULL,
  `dateexam` DATE NOT NULL,
  PRIMARY KEY (`idcase`));

CREATE TABLE `covid`.`covidstate` (
`idcovidstate` INT NOT NULL,
`state` VARCHAR(45) NULL,
PRIMARY KEY (`idcovidstate`));

CREATE TABLE `covid`.`gender` (
`idgender` INT NOT NULL,
`gender` VARCHAR(45) NULL,
PRIMARY KEY (`idgender`));

CREATE TABLE `covid`.`role` (
`idrole` INT NOT NULL,
`role` VARCHAR(45) NOT NULL,
PRIMARY KEY (`idrole`));

CREATE TABLE `covid`.`statepatient` (
`idstatepatient` INT NOT NULL AUTO_INCREMENT,
`idcase` INT NOT NULL,
`state` INT NOT NULL,
`datestate` DATE NOT NULL,
PRIMARY KEY (`idstatepatient`));

CREATE TABLE `covid`.`states` (
  `idstate` INT NOT NULL,
  `state` VARCHAR(45) NULL,
  PRIMARY KEY (`idstate`));


ALTER TABLE `covid`.`cases` 
ADD INDEX `gender_idx` (`gender` ASC) VISIBLE,
ADD INDEX `resultcovid_idx` (`resultcovid` ASC) VISIBLE;
;
ALTER TABLE `covid`.`cases` 
ADD CONSTRAINT `gender`
  FOREIGN KEY (`gender`)
  REFERENCES `covid`.`gender` (`idgender`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `resultcovid`
  FOREIGN KEY (`resultcovid`)
  REFERENCES `covid`.`covidstate` (`idcovidstate`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;

ALTER TABLE `covid`.`users` 
ADD INDEX `role_idx` (`role` ASC) VISIBLE;
;
ALTER TABLE `covid`.`users` 
ADD CONSTRAINT `role`
  FOREIGN KEY (`role`)
  REFERENCES `covid`.`role` (`idrole`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;

ALTER TABLE `covid`.`statepatient` 
ADD INDEX `state_idx` (`state` ASC) VISIBLE;
;
ALTER TABLE `covid`.`statepatient` 
ADD CONSTRAINT `state`
  FOREIGN KEY (`state`)
  REFERENCES `covid`.`states` (`idstate`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;

ALTER TABLE `covid`.`cases` 
ADD CONSTRAINT `idcase`
  FOREIGN KEY (`idcase`)
  REFERENCES `covid`.`statepatient` (`idstatepatient`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;



INSERT INTO `covid`.`gender` (`idgender`, `gender`) VALUES ('1', 'female');
INSERT INTO `covid`.`gender` (`idgender`) VALUES ('2');

INSERT INTO `covid`.`covidstate` (`idcovidstate`, `state`) VALUES ('0', 'negative');
INSERT INTO `covid`.`covidstate` (`idcovidstate`, `state`) VALUES ('1', 'negative');

INSERT INTO `covid`.`states` (`idstate`, `state`) VALUES ('1', 'In Home Treatment');
INSERT INTO `covid`.`states` (`idstate`, `state`) VALUES ('2', 'In Hospital Treatment');
INSERT INTO `covid`.`states` (`idstate`, `state`) VALUES ('3', 'In ICU');
INSERT INTO `covid`.`states` (`idstate`, `state`) VALUES ('4', 'Cured');
INSERT INTO `covid`.`states` (`idstate`, `state`) VALUES ('5', 'Death');


UPDATE `covid`.`states` SET `color` = 'yellow' WHERE (`idstate` = '1');
UPDATE `covid`.`states` SET `color` = 'yellow' WHERE (`idstate` = '2');
UPDATE `covid`.`states` SET `color` = 'orange' WHERE (`idstate` = '3');
UPDATE `covid`.`states` SET `color` = 'light pink' WHERE (`idstate` = '4');
UPDATE `covid`.`states` SET `color` = 'red' WHERE (`idstate` = '5');
