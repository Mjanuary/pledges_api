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
-- Table structure for table `tbl_sector`
--

CREATE TABLE `tbl_sector` (
  `sector_id` int(11) NOT NULL,
  `sector_name` varchar(45) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_sector`
--

INSERT INTO `tbl_sector` (`sector_id`, `sector_name`, `district_id`) VALUES
(1, 'Gishamvu', 1),
(2, 'Karama', 1),
(3, 'Kigoma', 1),
(4, 'Kinazi', 1),
(5, 'Maraba', 1),
(6, 'Mbazi', 1),
(7, 'Mukura', 1),
(8, 'Ngoma', 1),
(9, 'Ruhashya', 1),
(10, 'Rusatira', 1),
(11, 'Rwaniro', 1),
(12, 'Simbi', 1),
(13, 'Tumba', 1),
(14, 'Gikonko', 2),
(15, 'Gishubi', 2),
(16, 'Kansi', 2),
(17, 'Kibilizi', 2),
(18, 'Kigembe', 2),
(19, 'Mamba', 2),
(20, 'Muganza', 2),
(21, 'Mugombwa', 2),
(22, 'Mukindo', 2),
(23, 'Musha', 2),
(24, 'Ndora', 2),
(25, 'Busasamana', 3),
(26, 'Busoro', 3),
(27, 'Cyabakamyi', 3),
(28, 'Kibirizi', 3),
(29, 'Kigoma', 3),
(30, 'Mukingo', 3),
(31, 'Rwabicuma', 3),
(32, 'Muyira', 3),
(33, 'Ntyazo', 3),
(34, 'Nyagisozi', 3),
(35, 'Gacurabwenge', 13),
(36, 'Karama', 13),
(37, 'Kayenzi', 13),
(38, 'Kayumbu', 13),
(39, 'Mugina', 13),
(40, 'Musambira', 13),
(41, 'Ngamba', 13),
(42, 'Nyamiyaga', 13),
(43, 'Nyarubaka', 13),
(44, 'Rugalika', 13),
(45, 'Rukoma', 13),
(46, 'Runda', 13),
(47, 'Cyeza', 14),
(48, 'Kabacuzi', 14),
(49, 'Kibangu', 14),
(50, 'Kiyumba', 14),
(51, 'Muhanga', 14),
(52, 'Mushishiro', 14),
(53, 'Nyabinoni', 14),
(54, 'Nyamabuye', 14),
(55, 'Nyarusange', 14),
(56, 'Rongi', 14),
(57, 'Rugendabari', 14),
(58, 'Shyogwe', 14),
(59, 'Buruhukiro', 15),
(60, 'Cyanika', 15),
(61, 'Gatare', 15),
(62, 'Kaduha', 15),
(63, 'Kamegeli', 15),
(64, 'Kibirizi', 15),
(65, 'Kibumbwe', 15),
(66, 'Kitabi', 15),
(67, 'Mbazi', 15),
(68, 'Mugano', 15),
(69, 'Musange', 15),
(70, 'Nyanza', 2),
(71, 'Musebeya', 15),
(72, 'Mushubi', 15),
(73, 'Nkomane', 15),
(74, 'Gasaka', 15),
(75, 'Tare', 15),
(76, 'Uwinkingi', 15),
(77, 'Cyahinda', 17),
(78, 'Busanze', 17),
(79, 'Gicumbi', 17),
(80, 'Mata', 17),
(81, 'Munini', 17),
(82, 'Kivu', 17),
(83, 'Ngera', 17),
(84, 'Ngoma', 17),
(85, 'Nyabimata', 17),
(86, 'Nyagisozi', 17),
(87, 'Ruheru', 17),
(88, 'Muganza', 17),
(89, 'Ruramba', 17),
(90, 'Rusenge', 17),
(91, 'Bweramana', 18),
(92, 'Byimana', 18),
(93, 'Kabagari', 18),
(94, 'Kinazi', 18),
(95, 'Kinihira', 18),
(96, 'Mbuye', 18),
(97, 'Mwendo', 18),
(98, 'Ntongwe', 18),
(99, 'Ruhango', 18),
(100, 'Bwishyura', 6),
(101, 'Gashari', 6),
(102, 'Gishyita', 6),
(103, 'Rubengera', 6),
(104, 'Mubuga', 6),
(105, 'Twumba', 6),
(106, 'Rwankuba', 6),
(107, 'Gitesi', 6),
(108, 'Ruganda', 6),
(109, 'Mutuntu', 6),
(110, 'Murambi', 6),
(111, 'Huye', 1),
(112, 'Murundi', 6),
(113, 'Rugabano', 6),
(114, 'Bugarama', 7),
(115, 'Butare', 7),
(116, 'Bweyeye', 7),
(117, 'Gikundamvura', 7),
(118, 'Gashonga', 7),
(119, 'Giheke', 7),
(120, 'Gihundwe', 7),
(121, 'Gitambi', 7),
(122, 'Kamembe', 7),
(123, 'Muganza', 7),
(124, 'Mururu', 7),
(125, 'Nkanka', 7),
(126, 'Nkombo', 7),
(127, 'Nkungu', 7),
(128, 'Nyakabuye', 7),
(129, 'Nyakarenzo', 7),
(130, 'Nzahaha', 7),
(131, 'Rwimbogo', 7),
(132, 'Boneza', 9),
(133, 'Gihango', 9),
(134, 'Kigeyo', 9),
(135, 'Kivumu', 9),
(136, 'Manihira', 9),
(137, 'Mukura', 9),
(138, 'Murunda', 9),
(139, 'Musasa', 9),
(140, 'Mushonyi', 9),
(141, 'Mushubati', 9),
(142, 'Nyabirasi', 9),
(143, 'Ruhango', 9),
(144, 'Rusebeya', 9),
(145, 'Bwira', 16),
(146, 'Gatumba', 16),
(147, 'Hindiro', 16),
(148, 'Kabaya', 16),
(149, 'Kageyo', 16),
(150, 'Kavumu', 16),
(151, 'Matyazo', 16),
(152, 'Muhanda', 16),
(153, 'Muhororo', 16),
(154, 'Ndaro', 16),
(155, 'Ngororero', 16),
(156, 'Nyange', 16),
(157, 'Sovu', 16),
(158, 'Bigogwe', 19),
(159, 'Jenda', 19),
(160, 'Jomba', 19),
(161, 'Kabatwa', 19),
(162, 'Karago', 19),
(163, 'Kintobo', 19),
(164, 'Mukamira', 19),
(165, 'Muringa', 19),
(166, 'Rambura', 19),
(167, 'Rugera', 19),
(168, 'Rurembo', 19),
(169, 'Shyira', 19),
(170, 'Bugeshi', 20),
(171, 'Busasamana', 20),
(172, 'Cyanzarwe', 20),
(173, 'Gisenyi', 20),
(174, 'Kanama', 20),
(175, 'Kanzenze', 20),
(176, 'Mudende', 20),
(177, 'Nyakiliba', 20),
(178, 'Nyamyumba', 20),
(179, 'Nyundo', 20),
(180, 'Rubavu', 20),
(181, 'Rugerero', 20),
(182, 'Bushekeri', 21),
(183, 'Bushenge', 21),
(184, 'Cyato', 21),
(185, 'Gihombo', 21),
(186, 'Kagano', 21),
(187, 'Kanjongo', 21),
(188, 'Karambi', 21),
(189, 'Karengera', 21),
(190, 'Kirimbi', 21),
(191, 'Macuba', 21),
(192, 'Mahembe', 21),
(193, 'Nyabitekeri', 21),
(194, 'Gahini', 4),
(195, 'Kabare', 4),
(196, 'Kabarondo', 4),
(197, 'Mukarange', 4),
(198, 'Murama', 4),
(199, 'Murundi', 4),
(200, 'Mwiri', 4),
(201, 'Ndego', 4),
(202, 'Nyamirama', 4),
(203, 'Rukara', 4),
(204, 'Ruramira', 4),
(205, 'Rwinkwavu', 4),
(206, 'Fumbwe', 5),
(207, 'Gahengeri', 5),
(208, 'Gishari', 5),
(209, 'Karenge', 5),
(210, 'Kigabiro', 5),
(211, 'Muhazi', 5),
(212, 'Munyaga', 5),
(213, 'Munyiginya', 5),
(214, 'Musha', 5),
(215, 'Muyumbu', 5),
(216, 'Mwulire', 5),
(217, 'Nyakariro', 5),
(218, 'Nzige', 5),
(219, 'Rubona', 5),
(220, 'Gahara', 8),
(221, 'Gatore', 8),
(222, 'Kigina', 8),
(223, 'Kirehe', 8),
(224, 'Mahama', 8),
(225, 'Mpanga', 8),
(226, 'Musaza', 8),
(227, 'Mushikiri', 8),
(228, 'Nasho', 8),
(229, 'Nyamugari', 8),
(230, 'Nyarubuye', 8),
(231, 'Kigarama', 8),
(232, 'Gashora', 22),
(233, 'Juru', 22),
(234, 'Kamabuye', 22),
(235, 'Ntarama', 22),
(236, 'Mareba', 22),
(237, 'Mayange', 22),
(238, 'Musenyi', 22),
(239, 'Mwogo', 22),
(240, 'Ngeruka', 22),
(241, 'Nyamata', 22),
(242, 'Nyarugenge', 22),
(243, 'Rilima', 22),
(244, 'Ruhuha', 22),
(245, 'Rweru', 22),
(246, 'Rangiro', 21),
(247, 'Shyara', 22),
(248, 'Gasange', 23),
(249, 'Gatsibo', 23),
(250, 'Gitoki', 23),
(251, 'Kabarore', 23),
(252, 'Kageyo', 23),
(253, 'Kiramuruzi', 23),
(254, 'Kiziguro', 23),
(255, 'Muhura', 23),
(256, 'Murambi', 23),
(257, 'Ngarama', 23),
(258, 'Nyagihanga', 23),
(259, 'Remera', 23),
(260, 'Rugarama', 23),
(261, 'Rwimbogo', 23),
(262, 'Gashanda', 24),
(263, 'Jarama', 24),
(264, 'Karembo', 24),
(265, 'Kazo', 24),
(266, 'Kibungo', 24),
(267, 'Mugesera', 24),
(268, 'Murama', 24),
(269, 'Mutenderi', 24),
(270, 'Remera', 24),
(271, 'Rukira', 24),
(272, 'Rukumberi', 24),
(273, 'Rurenge', 24),
(274, 'Sake', 24),
(275, 'Zaza', 24),
(276, 'Gatunda', 25),
(277, 'Kiyombe', 25),
(278, 'Karama', 25),
(279, 'Karangazi', 25),
(280, 'Katabagemu', 25),
(281, 'Matimba', 25),
(282, 'Mimuli', 25),
(283, 'Mukama', 25),
(284, 'Musheli', 25),
(285, 'Nyagatare', 25),
(286, 'Rukomo', 25),
(287, 'Rwempasha', 25),
(288, 'Rwimiyaga', 25),
(289, 'Tabagwe', 25),
(290, 'Bungwe', 26),
(291, 'Butaro', 26),
(292, 'Cyanika', 26),
(293, 'Cyeru', 26),
(294, 'Gahunga', 26),
(295, 'Gatebe', 26),
(296, 'Gitovu', 26),
(297, 'Kagogo', 26),
(298, 'Kinoni', 26),
(299, 'Kinyababa', 26),
(300, 'Kivuye', 26),
(301, 'Nemba', 26),
(302, 'Rugarama', 26),
(303, 'Rugendabari', 26),
(304, 'Ruhunde', 26),
(305, 'Rusarabuye', 26),
(306, 'Rwerere', 26),
(307, 'Busengo', 27),
(308, 'Coko', 27),
(309, 'Cyabingo', 27),
(310, 'Gakenke', 27),
(311, 'Gashenyi', 27),
(312, 'Mugunga', 27),
(313, 'Janja', 27),
(314, 'Kamubuga', 27),
(315, 'Karambo', 27),
(316, 'Kivuruga', 27),
(317, 'Mataba', 27),
(318, 'Minazi', 27),
(319, 'Muhondo', 27),
(320, 'Muyongwe', 27),
(321, 'Muzo', 27),
(322, 'Nemba', 27),
(323, 'Ruli', 27),
(324, 'Rusasa', 27),
(325, 'Rushashi', 27),
(326, 'Bukure', 28),
(327, 'Bwisige', 28),
(328, 'Byumba', 28),
(329, 'Cyumba', 28),
(330, 'Giti', 28),
(331, 'Kaniga', 28),
(332, 'Manyagiro', 28),
(333, 'Miyove', 28),
(334, 'Kageyo', 28),
(335, 'Mukarange', 28),
(336, 'Muko', 28),
(337, 'Mutete', 28),
(338, 'Nyamiyaga', 28),
(339, 'Nyankenke II', 28),
(340, 'Rubaya', 28),
(341, 'Rukomo', 28),
(342, 'Rushaki', 28),
(343, 'Rutare', 28),
(344, 'Ruvune', 28),
(345, 'Rwamiko', 28),
(346, 'Shangasha', 28),
(347, 'Busogo', 29),
(348, 'Cyuve', 29),
(349, 'Gacaca', 29),
(350, 'Gashaki', 29),
(351, 'Gataraga', 29),
(352, 'Kimonyi', 29),
(353, 'Kinigi', 29),
(354, 'Muhoza', 29),
(355, 'Muko', 29),
(356, 'Musanze', 29),
(357, 'Nkotsi', 29),
(358, 'Nyange', 29),
(359, 'Remera', 29),
(360, 'Rwaza', 29),
(361, 'Shingiro', 29),
(362, 'Base', 30),
(363, 'Burega', 30),
(364, 'Bushoki', 30),
(365, 'Buyoga', 30),
(366, 'Cyinzuzi', 30),
(367, 'Cyungo', 30),
(368, 'Kinihira', 30),
(369, 'Kisaro', 30),
(370, 'Masoro', 30),
(371, 'Mbogo', 30),
(372, 'Murambi', 30),
(373, 'Ngoma', 30),
(374, 'Ntarabana', 30),
(375, 'Rukozo', 30),
(376, 'Rusiga', 30),
(377, 'Shyorongi', 30),
(378, 'Tumba', 30),
(379, 'Bumbogo', 10),
(380, 'Gatsata', 10),
(381, 'Jali', 10),
(382, 'Gikomero', 10),
(383, 'Gisozi', 10),
(384, 'Jabana', 10),
(385, 'Kinyinya', 10),
(386, 'Ndera', 10),
(387, 'Nduba', 10),
(388, 'Rusororo', 10),
(389, 'Rutunga', 10),
(390, 'Kacyiru', 10),
(391, 'Kimihurura', 10),
(392, 'Kimironko', 10),
(393, 'Remera', 10),
(394, 'Gahanga', 11),
(395, 'Gatenga', 11),
(396, 'Gikondo', 11),
(397, 'Kagarama', 11),
(398, 'Kanombe', 11),
(399, 'Kicukiro', 11),
(400, 'Kigarama', 11),
(401, 'Masaka', 11),
(402, 'Niboye', 11),
(403, 'Nyarugunga', 11),
(404, 'Gitega', 12),
(405, 'Kanyinya', 12),
(406, 'Kigali', 12),
(407, 'Kimisagara', 12),
(408, 'Mageragere', 12),
(409, 'Muhima', 12),
(410, 'Nyakabanda', 12),
(411, 'Nyamirambo', 12),
(412, 'Rwezamenyo', 12),
(413, 'Nyarugenge', 12),
(414, 'Save', 2),
(415, 'Kibeho', 17),
(416, 'Shangi', 21),
(417, 'Ruharambuga', 21);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_sector`
--
ALTER TABLE `tbl_sector`
  ADD PRIMARY KEY (`sector_id`),
  ADD KEY `fk_tbl_sector_tbl_district1_idx` (`district_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_sector`
--
ALTER TABLE `tbl_sector`
  ADD CONSTRAINT `fk_tbl_sector_tbl_district1` FOREIGN KEY (`district_id`) REFERENCES `tbl_district` (`district_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
