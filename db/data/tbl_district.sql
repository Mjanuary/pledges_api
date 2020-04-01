-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2019 at 08:58 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `umusanzudb`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_district`
--

CREATE TABLE `tbl_district` (
  `district_id` int(11) NOT NULL,
  `district_name` varchar(45) DEFAULT NULL,
  `province_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_district`
--

INSERT INTO `tbl_district` (`district_id`, `district_name`, `province_id`) VALUES
(1, 'Huye', 1),
(2, 'Gisagara', 1),
(3, 'Nyanza', 1),
(4, 'Kayonza', 2),
(5, 'Rwamagana', 2),
(6, 'Karongi', 3),
(7, 'Rusizi', 3),
(8, 'Kirehe', 2),
(9, 'Rutsiro', 3),
(10, 'Gasabo', 5),
(11, 'Kicukiro', 5),
(12, 'Nyarugenge', 5),
(13, 'Kamonyi', 1),
(14, 'Muhanga', 1),
(15, 'Nyamagabe', 1),
(16, 'Ngororero', 3),
(17, 'Nyaruguru', 1),
(18, 'Ruhango', 1),
(19, 'Nyabihu', 3),
(20, 'Rubavu', 3),
(21, 'Nyamasheke', 3),
(22, 'Bugesera', 2),
(23, 'Gatsibo', 2),
(24, 'Ngoma', 2),
(25, 'Nyagatare', 2),
(26, 'Burera', 4),
(27, 'Gakenke', 4),
(28, 'Gicumbi', 4),
(29, 'Musanze', 4),
(30, 'Rulindo', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_district`
--
ALTER TABLE `tbl_district`
  ADD PRIMARY KEY (`district_id`),
  ADD KEY `fk_tbl_district_tbl_province1_idx` (`province_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_district`
--
ALTER TABLE `tbl_district`
  ADD CONSTRAINT `fk_tbl_district_tbl_province1` FOREIGN KEY (`province_id`) REFERENCES `tbl_province` (`province_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
