-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2021 at 10:16 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ieeedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `memberId` tinytext NOT NULL,
  `memberEmail` tinytext NOT NULL,
  `memberPwd` longtext NOT NULL,
  `memberVcode` tinytext NOT NULL,
  `memberFName` tinytext DEFAULT NULL,
  `memberMajor` tinytext DEFAULT NULL,
  `memberBatch` int(3) DEFAULT NULL,
  `memberBD` tinytext DEFAULT NULL,
  `memberPicStatus` int(1) NOT NULL DEFAULT 0,
  `avgPts` int(3) NOT NULL,
  `memberPosition` tinytext NOT NULL,
  `memberPrivilege` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`memberId`, `memberEmail`, `memberPwd`, `memberVcode`, `memberFName`, `memberMajor`, `memberBatch`, `memberBD`, `memberPicStatus`, `avgPts`, `memberPosition`, `memberPrivilege`) VALUES
('AminNassar', 'amin.nassar@stu.najah.edu', '$2y$10$2vsuhMAxcuvZRb8ISXVB9eAJ5l3QFL/FjqwAnfHpNscahUHJZpUyu', '6041f8f0a10f32.06704603', NULL, NULL, NULL, NULL, 0, 0, 'Secretary', 'Member'),
('6', 'babaa.abd@gmail.com', '$2y$10$fUyFX2.h4JB1k2j95kyo/O8lqhe71GRDh6lU1uNAsLAoA9AA3vzRG', '60453f49c09377.85079744', NULL, NULL, NULL, NULL, 1, 0, 'Char', '3');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
