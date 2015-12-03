-- MySQL dump 10.13  Distrib 5.6.25, for osx10.8 (x86_64)
--
-- Host: localhost    Database: rent4me
-- ------------------------------------------------------
-- Server version	5.6.25-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Position to start replication or point-in-time recovery from
--

-- CHANGE MASTER TO MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS=120;

--
-- Current Database: `rent4me`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `rent4me` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `rent4me`;

--
-- Table structure for table `Company`
--

DROP TABLE IF EXISTS `Company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Company` (
  `company_name` varchar(30) NOT NULL,
  `website` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`company_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Company`
--
-- ORDER BY:  `company_name`

LOCK TABLES `Company` WRITE;
/*!40000 ALTER TABLE `Company` DISABLE KEYS */;
/*!40000 ALTER TABLE `Company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `price` int(11) DEFAULT NULL,
  `size` varchar(15) DEFAULT NULL,
  `location` varchar(30) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `company_name` varchar(30) DEFAULT NULL,
  `img_url` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--
-- ORDER BY:  `pid`

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (1,340,'2','uc','1806 Cottage Grove','CPM','#'),(2,284,'3','uc','1806 Cottage Grove','CPM','#'),(3,382,'4','uc','1806 Cottage Grove','CPM','#'),(4,440,'2','uc','905 W Oregon','CPM','#'),(5,333,'3','uc','905 W Oregon','CPM','#'),(6,330,'4','uc','905 W Oregon','CPM','#'),(7,592,'4','sq','806 S 3rd St','CPM','#'),(8,674,'4','nq','606 E Stoughton','CPM','#'),(9,370,'2','cc','804 W Illinois St','CPM','#'),(10,296,'3','cc','804 W Illinois St','CPM','#'),(11,689,'1','nq','57 E Chalmers','CPM','#'),(12,459,'2','nq','57 E Chalmers','CPM','#'),(13,412,'4','nq','57 E Chalmers','CPM','#'),(14,390,'3','nq','503 E Stoughton','CPM','#'),(15,709,'3','nq','709 W Stoughton','CPM','#'),(16,889,'1','sq','512 S 3rd St','CPM','#'),(17,640,'2','sq','512 S 3rd St','CPM','#'),(18,625,'3','sq','512 S 3rd St','CPM','#'),(19,615,'4','sq','512 S 3rd St','CPM','#'),(20,380,'2','nq','608 E White','CPM','#'),(21,343,'3','nq','608 E White','CPM','#'),(22,525,'2','cc','51 E Green','CPM','#'),(23,550,'3','cc','51 E Green','CPM','#'),(24,545,'4','cc','51 E Green','CPM','#'),(25,839,'1','nq','408 E Springfield','CPM','#'),(26,580,'2','nq','408 E Springfield','CPM','#'),(27,616,'3','nq','408 E Springfield','CPM','#'),(28,505,'4','nq','408 E Springfield','CPM','#'),(29,499,'2','cc','303 E Green','CPM','#'),(30,425,'4','cc','303 E Green','CPM','#'),(31,779,'1','nq','105 S Wright','CPM','#'),(32,560,'2','nq','105 S Wright','CPM','#'),(33,435,'4','nq','105 S Wright','CPM','#'),(34,612,'4','sq','304 E Daniel','CPM','#'),(35,365,'2','sq','106 S 4th St','JSM','#'),(36,430,'e','sq','108 S 4th St','JSM','#'),(37,640,'1','nq','203 E Stoughton','JSM','#'),(38,500,'2','nq','203 E Stoughton','JSM','#'),(39,467,'3','nq','203 E Stoughton','JSM','#'),(40,413,'4','nq','203 E Stoughton','JSM','#'),(41,615,'2','nq','303 S Wright','JSM','#'),(42,1125,'1','sq','601 S 6th St','JSM','#'),(43,795,'2','sq','601 S 6th St','JSM','#'),(44,720,'3','sq','601 S 6th St','JSM','#'),(45,670,'1','nq','505 E Clark','JSM','#'),(46,490,'e','cc','307 E Armory','JSM','#'),(47,575,'1','uc','1901 Karen Ct','University Group','#'),(48,295,'2','uc','1901 Karen Ct','University Group','#'),(49,440,'1','uc','1601 N Willow','University Group','#'),(50,287,'2','uc','1601 N Willow','University Group','#'),(51,564,'3','sq','211 E John St','University Group','#'),(52,420,'4','sq','211 E John St','University Group','#'),(53,510,'3','sq','207 E John St','University Group','#'),(54,420,'4','sq','207 E John St','University Group','#'),(55,455,'1','sq','106 E Daniel','University Group','#'),(56,435,'2','sq','106 E Daniel','University Group','#'),(57,360,'4','sq','106 E Daniel','University Group','#'),(58,610,'1','sq','111 E Chalmers','University Group','#'),(59,405,'4','sq','111 E Chalmers','University Group','#'),(60,375,'4','sq','1005 S 2nd St','University Group','#'),(61,595,'1','sq','207 S Wright','University Group','#'),(62,377,'2','nq','509 E Stoughton','University Group','#'),(63,455,'1','nq','307 E Wright','University Group','#'),(64,455,'1','nq','310 E Wright','University Group','#'),(65,455,'1','nq','309 E Clark','University Group','#'),(66,695,'1','nq','609 W Main St','University Group','#'),(67,410,'2','nq','609 W Main St','University Group','#'),(68,495,'2','cc','611 W Green','University Group','#'),(69,374,'2','nq','907 W Stoughton','University Group','#'),(70,295,'2','nq','1006 W Stoughton','University Group','#'),(71,297,'3','nq','1006 W Stoughton','University Group','#'),(72,248,'4','nq','1006 W Stoughton','University Group','#'),(73,460,'2','nq','610 E Stoughton','University Group','#'),(74,450,'3','nq','610 E Stoughton','University Group','#'),(75,363,'2','sq','309 N Busey','University Group','#'),(76,635,'1','sq','805 S Lincoln','University Group','#'),(77,420,'4','sq','805 S Lincoln','University Group','#'),(78,720,'2','uc','903 W Nevada','University Group','#'),(79,595,'1','sq','1108 S Lincoln','University Group','#'),(80,390,'2','sq','1108 S Lincoln','University Group','#'),(81,450,'1','sq','58 E John St','University Group','#'),(82,367,'2','sq','58 E John St','University Group','#'),(83,340,'3','sq','58 E John St','University Group','#'),(84,510,'1','nq','509 E White','University Group','#'),(85,602,'1','nq','602 E Stoughton','University Group','#'),(86,412,'2','nq','602 E Stoughton','University Group','#'),(87,695,'1','sq','1107 S 4th St','University Group','#'),(88,400,'4','sq','1107 S 4th St','University Group','#'),(89,427,'3','sq','1107 S 4th St','University Group','#'),(90,410,'2','sq','307 E Healey','University Group','#'),(91,387,'3','sq','307 E Healey','University Group','#'),(92,790,'1','nq','5th and White','MHM','#'),(93,780,'3','nq','5th and White','MHM','#'),(94,775,'4','nq','5th and White','MHM','#'),(95,785,'2','nq','606 E White','MHM','#'),(96,785,'3','nq','606 E White','MHM','#'),(97,925,'1','sq','101 E Daniel','MHM','#'),(98,550,'2','sq','101 E Daniel','MHM','#'),(99,505,'4','sq','101 E Daniel','MHM','#'),(100,445,'2','nq','311 E Clark','MHM','#'),(101,425,'2','sq','808 S Oak','MHM','#'),(102,425,'3','sq','808 S Oak','MHM','#'),(103,420,'4','sq','808 S Oak','MHM','#'),(104,740,'1','nq','605 E Clark','MHM','#'),(105,550,'2','nq','1901 N Lincoln','Capstone','#'),(106,500,'3','nq','1901 N Lincoln','Capstone','#'),(107,450,'4','nq','1901 N Lincoln','Capstone','#'),(108,570,'2','nq','1601 N Lincoln','One','#'),(109,485,'3','nq','1601 N Lincoln','One','#'),(110,450,'4','nq','1601 N Lincoln','One','#'),(111,975,'1','nq','1321 N Lincoln','One','#'),(112,585,'2','nq','1321 N Lincoln','One','#'),(113,465,'3','nq','1321 N Lincoln','One','#'),(114,425,'4','nq','1321 N Lincoln','One','#');
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` char(60) NOT NULL,
  `history` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--
-- ORDER BY:  `id`

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test','$2a$10$/ggNWGxJfnXj.iN31eJbZOhys4sMfXcVTdHU0b26FtQrSsd3IPrnC',13);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-03 16:10:25
