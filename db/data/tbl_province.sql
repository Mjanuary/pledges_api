-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2019 at 08:59 AM
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
-- Table structure for table `tbl_province`
--

CREATE TABLE `tbl_province` (
  `province_id` int(11) NOT NULL,
  `province_name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_province`
--

INSERT INTO `tbl_province` (`province_id`, `province_name`) VALUES
(1, 'Southern'),
(2, 'Eastern'),
(3, 'Western'),
(4, 'Northern'),
(5, 'Kigali-City');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_province`
--
ALTER TABLE `tbl_province`
  ADD PRIMARY KEY (`province_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
