-- MySQL dump 10.13  Distrib 9.0.1, for Win64 (x86_64)
--
-- Host: localhost    Database: VentasBD
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bancos`
--

DROP TABLE IF EXISTS `bancos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bancos` (
  `banco_id` int NOT NULL AUTO_INCREMENT,
  `nombre_banco` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`banco_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bancos`
--

LOCK TABLES `bancos` WRITE;
/*!40000 ALTER TABLE `bancos` DISABLE KEYS */;
INSERT INTO `bancos` VALUES (1,'Banco Nacional'),(2,'Banco de Guatemala'),(3,'Banco Agrícola'),(4,'Banco Industrial'),(5,'Banco G&T'),(6,'Banco Promerica'),(7,'Banco de América Central'),(8,'Banco Interamericano'),(9,'Banco Ficohsa'),(10,'Banco Citibank');
/*!40000 ALTER TABLE `bancos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `categoria_id` int NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`categoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Electrónica'),(2,'Ropa'),(3,'Alimentos'),(4,'Hogar'),(5,'Salud'),(6,'Deportes'),(7,'Belleza'),(8,'Automotriz'),(9,'Juguetes'),(10,'Libros');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `cliente_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `sexo` char(1) DEFAULT NULL,
  `NIT` varchar(20) DEFAULT NULL,
  `CUI` varchar(20) DEFAULT NULL,
  `seguro_medico` varchar(100) DEFAULT NULL,
  `numero_poliza` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`cliente_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Juan Pérez','Calle 1, Ciudad','555-0123','juan.perez@example.com','M','12345678-9','98765432','Seguro Vida','POLIZA001'),(2,'María López','Calle 2, Ciudad','555-0234','maria.lopez@example.com','F','23456789-0','87654321','Seguro Salud','POLIZA002'),(3,'Carlos Ruiz','Calle 3, Ciudad','555-0345','carlos.ruiz@example.com','M','34567890-1','76543210','Seguro Vida','POLIZA003'),(4,'Ana Torres','Calle 4, Ciudad','555-0456','ana.torres@example.com','F','45678901-2','65432109','Seguro Salud','POLIZA004'),(5,'Luis González','Calle 5, Ciudad','555-0567','luis.gonzalez@example.com','M','56789012-3','54321098','Seguro Vida','POLIZA005'),(6,'Sofía Martínez','Calle 6, Ciudad','555-0678','sofia.martinez@example.com','F','67890123-4','43210987','Seguro Salud','POLIZA006'),(7,'José Hernández','Calle 7, Ciudad','555-0789','jose.hernandez@example.com','M','78901234-5','32109876','Seguro Vida','POLIZA007'),(8,'Laura Jiménez','Calle 8, Ciudad','555-0890','laura.jimenez@example.com','F','89012345-6','21098765','Seguro Salud','POLIZA008'),(9,'Javier Ramírez','Calle 9, Ciudad','555-0901','javier.ramirez@example.com','M','90123456-7','10987654','Seguro Vida','POLIZA009'),(10,'Paola Silva','Calle 10, Ciudad','555-1012','paola.silva@example.com','F','01234567-8','09876543','Seguro Salud','POLIZA010'),(33,'jairo ','0000','34543678','9999','M','0000','9999','8888','5555');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_venta`
--

DROP TABLE IF EXISTS `detalle_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_venta` (
  `detalle_id` int NOT NULL AUTO_INCREMENT,
  `venta_id` int DEFAULT NULL,
  `producto_id` int DEFAULT NULL,
  `cantidad_vendida` int DEFAULT NULL,
  `total_venta` double DEFAULT NULL,
  PRIMARY KEY (`detalle_id`),
  KEY `venta_id` (`venta_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `detalle_venta_ibfk_1` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`venta_id`),
  CONSTRAINT `detalle_venta_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_venta`
--

LOCK TABLES `detalle_venta` WRITE;
/*!40000 ALTER TABLE `detalle_venta` DISABLE KEYS */;
INSERT INTO `detalle_venta` VALUES (1,1,1,1,NULL),(2,1,2,2,NULL),(3,2,3,3,NULL),(4,2,4,1,NULL),(5,3,5,2,NULL),(6,4,6,1,NULL),(7,5,7,1,NULL),(8,6,8,2,NULL),(9,7,9,1,NULL),(10,8,10,2,NULL),(11,1,1,2,NULL),(12,1,2,1,NULL),(13,2,1,3,NULL),(14,3,2,1,NULL),(15,4,1,1,NULL),(16,5,2,2,NULL),(17,17,1,2,NULL),(18,17,2,1,NULL),(19,18,3,2,NULL),(20,18,4,1,NULL),(21,19,5,1,NULL),(22,20,6,1,NULL),(23,21,7,2,NULL),(24,22,8,1,NULL),(25,23,9,3,NULL),(26,24,10,2,NULL),(27,25,1,1,NULL),(28,26,2,2,NULL),(29,27,3,3,NULL),(30,28,4,1,NULL),(31,29,5,2,NULL),(32,30,6,1,NULL),(33,31,7,2,NULL),(34,32,8,1,NULL),(35,33,9,2,NULL),(36,34,10,3,NULL),(37,35,1,1,NULL),(38,36,2,2,NULL),(39,37,3,1,NULL),(40,38,4,2,NULL),(41,39,5,1,NULL),(42,40,6,3,NULL),(43,41,7,2,NULL),(44,42,8,1,NULL),(45,43,9,2,NULL),(46,44,10,3,NULL),(47,45,1,1,NULL),(48,46,2,2,NULL);
/*!40000 ALTER TABLE `detalle_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devoluciones`
--

DROP TABLE IF EXISTS `devoluciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devoluciones` (
  `devolucion_id` int NOT NULL AUTO_INCREMENT,
  `venta_id` int DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `motivo` varchar(255) DEFAULT NULL,
  `producto_id` int DEFAULT NULL,
  PRIMARY KEY (`devolucion_id`),
  KEY `venta_id` (`venta_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `devoluciones_ibfk_1` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`venta_id`),
  CONSTRAINT `devoluciones_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devoluciones`
--

LOCK TABLES `devoluciones` WRITE;
/*!40000 ALTER TABLE `devoluciones` DISABLE KEYS */;
INSERT INTO `devoluciones` VALUES (1,1,'2024-10-25 09:59:53','Producto defectuoso',1),(2,2,'2024-10-25 09:59:53','Cambio de opinión',3),(3,3,'2024-10-25 09:59:53','Producto incorrecto',5),(4,4,'2024-10-25 09:59:53','No le gustó',2),(5,5,'2024-10-25 09:59:53','Producto defectuoso',4),(6,6,'2024-10-25 09:59:53','Cambio de opinión',6),(7,7,'2024-10-25 09:59:53','Producto incorrecto',7),(8,8,'2024-10-25 09:59:53','No le gustó',9),(9,9,'2024-10-25 09:59:53','Cambio de opinión',10),(10,10,'2024-10-25 09:59:53','Producto defectuoso',8),(11,1,'2024-10-01 10:12:00','1',1);
/*!40000 ALTER TABLE `devoluciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `id_empleado` int NOT NULL AUTO_INCREMENT,
  `nombre_empleado` varchar(30) NOT NULL,
  `correo_empleado` varchar(30) NOT NULL,
  `contrasenhia_empleado` varchar(50) NOT NULL,
  `telefono_empleado` varchar(15) NOT NULL,
  PRIMARY KEY (`id_empleado`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES (1,'Alex','alex@example.com','contrasena123','1234567890'),(2,'Jairo','jairo@example.com','contrasena123','0987654321'),(3,'Joshua','joshua@example.com','contrasena123','1122334455'),(4,'Jose','jose@example.com','contrasena123','2233445566'),(5,'Cesar','cesar@example.com','contrasena123','3344556677'),(6,'marc','axcperez@gmail.com','123','41155510'),(7,'Xavier','x@gmail.com','24680','4115510');
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventarios`
--

DROP TABLE IF EXISTS `inventarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventarios` (
  `inventario_id` int NOT NULL AUTO_INCREMENT,
  `producto_id` int DEFAULT NULL,
  `cantidad_inicial` int DEFAULT NULL,
  `cantidad_vendida` int DEFAULT NULL,
  `cantidad_recibida` int DEFAULT NULL,
  `cantidad_existencia` int DEFAULT NULL,
  PRIMARY KEY (`inventario_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `inventarios_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventarios`
--

LOCK TABLES `inventarios` WRITE;
/*!40000 ALTER TABLE `inventarios` DISABLE KEYS */;
INSERT INTO `inventarios` VALUES (1,1,50,10,5,45),(2,2,100,20,15,95),(3,3,200,30,25,195),(4,4,20,5,10,25),(5,5,150,25,20,145),(6,6,80,15,5,70),(7,7,60,10,10,60),(8,8,40,8,5,37),(9,9,90,12,18,96),(10,10,70,5,10,75);
/*!40000 ALTER TABLE `inventarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `pago_id` int NOT NULL AUTO_INCREMENT,
  `venta_id` int DEFAULT NULL,
  `fecha_pago` datetime DEFAULT NULL,
  `forma_pago` enum('efectivo','tarjeta','transferencia') DEFAULT NULL,
  `monto_pagado` decimal(10,2) DEFAULT NULL,
  `numero_referencia` varchar(50) DEFAULT NULL,
  `banco_id` int DEFAULT NULL,
  PRIMARY KEY (`pago_id`),
  KEY `venta_id` (`venta_id`),
  KEY `banco_id` (`banco_id`),
  CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`venta_id`),
  CONSTRAINT `pagos_ibfk_2` FOREIGN KEY (`banco_id`) REFERENCES `bancos` (`banco_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
INSERT INTO `pagos` VALUES (1,1,'2024-10-25 10:01:44','efectivo',800.00,'REF001',1),(2,2,'2024-10-25 10:01:44','tarjeta',60.00,'REF002',2),(3,3,'2024-10-25 10:01:44','transferencia',100.00,'REF003',3),(4,4,'2024-10-25 10:01:44','efectivo',300.00,'REF004',4),(5,5,'2024-10-25 10:01:44','tarjeta',12.50,'REF005',5),(6,6,'2024-10-25 10:01:44','transferencia',15.00,'REF006',6),(7,7,'2024-10-25 10:01:44','efectivo',10.00,'REF007',7),(8,8,'2024-10-25 10:01:44','tarjeta',24.00,'REF008',8),(9,9,'2024-10-25 10:01:44','transferencia',30.00,'REF009',9),(10,10,'2024-10-25 10:01:44','efectivo',60.00,'REF010',10);
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `producto_id` int NOT NULL AUTO_INCREMENT,
  `codigo_producto` varchar(50) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio_unitario` decimal(10,2) DEFAULT NULL,
  `impuestos` decimal(10,2) DEFAULT NULL,
  `numero_serie` varchar(50) DEFAULT NULL,
  `categoria_id` int DEFAULT NULL,
  PRIMARY KEY (`producto_id`),
  KEY `categoria_id` (`categoria_id`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`categoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'PROD001','Televisor LED 55\"',850.00,102.00,'SERIE001',1),(2,'PROD002','Camisa de Algodón',20.00,2.50,'SERIE002',2),(3,'PROD003','Paquete de Arroz 5kg',10.00,1.20,'SERIE003',3),(4,'PROD004','Sofá 3 plazas',300.00,40.00,'SERIE004',4),(5,'PROD005','Medicamento Genérico',5.00,0.50,'SERIE005',5),(6,'PROD006','Pelota de Fútbol',15.00,1.00,'SERIE006',6),(7,'PROD007','Crema Hidratante',10.00,1.00,'SERIE007',7),(8,'PROD008','Aceite de Motor',25.00,3.00,'SERIE008',8),(9,'PROD009','Muñeca de Juguete',12.00,1.50,'SERIE009',9),(10,'PROD010','Libro de Programación',30.00,2.00,'SERIE010',10),(14,'1','hhhh',1.00,0.12,'3',1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `venta_id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int DEFAULT NULL,
  `fecha_hora` datetime DEFAULT NULL,
  `forma_pago` enum('efectivo','tarjeta','transferencia') DEFAULT NULL,
  `numero_factura` varchar(50) DEFAULT NULL,
  `descuento_aplicado` decimal(10,2) DEFAULT NULL,
  `cuenta_corriente` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`venta_id`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`cliente_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (1,1,'2024-10-25 09:57:55','efectivo','FAC001',0.00,NULL),(2,2,'2024-10-25 09:57:55','tarjeta','FAC002',5.00,NULL),(3,3,'2024-10-25 09:57:55','transferencia','FAC003',10.00,NULL),(4,4,'2024-10-25 09:57:55','efectivo','FAC004',0.00,NULL),(5,5,'2024-10-25 09:57:55','tarjeta','FAC005',2.50,NULL),(6,6,'2024-10-25 09:57:55','transferencia','FAC006',0.00,NULL),(7,7,'2024-10-25 09:57:55','efectivo','FAC007',3.00,NULL),(8,8,'2024-10-25 09:57:55','tarjeta','FAC008',0.00,NULL),(9,9,'2024-10-25 09:57:55','transferencia','FAC009',4.00,NULL),(10,10,'2024-10-25 09:57:55','efectivo','FAC010',0.00,NULL),(11,1,'2023-01-15 10:00:00','efectivo','FAC001',0.00,NULL),(12,2,'2023-02-17 11:00:00','tarjeta','FAC002',5.00,NULL),(13,3,'2023-03-20 12:00:00','transferencia','FAC003',10.00,NULL),(14,4,'2023-04-12 13:00:00','efectivo','FAC004',0.00,NULL),(15,5,'2023-05-25 14:00:00','tarjeta','FAC005',2.50,NULL),(16,6,'2023-06-30 15:00:00','transferencia','FAC006',0.00,NULL),(17,7,'2023-07-05 16:00:00','efectivo','FAC007',3.00,NULL),(18,8,'2023-08-22 17:00:00','tarjeta','FAC008',0.00,NULL),(19,9,'2023-09-10 18:00:00','transferencia','FAC009',4.00,NULL),(20,10,'2023-10-01 19:00:00','efectivo','FAC010',0.00,NULL),(21,1,'2023-11-03 10:30:00','tarjeta','FAC011',1.00,NULL),(22,2,'2023-12-17 11:30:00','transferencia','FAC012',7.00,NULL),(23,3,'2023-01-22 12:30:00','efectivo','FAC013',0.00,NULL),(24,4,'2023-02-10 13:30:00','tarjeta','FAC014',2.00,NULL),(25,5,'2023-03-27 14:30:00','transferencia','FAC015',8.00,NULL),(26,6,'2023-04-15 15:30:00','efectivo','FAC016',0.00,NULL),(27,7,'2023-05-28 16:30:00','tarjeta','FAC017',1.50,NULL),(28,8,'2023-06-10 17:30:00','transferencia','FAC018',3.50,NULL),(29,9,'2023-07-14 18:30:00','efectivo','FAC019',0.00,NULL),(30,10,'2023-08-11 19:30:00','tarjeta','FAC020',4.00,NULL),(31,1,'2023-09-05 10:15:00','efectivo','FAC021',5.00,NULL),(32,2,'2023-10-20 11:15:00','transferencia','FAC022',0.00,NULL),(33,3,'2023-11-30 12:15:00','tarjeta','FAC023',6.00,NULL),(34,4,'2023-12-03 13:15:00','efectivo','FAC024',0.00,NULL),(35,5,'2023-01-14 14:15:00','transferencia','FAC025',2.50,NULL),(36,6,'2023-02-22 15:15:00','tarjeta','FAC026',3.00,NULL),(37,7,'2023-03-30 16:15:00','efectivo','FAC027',1.00,NULL),(38,8,'2023-04-10 17:15:00','transferencia','FAC028',0.00,NULL),(39,9,'2023-05-18 18:15:00','tarjeta','FAC029',4.00,NULL),(40,10,'2023-06-25 19:15:00','efectivo','FAC030',0.00,NULL),(41,1,'2023-07-14 10:10:00','transferencia','FAC031',5.50,NULL),(42,2,'2023-08-05 11:10:00','tarjeta','FAC032',2.00,NULL),(43,3,'2023-09-18 12:10:00','efectivo','FAC033',3.00,NULL),(44,4,'2023-10-30 13:10:00','transferencia','FAC034',0.00,NULL),(45,5,'2023-11-22 14:10:00','tarjeta','FAC035',4.50,NULL),(46,6,'2023-12-01 15:10:00','efectivo','FAC036',0.00,NULL),(47,7,'2023-01-20 16:10:00','transferencia','FAC037',6.00,NULL),(48,8,'2023-02-14 17:10:00','tarjeta','FAC038',1.00,NULL),(49,9,'2023-03-10 18:10:00','efectivo','FAC039',2.50,NULL),(50,10,'2023-04-29 19:10:00','transferencia','FAC040',0.00,NULL),(51,1,'2023-05-11 10:10:00','tarjeta','FAC041',3.00,NULL),(52,2,'2023-06-15 11:10:00','efectivo','FAC042',0.00,NULL),(53,3,'2023-07-24 12:10:00','transferencia','FAC043',2.00,NULL),(54,4,'2023-08-30 13:10:00','tarjeta','FAC044',5.50,NULL),(55,5,'2023-09-02 14:10:00','efectivo','FAC045',0.00,NULL),(56,6,'2023-10-12 15:10:00','transferencia','FAC046',3.50,NULL),(57,7,'2023-11-09 16:10:00','tarjeta','FAC047',0.00,NULL),(58,8,'2023-12-28 17:10:00','efectivo','FAC048',1.25,NULL),(59,9,'2023-01-18 18:10:00','transferencia','FAC049',0.00,NULL),(60,10,'2023-02-08 19:10:00','tarjeta','FAC050',2.75,NULL);
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-26 12:00:52
