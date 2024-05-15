-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 18, 2022 lúc 08:36 AM
-- Phiên bản máy phục vụ: 10.4.17-MariaDB
-- Phiên bản PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `musicdb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `album`
--

CREATE TABLE `album` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `artistId` int(11) DEFAULT NULL,
  `coverImgUrl` varchar(255) DEFAULT NULL,
  `bgcolor` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT 'album',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `album`
--

INSERT INTO `album` (`id`, `name`, `artistId`, `coverImgUrl`, `bgcolor`, `description`, `type`, `createdAt`) VALUES
(1, 'Quảng Hàn Dao (广寒谣) ',1,'https://i.scdn.co/image/ab67616d00001e02810e8d65e9c314c1b1c35905','rgb(80, 96, 120)', 'Released at June 22, 2020', 'album', default),
(2, 'Xuy Diệt Tiểu Sơn Hà (吹灭小山河)',2,'https://i.scdn.co/image/ab67616d00001e0209339fc085fd1772f9e0ba54','rgb(232, 232, 232)', 'Released at June 24, 2020', 'album', default),
(3, 'Chúng ta không thuộc về nhau',3,'https://i.scdn.co/image/ab67616d00001e02af31997b23b7e6e65de1816b','rgb(176, 64, 72)', 'Released at  2018', 'album', default),
(4, 'Anh Đếch Cần Gì Nhiều Ngoài Em',4,'https://i.scdn.co/image/ab67616d00001e02441ab52d79ea60d73936e70c','rgb(72, 56, 56)', 'Released at 2021', 'album', default),
(5, 'Trời hôm nay nhiều mây cực!',4,'https://i.scdn.co/image/ab67616d00001e02b5f8f41876b80943b1921f6b','rgb(104, 128, 184)', 'Released at 2020', 'album', default),
(6, '  m Thanh Của Nỗi Nhớ Anh',5,'https://i.scdn.co/image/ab67616d00001e02f45c1d4c5c957f43ceb9ab9f','rgb(88, 144, 208)', 'Released at June 29, 2020', 'album', default),
(7, 'Sen Động Dưới Thuyền Cá (莲动下渔舟)',6,'https://i.scdn.co/image/ab67616d00001e02886dfb1845ff392d548ed540','rgb(240, 208, 88)', 'Released at 2020', 'album', default),
(8, 'Nửa Đời Tuyết (半生雪)',7,'https://i.scdn.co/image/ab67616d00001e0280f35bd154c4632334121963','rgb(144, 144, 144)', 'Released at 2019', 'album', default),
(9, 'Trích Tiên', 8, 'https://i.scdn.co/image/ab67616d00001e023106b019272ee7756d5bc908', 'rgb(216, 168, 160)', 'release in 2020', 'album', default),
(10, 'Latata', 9, 'https://i.scdn.co/image/ab67616d00001e02f8f78670dcb7eb6f7a4405d4', 'rgb(88, 8, 136)', 'release in 2018', 'album', default),
(11, 'Life Goes On', 10, 'https://i.scdn.co/image/ab67616d0000b273c07d5d2fdc02ae252fcd07e5', 'rgb(83, 83, 83)', 'release in 2018', 'album', default),
(12, 'Fake Love', 10, 'https://i.scdn.co/image/ab67616d00001e028fbcf6544ff02a8959a81781', 'rgb(176, 200, 232)', 'release in 2018', 'album', default),
(13, 'Hồng Mai Phi', 11, 'https://i.scdn.co/image/ab67616d00001e0257e75ea1244a71c7d10c1034', 'rgb(208, 56, 56)', 'release in 2021', 'album', default),
(14, 'Tiểu Sinh Từ', 12, 'https://i.scdn.co/image/ab67616d00001e02c1a7f6db161183611687a303', 'rgb(176, 160, 112)','release in 2021', 'album', default),
(15, 'Hồng Mã', 13, 'https://i.scdn.co/image/ab67616d00001e02ce9a739ebf75aad9ee30d9f6', 'rgb(216, 48, 64)', 'release in 2021', 'album', default),
(16, 'Bạch Lộ', 14, 'https://i.scdn.co/image/ab67616d00001e020bec41618247423721860bd3', 'rgb(168, 200, 216)', 'release in 2019', 'album', default),
(17, 'POP/STARS', 15, 'https://i.scdn.co/image/ab67616d00001e02d1241debb8543af8322a7d6a', 'rgb(72, 64, 168)', 'release in 2018', 'album', default),
(18, 'Hoa hải Đường', 16, 'https://i.scdn.co/image/ab67616d00001e02baf6711b493b9583f383fb64', 'rgb(104, 136, 120)', 'Released at 2022', 'album, 2022', default),
(19, 'Xe đạp', 17, 'https://i.scdn.co/image/ab67616d00001e021a8a0dfa8257bd6eb331cf4a', 'rgb(232, 224, 208)', 'Released at 2021', 'album', default),
(20, 'Chờ em trong đêm', 18, 'https://i.scdn.co/image/ab67616d0000b273dff5aaa1e6ad6ab8ddc267b3', 'rgb(104, 96, 104)', 'Released at 2020', 'album', default),
(21, 'Đừng quên tên anh', 19, 'https://i.scdn.co/image/ab67616d00001e0256de503ae4d8c20e65087a5e', 'rgb(96, 128, 168)', 'Released at 2019', 'album', default),
(22, 'Gieo quẻ', 20, 'https://i.scdn.co/image/ab67616d00001e02be0ac2aa3ed0047463210db1', 'rgb(248, 104, 16)', 'Released at 2022', 'album', default),
(23, 'We don’t talk anymore', 21, 'https://i.scdn.co/image/ab67616d00001e02a3b39c1651a617bb09800fd8', 'rgb(56, 56, 56)', 'Released at 2021', 'album', default),
(24, 'Nơi tình yêu bắt đầu', 22, 'https://i.scdn.co/image/ab67616d00001e027c3c408abc908828a405731b', 'rgb(168, 160, 48)', 'Released at 2020', 'album', default);



-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `albumhistory`
--

CREATE TABLE `albumhistory` (
  `albumId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `albumhistory`
--

INSERT INTO `albumhistory` (`albumId`, `userId`, `createdAt`) VALUES
(1, 1, '2022-11-18 07:19:59');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `artist`
--

CREATE TABLE `artist` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `coverImgUrl` varchar(255) DEFAULT NULL,
  `bgcolor` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT 'artist'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `artist`
--

INSERT INTO `artist` (`id`, `name`, `coverImgUrl`, `bgcolor`, `description`, `type`) VALUES
(1, 'Y Cách Tái Thính', 'https://i.scdn.co/image/ab67616d0000b27343ebefd2ae3acc0997cb12dc', 'rgb(208, 224, 232)', 'Chinese artist', 'artist'),
(2, 'Tư Nam', 'https://i.scdn.co/image/ab67616d00001e0259abd21f7ac3f57c9395824f', 'rgb(216, 240, 248)', 'Chinese artist', 'artist'),
(3, 'Sơn Tùng M-TP', 'https://i.scdn.co/image/ab67616d00001e02754d0b74f5f7eb1f109114f3', 'rgb(72, 16, 16)', 'Vietnamese artist', 'artist'),
(4, 'Đen', 'https://i.scdn.co/image/ab67706c0000bebb22b72af38644b0a23dec17ca', 'rgb(200, 160, 72)', 'Vietnamese artist', 'artist'),
(5, 'Ngạo Thất Gia', 'https://i.scdn.co/image/ab67616d00001e02ec191af3ba2da2a282ff9670', 'rgb(216, 224, 224)', 'Chinese artist', 'artist'),
(6, 'Dao Quân', 'https://i.scdn.co/image/ab67616d00001e02886dfb1845ff392d548ed540', 'rgb(240, 208, 88)', 'Chinese artist', 'artist'),
(7, 'Thất Thúc (Diệp Trạch Hạo)', 'https://i.scdn.co/image/ab67616d00001e0280f35bd154c4632334121963', 'rgb(144, 144, 144)', 'Chinese artist', 'artist'),
(8, 'Diệp Lý', 'https://i.scdn.co/image/ab67616d00001e023106b019272ee7756d5bc908', 'rgb(216, 168, 160)', 'Chinese artist', 'artist'),
(9, '(G)I - DLE', 'https://i.scdn.co/image/ab6761610000f178196f5af772aeb1bdd3a6be65', 'rgb(88, 8, 136)', 'Korean music group', 'artist'),
(10, 'BTS', 'https://i.scdn.co/image/ab6761610000f1785704a64f34fe29ff73ab56bb', 'rgb(80, 112, 168)', 'Korean music group', 'artist'),
(11, 'Doãn Tích Miên', 'https://mosaic.scdn.co/300/ab67616d0000b27315e2717002a4fa0617ab1a89ab67616d0000b273183e24d87b964c4dd1f630cdab67616d0000b2734a72bec2812419e95f8eeeb7ab67616d0000b273ec3dd4ace7d6088ce11545b4', 'rgb(120, 0, 16)', 'Chinese artist', 'artist'),
(12, 'Thiêm Nhi Bái', 'https://i.scdn.co/image/ab67616d0000b2739f84409df0ae42c60325a3df', 'rgb(64, 56, 104)', 'Chinese artist', 'artist'),
(13, 'Hứa Lam Tâm', 'https://i.scdn.co/image/ab67616d00001e02ce9a739ebf75aad9ee30d9f6', 'rgb(216, 48, 64)', 'Chinese artist', 'artist'),
(14, ' m Khuyết Thi Thính', 'https://i.scdn.co/image/ab67616d0000b27368a532460544bc1d3ea772e5', 'rgb(240, 240, 240)', 'Chinese artist', 'artist'),
(15, 'K/DA', 'https://i.scdn.co/image/ab6761610000f178dc1dc943555dfa1ee2a107e5', 'rgb(64, 112, 184)', 'Fictional music group', 'artist'),
(16, 'Jack', 'https://i.scdn.co/image/ab67616d00001e02baf6711b493b9583f383fb64', 'rgb(104, 136, 120)', 'Vietnamese artist', 'artist'),
(17, 'Thùy Chi', 'https://i.scdn.co/image/ab67616d00001e021a8a0dfa8257bd6eb331cf4a', 'rgb(232, 224, 208)', 'Vietnamese artist', 'artist'),
(18, 'The Men', 'https://i.scdn.co/image/ab67616d0000b273dff5aaa1e6ad6ab8ddc267b3', 'rgb(104, 96, 104)', 'Vietnamese artist', 'artist'),
(19, 'Hoa Vinh', 'https://i.scdn.co/image/ab67616d00001e0256de503ae4d8c20e65087a5e', 'rgb(96, 128, 168)', 'Vietnamese artist', 'artist'),
(20, 'Hoàng Thùy Linh', 'https://i.scdn.co/image/ab67616d00001e02be0ac2aa3ed0047463210db1', 'rgb(248, 104, 16)', 'Vietnamese artist', 'artist'),
(21, 'Charlie Puth', 'https://i.scdn.co/image/ab67616d00001e02a3b39c1651a617bb09800fd8', 'rgb(56, 56, 56)', 'UK artist', 'artist'),
(22, 'Bùi Anh Tuấn', 'https://i.scdn.co/image/ab67616d00001e027c3c408abc908828a405731b', 'rgb(168, 160, 48)', 'Vietnamese artist', 'artist');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `artisthistory`
--

CREATE TABLE `artisthistory` (
  `artistId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `artisthistory`
--

INSERT INTO `artisthistory` (`artistId`, `userId`, `createdAt`) VALUES
(1, 1, default),
(2, 1, default);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `artistsong`
--

CREATE TABLE `artistsong` (
  `artistId` int(11) NOT NULL,
  `songId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `artistsong`
--

INSERT INTO `artistsong` (`artistId`, `songId`) VALUES
(1, 1),
(2, 2),
(2, 3),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(3, 8),
(4, 9),
(4, 10),
(4, 11),
(4, 12),
(4, 13),
(4, 14),
(4, 15),
(4, 16),
(5, 17),
(6, 18),
(7, 19),
(7, 20),
(7, 21),
(8, 22),
(9, 23),
(9, 24),
(9, 25),
(9, 26),
(10, 27),
(10, 28),
(10, 29),
(10, 30),
(10, 31),
(11, 32),
(11, 33),
(12, 34),
(13, 35),
(14, 36),
(14, 37),
(14, 38),
(15, 39),
(15, 40),
(15, 41),
(15, 42),
(16, 43),
(16, 44),
(16, 45),
(17, 46),
(17, 47),
(17, 48),
(18, 49),
(18, 50),
(18, 51),
(18, 52),
(19, 53),
(20, 54),
(20, 55),
(20, 56),
(21, 57),
(21, 58),
(22, 59),
(22, 60);




-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favoritealbum`
--

CREATE TABLE `favoritealbum` (
  `albumId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `favoritealbum`
--

INSERT INTO `favoritealbum` (`albumId`, `userId`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favoriteartist`
--

CREATE TABLE `favoriteartist` (
  `artistId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `favoriteartist`
--

INSERT INTO `favoriteartist` (`artistId`, `userId`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favoriteplaylist`
--

CREATE TABLE `favoriteplaylist` (
  `playlistId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `favoriteplaylist`
--

INSERT INTO `favoriteplaylist` (`playlistId`, `userId`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favoritesong`
--

CREATE TABLE `favoritesong` (
  `songId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `favoritesong`
--

INSERT INTO `favoritesong` (`songId`, `userId`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `bgcolor` varchar(255) DEFAULT NULL,
  `coverImgUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `genres`
--

INSERT INTO `genres` (`id`, `name`, `bgcolor`, `coverImgUrl`) VALUES
(1, 'Pop', 'rgb(195, 240, 200)', 'https://t.scdn.co/images/d355f48a90b64c25b6e004179a596e51.jpeg'),
(2, 'Vietnamese Music', 'rgb(96, 129, 8)', 'https://i.scdn.co/image/ab67fb8200005caf55dfb53724670e4db6cee444'),
(3, 'K-Pop', 'rgb(20, 138, 8)', 'https://i.scdn.co/image/ab67fb8200005caf013ee3c983e6f60bf28bad5a'),
(4, 'Rock', 'rgb(235, 30, 50)', 'https://t.scdn.co/images/31c85ae6fec34a16927ef28a7a88e97b.jpeg'),
(5, 'Classical', 'rgb(125, 75, 50)', 'https://i.scdn.co/image/ab67fb8200005caf12809992dfc5b318892ea07b'),
(7, 'Hip Hop', 'rgb(188, 89, 0)', 'https://i.scdn.co/image/ab67fb8200005caf7e11c8413dc33c00740579c1'),
(6, 'Romance', 'rgb(140, 25, 50)', 'https://t.scdn.co/images/d355f48a90b64c25b6e004179a596e51.jpeg'),
(8, 'Jazz', 'rgb(119, 119, 119)', 'https://i.scdn.co/image/ab67fb8200005cafe289743024639ea8f202364d'),
(9, 'Easy Listening', 'rgb(81, 121, 161)', 'https://i.scdn.co/image/ab67fb8200005cafe914a07d20cec7a65e2e5dad'),
(10, 'Electronic', 'rgb(216, 64, 0)', 'https://i.scdn.co/image/ab67fb8200005cafdfdaac1cf9574a196ca25196'),
(11, 'Concerts', 'rgb(255, 100, 55)', 'https://t.scdn.co/images/60075fbc12304968941c7445a971fb9d.jpeg'),
(12, 'Lofi', 'rgb(13, 114, 237)', 'https://i.scdn.co/image/ab67fb8200005caf4b36a2c31432ace68d90c4f2'),
(13, 'Relaxing music', 'rgb(245, 155, 35)', 'https://t.scdn.co/images/194b9d722de34cefb3b716c653b4526b.png'),
(14, 'Chill', 'rgb(160, 195, 210)', 'https://t.scdn.co/images/2470fe22d03a4375a9501dce8cfb2b8c.jpeg'),
(15, 'Piano', 'rgb(180, 155, 200)', 'https://t.scdn.co/images/cf23ab0343e047daa88703e21c01a4aa.jpeg');


-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `playlist`
--

CREATE TABLE `playlist` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `bgcolor` varchar(255) DEFAULT NULL,
  `coverImgUrl` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT 'playlist',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `playlist`
--

INSERT INTO `playlist` (`id`, `userId`, `name`, `bgcolor`, `coverImgUrl`, `type`, `createdAt`) VALUES
(1, 1, 'EQUAL Korean', 'rgb(88, 240, 80)', 'https://i.scdn.co/image/ab67706f0000000346fdb237fc455cb2c5e4efaa', 'playlist', default),
(2, 1, 'On Repeat', 'rgb(208, 56, 160)', 'https://daily-mix.scdn.co/covers/on_repeat/PZN_On_Repeat2_LARGE-en.jpg', 'playlist', '2022-11-16 09:41:06'),
(3, 1, 'Chinese Music', 'rgb(240, 208, 88)', 'https://i.scdn.co/image/ab67616d00001e02886dfb1845ff392d548ed540', 'playlist', '2022-11-16 09:41:06'),
(4, 1, 'Vietnam Music', 'rgb(88, 80, 80)', 'https://i.scdn.co/image/ab67616d00001e0229f906fe7a60df7777b02ee1', 'playlist', '2022-11-16 09:41:06'),
(5, 1, 'Daily Mix', 'rgb(192, 8, 32)', 'https://i.scdn.co/image/ab67616d00001e0242ea0500b59064819d1c07fa', 'playlist', '2022-11-16 09:41:06'),
(6, 1, 'Pop Rising', 'rgb(16, 184, 120)', 'https://i.scdn.co/image/ab67706f000000036c2257ddae4606f8a7ad7dc2', 'playlist', '2022-11-16 09:41:06'),
(7, 1, 'KimBops', 'rgb(72, 144, 120)', 'https://i.scdn.co/image/ab67706f000000033f38a307b6b96c8724b26284', 'playlist', '2022-11-16 09:41:06'),
(8, 1, 'V-Pop', 'rgb(176, 152, 200)', 'https://i.scdn.co/image/ab67706f000000038b371a49b4a824a234d444ce', 'playlist', '2022-11-16 09:41:06'),
(9, 1, 'Happy Mix', 'rgb(96, 112, 136)', 'https://seed-mix-image.spotifycdn.com/v6/img/happy/3Nrfpe0tUJi4K4DXYWgMUX/en/large', 'playlist', '2022-11-16 09:41:06'),
(10, 2, 'My playlist', 'rgb(83, 83, 83)', 'img1', 'playlist', '2022-11-16 09:41:06');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `playlisthistory`
--

CREATE TABLE `playlisthistory` (
  `playlistId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `playlisthistory`
--

INSERT INTO `playlisthistory` (`playlistId`, `userId`, `createdAt`) VALUES
(1, 1, '2022-11-16 10:52:02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `playlistsong`
--

CREATE TABLE `playlistsong` (
  `playlistId` int(11) NOT NULL,
  `songId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `playlistsong`
--

INSERT INTO `playlistsong` (`playlistId`, `songId`) VALUES
(1,27),
(1,30),
(1,31),
(1,24),
(1,25),
(3,22),
(3,19),
(3,20),
(3,21),
(3,18),
(3,17),
(3,1),
(3,2),
(2,3),
(2,1),
(2,11),
(2,30),
(2,27),
(2,55),
(4,5),
(4,54),
(4,55),
(4,56),
(4,9),
(4,14),
(4,13),
(4,11),
(5,7),
(5,9),
(5,11),
(5,34),
(5,22),
(5,12),
(6,7),
(6,9),
(6,13),
(6,32),
(6,42),
(6,11),
(7,1),
(7,2),
(7,3),
(7,34),
(7,21),
(7,14),
(8,4),
(8,5),
(8,8),
(8,9),
(8,11),
(9,14),
(9,25),
(9,28),
(9,19),
(9,15),
(9,17),
(10,1),
(10,2),
(10,4),
(10,34),
(10,25),
(10,28),
(10,33);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `song`
--

CREATE TABLE `song` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `audioUrl` varchar(255) DEFAULT NULL,
  `coverImgUrl` varchar(255) DEFAULT NULL,
  `albumId` int(11) DEFAULT NULL,
  `bgcolor` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT 'song',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `song`
--

INSERT INTO `song` (`id`, `name`, `audioUrl`, `coverImgUrl`, `albumId`, `bgcolor`, `description`, `duration`, `type`, `createdAt`) VALUES
(1, 'Quảng Hàn Dao (广寒谣) ', 'https://data17.chiasenhac.com/downloads/2150/5/2149464-1319694b/128/Quang%20Han%20Dao%20-%20Y%20Cach%20Tai%20Thinh_%20Bat%20Kh.mp3', 'https://i.scdn.co/image/ab67616d00001e02810e8d65e9c314c1b1c35905',1, 'rgb(80, 96, 120)','Y Cách Tái Thính','03:06','song', '2022-11-18 02:39:50'),
(2, 'Xuy Diệt Tiểu Sơn Hà (吹灭小山河)', 'https://data17.chiasenhac.com/downloads/2150/5/2149464-1319694b/128/Quang%20Han%20Dao%20-%20Y%20Cach%20Tai%20Thinh_%20Bat%20Kh.mp3', 'https://i.scdn.co/image/ab67616d00001e0209339fc085fd1772f9e0ba54',2, 'rgb(232, 232, 232)','Tư Nam','03:06','song', '2022-11-18 02:39:50'),
(3, 'Gió Lay Nhành Đào (风过谢桃花)', 'https://data.chiasenhac.com/down2/2163/5/2162904-3c7efa54/128/Gio%20Lay%20Nhanh%20Dao%20-%20Tu%20Nam%20Tich%20Am%20Xa.mp3', 'https://i.scdn.co/image/ab67616d00001e021885b76f9b8f55994559fb2d',2, 'rgb(144, 104, 96)','Tư Nam','03:14','song', '2022-11-18 02:39:50'),
(4, 'Chúng ta không thuộc về nhau', 'https://data2.chiasenhac.com/stream2/1699/5/1698220-b2544de6/128/Chung%20Ta%20Khong%20Thuoc%20Ve%20Nhau%20-%20Son%20Tung.mp3', 'https://i.scdn.co/image/ab67616d00001e02af31997b23b7e6e65de1816b',3, 'rgb(176, 64, 72)','Sơn Tùng M-TP','03:53','song', '2022-11-18 02:39:50'),
(5, 'Muộn rồi mà sao còn', 'https://data.chiasenhac.com/down2/2169/5/2168156-4608576a/128/Muon%20Roi%20Ma%20Sao%20Con%20-%20Son%20Tung%20M-TP.mp3', 'https://i.scdn.co/image/ab67616d00001e0229f906fe7a60df7777b02ee1',3, 'rgb(88, 80, 80)','Sơn Tùng M-TP','04:36','song', '2022-11-18 02:39:50'),
(6, 'Nơi này có anh', 'https://data3.chiasenhac.com/downloads/2123/5/2122878-ea985f85/128/Noi%20Nay%20Co%20Anh%20-%20Son%20Tung%20M-TP_.mp3', 'https://i.scdn.co/image/ab67616d00001e025a85b345cb9461f3aa400dc1',3, 'rgb(216, 216, 208)','Sơn Tùng M-TP','04:20','song', '2022-11-18 02:39:50'),
(7, 'Lạc Trôi', 'https://data3.chiasenhac.com/downloads/2101/5/2100434-70bed8f4/128/Lac%20Troi%20Masew%20Mix_%20-%20Son%20Tung%20M-TP.mp3', 'https://i.scdn.co/image/ab67616d00001e0242ea0500b59064819d1c07fa',3, 'rgb(192, 8, 32)','Sơn Tùng M-TP','04:24','song', '2022-11-18 02:39:50'),
(8, 'Chạy ngay đi', 'https://data3.chiasenhac.com/downloads/2123/5/2122881-d71dccb8/128/Chay%20Ngay%20Di%20Run%20Now_%20-%20Son%20Tung%20M-TP_.mp3', 'https://i.scdn.co/image/ab67616d00001e02754d0b74f5f7eb1f109114f3',3, 'rgb(72, 16, 16)','Sơn Tùng M-TP','04:08','song', default),
(9, 'Anh Đếch Cần Gì Nhiều Ngoài Em', 'https://data31.chiasenhac.com/downloads/1975/5/1974489-e52ad98a/128/Anh%20Dech%20Can%20Gi%20Nhieu%20Ngoai%20Em%20-%20Den_%20Vu.mp3', 'https://i.scdn.co/image/ab67616d00001e02441ab52d79ea60d73936e70c',4, 'rgb(72, 56, 56)','Đen','03:37','song', default),
(10, 'Cảm ơn', 'https://data.chiasenhac.com/down2/2211/5/2210422-3e31b147/128/Cam%20On%20-%20Den_%20Bien.mp3', 'https://i.scdn.co/image/ab67616d00001e0203a985dab5f8aa18b041d3d4',4, 'rgb(160, 144, 104)','Đen','03:35','song', default),
(11, 'Cho Tôi Lang Thang', 'https://data3.chiasenhac.com/downloads/1774/5/1773435-efa435fc/128/Cho%20Toi%20Lang%20Thang%20-%20Ngot_%20Den.mp3', 'https://i.scdn.co/image/ab67616d00001e02b827c1001f7c9e62ffe61b60',4, 'rgb(24, 48, 64)','Đen','04:19','song', default),
(12, 'Đi Về Nhà', 'audiurl', 'https://i.scdn.co/image/ab67616d00001e022a8efe3bfa6a605fcf863237',4, 'rgb(240, 96, 72)','Đen','03:20','song', default),
(13, 'Hai Triệu Năm', 'https://data.chiasenhac.com/down2/2211/5/2210421-bda7e3ca/128/Hai%20Trieu%20Nam%20-%20Den_%20Bien.mp3', 'https://i.scdn.co/image/ab67616d00001e0211b1572974d48db180b784e3',4, 'rgb(160, 160, 152)','Đen','03:37','song', default),
(14, 'Một triệu like', 'https://data16.chiasenhac.com/downloads/2144/5/2143257-b7071e57/128/Mot%20Trieu%20Like%20-%20Den_%20Thanh%20Dong.mp3', 'https://i.scdn.co/image/ab67616d00001e02a0b8e11b0b27827b3a3dd10d',5, 'rgb(72, 88, 104)','Đen','04:24','song', default),
(15, 'Trời hôm nay nhiều mây cực!', 'https://data3.chiasenhac.com/downloads/2108/5/2107548-af5d2abd/128/Troi%20Hom%20Nay%20Nhieu%20May%20Cuc_%20-%20Den.mp3', 'https://i.scdn.co/image/ab67616d00001e02b5f8f41876b80943b1921f6b',5, 'rgb(104, 128, 184)','Đen','04:13','song', default),
(16, 'Mang tiền về cho mẹ', 'https://data.chiasenhac.com/down2/2215/5/2214701-52396a51/128/Mang%20Tien%20Ve%20Cho%20Me%20-%20Den_%20Nguyen%20Thao.mp3', 'https://i.scdn.co/image/ab67616d00001e0249d5fbb90bd190dc81286c17',5, 'rgb(224, 224, 216)','Đen','06:45','song', default),
(17, '  m Thanh Của Nỗi Nhớ Anh', 'https://data3.chiasenhac.com/downloads/2116/5/2115316-7207b8dc/128/Am%20Thanh%20Cua%20Noi%20Nho%20Anh%20-%20Ngao%20That%20Gia.mp3', 'https://i.scdn.co/image/ab67616d00001e02f45c1d4c5c957f43ceb9ab9f',6, 'rgb(88, 144, 208)','Ngạo Thất Gia','03:55','song', default),
(18, 'Sen Động Dưới Thuyền Cá (莲动下渔舟)', 'https://data.chiasenhac.com/down2/2163/5/2162698-6d8a36be/128/Sen%20Dong%20Duoi%20Thuyen%20Ca%20-%20Dao%20Quan.mp3', 'https://i.scdn.co/image/ab67616d00001e02886dfb1845ff392d548ed540',7, 'rgb(240, 208, 88)','Dao Quân','03:14','song', default),
(19, 'Nửa Đời Tuyết (半生雪)', 'https://data.chiasenhac.com/down2/2172/5/2171022-b2372f4a/128/Nua%20Doi%20Tuyet%20-%20That%20Thuc%20Diep%20Trach%20Hao.mp3', 'https://i.scdn.co/image/ab67616d00001e0280f35bd154c4632334121963',8, 'rgb(144, 144, 144)','Thất Thúc (Diệp Trạch Hạo)','02:57','song', default),
(20, 'Đạp Sơn Hà (踏山河)', 'https://data3.chiasenhac.com/downloads/2136/5/2135596-c55b9776/128/Dap%20Son%20Ha%20-%20That%20Thuc%20Diep%20Trach%20Hao_.mp3', 'https://i.scdn.co/image/ab67616d00001e02371e35b293a8e9c29c05f79f',8, 'rgb(192, 192, 192)','Thất Thúc (Diệp Trạch Hạo)','02:48','song', default),
(21, 'Yến Vô Hiết (燕无歇)', 'https://data3.chiasenhac.com/downloads/2132/5/2131542-5d7aae3b/128/Yen%20Vo%20Hiet%20-%20That%20Thuc%20Diep%20Trach%20Hao_.mp3', 'https://i.scdn.co/image/ab67616d00001e0235e2f66da3b847f06005d1e8',8, 'rgb(120, 40, 8)','Thất Thúc (Diệp Trạch Hạo)','02:55','song', default),
(22, 'Trích Tiên', 'https://data3.chiasenhac.com/downloads/2107/5/2106053-6f10a44d/128/Trich%20Tien%20-%20Y%20Cach%20Tai%20Thinh_%20Diep%20Ly.mp3', 'https://i.scdn.co/image/ab67616d00001e023106b019272ee7756d5bc908', 9, 'rgb(216, 168, 160)', 'Diệp Lý', '02:58', 'song', default),
(23, 'Latata', 'https://data37.chiasenhac.com/downloads/1904/5/1903993-e6cf26df/128/Latata%20-%20G_I-DLE.mp3', 'https://i.scdn.co/image/ab67616d00001e02f8f78670dcb7eb6f7a4405d4', 10, 'rgb(88, 8, 136)', '(G)I - DLE', '03:22', 'song', default),
(24, 'TomBoy', 'https://data.chiasenhac.com/down2/2231/5/2230436-0fe531ce/128/Tomboy%20-%20G_I-DLE.mp3', 'https://i.scdn.co/image/ab67616d00001e02c7b6b2976e38a802eebff046', 10, 'rgb(216, 8, 88)', '(G)I - DLE', '02:54', 'song', default),
(25, 'Hann (Alone)', 'https://data34.chiasenhac.com/downloads/1944/5/1943175-35590a55/128/Hann%20Alone_%20-%20G_I-DLE.mp3', 'https://i.scdn.co/image/ab67616d00001e02ace0e90dab0e51a4aec4f50a', 10, 'rgb(112, 32, 48)', '(G)I - DLE', '03:25', 'song', default),
(26, 'Moon', 'https://data16.chiasenhac.com/downloads/2146/5/2145652-00292f00/128/Moon%20-%20G_I-DLE.mp3', 'https://i.scdn.co/image/ab67616d00001e02fb9108286103eac3d310e290', 10, 'rgb(248, 72, 40)', '(G)I - DLE', '03:20', 'song', default),
(27, 'Fake Love', 'https://data37.chiasenhac.com/downloads/1909/5/1908429-ce66734f/128/Fake%20Love%20-%20BTS.mp3', 'https://i.scdn.co/image/ab67616d00001e028fbcf6544ff02a8959a81781', 11, 'rgb(176, 200, 232))', 'BTS', '04:02', 'song', default),
(28, 'Euphoria', 'https://data34.chiasenhac.com/downloads/1948/5/1947083-30142a31/128/Euphoria%20-%20BTS.mp3', 'https://i.scdn.co/image/ab67616d00001e023825e6d4d02e4b4c0cec7e1d', 11, 'rgb(232, 168, 200)', 'BTS', '03:48', 'song', default),
(29, 'DNA', 'https://data00.chiasenhac.com/downloads/1827/5/1826350-bf6c4ffa/128/DNA%20-%20BTS.mp3', 'https://i.scdn.co/image/ab67616d00001e02829305487c8f3b96a1d955b3', 11, 'rgb(152, 184, 224)', 'BTS', '03:43', 'song', default),
(30, 'Life Goes On', 'https://data3.chiasenhac.com/downloads/2133/5/2132854-220d943b/128/Life%20Goes%20On%20-%20BTS.mp3', 'https://i.scdn.co/image/ab67616d00001e02c07d5d2fdc02ae252fcd07e5', 12, 'rgb(83, 83, 83)', 'BTS', '03:27', 'song', default),
(31, 'Dynamite', 'https://data3.chiasenhac.com/downloads/2112/5/2111387-e4b5d7a3/128/Dynamite%20-%20BTS.mp3', 'https://i.scdn.co/image/ab67616d00001e02c07d5d2fdc02ae252fcd07e5', 12, 'rgb(83, 83, 83)', 'BTS', '03:19', 'song', default),
(32, 'Ta Tên Trường An, Ngươi Tên Cố Lý', 'https://data17.chiasenhac.com/downloads/2153/5/2152745-de0d1c96/128/Ta%20Ten%20Truong%20An_%20Nguoi%20Ten%20Co%20Ly%20-%20Doan.mp3', 'https://i.scdn.co/image/ab67616d00001e0215e2717002a4fa0617ab1a89', 13, 'rgb(120, 0, 16)', 'Doãn Tích Miên', '03:29', 'song', default),
(33, 'Hồng Mai Phi', 'https://data17.chiasenhac.com/downloads/2152/5/2151135-587c8531/128/Hong%20Mai%20Phi%20-%20Doan%20Tich%20Mien_%20Tieu%20Dien.mp3', 'https://i.scdn.co/image/ab67616d00001e0257e75ea1244a71c7d10c1034', 13, 'rgb(208, 56, 56)', 'Doãn Tích Miên', '03:47', 'song', default),
(34, 'Tiểu Sinh Từ', 'https://data.chiasenhac.com/down2/2161/5/2160459-35f1ff5c/128/Tieu%20Sinh%20Tu%20-%20Thiem%20Nhi%20Bai.mp3', 'https://i.scdn.co/image/ab67616d00001e02c1a7f6db161183611687a303', 14, 'rgb(176, 160, 112)', 'Thiêm Nhi Bái', '04:21', 'song', default),
(35, 'Hồng Mã', 'https://data.chiasenhac.com/down2/2164/5/2163018-3102364d/128/Hong%20Ma%20-%20Hua%20Lam%20Tam.mp3', 'https://i.scdn.co/image/ab67616d00001e02ce9a739ebf75aad9ee30d9f6', 15, 'rgb(216, 48, 64)', 'Hứa Lam Tâm', '03:08', 'song', default),
(36, 'Kinh Trập', 'https://data.chiasenhac.com/down2/2176/5/2175380-c60dd368/128/Kinh%20Trap%20-%20Am%20Khuyet%20Thi%20Thinh_%20Vuong%20T.mp3', 'https://i.scdn.co/image/ab67616d00001e02028e79610376073c424830be', 16, 'rgb(160, 160, 160)', ' m Khuyết Thi Thính', '04:01', 'song', default),
(37, 'Bạch Lộ', 'https://data.chiasenhac.com/down2/2216/5/2215454-c87c07bd/128/Bach%20Lo%20-%20Am%20Khuyet%20Thi%20Thinh_%20Vuong%20Tu.mp3', 'https://i.scdn.co/image/ab67616d00001e020bec41618247423721860bd3', 16, 'rgb(168, 200, 216)', ' m Khuyết Thi Thính', '03:44', 'song', default),
(38, 'Đại Thử', 'https://data.chiasenhac.com/down2/2216/5/2215617-267457c6/32/Dai%20Thu%20-%20Am%20Khuyet%20Thi%20Thinh_%20Ly%20Giai%20T.m4a', 'https://i.scdn.co/image/ab67616d00001e022f193065b2f2c5170e17d44e', 16, 'rgb(128, 216, 88)', ' m Khuyết Thi Thính', '04:08', 'song', default),
(39, 'POP/STARS', 'https://data31.chiasenhac.com/downloads/1972/5/1971514-09c6b264/128/Pop_Stars%20-%20K_DA_%20Madison%20Beer_%20G_I-DLE_.mp3', 'https://i.scdn.co/image/ab67616d00001e02d1241debb8543af8322a7d6a', 17, ' rgb(72, 64, 168)', 'K/DA', '03:11', 'song', default),
(40, 'Drum Go Dum', 'https://data3.chiasenhac.com/downloads/2129/5/2128710-8304ddb2/128/Drum%20Go%20Dum%20-%20K_DA_%20Wolftyla_%20Bekuh%20Boom.mp3', 'https://i.scdn.co/image/ab67616d00001e02f2bf9685109a09bdc176fb43', 17, 'rgb(48, 88, 168)', 'K/DA', '03:20', 'song', default),
(41, 'The Baddest', 'https://data3.chiasenhac.com/downloads/2114/5/2113240-773c3ddc/128/The%20Baddest%20-%20K_DA_%20G_I-DLE_%20Wolftyla_%20B.mp3', 'https://i.scdn.co/image/ab67616d00001e027158ec602fe6e8165cae6091', 17, 'rgb(136, 160, 200)', 'K/DA', '02:42', 'song', default),
(42, 'More', 'https://data3.chiasenhac.com/downloads/2129/5/2128709-293f6679/128/More%20-%20K_DA_%20G_I-DLE_%20Lexie%20Liu_%20Jaira%20B.mp3', 'https://i.scdn.co/image/ab67616d00001e02f5aba3392389512e824d7b2a', 17, 'rgb(184, 216, 240)', 'K/DA', '03:37', 'song', default),
(43, 'Hoa hải Đường', 'https://data3.chiasenhac.com/downloads/2119/5/2118057-1a95e408/128/Hoa%20Hai%20Duong%20-%20Jack.mp3', 'https://i.scdn.co/image/ab67616d00001e0249cd776a74fa45e138860e7e', 18, 'rgb(232, 216, 216)', 'Jack', '03:49', 'song', default),
(44, 'Đom Đóm', 'https://data16.chiasenhac.com/downloads/2143/5/2142225-d8d7e348/128/Dom%20Dom%20-%20Jack.mp3', 'https://i.scdn.co/image/ab67616d00001e02c5f7f9634f0793cd6f51321e', 18, 'rgb(120, 160, 64)', 'Jack', '05:24', 'song', default),
(45, 'LayLaLay', 'https://data.chiasenhac.com/down2/2165/5/2164626-0f96229d/128/LayLaLay%20-%20Jack.mp3', 'https://i.scdn.co/image/ab67656300005f1fd762bdb70b0f486ffece3ece', 18, 'rgb(232, 216, 216)', 'Jack', '03:51', 'song', default),
(46, 'Xe Đạp', 'https://data53.chiasenhac.com/downloads/1081/5/1080426-a9b8f03a/128/Xe%20Dap%20-%20Thuy%20Chi_%20M4U.mp3', 'https://i.scdn.co/image/ab67616d00001e02f53f1f1a3d46088d0d85727f', 19, 'rgb(224, 120, 120)', 'Thùy Chi', '04:46', 'song', default),
(47, 'Gặp Mẹ Trong Mơ', 'https://data.chiasenhac.com/down2/1382/5/1381934-aab0868f/128/Gap%20Me%20Trong%20Mo%20-%20Thuy%20Chi.mp3', 'https://i.scdn.co/image/ab67616d00001e021a8a0dfa8257bd6eb331cf4a', 19, 'rgb(232, 224, 208)', 'Thùy Chi', '03:47', 'song', default),
(48, 'Cô Bé Mùa Đông', 'https://data2.chiasenhac.com/stream2/1604/5/1603261-15173e3e/128/Co%20Be%20Mua%20Dong%20-%20Trung%20Quan_%20Thuy%20Chi.mp3', 'https://i.scdn.co/image/ab67616d00001e022a0bd76d87295a3aa292b206', 19, 'rgb(232, 216, 216)', 'Thùy Chi', '04:18', 'song', default),
(49, 'Chờ em trong đêm', 'https://data51.chiasenhac.com/downloads/1001/5/1000311-079f43d8/128/Cho%20Em%20Trong%20Dem%20-%20The%20Men_%20Dam%20Vinh%20Hun.mp3', 'https://i.scdn.co/image/ab67616d00001e0259cd3c269cf0d80f54f75301', 20, 'rgb(216, 224, 224)', 'The Men', '03:40', 'song', default),
(50, 'Nếu là Anh', 'https://data58.chiasenhac.com/downloads/1236/5/1235903-a595ff6b/128/Neu%20La%20Anh%20-%20The%20Men.mp3', 'https://i.scdn.co/image/ab67616d00001e02dff5aaa1e6ad6ab8ddc267b3', 20, 'rgb(104, 96, 104)', 'The Men', '04:16', 'song', default),
(51, 'Gọi Tên Em Trong Đêm', 'https://data51.chiasenhac.com/downloads/1003/5/1002728-43d5e292/128/Goi%20Ten%20Em%20Trong%20Dem%20-%20The%20Men.mp3', 'https://i.scdn.co/image/ab67616d00001e02dff5aaa1e6ad6ab8ddc267b3', 20, 'rgb(104, 96, 104)', 'The Men', '03:49', 'song', default),
(52, 'Mất Anh Em Có Buồn', 'https://data2.chiasenhac.com/stream2/1570/5/1569157-6235f855/128/Mat%20Anh%20Em%20Co%20Buon%20New%20Version_%20-%20The%20Me.mp3', 'https://i.scdn.co/image/ab67616d00001e02dff5aaa1e6ad6ab8ddc267b3', 20, 'rgb(104, 96, 104)', 'The Men', '04:40', 'song', default),
(53, 'Đừng Quên Tên Anh', 'https://data38.chiasenhac.com/downloads/1918/5/1917766-f9f90db5/128/Dung%20Quen%20Ten%20Anh%20-%20Hoa%20Vinh.mp3', 'https://i.scdn.co/image/ab67616d00001e02286b78a9e20a4bf14ab04bbd', 21, 'rgb(176, 64, 72)', 'Hoa Vinh', '05:47', 'song', default),
(54, 'Gieo Quẻ', 'https://data.chiasenhac.com/down2/2216/5/2215074-8d51eab0/128/Gieo%20Que%20-%20Hoang%20Thuy%20Linh_%20Den.mp3', 'https://i.scdn.co/image/ab67616d00001e027ea0d3614e0e4d0213451798', 22, 'rgb(24, 112, 176)', 'Hoàng Thùy Linh', '03:18', 'song', default),
(55, 'See Tình', 'https://data.chiasenhac.com/down2/2226/5/2225812-e3722baa/128/See%20Tinh%20-%20Hoang%20Thuy%20Linh.mp3', 'https://i.scdn.co/image/ab67616d00001e028b302a279cfab9f1a28d2d35', 22, 'rgb(88, 192, 248)', 'Hoàng Thùy Linh', '03:05', 'song', default),
(56, 'Bánh Trôi Nước', 'https://data2.chiasenhac.com/stream2/1620/5/1619173-6ad17f24/128/Banh%20Troi%20Nuoc%20Live_%20-%20Hoang%20Thuy%20Linh.mp3', 'https://i.scdn.co/image/ab67616d00001e0257702c039c0b97d3a203f0b2', 22, 'rgb(120, 120, 136)', 'Hoàng Thùy Linh', '04:25', 'song', default),
(57, 'We Dont Talk Anymore', 'https://data2.chiasenhac.com/stream2/1622/5/1621445-8f90a551/128/We%20Don_t%20Talk%20Anymore%20-%20Charlie%20Puth_%20Se.mp3', 'https://i.scdn.co/image/ab67616d00001e02633a2d775747bccfbcb17a45', 23, 'rgb(56, 80, 16)', 'Charlie Puth', '03:37', 'song', default),
(58, 'Attention', 'https://data37.chiasenhac.com/downloads/1906/5/1905972-dcc73708/128/Attention%20-%20Charlie%20Puth.mp3', 'https://i.scdn.co/image/ab67616d00001e02633a2d775747bccfbcb17a45', 23, 'rgb(56, 80, 16)', 'Charlie Puth', '03:28', 'song', default),
(59, 'Nơi Tình Yêu Bắt Đầu', 'https://data2.chiasenhac.com/stream2/1720/5/1719371-425629d3/128/Noi%20Tinh%20Yeu%20Bat%20Dau%20-%20Bui%20Anh%20Tuan.mp3', 'https://i.scdn.co/image/ab67616d00001e027c3c408abc908828a405731b', 24, 'rgb(168, 160, 48)', 'Bùi Anh Tuấn', '04:36', 'song', default),
(60, 'Thuận Theo Ý Trời', 'https://data.chiasenhac.com/down2/2224/5/2223831/128/Thuan%20Theo%20Y%20Troi%20Lyrics%20-%20Bui%20Anh%20Tuan.mp3', 'https://i.scdn.co/image/ab67616d00001e0241ef72ac74589897678562b9', 24, 'rgb(64, 0, 0)', 'Bùi Anh Tuấn', '03:53', 'song', default);


-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `songgenre`
--

CREATE TABLE `songgenre` (
  `genreId` int(11) NOT NULL,
  `songId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `songgenre`
--

INSERT INTO `songgenre` (`genreId`, `songId`) VALUES
(11, 1),
(11, 2),
(13, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(2, 11),
(2, 12),
(2, 13),
(2, 14),
(2, 15),
(2, 16),
(2, 17),
(12, 18),
(12, 19),
(14, 20),
(14, 21),
(15, 22),
(1, 23),
(1, 24),
(3, 25),
(1, 26),
(1, 27),
(3, 28),
(3, 29),
(3, 30),
(1, 31),
(9, 32),
(6, 33),
(6, 34),
(4, 35),
(4, 36),
(5, 37),
(8, 38),
(1, 39),
(10, 40),
(7, 41),
(10, 42),
(4, 43),
(4, 44),
(5, 45),
(5, 46),
(12, 47),
(13, 48),
(14, 49),
(2, 50),
(2, 51),
(2, 52),
(2, 53),
(2, 54),
(2, 55),
(2, 56),
(8, 57),
(8, 58),
(6, 59),
(6, 60);


-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `coverImgUrl` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `password`, `coverImgUrl`, `type`, `createdAt`) VALUES
(1, 'server', 'admin', 'nothing', 'img1', 'user', '2022-11-16 07:02:44'),
(2, 'username2', 'name1', 'pass1', 'img1', 'user', default);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artistId` (`artistId`);

--
-- Chỉ mục cho bảng `albumhistory`
--
ALTER TABLE `albumhistory`
  ADD PRIMARY KEY (`albumId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Chỉ mục cho bảng `artist`
--
ALTER TABLE `artist`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `artisthistory`
--
ALTER TABLE `artisthistory`
  ADD PRIMARY KEY (`artistId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Chỉ mục cho bảng `artistsong`
--
ALTER TABLE `artistsong`
  ADD PRIMARY KEY (`songId`,`artistId`),
  ADD KEY `artistId` (`artistId`);

--
-- Chỉ mục cho bảng `favoritealbum`
--
ALTER TABLE `favoritealbum`
  ADD PRIMARY KEY (`albumId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Chỉ mục cho bảng `favoriteartist`
--
ALTER TABLE `favoriteartist`
  ADD PRIMARY KEY (`artistId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Chỉ mục cho bảng `favoriteplaylist`
--
ALTER TABLE `favoriteplaylist`
  ADD PRIMARY KEY (`playlistId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Chỉ mục cho bảng `favoritesong`
--
ALTER TABLE `favoritesong`
  ADD PRIMARY KEY (`songId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Chỉ mục cho bảng `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Chỉ mục cho bảng `playlisthistory`
--
ALTER TABLE `playlisthistory`
  ADD PRIMARY KEY (`playlistId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Chỉ mục cho bảng `playlistsong`
--
ALTER TABLE `playlistsong`
  ADD PRIMARY KEY (`songId`,`playlistId`),
  ADD KEY `playlistId` (`playlistId`);

--
-- Chỉ mục cho bảng `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`id`),
  ADD KEY `albumId` (`albumId`);

--
-- Chỉ mục cho bảng `songgenre`
--
ALTER TABLE `songgenre`
  ADD PRIMARY KEY (`songId`,`genreId`),
  ADD KEY `genreId` (`genreId`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `album`
--
ALTER TABLE `album`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `artist`
--
ALTER TABLE `artist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `playlist`
--
ALTER TABLE `playlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `song`
--
ALTER TABLE `song`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `album`
--
ALTER TABLE `album`
  ADD CONSTRAINT `album_ibfk_1` FOREIGN KEY (`artistId`) REFERENCES `artist` (`id`);

--
-- Các ràng buộc cho bảng `albumhistory`
--
ALTER TABLE `albumhistory`
  ADD CONSTRAINT `albumhistory_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `album` (`id`),
  ADD CONSTRAINT `albumhistory_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `artisthistory`
--
ALTER TABLE `artisthistory`
  ADD CONSTRAINT `artisthistory_ibfk_1` FOREIGN KEY (`artistId`) REFERENCES `artist` (`id`),
  ADD CONSTRAINT `artisthistory_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `artistsong`
--
ALTER TABLE `artistsong`
  ADD CONSTRAINT `artistsong_ibfk_1` FOREIGN KEY (`artistId`) REFERENCES `artist` (`id`),
  ADD CONSTRAINT `artistsong_ibfk_2` FOREIGN KEY (`songId`) REFERENCES `song` (`id`);

--
-- Các ràng buộc cho bảng `favoritealbum`
--
ALTER TABLE `favoritealbum`
  ADD CONSTRAINT `favoritealbum_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `album` (`id`),
  ADD CONSTRAINT `favoritealbum_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `favoriteartist`
--
ALTER TABLE `favoriteartist`
  ADD CONSTRAINT `favoriteartist_ibfk_1` FOREIGN KEY (`artistId`) REFERENCES `artist` (`id`),
  ADD CONSTRAINT `favoriteartist_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `favoriteplaylist`
--
ALTER TABLE `favoriteplaylist`
  ADD CONSTRAINT `favoriteplaylist_ibfk_1` FOREIGN KEY (`playlistId`) REFERENCES `playlist` (`id`),
  ADD CONSTRAINT `favoriteplaylist_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `favoritesong`
--
ALTER TABLE `favoritesong`
  ADD CONSTRAINT `favoritesong_ibfk_1` FOREIGN KEY (`songId`) REFERENCES `song` (`id`),
  ADD CONSTRAINT `favoritesong_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `playlist`
--
ALTER TABLE `playlist`
  ADD CONSTRAINT `playlist_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `playlisthistory`
--
ALTER TABLE `playlisthistory`
  ADD CONSTRAINT `playlisthistory_ibfk_1` FOREIGN KEY (`playlistId`) REFERENCES `playlist` (`id`),
  ADD CONSTRAINT `playlisthistory_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `playlistsong`
--
ALTER TABLE `playlistsong`
  ADD CONSTRAINT `playlistsong_ibfk_1` FOREIGN KEY (`playlistId`) REFERENCES `playlist` (`id`),
  ADD CONSTRAINT `playlistsong_ibfk_2` FOREIGN KEY (`songId`) REFERENCES `song` (`id`);

--
-- Các ràng buộc cho bảng `song`
--
ALTER TABLE `song`
  ADD CONSTRAINT `song_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `album` (`id`);

--
-- Các ràng buộc cho bảng `songgenre`
--
ALTER TABLE `songgenre`
  ADD CONSTRAINT `songgenre_ibfk_1` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`),
  ADD CONSTRAINT `songgenre_ibfk_2` FOREIGN KEY (`songId`) REFERENCES `song` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


