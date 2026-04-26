CREATE DATABASE  IF NOT EXISTS `sky_vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sky_vacations`;
-- MySQL dump 10.13  Distrib 8.0.44, for macos15 (arm64)
--
-- Host: localhost    Database: sky_vacations
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  KEY `fk_likes_users_idx` (`userId`),
  KEY `fk_likes_vacations_idx` (`vacationId`),
  CONSTRAINT `fk_likes_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_likes_vacations` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (2,9),(2,14),(2,5),(3,6),(3,8),(3,13),(4,2),(4,5),(4,9),(4,10),(4,14),(5,7),(5,12),(6,3),(6,11),(6,15),(2,15),(2,2),(2,19);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(256) NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Users_Roles_idx` (`roleId`),
  CONSTRAINT `FK_Users_Roles` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Homer','Simpson','homer@gmail.com','3f176fce3446c61e58db1c32ec08810606c9d5ea9f11ed3e600cf1631b475012912b740e88e7dc6ebe0caaa83116496a055084cc848c672a60c28717a6bb6950',1),(2,'Marge','Simpson','marge@gmail.com','3f176fce3446c61e58db1c32ec08810606c9d5ea9f11ed3e600cf1631b475012912b740e88e7dc6ebe0caaa83116496a055084cc848c672a60c28717a6bb6950',2),(3,'Bart','Simpson','bart@gmail.com','3f176fce3446c61e58db1c32ec08810606c9d5ea9f11ed3e600cf1631b475012912b740e88e7dc6ebe0caaa83116496a055084cc848c672a60c28717a6bb6950',2),(4,'Lisa','Simpson','lisa@gmail.com','3f176fce3446c61e58db1c32ec08810606c9d5ea9f11ed3e600cf1631b475012912b740e88e7dc6ebe0caaa83116496a055084cc848c672a60c28717a6bb6950',2),(5,'Maggie','Simpson','maggie@gmail.com','3f176fce3446c61e58db1c32ec08810606c9d5ea9f11ed3e600cf1631b475012912b740e88e7dc6ebe0caaa83116496a055084cc848c672a60c28717a6bb6950',2),(6,'Abraham','Simpson','abe@gmail.com','3f176fce3446c61e58db1c32ec08810606c9d5ea9f11ed3e600cf1631b475012912b740e88e7dc6ebe0caaa83116496a055084cc848c672a60c28717a6bb6950',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(50) NOT NULL,
  `description` longtext NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `imageName` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (2,'Paris','The city of lights in France awaits. Enjoy world-class art at the Louvre and breathtaking views from the Eiffel Tower.','2026-05-11','2026-05-18',1200.00,'3b2c7fe8-1b57-4dab-b002-55ca0f83ce4c.jpeg'),(3,'Rome','Step back in history in Italy. Walk through the Colosseum and enjoy authentic Italian pasta in Trastevere.','2026-05-18','2026-05-25',950.00,'389ac73f-4711-456f-b96e-85eeee3c430c.jpeg'),(4,'Santorini','White-washed houses and blue domes in Greece, featuring the most beautiful sunsets in the Mediterranean.','2026-06-04','2026-06-11',1100.00,'6ba028a5-28aa-40d2-964b-c7cb4f06dd09.jpeg'),(5,'London','Explore the historic Tower of London and enjoy a classic afternoon tea in the heart of England.','2026-06-14','2026-06-21',1350.00,'3292029e-1016-4827-b270-d38ee976a655.jpeg'),(6,'Barcelona','Discover Gaudis architecture and sandy beaches in Spain, with incredible tapas along Las Ramblas.','2026-07-14','2026-07-21',1050.00,'acaab361-5949-4c51-8384-e2758d8a7f0e.jpeg'),(7,'Amsterdam','Picturesque canals and a vibrant cycling culture await you in every corner of the Netherlands.','2026-08-17','2026-08-24',980.00,'793e91b1-b047-4068-9229-60a01c1e6e7f.png'),(8,'Prague','A fairytale city in the Czech Republic known for its Old Town Square and the historic Charles Bridge.','2026-09-04','2026-09-11',750.00,'f8cf802c-6c17-43ca-847a-b4f8b711ec98.jpeg'),(9,'Vienna','Experience the grand palaces and world-famous cafe culture in the musical capital of Austria.','2026-11-04','2026-11-11',920.00,'fa4c5acd-5ffc-4e83-834d-f306539c3c3d.jpeg'),(10,'Berlin','A hub of history and art in Germany. Visit the remains of the Wall and the Brandenburg Gate.','2026-11-19','2026-11-26',850.00,'323fd970-e160-48bd-96b6-7e10bcd1be11.jpeg'),(11,'Lisbon','Ride the historic yellow trams and enjoy the famous Pastéis de Nata by the river in Portugal.','2026-10-01','2026-10-08',880.00,'bed1cfd2-daa9-48dc-9fe4-219dfa6e22ff.jpeg'),(12,'New York','The city that never sleeps in the USA. Central Park, Broadway shows, and endless shopping.','2026-06-28','2026-07-07',2100.00,'9f207e1e-c6c0-41ac-859c-3de2e09ffbb2.webp'),(13,'Phuket','A tropical paradise in Thailand with crystal clear waters and vibrant nightlife.','2026-07-31','2026-08-13',1600.00,'50e6340f-bb84-4762-8f88-9e893e76507f.jpeg'),(14,'Zermatt','Breathtaking mountain scenery and world-class hiking trails in the heart of Switzerland.','2026-09-14','2026-09-21',1900.00,'4144aac1-b475-4ab7-9c84-da7a6f0af1d0.jpeg'),(15,'Dubai','Luxury shopping and ultramodern architecture in the UAE, including a desert safari adventure.','2026-10-14','2026-10-21',1400.00,'e2bd3c83-b961-4052-b193-62be0b5e8ae5.jpeg'),(19,'Tokyo','Experience the perfect blend of tradition and futurism in Japan. Visit ancient temples and the world-famous Shibuya Crossing.','2026-04-25','2026-05-05',1850.00,'ae59123f-b901-4b4a-bbde-79e20e695163.jpeg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-26 15:49:29
