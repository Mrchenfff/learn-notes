-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2017-11-21 07:17:11
-- 服务器版本： 10.1.10-MariaDB
-- PHP Version: 7.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookstore`
--

-- --------------------------------------------------------

--
-- 表的结构 `bookorder`
--

CREATE TABLE `bookorder` (
  `id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `book_id` int(20) NOT NULL,
  `order_date` datetime NOT NULL,
  `number` int(10) NOT NULL,
  `status` int(2) NOT NULL,
  `order_address` varchar(50) CHARACTER SET utf8 NOT NULL,
  `shop_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `bookorder`
--

INSERT INTO `bookorder` (`id`, `user_id`, `book_id`, `order_date`, `number`, `status`, `order_address`, `shop_id`) VALUES
(1, 1, 19, '2017-11-08 21:04:41', 2, 1, '浙江省宁波市', 3),
(2, 1, 22, '2017-11-08 21:04:41', 3, 1, '浙江省宁波市', 1),
(3, 1, 2, '2017-11-09 15:30:41', 5, 0, '浙江省宁波市', 3),
(4, 1, 1, '2017-11-09 15:36:22', 3, 0, '浙江省宁波市', 3),
(5, 1, 1, '2017-11-09 15:36:42', 2, 0, '浙江省宁波市', 3),
(6, 1, 9, '2017-11-09 15:36:42', 0, 0, '浙江省宁波市', 4),
(7, 4, 5, '2017-11-09 15:50:05', 1, 0, '1111', 3),
(8, 4, 3, '2017-11-09 15:51:04', 5, 0, '1111', 3),
(9, 1, 22, '2017-11-09 15:51:32', 5, 0, '浙江省宁波市', 1),
(10, 1, 19, '2017-11-09 15:51:32', 3, 0, '浙江省宁波市', 3),
(11, 5, 1, '2017-11-09 16:14:00', 5, 1, '8', 3);

-- --------------------------------------------------------

--
-- 表的结构 `books`
--

CREATE TABLE `books` (
  `id` int(20) NOT NULL,
  `book_name` varchar(30) CHARACTER SET utf8 NOT NULL,
  `detail` varchar(300) CHARACTER SET utf8 NOT NULL,
  `category` varchar(20) CHARACTER SET utf8 NOT NULL,
  `price` varchar(10) CHARACTER SET utf8 NOT NULL,
  `image` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `stock` int(10) NOT NULL,
  `discount` varchar(10) CHARACTER SET utf8 NOT NULL,
  `sales_volume` int(10) NOT NULL,
  `shop_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `books`
--

INSERT INTO `books` (`id`, `book_name`, `detail`, `category`, `price`, `image`, `stock`, `discount`, `sales_volume`, `shop_id`) VALUES
(1, '哲学的故事', '普利策奖和自由勋章获得者，美国哲学家威尔·杜兰特的经典力作。自问世以来，经久畅销不衰。用讲故事的方法，介绍了有史以来的主要哲学家的生平及其观点。这些故事本身奇巧而有趣，加上作者娓娓动听的叙述，使它变成了一部极富魅力的人文经典。让读者在最短的时间内、用最有趣的方法读懂漫长的哲学发展和艰深的哲学精髓。', '哲学类', '26.00', '/images/upload/231.jpg', 25, '24.00', 5, 3),
(2, '哲学的邀请', '揭示了哲学中的问题如何与当下日常生活紧密相关，阐述了我们自身必须面对的问题：我认为理所当然的“我”到底是谁？对我来说活在世上意味着什么？我在什么意义上是自由的？死的想法是如何影响我的生活的？……本书并不打算一劳永逸地回答所有这些问题，而是希望以一种越来越丰富、越来越有意义的方式继续将它们提出。', '哲学类', '37.00', '/images/upload/232.jpg', 50, '32.80', 0, 3),
(3, '大问题', '把读者当成一点都不了解哲学，按照一些大问题来组织材料的。也就是说，随着讨论的不断深入，自然而然地把读者引入哲学的殿堂。读者可以在不知不觉中熟悉哲学史上的一些最重要的观点，而且很可能会对许多问题重新进行审视，真正享受到思考的乐趣。', '哲学类', '42.49', '/images/upload/233.jpg', 120, '39.00', 0, 3),
(4, '论语', '论语》是儒家学派的经典著作之一，由孔子的弟子及其再传弟子编撰而成。共二十篇，成书时间大约在春秋战国时期。它以语录体和对话文体为主，记录了孔子及其弟子言行，集中体现了孔子的政治主张、论理思想、道德观念及教育原则等。', '社会科学类', '28.00', '/images/upload/234.jpg', 80, '23.40', 0, 3),
(5, '全球通史', '全球通史全书材料新、范围广，除了政治、经济外，还涉及军事、文化、教育、宗教、科学技术等各个方面，并吸收了20年来世界历史学研究诸领域的新成就，有强烈的现实感。自问世以来，被译成多种语言流传于世。这部通史被认为是第一部由历史学家运用全球观点囊括全球文明而编写的世界历史。', '社会科学类', '62.00', '/images/upload/235.jpg', 70, '59.90', 0, 3),
(6, '万历十五年', '著作主旨在书中末段看出：“当一个人口众多的国家，各人行动全凭儒家简单粗浅而又无法固定的原则所限制，而法律又缺乏创造性，则其社会发展的程度，必然受到限制。即便是宗旨善良，也不能补助技术之不及。”', '社会科学类', '35.80', '/images/upload/236.jpg', 90, '34.90', 0, 3),
(7, '经济学原理', '此书虽是经济学教科书，也常常插入自己的议论。很多论断被证明是错误的，但从经济学思想史看，此书是集大成者。', '经济文化类', '42.00', '/images/upload/247.jpg', 30, '39.80', 0, 4),
(8, '利息理论', '金融和经济界对利息的理解不同。众多学者（例如张五常、周其仁、薛兆丰）极力推荐，应该是一个宝矿。', '经济文化类', '35.00', '/images/upload/248.jpg', 60, '33.10', 0, 4),
(9, '经济史理论', '希克斯的贡献，阐释归纳凯恩斯的理论。晚年认为该书是其是最满意的着作，个人认为比诺斯等人的着作更好。思考，一个以数理为基础的经济学家晚年为什么转移兴趣？', '经济文化类', '30.00', '/images/upload/249.jpg', 55, '28.00', 0, 4),
(10, '生死民主', '将民主历史分为大会民主、代议制民主和监督式民主三个阶段，追溯了民主不断变化、备受争议的含义，解释了现代民主为何以及如何在拉丁美洲、非洲和亚洲传播。民主的脆弱性和偶然性通过众多历史事件呈现出来，基恩强调，当今世界的监督式民主来之不易，而民主在未来仍有可能滑向深渊。', '政治类', '106.00', '/images/upload/2510.jpg', 20, '88.40', 0, 5),
(11, '走向善治', '善治就是好的治理，也可以理解为越来越好的治理。善治是国家治理现代化的一种理想状态，是实现公共利益更大化的治理活动和治理过程。', '政治类', '42.20', '/images/upload/2511.jpg', 54, '39.50', 0, 5),
(12, '民主与大坝', 'TVA全部经验的要旨是，将自然作为一个整体去观察，以民主的方式管理和开发，以增进人民幸福为宗旨。', '政治类', '32.20', '/images/upload/2512.jpg', 60, '31.10', 0, 5),
(13, '教育与脑神经科学', '该书对教师如何做好学生大脑的变革者，指明了切实可行的途径，提供了便于操作的方法。凡欲了解和运用“与人脑契合的教学”的教师，读了此书一定会获益匪浅，受到多方面的启迪。', '教育类', '24.50', '/images/upload/2513.jpg', 30, '24.50', 0, 5),
(14, '学校会伤人', '教育是塑造灵魂的工艺，但学校也正伤害着我们。这里说的是一种隐藏很深、持续性强的伤害，它是结构性伤害的结果，是我们用以组织和评价学习的方式中所固有的。它的伤害范围非常广。', '教育类', '25.30', '/images/upload/2514.jpg', 120, '23.50', 0, 5),
(15, '面向个体的教育', '本书是探索中国学校“新常态”的时代之作。作为全国瞩目的教育改革示范校，北京十一学校在学校治理结构、课程体系、师生关系、教育教学方式等方面进行了全方位的改革.', '教育类', '28.31', '/images/upload/2515.jpg', 70, '24.70', 0, 5),
(16, '宇宙的裂缝', '一位修禅者的科学思考，深入揭示宇宙的真相、生命的意义、生死的玄机、存在的概念、灵性的含义、时空的特质、自由的奥妙、快乐的本质及物质vs精神等；解密量子力学、相对论、易经、中医、心理学、哲学及催眠术等。其中，关于社会、科技、历史及文化的健康发展提出了独到的见解。', '天文类', '44.50', '/images/upload/2416.jpg', 50, '40.00', 0, 4),
(17, '云与大气现象', '本书总体上分为12部分，靠前-10部分介绍“十云属”的分类体系，靠前1部分介绍一些有意思的特殊云，靠前2部分是介绍一些与云有关的大气发光现象。本书的文字部分，我们采用了统一的格式，你将会看到云的名称、别名、以及标准的拉丁名和分类地位。在如何识别部分，我们采用条目来分别阐述云体的高度、主要特征形态，以及产生的原因和伴随的现象。这是一本图鉴，也是一本画册，有了它，你就已经收集了一片神奇的天空。', '天文类', '32.10', '/images/upload/2417.jpg', 50, '27.00', 0, 4),
(18, '剑桥天文爱好者指南', '剑桥天文爱好者指南_（美）迈克尔·E·白凯奇著（美）迈克尔·E·白凯奇著', '天文类', '65.00', '/images/upload/2418.jpg', 20, '58.50', 0, 4),
(19, '常用病处方手册', '本书版已出版五年，重印了八次，受到了读者的关注和信任。本次再版修订在保持版鲜明特色的同时，增加了十余种常见疾病，并对全书所有处方进行了逐一审查，以便更好地体现临床规范治疗的新理念、新方法和新技术。适合在校学生和从事临床一线工作的医护人员阅读参考。', '医学类', '72.90', '/images/upload/2319.jpg', 48, '72.90', 2, 3),
(20, '整合医学-理论与实践', '本书分理论篇、实践篇和序言篇三大篇，从回顾中国医学的发展史为写作切入点，探究了医学与科学的关系，讲述了胃癌的研究、肿瘤本质的探究、整合肝病学等内容，总结了医学发展的普遍规律也应是“分久必合”，着重强调在医学研究细化的同时，要有“整合”的概念，这样才能让医学更好地服务于人类。', '医学类', '112.61', '/images/upload/2320.jpg', 100, '109.32', 0, 3),
(21, '哈里森风湿病学', '全书共24章由35位知名专家共同完成，是以风湿病为主题的专业书，包括免疫系统的健康和疾病状况、免疫介导的损伤、关节和邻近组织障碍等内容。本书以简洁、全彩为特色，提供本领域具有科学严谨性知识，非常适合教师、诊所和病房医生使用，也是医学生认证考试的*备书。', '医学类', '219.00', '/images/upload/2321.jpg', 20, '159.90', 0, 3),
(22, '代码大全', '融入了最前沿的实践技术，加入了上百个崭新的代码示例， 充分展示了软件构建的艺术性和科学性。 McConnell汇集了来自研究机构、学术界以及业界日常实践的主要知识， 把最高效的技术和最重要的原理交织融会为这本既清晰又实用的指南。', '程序类', '128.00', '/images/upload/1122.jpg', 45, '94.80', 3, 1),
(23, '计算机程序的构造和解释', '这是一本会启发你的书，它会燃起你编写出色程序的热情； 它还将教会你认识并欣赏美； 它会让你有种敬畏，让你难以抑制地渴望学习更多的东西。', '程序类', '38.25', '/images/upload/1123.jpg', 60, '38.25', 0, 1),
(24, 'C程序设计语言', '这本书简洁易读，会教给你三件事：C 编程语言；如何像程序员一样思考；底层计算模型。 （这对理解“底层”非常重要）—— Nathan', '程序类', '39.80', '/images/upload/1124.jpg', 40, '38.70', 0, 1),
(25, '算法导论', '经典的算法书,被亚马逊网，《程序员》等评选为2006年最受读者喜爱的十大IT图书之一。 算法领域的标准教材，全球多所知名大学选用 MIT名师联手铸就，被誉为“计算机算法的圣经” 编写上采用了“五个一”，即一章介绍一个算法、一种设计技术、一个应用领域和一个相关话题。', '程序类', '102.40', '/images/upload/1125.jpg', 30, '98.70', 0, 1),
(26, '深入浅出设计模式', '精心设计许多爆笑的对白，让学习过程不会太枯燥。 还有模式告白节目，将设计模式拟人化成节目来宾，畅谈其内在的一切。 每一章都有数目不等的测验题。 每章最后有一页要点整理，这也是精华所在，我都是利用这一页做复习。', '程序类', '70.56', '/images/upload/1126.jpg', 160, '65.66', 0, 1),
(28, '新概念英语', '英语~英语~英语~英语~英语~', '教育类', '67.32', '/images/upload/2328.jpg', 50, '63.00', 0, 3);

-- --------------------------------------------------------

--
-- 表的结构 `merchant`
--

CREATE TABLE `merchant` (
  `id` int(20) NOT NULL,
  `username` varchar(30) CHARACTER SET utf8 NOT NULL,
  `password` varchar(30) CHARACTER SET utf8 NOT NULL,
  `mer_name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `phonenum` varchar(15) CHARACTER SET utf8 NOT NULL,
  `address` varchar(50) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `merchant`
--

INSERT INTO `merchant` (`id`, `username`, `password`, `mer_name`, `phonenum`, `address`) VALUES
(1, '17855831290', 'ms686996', '孟庆云', '17855831290', '浙江省宁波市江北区皇家工程学院'),
(2, '1144107328', 'ms686996', '云', '12345567890', '北京市朝阳区');

-- --------------------------------------------------------

--
-- 表的结构 `shop`
--

CREATE TABLE `shop` (
  `id` int(20) NOT NULL,
  `shop_name` varchar(30) CHARACTER SET utf8 NOT NULL,
  `mer_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `shop`
--

INSERT INTO `shop` (`id`, `shop_name`, `mer_id`) VALUES
(1, ' 云书屋', 1),
(2, '当当书城', 1),
(3, '一品书斋', 2),
(4, '三味书屋', 2),
(5, '眼一亮书城', 2),
(6, '优乐书屋', 2);

-- --------------------------------------------------------

--
-- 表的结构 `shopcart`
--

CREATE TABLE `shopcart` (
  `id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `book_id` int(20) NOT NULL,
  `number` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `shopcart`
--

INSERT INTO `shopcart` (`id`, `user_id`, `book_id`, `number`) VALUES
(1, 1, 19, 3),
(2, 1, 22, 5),
(3, 4, 5, 1),
(4, 4, 3, 1),
(5, 5, 19, 3);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(20) NOT NULL,
  `username` varchar(30) CHARACTER SET utf8 NOT NULL,
  `password` varchar(30) CHARACTER SET utf8 NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `phonenum` varchar(15) CHARACTER SET utf8 NOT NULL,
  `address` varchar(50) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `name`, `phonenum`, `address`) VALUES
(1, 'user01', '1234', '个人用户01', '00000000001', '浙江省宁波市'),
(2, 'mqy17855831290', 'ms686996', '孟庆云', '17855831290', '宁波工程学院8_223'),
(3, 'm17855831290', 'ms686996', '孟庆云', '17855831290', '宁波工程学院8_223'),
(4, 'user02', '1234', '02', '120', '1111'),
(5, 'zmh', '1234', 'zmh', '110', '8');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookorder`
--
ALTER TABLE `bookorder`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merchant`
--
ALTER TABLE `merchant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shopcart`
--
ALTER TABLE `shopcart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `bookorder`
--
ALTER TABLE `bookorder`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- 使用表AUTO_INCREMENT `books`
--
ALTER TABLE `books`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- 使用表AUTO_INCREMENT `merchant`
--
ALTER TABLE `merchant`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- 使用表AUTO_INCREMENT `shopcart`
--
ALTER TABLE `shopcart`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
