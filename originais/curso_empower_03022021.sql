-- --------------------------------------------------------
-- Servidor:                     mysql.cursoigrejacristobrasil.kinghost.net
-- Versão do servidor:           10.2.33-MariaDB-log - MariaDB Server
-- OS do Servidor:               Linux
-- HeidiSQL Versão:              11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Copiando estrutura para tabela cursoigrejacri.anexos
CREATE TABLE IF NOT EXISTS `anexos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(60) DEFAULT NULL,
  `ConteudoId` int(11) NOT NULL,
  `Arquivo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_Anexos_Aulas1_idx` (`ConteudoId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.anexos: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `anexos` DISABLE KEYS */;
REPLACE INTO `anexos` (`Id`, `Titulo`, `ConteudoId`, `Arquivo`) VALUES
	(1, 'Anexo 1', 1, 'anexo_1.pdf'),
	(2, 'Anexo 2', 1, 'anexo_2.pdf');
/*!40000 ALTER TABLE `anexos` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.comentarios
CREATE TABLE IF NOT EXISTS `comentarios` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UsuarioId` int(11) NOT NULL,
  `Mensagem` text DEFAULT NULL,
  `ConteudoId` int(11) NOT NULL,
  `ComentarioIdResposta` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_Comentarios_Usuarios1_idx` (`UsuarioId`),
  KEY `fk_Comentarios_Aulas1_idx` (`ConteudoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.comentarios: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.congregacao
CREATE TABLE IF NOT EXISTS `congregacao` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(45) DEFAULT NULL,
  `Status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.congregacao: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `congregacao` DISABLE KEYS */;
REPLACE INTO `congregacao` (`Id`, `Nome`, `Status`) VALUES
	(1, 'Sede - Fonte Nova', 'A'),
	(2, 'Campus Redenção', 'A'),
	(3, 'Campus Primavera', 'A'),
	(4, 'Campus Goianira', 'A'),
	(5, 'Campus Nunes de Morais', 'A');
/*!40000 ALTER TABLE `congregacao` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.conteudo
CREATE TABLE IF NOT EXISTS `conteudo` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(60) DEFAULT NULL,
  `Ordem` int(11) DEFAULT NULL,
  `Tipo` varchar(2) DEFAULT NULL COMMENT 'VI - Video Interno,\nVE - Video Externo,\nDO - Documento,\nAU - Audio,\nPR - Prova',
  `Descricao` text DEFAULT NULL,
  `Arquivo` varchar(500) DEFAULT NULL,
  `ArquivoTxt` text DEFAULT NULL,
  `ModuloId` int(11) NOT NULL,
  `DataPeriodoVisualizacaoIni` datetime DEFAULT NULL,
  `DataPeriodoVisualizacaoFim` datetime DEFAULT NULL,
  `DefinePeriodoVisualizacao` varchar(1) DEFAULT NULL COMMENT 'S - SIM\nN - NAO',
  `MinAcerto` int(11) DEFAULT 0 COMMENT 'Configura a quantidade minima de acerto para avaliação',
  `LinkConteudoExterno` text DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_Aulas_Modulos1_idx` (`ModuloId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.conteudo: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `conteudo` DISABLE KEYS */;
REPLACE INTO `conteudo` (`Id`, `Titulo`, `Ordem`, `Tipo`, `Descricao`, `Arquivo`, `ArquivoTxt`, `ModuloId`, `DataPeriodoVisualizacaoIni`, `DataPeriodoVisualizacaoFim`, `DefinePeriodoVisualizacao`, `MinAcerto`, `LinkConteudoExterno`) VALUES
	(1, 'Conteudo 1', 1, 'VE', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'https://onedrive.live.com/embed?cid=584DD3D4414E938C&resid=584DD3D4414E938C%212308&authkey=AFxqxPYZbPFJhhI', NULL, 3, NULL, NULL, 'N', 0, NULL),
	(2, 'Conteudo 2', 2, 'VI', NULL, 'video2.mp4', '', 3, NULL, NULL, 'N', 0, NULL),
	(3, 'Conteudo 1', 1, 'VI', NULL, 'video3.mp4', NULL, 2, NULL, NULL, 'N', 0, NULL),
	(4, 'Conteudo 3', 3, 'VI', NULL, 'video4.mp4', NULL, 3, NULL, NULL, 'N', 0, NULL),
	(5, 'Prova', 2, 'PR', NULL, NULL, NULL, 2, NULL, NULL, 'N', 2, NULL),
	(6, 'Conteudo 2', 3, 'VI', NULL, 'video3.mp4', NULL, 2, NULL, NULL, 'N', 0, NULL);
/*!40000 ALTER TABLE `conteudo` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.conteudousuarios
CREATE TABLE IF NOT EXISTS `conteudousuarios` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Concluido` varchar(1) DEFAULT NULL,
  `DataConclusao` datetime DEFAULT NULL,
  `ConteudoId` int(11) NOT NULL,
  `UsuariosId` int(11) NOT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  KEY `fk_conteudo_conteudoid` (`ConteudoId`),
  KEY `fk_conteudo_usuarioid` (`UsuariosId`) USING BTREE,
  CONSTRAINT `fk_conteudo_conteudoid` FOREIGN KEY (`ConteudoId`) REFERENCES `conteudo` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_conteudo_usuarioid` FOREIGN KEY (`UsuariosId`) REFERENCES `usuarios` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.conteudousuarios: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `conteudousuarios` DISABLE KEYS */;
REPLACE INTO `conteudousuarios` (`Id`, `Concluido`, `DataConclusao`, `ConteudoId`, `UsuariosId`) VALUES
	(1, 'S', '2021-01-28 16:18:24', 1, 3),
	(2, 'S', '2021-01-28 16:20:52', 2, 3),
	(3, 'S', '2021-01-28 16:20:58', 4, 3),
	(4, 'S', '2021-01-28 16:21:07', 5, 3),
	(5, 'S', '2021-01-28 16:21:46', 6, 3);
/*!40000 ALTER TABLE `conteudousuarios` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.cursoprofessores
CREATE TABLE IF NOT EXISTS `cursoprofessores` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `ProfessorId` int(11) NOT NULL,
  `CursoId` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_CursoProfessores_Professores_idx` (`ProfessorId`),
  KEY `fk_CursoProfessores_Cursos1_idx` (`CursoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.cursoprofessores: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `cursoprofessores` DISABLE KEYS */;
/*!40000 ALTER TABLE `cursoprofessores` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.cursos
CREATE TABLE IF NOT EXISTS `cursos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(60) DEFAULT NULL,
  `DataCadastro` datetime DEFAULT NULL,
  `Status` varchar(1) DEFAULT NULL COMMENT 'A - Ativo\nI - Inativo',
  `Descricao` text DEFAULT NULL,
  `CargaHoraria` varchar(45) DEFAULT NULL,
  `ArquivoImg` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.cursos: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
REPLACE INTO `cursos` (`Id`, `Titulo`, `DataCadastro`, `Status`, `Descricao`, `CargaHoraria`, `ArquivoImg`) VALUES
	(1, 'Nova Criatura', '2020-12-29 00:00:00', 'A', 'Princípios da vida cristã: Lições e fundamentos básicos de doutrina biblica para andar em vitoria e saber explicar sua fé com propriedade.', '5 horas', NULL),
	(2, 'Familia Crista', '2020-12-29 00:00:00', 'A', 'Princípios de familia: Padrões básicos para o romance real entre solteiros, a construção de um lar feliz e a criação de filhos.', '10 horas', NULL),
	(3, 'Autoridade Espiritual', '2020-12-29 00:00:00', 'A', 'Princípios de autoridade: Princípios para exercer e submeter-se à autoridade biblicamente ordenada na sociedade e na igreja.', '10 horas', NULL),
	(4, 'Ide e Fazei Discípulos', '2020-12-29 00:00:00', 'A', 'Princípios de discipulado: Fundamentos praticos para ser e fazer discípulos.', '10 horas', NULL),
	(5, 'TLC - Treinamento de Líderes de Células', '2020-12-29 00:00:00', 'A', 'Princípios de liderança: Instruções e ferramentas para a formação integral de pastores de células bem sucedidos.', '10 horas', NULL),
	(8, 'Bate Papo com Pastores', '2021-01-10 10:41:05', 'A', 'Princípios de aliança: Visão geral do contexto da vida cristã, da Igreja Local e orientações ara aliança de membresia.', '1 hora e 30 minutos', NULL);
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.inscricaousuario
CREATE TABLE IF NOT EXISTS `inscricaousuario` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UsuarioId` int(11) NOT NULL,
  `DataInscricao` datetime DEFAULT NULL,
  `ProcessoInscricaoId` int(11) NOT NULL,
  `Status` varchar(2) DEFAULT NULL COMMENT 'AG - Aguardando Pagamento\nAL - Aguardando Liberacao\nCO - Confirmado\nCA - Cancelado',
  `DataConfirmacao` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_InscricaoUsuario_Usuarios1_idx` (`UsuarioId`),
  KEY `fk_InscricaoUsuario_ProcessoInscricoes1_idx` (`ProcessoInscricaoId`)
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.inscricaousuario: ~156 rows (aproximadamente)
/*!40000 ALTER TABLE `inscricaousuario` DISABLE KEYS */;
REPLACE INTO `inscricaousuario` (`Id`, `UsuarioId`, `DataInscricao`, `ProcessoInscricaoId`, `Status`, `DataConfirmacao`) VALUES
	(51, 1, '2021-01-10 08:44:26', 1, 'AG', '0001-01-01 00:00:00'),
	(52, 2, '2021-01-10 08:45:05', 1, 'AG', '0001-01-01 00:00:00'),
	(53, 3, '2021-01-10 09:12:26', 3, 'CO', '2021-01-31 16:47:13'),
	(54, 4, '2021-01-10 09:31:27', 2, 'CO', '2021-01-18 00:00:00'),
	(55, 5, '2021-01-10 09:34:24', 2, 'AG', '0001-01-01 00:00:00'),
	(56, 6, '2021-01-10 09:49:51', 1, 'CO', '2021-01-14 02:47:29'),
	(57, 7, '2021-01-10 10:01:23', 2, 'AG', '0001-01-01 00:00:00'),
	(58, 8, '2021-01-10 10:02:01', 2, 'CO', '2021-01-12 04:33:15'),
	(59, 9, '2021-01-10 10:08:15', 1, 'CA', '0001-01-01 00:00:00'),
	(60, 10, '2021-01-10 10:44:51', 3, 'AG', '0001-01-01 00:00:00'),
	(61, 9, '2021-01-10 10:46:04', 6, 'CA', '0001-01-01 00:00:00'),
	(62, 11, '2021-01-10 11:51:26', 1, 'CO', '2021-01-12 04:50:42'),
	(63, 12, '2021-01-10 12:06:06', 2, 'CO', '2021-01-18 21:47:00'),
	(64, 13, '2021-01-10 12:12:07', 2, 'AG', '0001-01-01 00:00:00'),
	(65, 14, '2021-01-10 13:05:00', 2, 'CO', '2021-01-18 21:47:00'),
	(66, 6, '2021-01-10 14:48:13', 6, 'AG', '0001-01-01 00:00:00'),
	(67, 15, '2021-01-10 19:18:09', 4, 'AG', '0001-01-01 00:00:00'),
	(68, 16, '2021-01-10 19:30:16', 2, 'AG', '0001-01-01 00:00:00'),
	(69, 17, '2021-01-10 19:40:37', 6, 'AG', '0001-01-01 00:00:00'),
	(70, 18, '2021-01-10 19:45:46', 3, 'CO', '2021-01-13 02:36:39'),
	(71, 19, '2021-01-10 20:17:43', 2, 'CO', '2021-01-14 02:39:38'),
	(72, 20, '2021-01-10 20:27:22', 1, 'CO', '2021-01-10 20:36:41'),
	(73, 21, '2021-01-10 21:28:17', 6, 'AG', '0001-01-01 00:00:00'),
	(74, 21, '2021-01-10 21:29:00', 1, 'AG', '0001-01-01 00:00:00'),
	(75, 22, '2021-01-11 10:53:25', 2, 'AG', '0001-01-01 00:00:00'),
	(76, 22, '2021-01-11 10:53:25', 2, 'CA', '0001-01-01 00:00:00'),
	(77, 24, '2021-01-11 10:58:07', 2, 'AG', '0001-01-01 00:00:00'),
	(78, 25, '2021-01-11 11:01:38', 2, 'AG', '0001-01-01 00:00:00'),
	(79, 24, '2021-01-11 11:03:47', 6, 'AG', '0001-01-01 00:00:00'),
	(80, 25, '2021-01-11 11:05:56', 6, 'AG', '0001-01-01 00:00:00'),
	(81, 26, '2021-01-11 12:41:48', 3, 'AG', '0001-01-01 00:00:00'),
	(82, 27, '2021-01-11 12:42:32', 2, 'CA', '0001-01-01 00:00:00'),
	(83, 28, '2021-01-11 12:48:21', 2, 'AG', '0001-01-01 00:00:00'),
	(84, 29, '2021-01-11 13:07:23', 6, 'AG', '0001-01-01 00:00:00'),
	(85, 30, '2021-01-11 14:30:29', 3, 'AG', '0001-01-01 00:00:00'),
	(86, 31, '2021-01-11 14:34:27', 3, 'AG', '0001-01-01 00:00:00'),
	(87, 32, '2021-01-11 14:43:32', 2, 'CA', '0001-01-01 00:00:00'),
	(88, 33, '2021-01-11 21:03:43', 2, 'AG', '0001-01-01 00:00:00'),
	(89, 34, '2021-01-11 21:27:58', 4, 'CO', '2021-01-21 02:31:49'),
	(90, 35, '2021-01-17 09:22:24', 5, 'CO', '2021-01-19 04:24:34'),
	(91, 36, '2021-01-17 09:30:03', 2, 'AG', '0001-01-01 00:00:00'),
	(92, 36, '2021-01-17 09:32:05', 6, 'AG', '0001-01-01 00:00:00'),
	(93, 37, '2021-01-17 09:47:17', 6, 'AG', '0001-01-01 00:00:00'),
	(94, 35, '2021-01-17 09:50:48', 6, 'AG', '0001-01-01 00:00:00'),
	(95, 38, '2021-01-17 09:53:02', 6, 'AG', '0001-01-01 00:00:00'),
	(96, 39, '2021-01-17 09:57:23', 3, 'CO', '0001-01-01 00:00:00'),
	(97, 40, '2021-01-17 10:50:17', 6, 'AG', '0001-01-01 00:00:00'),
	(98, 41, '2021-01-17 10:54:40', 3, 'CO', '0001-01-01 00:00:00'),
	(99, 42, '2021-01-17 10:59:42', 1, 'AG', '0001-01-01 00:00:00'),
	(100, 43, '2021-01-17 11:55:07', 2, 'CO', '2021-01-18 21:47:00'),
	(101, 43, '2021-01-17 11:58:38', 5, 'AG', '0001-01-01 00:00:00'),
	(102, 43, '2021-01-17 11:58:58', 5, 'CA', '0001-01-01 00:00:00'),
	(103, 44, '2021-01-17 12:06:54', 5, 'CO', '0001-01-01 00:00:00'),
	(104, 45, '2021-01-17 12:26:49', 1, 'AG', '0001-01-01 00:00:00'),
	(105, 46, '2021-01-17 14:55:22', 3, 'CO', '0001-01-01 00:00:00'),
	(106, 46, '2021-01-17 14:56:32', 6, 'AG', '0001-01-01 00:00:00'),
	(107, 47, '2021-01-17 19:34:22', 1, 'AG', '0001-01-01 00:00:00'),
	(108, 48, '2021-01-17 19:56:30', 3, 'CO', '2021-01-21 02:44:19'),
	(109, 2, '2021-01-17 20:25:21', 6, 'AG', '0001-01-01 00:00:00'),
	(110, 49, '2021-01-17 21:08:27', 1, 'AG', '0001-01-01 00:00:00'),
	(111, 50, '2021-01-17 21:13:46', 1, 'AG', '0001-01-01 00:00:00'),
	(112, 51, '2021-01-17 23:07:33', 6, 'AG', '0001-01-01 00:00:00'),
	(113, 49, '2021-01-17 23:09:54', 6, 'AG', '0001-01-01 00:00:00'),
	(114, 52, '2021-01-18 10:59:48', 2, 'CO', '2021-01-20 02:28:58'),
	(115, 53, '2021-01-18 11:42:22', 1, 'AG', '0001-01-01 00:00:00'),
	(116, 54, '2021-01-18 11:44:42', 3, 'CA', '0001-01-01 00:00:00'),
	(117, 54, '2021-01-18 11:59:23', 1, 'AG', '0001-01-01 00:00:00'),
	(118, 54, '2021-01-18 11:59:29', 1, 'CA', '0001-01-01 00:00:00'),
	(119, 54, '2021-01-18 12:00:14', 1, 'CA', '0001-01-01 00:00:00'),
	(120, 9, '2021-01-18 12:19:49', 3, 'CA', '0001-01-01 00:00:00'),
	(121, 9, '2021-01-18 12:20:40', 5, 'CA', '0001-01-01 00:00:00'),
	(122, 9, '2021-01-18 12:26:46', 1, 'CA', '0001-01-01 00:00:00'),
	(123, 55, '2021-01-18 13:44:40', 3, 'CA', '0001-01-01 00:00:00'),
	(124, 56, '2021-01-20 11:51:01', 6, 'AG', '0001-01-01 00:00:00'),
	(125, 57, '2021-01-21 09:52:00', 6, 'AG', '0001-01-01 00:00:00'),
	(126, 59, '2021-01-23 15:50:35', 6, 'AG', '0001-01-01 00:00:00'),
	(127, 60, '2021-01-23 21:19:34', 5, 'AG', '0001-01-01 00:00:00'),
	(128, 60, '2021-01-23 21:22:13', 6, 'AG', '0001-01-01 00:00:00'),
	(129, 61, '2021-01-23 23:51:00', 3, 'AG', '0001-01-01 00:00:00'),
	(130, 62, '2021-01-24 09:25:50', 4, 'CO', '2021-02-03 02:28:18'),
	(131, 63, '2021-01-24 09:34:52', 6, 'AG', '0001-01-01 00:00:00'),
	(132, 64, '2021-01-24 09:42:28', 3, 'AG', '0001-01-01 00:00:00'),
	(133, 65, '2021-01-24 14:05:13', 2, 'AG', '0001-01-01 00:00:00'),
	(134, 66, '2021-01-24 16:42:56', 6, 'AG', '0001-01-01 00:00:00'),
	(135, 67, '2021-01-24 20:13:27', 1, 'AG', '0001-01-01 00:00:00'),
	(136, 68, '2021-01-24 21:07:31', 2, 'CO', '2021-01-29 02:33:10'),
	(137, 51, '2021-01-25 19:54:34', 2, 'AG', '0001-01-01 00:00:00'),
	(138, 51, '2021-01-25 19:54:41', 2, 'CA', '0001-01-01 00:00:00'),
	(139, 51, '2021-01-25 19:54:46', 3, 'CO', '2021-01-28 06:26:19'),
	(140, 51, '2021-01-25 19:54:51', 4, 'AG', '0001-01-01 00:00:00'),
	(141, 51, '2021-01-25 19:54:55', 5, 'CO', '2021-01-28 06:26:19'),
	(142, 51, '2021-01-25 19:55:05', 2, 'CA', '0001-01-01 00:00:00'),
	(143, 51, '2021-01-25 19:55:09', 2, 'CA', '0001-01-01 00:00:00'),
	(144, 51, '2021-01-25 19:55:42', 2, 'CA', '0001-01-01 00:00:00'),
	(145, 51, '2021-01-25 19:56:12', 2, 'CA', '0001-01-01 00:00:00'),
	(146, 51, '2021-01-25 19:56:15', 3, 'CA', '0001-01-01 00:00:00'),
	(147, 51, '2021-01-25 19:56:23', 4, 'CA', '0001-01-01 00:00:00'),
	(148, 51, '2021-01-25 19:56:25', 5, 'CA', '0001-01-01 00:00:00'),
	(149, 51, '2021-01-25 19:56:38', 2, 'CA', '0001-01-01 00:00:00'),
	(150, 69, '2021-01-26 16:23:22', 2, 'CO', '2021-01-26 18:57:32'),
	(151, 70, '2021-01-27 22:25:30', 6, 'CA', '0001-01-01 00:00:00'),
	(152, 70, '2021-01-27 22:26:31', 1, 'CA', '0001-01-01 00:00:00'),
	(153, 70, '2021-01-27 22:26:40', 1, 'CO', '2021-01-27 22:31:02'),
	(154, 70, '2021-01-27 22:26:52', 1, 'CA', '0001-01-01 00:00:00'),
	(155, 70, '2021-01-27 22:27:21', 1, 'CA', '0001-01-01 00:00:00'),
	(156, 70, '2021-01-27 22:27:45', 1, 'CA', '0001-01-01 00:00:00'),
	(157, 70, '2021-01-27 22:32:12', 6, 'AG', '0001-01-01 00:00:00'),
	(158, 71, '2021-01-28 18:59:20', 1, 'AG', '0001-01-01 00:00:00'),
	(159, 72, '2021-01-28 21:11:34', 6, 'AG', '0001-01-01 00:00:00'),
	(160, 73, '2021-01-28 22:33:53', 6, 'AG', '0001-01-01 00:00:00'),
	(161, 74, '2021-01-29 09:34:04', 4, 'CO', '2021-01-30 02:34:10'),
	(162, 74, '2021-01-29 09:38:10', 6, 'AG', '0001-01-01 00:00:00'),
	(163, 75, '2021-01-29 22:48:51', 1, 'CO', '2021-01-29 22:53:54'),
	(164, 76, '2021-01-29 23:02:37', 1, 'CO', '2021-02-01 22:15:11'),
	(165, 77, '2021-01-30 10:35:25', 3, 'CO', '2021-02-02 16:26:03'),
	(166, 78, '2021-01-30 16:39:33', 2, 'AG', '0001-01-01 00:00:00'),
	(167, 79, '2021-01-30 19:49:30', 6, 'AG', '0001-01-01 00:00:00'),
	(168, 80, '2021-01-31 09:36:32', 3, 'CO', '2021-02-03 02:37:48'),
	(169, 81, '2021-01-31 09:47:39', 2, 'CO', '2021-02-02 03:48:12'),
	(170, 82, '2021-01-31 09:51:00', 1, 'CO', '2021-01-31 11:23:23'),
	(171, 83, '2021-01-31 10:11:25', 4, 'CA', '0001-01-01 00:00:00'),
	(172, 83, '2021-01-31 10:14:19', 4, 'CO', '2021-02-02 03:53:51'),
	(173, 83, '2021-01-31 10:14:26', 4, 'AG', '0001-01-01 00:00:00'),
	(174, 83, '2021-01-31 10:14:38', 4, 'AG', '0001-01-01 00:00:00'),
	(175, 83, '2021-01-31 10:14:46', 4, 'AG', '0001-01-01 00:00:00'),
	(176, 84, '2021-01-31 10:39:37', 1, 'CO', '2021-02-02 03:43:08'),
	(177, 85, '2021-01-31 10:40:24', 1, 'CA', '0001-01-01 00:00:00'),
	(178, 85, '2021-01-31 10:42:43', 6, 'AG', '0001-01-01 00:00:00'),
	(179, 85, '2021-01-31 10:44:21', 1, 'CO', '2021-01-31 11:00:03'),
	(180, 85, '2021-01-31 10:44:29', 1, 'CA', '0001-01-01 00:00:00'),
	(181, 86, '2021-01-31 11:05:51', 1, 'CO', '2021-02-02 03:45:03'),
	(182, 86, '2021-01-31 11:06:31', 6, 'AG', '0001-01-01 00:00:00'),
	(183, 87, '2021-01-31 11:48:45', 1, 'AG', '0001-01-01 00:00:00'),
	(184, 88, '2021-01-31 16:58:29', 6, 'AG', '0001-01-01 00:00:00'),
	(185, 89, '2021-01-31 18:30:33', 6, 'AG', '0001-01-01 00:00:00'),
	(186, 90, '2021-01-31 18:38:56', 6, 'AG', '0001-01-01 00:00:00'),
	(187, 55, '2021-01-31 20:15:57', 3, 'CA', '0001-01-01 00:00:00'),
	(188, 55, '2021-01-31 20:16:04', 3, 'CA', '0001-01-01 00:00:00'),
	(189, 55, '2021-01-31 20:16:45', 1, 'CA', '0001-01-01 00:00:00'),
	(190, 55, '2021-01-31 20:17:23', 3, 'CA', '0001-01-01 00:00:00'),
	(191, 55, '2021-01-31 20:17:28', 3, 'CA', '0001-01-01 00:00:00'),
	(192, 55, '2021-01-31 20:17:32', 3, 'CA', '0001-01-01 00:00:00'),
	(193, 55, '2021-01-31 20:38:53', 3, 'AG', '0001-01-01 00:00:00'),
	(194, 55, '2021-01-31 20:39:24', 3, 'AG', '0001-01-01 00:00:00'),
	(195, 91, '2021-01-31 20:51:03', 3, 'CO', '2021-02-02 03:49:44'),
	(196, 9, '2021-01-31 21:38:17', 1, 'CA', '0001-01-01 00:00:00'),
	(197, 9, '2021-01-31 21:43:40', 1, 'CA', '0001-01-01 00:00:00'),
	(198, 88, '2021-01-31 21:45:38', 1, 'AG', '0001-01-01 00:00:00'),
	(199, 9, '2021-01-31 21:45:59', 1, 'CA', '0001-01-01 00:00:00'),
	(200, 88, '2021-01-31 21:45:58', 1, 'CA', '0001-01-01 00:00:00'),
	(201, 88, '2021-01-31 21:46:09', 1, 'CA', '0001-01-01 00:00:00'),
	(202, 88, '2021-01-31 21:46:11', 1, 'CA', '0001-01-01 00:00:00'),
	(203, 9, '2021-01-31 21:47:02', 1, 'AG', '0001-01-01 00:00:00'),
	(204, 93, '2021-01-31 21:48:05', 1, 'AG', '0001-01-01 00:00:00'),
	(205, 94, '2021-01-31 22:34:52', 6, 'AG', '0001-01-01 00:00:00'),
	(206, 32, '2021-01-31 22:48:34', 4, 'CO', '2021-02-02 03:43:08');
/*!40000 ALTER TABLE `inscricaousuario` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.itensprova
CREATE TABLE IF NOT EXISTS `itensprova` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Questao` text DEFAULT NULL,
  `Status` varchar(1) DEFAULT NULL COMMENT 'A - Ativo\nI - Inativo',
  `QuestaoCorreta` varchar(1) DEFAULT NULL COMMENT 'S - Sim\nN - Nao',
  `ProvaId` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_ItensProva_Provas1_idx` (`ProvaId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.itensprova: ~15 rows (aproximadamente)
/*!40000 ALTER TABLE `itensprova` DISABLE KEYS */;
REPLACE INTO `itensprova` (`Id`, `Questao`, `Status`, `QuestaoCorreta`, `ProvaId`) VALUES
	(1, 'Ter dinheiro', 'A', 'N', 1),
	(2, 'Ter carro', 'A', 'N', 1),
	(3, 'Ter sucesso', 'A', 'N', 1),
	(4, 'Aceitar Jesus', 'A', 'S', 1),
	(5, 'Meu Discipulo Amado', 'A', 'S', 2),
	(6, 'Meu Dinheiro Amado', 'A', 'N', 2),
	(7, 'Modelo Discipulado Apostolico', 'A', 'S', 2),
	(8, 'Meu Deus Amado', 'A', 'N', 2),
	(9, 'Jesus', 'A', 'S', 4),
	(10, 'Diabo', 'A', 'N', 4),
	(11, 'Grupo', 'A', 'N', 5),
	(12, 'Pequeno Grupo', 'A', 'S', 5),
	(13, 'Parte do Corpo', 'A', 'N', 5),
	(14, 'Igreja', 'A', 'N', 5),
	(15, 'Reuniao', 'A', 'N', 5);
/*!40000 ALTER TABLE `itensprova` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.liberacaomodulo
CREATE TABLE IF NOT EXISTS `liberacaomodulo` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `ModuloId` int(11) NOT NULL,
  `ProcessoInscricoeId` int(11) NOT NULL,
  `DataInicio` datetime DEFAULT NULL,
  `DataFinal` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_LiberacaoModulo_Modulos1` (`ModuloId`),
  KEY `fk_LiberacaoModulo_ProcessoInscricoes1` (`ProcessoInscricoeId`),
  CONSTRAINT `fk_LiberacaoModulo_Modulos1` FOREIGN KEY (`ModuloId`) REFERENCES `modulos` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_LiberacaoModulo_ProcessoInscricoes1` FOREIGN KEY (`ProcessoInscricoeId`) REFERENCES `processoinscricoes` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.liberacaomodulo: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `liberacaomodulo` DISABLE KEYS */;
/*!40000 ALTER TABLE `liberacaomodulo` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.lognotificacoes
CREATE TABLE IF NOT EXISTS `lognotificacoes` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `notificationcode` varchar(100) DEFAULT NULL,
  `data` datetime DEFAULT NULL,
  `notificationtype` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.lognotificacoes: ~108 rows (aproximadamente)
/*!40000 ALTER TABLE `lognotificacoes` DISABLE KEYS */;
REPLACE INTO `lognotificacoes` (`Id`, `notificationcode`, `data`, `notificationtype`) VALUES
	(1, '6C0024-D62ABB2ABBDD-8AA4D59F9F72-C397AE', '2021-01-06 14:51:43', 'transaction'),
	(2, '107966-F5B88DB88D45-AEE415EFB4C8-7CCF49', '2021-01-06 14:53:30', 'transaction'),
	(3, '1E66C3-109380938079-AAA48C8F9FF4-1C27E9', '2021-01-06 14:59:02', 'transaction'),
	(4, 'E066CC-C57B6E7B6E03-C6649E6F80C8-023088', '2021-01-07 09:24:29', 'transaction'),
	(5, '8618D9-C8C5C7C5C7BE-BBB4E13FBCA8-C9D183', '2021-01-07 15:19:50', 'transaction'),
	(6, '7AB5A1-D26C356C3510-DDD49BEF8A36-6BA7C4', '2021-01-07 15:26:20', 'transaction'),
	(7, '848B03-4BD88DD88DF5-944444AFAA58-57C2EB', '2021-01-07 15:35:07', 'transaction'),
	(8, '9FA423-A18631863117-BEE4E81F9627-18929B', '2021-01-07 19:11:30', 'transaction'),
	(9, '996894-CBACC3ACC3C7-EDD460EF854D-3A3F23', '2021-01-08 02:52:35', 'transaction'),
	(10, '2A1FFB-2AE369E36965-25546A4F9EEA-856454', '2021-01-10 08:45:03', 'transaction'),
	(11, 'C17B96-929D609D6092-611481FF82AF-0FAD28', '2021-01-10 08:45:41', 'transaction'),
	(12, '958D86-44F253F25392-22242B1FB9B3-316645', '2021-01-10 10:01:58', 'transaction'),
	(13, '7E986D-D51E501E5053-B994929FB32B-8CBEE6', '2021-01-10 10:02:57', 'transaction'),
	(14, 'B92AFA-84169F169F64-2BB4DD1F91EC-9647A7', '2021-01-10 10:45:48', 'transaction'),
	(15, '7B6785-691BDE1BDE09-CDD4652F971F-FE8A75', '2021-01-10 11:52:10', 'transaction'),
	(16, 'D02913-7EBECCBECC75-BEE4BAAFA685-14283C', '2021-01-10 19:46:34', 'transaction'),
	(17, 'C1033B-0B634C634CA1-EAA4BBEFB0B0-01EC87', '2021-01-10 20:19:17', 'transaction'),
	(18, 'AEA7E0-2EC4A2C4A2BE-6884925FBFDC-10C2C1', '2021-01-10 20:36:41', 'transaction'),
	(19, '708201-EBE5EDE5ED33-AAA4AE1FBD30-D3333A', '2021-01-11 14:33:23', 'transaction'),
	(20, '706388-66D916D916E1-6CC4E9AFBD96-756230', '2021-01-11 14:35:34', 'transaction'),
	(21, '919981-458CB68CB67B-EFF4BB8FBCE3-CD2C96', '2021-01-11 21:04:33', 'transaction'),
	(22, 'B50C93-879B469B4655-00048D6FADA9-3030AE', '2021-01-11 21:28:44', 'transaction'),
	(23, '1CCA6B-DB89058905B1-3CC4DE9F9D83-A2F182', '2021-01-12 04:33:14', 'transaction'),
	(24, '5384A8-07C667C667EA-DFF4148F8233-904E6B', '2021-01-12 04:50:41', 'transaction'),
	(25, 'E0C230-CEA21CA21C07-B664D81F8DAE-E4473B', '2021-01-13 02:36:37', 'transaction'),
	(26, '040C52-32520E520EA3-9BB451AFA711-5E079A', '2021-01-14 02:39:36', 'transaction'),
	(27, '3FE91D-B0AA9CAA9C1F-D4449D4F81E9-BDFA7C', '2021-01-14 02:47:29', 'transaction'),
	(28, '1A2116-1F58A758A75B-FCC4E83F9759-DEF236', '2021-01-17 09:34:39', 'transaction'),
	(29, 'C02720-3D07F707F720-42243D9F877E-A36BA3', '2021-01-17 12:29:02', 'transaction'),
	(30, '11475B-686D5E6D5E58-3554215FA2EA-9A9165', '2021-01-17 19:35:22', 'transaction'),
	(31, '925F13-DE8E118E114E-E444949FB47E-6D3377', '2021-01-17 19:57:46', 'transaction'),
	(32, 'ACD6B6-F496A296A256-999435EF9041-52254E', '2021-01-17 21:14:20', 'transaction'),
	(33, '854A7D-BEF3F8F3F8FB-8114F81FB22A-59A0C8', '2021-01-17 21:18:32', 'transaction'),
	(34, '8D38C2-25BB51BB5164-E114F04FB68F-1297C6', '2021-01-18 11:01:03', 'transaction'),
	(35, 'BC3F52-BCB472B472FF-4AA4947FB817-962887', '2021-01-19 04:24:33', 'transaction'),
	(36, '5CC03D-28ACEDACED82-8CC4652FBE97-9FDDB4', '2021-01-20 01:11:30', 'transaction'),
	(37, 'C227A5-48C99EC99ECB-C334F42FA06A-D6765C', '2021-01-20 01:16:08', 'transaction'),
	(38, '6F5C1E-BD9F369F36E8-866444AFB5E9-E1E4C9', '2021-01-20 02:28:58', 'transaction'),
	(39, '83CC03-95A58DA58DC7-1334727FA69B-9AEAA1', '2021-01-20 08:58:59', 'transaction'),
	(40, 'F0FB3B-6752A952A920-6114ECDF8934-1259D4', '2021-01-20 12:08:24', 'transaction'),
	(41, '08AAAD-F2804E804E3E-966491EF8638-C98967', '2021-01-21 01:04:11', 'transaction'),
	(42, '0D2751-3C22F822F8FF-2004CFBF9424-9544C8', '2021-01-21 01:20:26', 'transaction'),
	(43, '690FE8-5FA10EA10EB6-4334F7BFB0ED-E2E29C', '2021-01-21 02:31:48', 'transaction'),
	(44, 'DA79CB-14A27BA27B57-25549CAFB87D-761EAB', '2021-01-21 02:44:19', 'transaction'),
	(45, '9A4FD8-7C0B3C0B3CF1-CBB49D2F9EA8-B14C38', '2021-01-22 01:04:20', 'transaction'),
	(46, 'A27137-799E359E3594-6994F41FA9CF-D78F93', '2021-01-22 07:57:16', 'transaction'),
	(47, '437DD0-7A98D098D092-6AA44DBF9B4A-2331C1', '2021-01-22 08:08:46', 'transaction'),
	(48, 'CCB7CE-2D8FA58FA5A0-F334B6EFBEB4-3F954A', '2021-01-23 08:35:20', 'transaction'),
	(49, 'D03494-DB612661260D-CCC49B8F891A-8F612B', '2021-01-23 08:35:20', 'transaction'),
	(50, 'E50499-B29686968628-9CC4A92FB151-EDBE10', '2021-01-23 08:37:28', 'transaction'),
	(51, '913A6E-EA8BCE8BCE82-1444A20FA279-772512', '2021-01-24 02:36:23', 'transaction'),
	(52, '38A6C9-13BE11BE11C9-7AA43CAF87E2-C53B6E', '2021-01-24 07:47:13', 'transaction'),
	(53, '23B108-18A61DA61DD1-C994702F82E4-F55DEC', '2021-01-24 07:47:13', 'transaction'),
	(54, 'EF34FF-8BD983D983C4-D2245F9FB54A-713953', '2021-01-24 08:04:21', 'transaction'),
	(55, 'F4283F-874BFB4BFB2F-0AA4E94FAFB3-5C6E29', '2021-01-24 09:27:23', 'transaction'),
	(56, 'E21E58-5C9D539D53C2-B6641E9F8184-CACEE8', '2021-01-24 09:54:36', 'transaction'),
	(57, 'BA1227-310AAB0AABE8-CBB4147F8096-D97FD1', '2021-01-24 10:47:57', 'transaction'),
	(58, '31C3BD-DDC4DBC4DB88-5CC4015FA912-F29937', '2021-01-24 11:14:41', 'transaction'),
	(59, 'A7B71E-3A490849085B-6BB4EC5FB96B-C33755', '2021-01-24 14:06:40', 'transaction'),
	(60, '1B4DAD-DC54D954D9D3-84440FFFA88A-92075B', '2021-01-24 21:08:47', 'transaction'),
	(61, '59279C-8E41C441C4CF-4EE4609FA53E-5E1403', '2021-01-26 01:26:38', 'transaction'),
	(62, 'E25503-5F87538753DC-47742F2FB10E-B12984', '2021-01-26 02:15:05', 'transaction'),
	(63, '321DB2-C8549454942D-44446C4F86C3-3AA733', '2021-01-26 13:53:22', 'transaction'),
	(64, '044565-7280A680A637-68845ADFBF5B-58984E', '2021-01-26 14:04:06', 'transaction'),
	(65, 'FE25CF-69E3A2E3A2CA-533496DF9F68-8E3B97', '2021-01-26 14:13:54', 'transaction'),
	(66, '0ADAB4-158F848F845C-E114C20F9CC0-19DBB2', '2021-01-26 14:16:08', 'transaction'),
	(67, 'A988B8-789D219D21B3-D444462FBCDF-35F1B6', '2021-01-26 18:57:32', 'transaction'),
	(68, '1C86CD-4FC319C319F2-6FF4B72F915C-50F284', '2021-01-27 02:13:07', 'transaction'),
	(69, '7D7BB6-4EC9ACC9ACA3-0884FA9FB7E0-D6F32B', '2021-01-27 22:31:02', 'transaction'),
	(70, '4C963A-F732A032A077-BBB49BBFB1AC-70F0F0', '2021-01-27 23:49:28', 'transaction'),
	(71, '163966-0382D982D99A-1AA42B6F9F59-8F7639', '2021-01-28 01:25:22', 'transaction'),
	(72, 'BD7F25-DD8A9F8A9FF3-6554D4EFB906-B7D0EC', '2021-01-28 01:29:21', 'transaction'),
	(73, 'B0FF92-66625F625FCB-2FF4D21F9D8E-5D8CFF', '2021-01-28 03:06:30', 'transaction'),
	(74, 'B35AE4-61B1A5B1A53F-4774E90FA176-A6A0F8', '2021-01-28 03:06:31', 'transaction'),
	(75, 'B35AE4-61B1A5B1A53F-4774E90FA176-A6A0F8', '2021-01-28 06:26:19', 'transaction'),
	(76, 'B0FF92-66625F625FCB-2FF4D21F9D8E-5D8CFF', '2021-01-28 06:26:19', 'transaction'),
	(77, '602A18-3490CD90CDBF-2FF4045F8EF4-29DB41', '2021-01-29 02:33:07', 'transaction'),
	(78, '15C5A9-BF188A188A30-ADD4B30F9D4D-7C56E0', '2021-01-29 09:35:24', 'transaction'),
	(79, '215A91-ADDFCDDFCD7C-655437FFB108-0C8DE6', '2021-01-29 22:53:53', 'transaction'),
	(80, 'F20D80-556AF86AF810-444440BFA236-5FD421', '2021-01-29 23:04:36', 'transaction'),
	(81, 'B225E9-6813BA13BA91-F004543FB2E0-4E5FB5', '2021-01-30 02:34:09', 'transaction'),
	(82, '61A4F7-5C6BE36BE31D-D004C5FFBBF8-23C428', '2021-01-30 09:05:58', 'transaction'),
	(83, '10220B-1FE014E0147B-3664714FAA6B-44D8DC', '2021-01-30 09:15:20', 'transaction'),
	(84, '497D2B-225C425C4245-0444C39FB3EC-497F6A', '2021-01-30 09:18:50', 'transaction'),
	(85, '650F6F-781C151C15F6-B884E09F839C-CF7A05', '2021-01-30 09:18:57', 'transaction'),
	(86, '05BCEF-3A7B137B1333-B4442B9FAA49-D42F9B', '2021-01-31 09:40:00', 'transaction'),
	(87, '267FC0-B36B666B6644-9EE4563F9BD3-081347', '2021-01-31 09:51:04', 'transaction'),
	(88, '4C4918-A3D5DFD5DF5E-44449C4F9EB3-98CD6A', '2021-01-31 11:00:02', 'transaction'),
	(89, '1F7186-7F32BB32BB65-2224DB1FBEEE-4F81E8', '2021-01-31 11:02:02', 'transaction'),
	(90, 'A84FE4-068C4E8C4E2E-DCC4784F9597-D956C2', '2021-01-31 11:10:15', 'transaction'),
	(91, 'ACB748-D801B001B090-D55421AFB3CE-B600B8', '2021-01-31 11:23:23', 'transaction'),
	(92, 'CE426A-BF2D682D68F2-922468DF9ACD-47FE65', '2021-01-31 16:11:53', 'transaction'),
	(93, '25EC73-5AF828F82867-ECC42C5F808B-33F06F', '2021-01-31 16:47:13', 'transaction'),
	(94, 'BD073B-FA2FBE2FBEDA-E774818F8998-EE8031', '2021-01-31 20:54:43', 'transaction'),
	(95, 'AAB22F-EDC12BC12B14-A4440E3F9591-8A519D', '2021-01-31 22:49:19', 'transaction'),
	(96, '2CECCB-20397C397C59-B224D37F962F-07120D', '2021-02-01 00:15:18', 'transaction'),
	(97, 'BE307B-E4F82EF82E10-1FF4757F85DD-949F12', '2021-02-01 22:15:09', 'transaction'),
	(98, 'F29F53-24A441A4416E-9444794F8126-B7C8A9', '2021-02-02 01:25:47', 'transaction'),
	(99, 'DB32B6-F7EE56EE56A2-7994A31F98BB-754402', '2021-02-02 03:43:07', 'transaction'),
	(100, 'B5671F-DA5703570343-677490DFAB98-03B0CF', '2021-02-02 03:43:07', 'transaction'),
	(101, 'C25026-4B63E863E845-7CC4D79F9254-A9CB0B', '2021-02-02 03:45:02', 'transaction'),
	(102, 'A9EF0A-A19A679A6717-2004A32F9EAF-B32375', '2021-02-02 03:48:12', 'transaction'),
	(103, '1113AA-93B140B14001-3114E1DF83F3-AC21E1', '2021-02-02 03:49:44', 'transaction'),
	(104, 'D34C83-EEFF5AFF5A7A-0884713FB890-EA98F9', '2021-02-02 03:53:50', 'transaction'),
	(105, '684D7D-1106D306D3AC-5AA4CCEFA2DB-CE5F66', '2021-02-02 16:25:59', 'transaction'),
	(106, '52331F-0B8E3D8E3DD9-3EE40F3F8BEE-502C34', '2021-02-03 01:45:07', 'transaction'),
	(107, 'DA874C-7FB870B870AB-6BB41DCFA68A-9E0D40', '2021-02-03 02:28:17', 'transaction'),
	(108, '8FFF18-3988788878CB-EBB4F4AF95FA-70F4D4', '2021-02-03 02:37:48', 'transaction');
/*!40000 ALTER TABLE `lognotificacoes` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.logsusuario
CREATE TABLE IF NOT EXISTS `logsusuario` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Data` datetime DEFAULT NULL,
  `UsuarioId` int(11) NOT NULL,
  `Acao` text DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_LogsUsuario_Usuarios1_idx` (`UsuarioId`)
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.logsusuario: ~189 rows (aproximadamente)
/*!40000 ALTER TABLE `logsusuario` DISABLE KEYS */;
REPLACE INTO `logsusuario` (`Id`, `Data`, `UsuarioId`, `Acao`) VALUES
	(1, '2021-01-15 16:23:48', 9, 'Usuario: VINICIUS DE OLIVEIRA SOUSA, EndPoint: Autenticar, Obs: '),
	(2, '2021-01-15 18:30:57', 9, 'Usuario: VINICIUS DE OLIVEIRA SOUSA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(3, '2021-01-16 16:48:15', 9, 'Usuario: VINICIUS DE OLIVEIRA SOUSA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(4, '2021-01-17 15:17:15', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(5, '2021-01-17 16:10:50', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(6, '2021-01-18 08:41:26', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(7, '2021-01-18 20:32:42', 9, 'Usuario: VINICIUS DE OLIVEIRA SOUSA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(8, '2021-01-18 22:40:50', 9, 'Usuario: VINICIUS DE OLIVEIRA SOUSA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(9, '2021-01-19 17:10:41', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(10, '2021-01-19 17:23:31', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(11, '2021-01-19 20:38:05', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(12, '2021-01-20 08:57:00', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(13, '2021-01-20 09:12:09', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(14, '2021-01-20 11:51:01', 56, 'Usuario: ISABELLA DE ASSIS CERINO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(15, '2021-01-20 12:02:21', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(16, '2021-01-20 12:06:56', 21, 'Usuario: MARÍLIA GABRIELA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(17, '2021-01-20 16:43:22', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(18, '2021-01-21 09:51:59', 57, 'Usuario: JAIRO RUFINO RUBIN , EndPoint: Autenticar, Obs: Logou no sistema'),
	(19, '2021-01-21 09:53:02', 57, 'Usuario: JAIRO RUFINO RUBIN , EndPoint: Autenticar, Obs: Logou no sistema'),
	(20, '2021-01-21 09:55:22', 57, 'Usuario: JAIRO RUFINO RUBIN , EndPoint: Autenticar, Obs: Logou no sistema'),
	(21, '2021-01-21 09:58:13', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(22, '2021-01-21 20:57:27', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(23, '2021-01-22 14:56:01', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(24, '2021-01-23 11:39:13', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(25, '2021-01-23 14:14:26', 58, 'Usuario: WENDEL FELIPE GUIMARÃES LIMA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(26, '2021-01-23 15:50:35', 59, 'Usuario: CINTHYA RODRIGUES DOS SANTOS , EndPoint: Autenticar, Obs: Logou no sistema'),
	(27, '2021-01-23 15:50:51', 59, 'Usuario: CINTHYA RODRIGUES DOS SANTOS , EndPoint: Autenticar, Obs: Logou no sistema'),
	(28, '2021-01-23 17:55:31', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(29, '2021-01-23 20:38:30', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(30, '2021-01-23 21:19:34', 60, 'Usuario: GENILDA RAMOS VALVERDE DOS SANTOS , EndPoint: Autenticar, Obs: Logou no sistema'),
	(31, '2021-01-23 21:21:26', 60, 'Usuario: GENILDA RAMOS VALVERDE DOS SANTOS , EndPoint: Autenticar, Obs: Logou no sistema'),
	(32, '2021-01-23 23:51:00', 61, 'Usuario: ANNA CAROLLINY, EndPoint: Autenticar, Obs: Logou no sistema'),
	(33, '2021-01-23 23:51:27', 61, 'Usuario: ANNA CAROLLINY, EndPoint: Autenticar, Obs: Logou no sistema'),
	(34, '2021-01-24 09:25:50', 62, 'Usuario: JÉSSICA MARTINS AMARO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(35, '2021-01-24 09:34:52', 63, 'Usuario: JÉSSICA MARTINS AMARO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(36, '2021-01-24 09:42:27', 64, 'Usuario: CARLOS ALBERTO FERREIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(37, '2021-01-24 09:46:57', 64, 'Usuario: CARLOS ALBERTO FERREIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(38, '2021-01-24 09:51:33', 64, 'Usuario: CARLOS ALBERTO FERREIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(39, '2021-01-24 09:56:13', 64, 'Usuario: CARLOS ALBERTO FERREIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(40, '2021-01-24 10:46:56', 32, 'Usuario: CECÍLIA CARNEIRO MENDONÇA DOS SANTOS, EndPoint: Autenticar, Obs: Logou no sistema'),
	(41, '2021-01-24 10:50:23', 32, 'Usuario: CECÍLIA CARNEIRO MENDONÇA DOS SANTOS, EndPoint: Autenticar, Obs: Logou no sistema'),
	(42, '2021-01-24 10:58:28', 61, 'Usuario: ANNA CAROLLINY, EndPoint: Autenticar, Obs: Logou no sistema'),
	(43, '2021-01-24 14:05:12', 65, 'Usuario: TATIANA CARNEIRO MENDONÇA DA SILVA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(44, '2021-01-24 15:12:16', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(45, '2021-01-24 15:14:43', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(46, '2021-01-24 16:42:56', 66, 'Usuario: KAROLAINY CARDOSO FERREIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(47, '2021-01-24 20:13:27', 67, 'Usuario: LUCAS ELUAN BERNARDES DOS SANTOS, EndPoint: Autenticar, Obs: Logou no sistema'),
	(48, '2021-01-24 21:07:31', 68, 'Usuario: JOSEPH OZORIO DOS SANTOS, EndPoint: Autenticar, Obs: Logou no sistema'),
	(49, '2021-01-25 16:31:12', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(50, '2021-01-25 18:05:13', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(51, '2021-01-25 19:54:04', 51, 'Usuario: ANA BEATRIZ DE OLIVEIRA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(52, '2021-01-25 19:54:05', 51, 'Usuario: ANA BEATRIZ DE OLIVEIRA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(53, '2021-01-25 20:51:44', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(54, '2021-01-26 12:50:03', 51, 'Usuario: ANA BEATRIZ DE OLIVEIRA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(55, '2021-01-26 13:24:01', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(56, '2021-01-26 13:33:37', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(57, '2021-01-26 13:34:48', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(58, '2021-01-26 13:35:58', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(59, '2021-01-26 13:43:53', 51, 'Usuario: ANA BEATRIZ DE OLIVEIRA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(60, '2021-01-26 14:02:29', 51, 'Usuario: ANA BEATRIZ DE OLIVEIRA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(61, '2021-01-26 14:13:18', 51, 'Usuario: ANA BEATRIZ DE OLIVEIRA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(62, '2021-01-26 14:15:19', 51, 'Usuario: ANA BEATRIZ DE OLIVEIRA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(63, '2021-01-26 15:24:35', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(64, '2021-01-26 16:23:22', 69, 'Usuario: CLEUDINEIA MARQUES, EndPoint: Autenticar, Obs: Logou no sistema'),
	(65, '2021-01-26 17:42:08', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(66, '2021-01-26 18:28:24', 27, 'Usuario: CLAUDINEIA MARQUES , EndPoint: Autenticar, Obs: Logou no sistema'),
	(67, '2021-01-26 18:45:34', 27, 'Usuario: CLAUDINEIA MARQUES , EndPoint: Autenticar, Obs: Logou no sistema'),
	(68, '2021-01-26 18:54:56', 69, 'Usuario: CLEUDINEIA MARQUES, EndPoint: Autenticar, Obs: Logou no sistema'),
	(69, '2021-01-26 18:59:36', 69, 'Usuario: CLEUDINEIA MARQUES, EndPoint: Autenticar, Obs: Logou no sistema'),
	(70, '2021-01-27 10:10:57', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(71, '2021-01-27 14:29:54', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(72, '2021-01-27 16:42:30', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(73, '2021-01-27 22:25:29', 70, 'Usuario: ISTEFANNY DIAS LEITE , EndPoint: Autenticar, Obs: Logou no sistema'),
	(74, '2021-01-27 22:26:16', 70, 'Usuario: ISTEFANNY DIAS LEITE , EndPoint: Autenticar, Obs: Logou no sistema'),
	(75, '2021-01-27 23:48:20', 68, 'Usuario: JOSEPH OZORIO DOS SANTOS, EndPoint: Autenticar, Obs: Logou no sistema'),
	(76, '2021-01-28 09:16:23', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(77, '2021-01-28 14:49:43', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(78, '2021-01-28 16:34:05', 68, 'Usuario: JOSEPH OZORIO DOS SANTOS, EndPoint: Autenticar, Obs: Logou no sistema'),
	(79, '2021-01-28 18:59:20', 71, 'Usuario: FÁBIO JÚNIOR PEREIRA DE SOUSA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(80, '2021-01-28 19:13:58', 71, 'Usuario: FÁBIO JÚNIOR PEREIRA DE SOUSA , EndPoint: RecuperarSenha, Obs: Solicitour recuperar a senha'),
	(81, '2021-01-28 19:34:53', 71, 'Usuario: FÁBIO JÚNIOR PEREIRA DE SOUSA , EndPoint: ResetarSenha, Obs: Solicitour recuperar a senha'),
	(82, '2021-01-28 19:35:09', 71, 'Usuario: FÁBIO JÚNIOR PEREIRA DE SOUSA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(83, '2021-01-28 21:11:34', 72, 'Usuario: CÍCERA KEYLA FERREIRA MOTA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(84, '2021-01-28 21:12:17', 72, 'Usuario: CÍCERA KEYLA FERREIRA MOTA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(85, '2021-01-28 22:33:53', 73, 'Usuario: THAINARA SILVA DE OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(86, '2021-01-28 22:34:23', 73, 'Usuario: THAINARA SILVA DE OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(87, '2021-01-29 09:34:04', 74, 'Usuario: IRENE DA SILVA SOUZA TEIXEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(88, '2021-01-29 09:37:54', 74, 'Usuario: IRENE DA SILVA SOUZA TEIXEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(89, '2021-01-29 22:48:51', 75, 'Usuario: JACKELINE CUNHA DA CONCEIÇÃO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(90, '2021-01-29 23:02:37', 76, 'Usuario: RONALDO PANTIERE ARAUJO RIBEIRO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(91, '2021-01-29 23:13:27', 76, 'Usuario: RONALDO PANTIERE ARAUJO RIBEIRO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(92, '2021-01-30 10:35:24', 77, 'Usuario: CELMA CÂNDIDA MORAES, EndPoint: Autenticar, Obs: Logou no sistema'),
	(93, '2021-01-30 16:39:33', 78, 'Usuario: SIMONE CARDOSO GOMES, EndPoint: Autenticar, Obs: Logou no sistema'),
	(94, '2021-01-30 19:49:29', 79, 'Usuario: WESLEY SOUZA LOPES, EndPoint: Autenticar, Obs: Logou no sistema'),
	(95, '2021-01-30 19:49:41', 79, 'Usuario: WESLEY SOUZA LOPES, EndPoint: Autenticar, Obs: Logou no sistema'),
	(96, '2021-01-31 09:36:30', 80, 'Usuario: LINDALVA MONTEIRO MATOS , EndPoint: Autenticar, Obs: Logou no sistema'),
	(97, '2021-01-31 09:47:39', 81, 'Usuario: SIMONE CARDOSO GOMES, EndPoint: Autenticar, Obs: Logou no sistema'),
	(98, '2021-01-31 09:48:43', 81, 'Usuario: SIMONE CARDOSO GOMES, EndPoint: Autenticar, Obs: Logou no sistema'),
	(99, '2021-01-31 09:50:59', 82, 'Usuario: RAISSE DAIANE, EndPoint: Autenticar, Obs: Logou no sistema'),
	(100, '2021-01-31 09:51:17', 82, 'Usuario: RAISSE DAIANE, EndPoint: Autenticar, Obs: Logou no sistema'),
	(101, '2021-01-31 10:11:24', 83, 'Usuario: MARIANA GABRIELA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(102, '2021-01-31 10:12:02', 83, 'Usuario: MARIANA GABRIELA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(103, '2021-01-31 10:39:37', 84, 'Usuario: VITÓRIA CRISTINA LEÃO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(104, '2021-01-31 10:40:24', 85, 'Usuario: ELIANA FRANCISCA DOS SANTOS, EndPoint: Autenticar, Obs: Logou no sistema'),
	(105, '2021-01-31 10:42:33', 85, 'Usuario: ELIANA FRANCISCA DOS SANTOS, EndPoint: Autenticar, Obs: Logou no sistema'),
	(106, '2021-01-31 10:57:35', 85, 'Usuario: ELIANA FRANCISCA DOS SANTOS, EndPoint: Autenticar, Obs: Logou no sistema'),
	(107, '2021-01-31 11:05:51', 86, 'Usuario: ARLAN XAVIER DE MACEDO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(108, '2021-01-31 11:06:25', 86, 'Usuario: ARLAN XAVIER DE MACEDO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(109, '2021-01-31 11:48:45', 87, 'Usuario: LAURA ISABELY PEREIRA GALVÃO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(110, '2021-01-31 16:10:54', 61, 'Usuario: ANNA CAROLLINY, EndPoint: Autenticar, Obs: Logou no sistema'),
	(111, '2021-01-31 16:40:30', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(112, '2021-01-31 16:49:01', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(113, '2021-01-31 16:58:29', 88, 'Usuario: EDNELSON ALVES FERREIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(114, '2021-01-31 16:58:45', 88, 'Usuario: EDNELSON ALVES FERREIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(115, '2021-01-31 18:30:33', 89, 'Usuario: KELLY MARQUES TEIXEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(116, '2021-01-31 18:32:03', 89, 'Usuario: KELLY MARQUES TEIXEIRA, EndPoint: RecuperarSenha, Obs: Solicitour recuperar a senha'),
	(117, '2021-01-31 18:38:56', 90, 'Usuario: GABRIEL HENRIQUE AGUIAR E SILVA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(118, '2021-01-31 18:41:30', 90, 'Usuario: GABRIEL HENRIQUE AGUIAR E SILVA, EndPoint: RecuperarSenha, Obs: Solicitour recuperar a senha'),
	(119, '2021-01-31 18:42:15', 90, 'Usuario: GABRIEL HENRIQUE AGUIAR E SILVA, EndPoint: RecuperarSenha, Obs: Solicitour recuperar a senha'),
	(120, '2021-01-31 18:43:08', 90, 'Usuario: GABRIEL HENRIQUE AGUIAR E SILVA, EndPoint: RecuperarSenha, Obs: Solicitour recuperar a senha'),
	(121, '2021-01-31 20:09:15', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(122, '2021-01-31 20:09:40', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(123, '2021-01-31 20:11:21', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: RecuperarSenha, Obs: Solicitour recuperar a senha'),
	(124, '2021-01-31 20:11:59', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: ResetarSenha, Obs: Solicitour recuperar a senha'),
	(125, '2021-01-31 20:12:19', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(126, '2021-01-31 20:12:40', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(127, '2021-01-31 20:13:43', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(128, '2021-01-31 20:15:08', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(129, '2021-01-31 20:16:15', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(130, '2021-01-31 20:17:15', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(131, '2021-01-31 20:18:06', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(132, '2021-01-31 20:18:32', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(133, '2021-01-31 20:19:04', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(134, '2021-01-31 20:20:00', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(135, '2021-01-31 20:23:26', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(136, '2021-01-31 20:23:45', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(137, '2021-01-31 20:24:22', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(138, '2021-01-31 20:36:14', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(139, '2021-01-31 20:37:03', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(140, '2021-01-31 20:37:49', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(141, '2021-01-31 20:42:04', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(142, '2021-01-31 20:42:47', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(143, '2021-01-31 20:43:36', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(144, '2021-01-31 20:44:30', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(145, '2021-01-31 20:48:16', 55, 'Usuario: FERNANDA PEREIRA SILVA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(146, '2021-01-31 20:51:03', 91, 'Usuario: FERNANDA PEREIRA , EndPoint: Autenticar, Obs: Logou no sistema'),
	(147, '2021-01-31 21:38:07', 9, 'Usuario: VINICIUS DE OLIVEIRA SOUSA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(148, '2021-01-31 21:39:57', 9, 'Usuario: VINICIUS DE OLIVEIRA SOUSA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(149, '2021-01-31 21:45:31', 88, 'Usuario: EDNELSON ALVES FERREIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(150, '2021-01-31 21:46:34', 88, 'Usuario: EDNELSON ALVES FERREIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(151, '2021-01-31 21:47:23', 88, 'Usuario: EDNELSON ALVES FERREIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(152, '2021-01-31 21:47:54', 83, 'Usuario: MARIANA GABRIELA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(153, '2021-01-31 21:48:05', 93, 'Usuario: DÉBORA RODRIGUES DA SILVA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(154, '2021-01-31 22:25:01', 9, 'Usuario: VINICIUS DE OLIVEIRA SOUSA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(155, '2021-01-31 22:34:52', 94, 'Usuario: MARIZETE PEREIRA TAVARES , EndPoint: Autenticar, Obs: Logou no sistema'),
	(156, '2021-01-31 22:35:29', 94, 'Usuario: MARIZETE PEREIRA TAVARES , EndPoint: Autenticar, Obs: Logou no sistema'),
	(157, '2021-01-31 22:48:02', 32, 'Usuario: CECÍLIA CARNEIRO MENDONÇA DOS SANTOS, EndPoint: Autenticar, Obs: Logou no sistema'),
	(158, '2021-01-31 22:51:41', 65, 'Usuario: TATIANA CARNEIRO MENDONÇA DA SILVA, EndPoint: RecuperarSenha, Obs: Solicitour recuperar a senha'),
	(159, '2021-01-31 23:04:59', 26, 'Usuario: PAULO SILVA DE JESUS , EndPoint: RecuperarSenha, Obs: Solicitour recuperar a senha'),
	(160, '2021-01-31 23:05:28', 88, 'Usuario: EDNELSON ALVES FERREIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(161, '2021-02-01 09:23:13', 9, 'Usuario: VINICIUS DE OLIVEIRA SOUSA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(162, '2021-02-01 11:56:03', 95, 'Usuario: ISABEL CAMPOS DA SILVA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(163, '2021-02-01 17:28:30', 76, 'Usuario: RONALDO PANTIERE ARAUJO RIBEIRO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(164, '2021-02-01 17:30:44', 76, 'Usuario: RONALDO PANTIERE ARAUJO RIBEIRO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(165, '2021-02-01 17:33:01', 76, 'Usuario: RONALDO PANTIERE ARAUJO RIBEIRO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(166, '2021-02-01 17:38:08', 76, 'Usuario: RONALDO PANTIERE ARAUJO RIBEIRO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(167, '2021-02-01 20:51:55', 76, 'Usuario: RONALDO PANTIERE ARAUJO RIBEIRO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(168, '2021-02-01 20:53:15', 76, 'Usuario: RONALDO PANTIERE ARAUJO RIBEIRO, EndPoint: RecuperarSenha, Obs: Solicitour recuperar a senha'),
	(169, '2021-02-01 20:55:31', 76, 'Usuario: RONALDO PANTIERE ARAUJO RIBEIRO, EndPoint: ResetarSenha, Obs: Solicitour recuperar a senha'),
	(170, '2021-02-01 20:56:13', 76, 'Usuario: RONALDO PANTIERE ARAUJO RIBEIRO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(171, '2021-02-01 20:57:11', 76, 'Usuario: RONALDO PANTIERE ARAUJO RIBEIRO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(172, '2021-02-01 21:40:49', 76, 'Usuario: RONALDO PANTIERE ARAUJO RIBEIRO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(173, '2021-02-02 10:37:15', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(174, '2021-02-02 10:41:19', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(175, '2021-02-02 13:36:33', 85, 'Usuario: ELIANA FRANCISCA DOS SANTOS, EndPoint: Autenticar, Obs: Logou no sistema'),
	(176, '2021-02-02 16:22:19', 77, 'Usuario: CELMA CÂNDIDA MORAES, EndPoint: Autenticar, Obs: Logou no sistema'),
	(177, '2021-02-02 17:17:12', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(178, '2021-02-02 17:34:49', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(179, '2021-02-02 17:51:46', 32, 'Usuario: CECÍLIA CARNEIRO MENDONÇA DOS SANTOS, EndPoint: Autenticar, Obs: Logou no sistema'),
	(180, '2021-02-02 17:51:46', 32, 'Usuario: CECÍLIA CARNEIRO MENDONÇA DOS SANTOS, EndPoint: Autenticar, Obs: Logou no sistema'),
	(181, '2021-02-02 17:51:46', 32, 'Usuario: CECÍLIA CARNEIRO MENDONÇA DOS SANTOS, EndPoint: Autenticar, Obs: Logou no sistema'),
	(182, '2021-02-02 17:51:47', 32, 'Usuario: CECÍLIA CARNEIRO MENDONÇA DOS SANTOS, EndPoint: Autenticar, Obs: Logou no sistema'),
	(183, '2021-02-02 23:57:36', 4, 'Usuario: ROSENYLCE WANDERLEY FRANÇA NETO, EndPoint: RecuperarSenha, Obs: Solicitour recuperar a senha'),
	(184, '2021-02-02 23:58:41', 4, 'Usuario: ROSENYLCE WANDERLEY FRANÇA NETO, EndPoint: ResetarSenha, Obs: Solicitour recuperar a senha'),
	(185, '2021-02-02 23:59:13', 4, 'Usuario: ROSENYLCE WANDERLEY FRANÇA NETO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(186, '2021-02-03 00:02:42', 4, 'Usuario: ROSENYLCE WANDERLEY FRANÇA NETO, EndPoint: Autenticar, Obs: Logou no sistema'),
	(187, '2021-02-03 07:54:38', 3, 'Usuario: KHEUREN PAULA DO NASCIMENTO CASTRO OLIVEIRA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(188, '2021-02-03 07:54:56', 9, 'Usuario: VINICIUS DE OLIVEIRA SOUSA, EndPoint: Autenticar, Obs: Logou no sistema'),
	(189, '2021-02-03 07:55:45', 9, 'Usuario: VINICIUS DE OLIVEIRA SOUSA, EndPoint: Autenticar, Obs: Logou no sistema');
/*!40000 ALTER TABLE `logsusuario` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.meiospagamentos
CREATE TABLE IF NOT EXISTS `meiospagamentos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(45) DEFAULT NULL,
  `Token` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.meiospagamentos: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `meiospagamentos` DISABLE KEYS */;
REPLACE INTO `meiospagamentos` (`Id`, `Titulo`, `Token`, `Email`, `Status`) VALUES
	(1, 'PagSeguro - Vinicius', 'AFCB097BE79B42F9902EAB5886E5477D', 'vynis2005@gmail.com', 'I'),
	(2, 'PagSeguro - Teste', '684338F0589546EEAA784F39721C6CB9', 'lannajeans@gmail.com', 'I'),
	(3, 'PagSeguro - `Producao', 'bc0ad549-2530-4383-8638-963e71ed516c3fc97e114c089c1e58a4fa72d7ca484b089c-03a9-4b34-8c2e-d153c1dc44ff', 'lannajeans@gmail.com', 'I'),
	(4, 'PagSeguro - `Producao', 'd332af2c-4447-4d4d-8bb4-798689f9a2815b0bc7184db298d335b4f97f96d0437a26ae-1c5b-4899-b661-1a14b8757a1e', 'lannajeans@gmail.com', 'I'),
	(5, 'PagSeguro - Producao', '80f834fe-f5e4-43f5-88a8-c28885c250a7698291c345ddafafb9e41274df808945e2d5-7e92-4d21-b00f-80746e45673f', 'empower@cursoigrejacristobrasil.kinghost.net', 'A');
/*!40000 ALTER TABLE `meiospagamentos` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.modulos
CREATE TABLE IF NOT EXISTS `modulos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(60) DEFAULT NULL,
  `Ordem` int(11) DEFAULT NULL,
  `CursoId` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_Modulos_Cursos1_idx` (`CursoId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.modulos: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `modulos` DISABLE KEYS */;
REPLACE INTO `modulos` (`Id`, `Titulo`, `Ordem`, `CursoId`) VALUES
	(1, 'Modulo 1', 1, 1),
	(2, 'Modulo 2', 2, 3),
	(3, 'Modulo 1', 1, 3);
/*!40000 ALTER TABLE `modulos` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.parametrosistema
CREATE TABLE IF NOT EXISTS `parametrosistema` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(100) DEFAULT NULL,
  `Valor` varchar(100) DEFAULT NULL,
  `Status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.parametrosistema: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `parametrosistema` DISABLE KEYS */;
REPLACE INTO `parametrosistema` (`Id`, `Titulo`, `Valor`, `Status`) VALUES
	(1, 'SitePagueSeguro', 'https://pagseguro.uol.com.br', 'A'),
	(2, 'WsPagueSeguro', 'https://ws.pagseguro.uol.com.br', 'A'),
	(3, 'SitePagueSeguro', 'https://sandbox.pagseguro.uol.com.br', 'I'),
	(4, 'WsPagueSeguro', 'https://ws.sandbox.pagseguro.uol.com.br', 'I'),
	(5, 'Email', 'cursoigrejacristobra@cursoigrejacristobrasil.kinghost.net', 'A'),
	(6, 'SenhaEmail', '@Vs130986', 'A'),
	(7, 'SmtpEmail', 'smtp-web.kinghost.net', 'A');
/*!40000 ALTER TABLE `parametrosistema` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.processoinscricoes
CREATE TABLE IF NOT EXISTS `processoinscricoes` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `DataInicial` datetime DEFAULT NULL,
  `DataFinal` datetime DEFAULT NULL,
  `CursoId` int(11) NOT NULL,
  `Status` varchar(1) DEFAULT NULL COMMENT 'A - Ativo,\nI - Inativo',
  `ConfiguraPeriodo` varchar(1) DEFAULT NULL COMMENT 'S - Sim,\nN - Não',
  `Tipo` varchar(1) DEFAULT NULL COMMENT 'G - Gratuito,\nP - Pago',
  `Valor` decimal(10,0) DEFAULT NULL,
  `DataInicalPagto` datetime DEFAULT NULL,
  `DataFinalPagto` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_ProcessoInscricoes_Cursos1_idx` (`CursoId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.processoinscricoes: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `processoinscricoes` DISABLE KEYS */;
REPLACE INTO `processoinscricoes` (`Id`, `DataInicial`, `DataFinal`, `CursoId`, `Status`, `ConfiguraPeriodo`, `Tipo`, `Valor`, `DataInicalPagto`, `DataFinalPagto`) VALUES
	(1, '2021-01-10 08:00:00', '2021-01-31 23:59:59', 1, 'A', 'N', 'P', 30, '2021-01-10 08:00:00', '2021-02-02 23:59:59'),
	(2, '2021-01-10 08:00:00', '2021-01-31 23:59:59', 2, 'A', 'N', 'P', 50, '2021-01-10 08:00:00', '2021-02-02 23:59:59'),
	(3, '2021-01-10 08:00:00', '2021-01-31 23:59:59', 3, 'A', 'N', 'P', 50, '2021-01-10 08:00:00', '2021-02-02 23:59:59'),
	(4, '2021-01-10 08:00:00', '2021-01-31 23:59:59', 4, 'A', 'N', 'P', 50, '2021-01-10 08:00:00', '2021-02-02 23:59:59'),
	(5, '2021-01-10 08:00:00', '2021-01-31 23:59:59', 5, 'A', 'N', 'P', 50, '2021-01-10 08:00:00', '2021-02-02 23:59:59'),
	(6, '2021-01-10 08:00:00', '2021-01-31 23:59:59', 8, 'A', 'N', 'G', 0, '2021-01-10 08:00:00', '2021-02-02 23:59:59');
/*!40000 ALTER TABLE `processoinscricoes` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.professores
CREATE TABLE IF NOT EXISTS `professores` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(60) DEFAULT NULL,
  `Foto` varchar(100) DEFAULT NULL,
  `Status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.professores: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `professores` DISABLE KEYS */;
/*!40000 ALTER TABLE `professores` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.provas
CREATE TABLE IF NOT EXISTS `provas` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Pergunta` text DEFAULT NULL,
  `TipoComponente` varchar(1) DEFAULT NULL COMMENT 'E - Unica Escolha,\nM - Multipla Escolha',
  `Status` varchar(1) DEFAULT NULL COMMENT 'A - Ativo,\nI - Inativo',
  `ConteudoId` int(11) NOT NULL,
  `Ordem` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_Provas_Conteudo1_idx` (`ConteudoId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.provas: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `provas` DISABLE KEYS */;
REPLACE INTO `provas` (`Id`, `Pergunta`, `TipoComponente`, `Status`, `ConteudoId`, `Ordem`) VALUES
	(1, 'O que é necessarío para ser feliz?', 'E', 'A', 5, 1),
	(2, 'Qual significado de MDA?', 'M', 'A', 5, 2),
	(3, 'O que está achando do curso?', 'T', 'A', 5, 3),
	(4, 'O que e mais importante na vida?', 'E', 'A', 5, 4),
	(5, 'O que representa celula?', 'M', 'A', 5, 5);
/*!40000 ALTER TABLE `provas` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.provausuario
CREATE TABLE IF NOT EXISTS `provausuario` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `ItemProvaId` int(11) NOT NULL,
  `UsuarioId` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_ProvaUsuario_ItensProva1_idx` (`ItemProvaId`),
  KEY `fk_ProvaUsuario_Usuarios1_idx` (`UsuarioId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.provausuario: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `provausuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `provausuario` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.transacaoinscricao
CREATE TABLE IF NOT EXISTS `transacaoinscricao` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `InscricaoUsuarioId` int(11) NOT NULL,
  `Codigo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_TransacaoInscricao_InscricaoUsuario1_idx` (`InscricaoUsuarioId`),
  CONSTRAINT `fk_TransacaoInscricao_InscricaoUsuario1` FOREIGN KEY (`InscricaoUsuarioId`) REFERENCES `inscricaousuario` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Copiando dados para a tabela cursoigrejacri.transacaoinscricao: ~69 rows (aproximadamente)
/*!40000 ALTER TABLE `transacaoinscricao` DISABLE KEYS */;
REPLACE INTO `transacaoinscricao` (`Id`, `InscricaoUsuarioId`, `Codigo`) VALUES
	(1, 51, '9F9FC1ECBFBFC481143B0F8BD0FA931B'),
	(2, 52, '344E13746F6FBFBCC4450F8DBE2B7691'),
	(3, 55, '73E76AD41212C70334261F9E41BD29D7'),
	(4, 56, '8A576118404037ABB4F9CF93CBE53E4E'),
	(5, 57, '1310E47DFAFAFF3554E96F9F0F61D5EF'),
	(6, 58, 'BF62CD89FDFD37400468FF9FC91FE519'),
	(7, 59, '60B8CE744D4D781FF424AFB3DB6E9C74'),
	(8, 60, 'F1A412CB3F3F223EE4A87F862CE8AA7D'),
	(9, 62, 'E4E5621325259A5FF41E9FB16D8CC356'),
	(10, 64, '0667A6F7D7D79BCFF478FF88B978F54F'),
	(11, 68, '0A5893349F9F0EF554C8AFA950601F71'),
	(12, 70, '1EDAA5F8D4D44FB77467DFAE0B27046A'),
	(13, 71, '60FEAAB28B8B789EE4A74F8CC9E9DB18'),
	(14, 72, '4091C067B8B83F8004188F92BAA4CB07'),
	(15, 74, '985D82B56C6CE89CC480BFBC3C0544B5'),
	(16, 85, 'FC92CE86BABA4CEEE4DD9F822ECC53DE'),
	(17, 86, '804128F10C0C13AFF43FFF90944D069B'),
	(18, 87, '4B9284416464DFD224A3AF8D14C59255'),
	(19, 88, 'EDADAFBA1B1BEDE884F69FA2F80A60F5'),
	(20, 89, '2DB902A37373F27334A99F91CC67D19A'),
	(21, 53, '54B451D4EBEBB57CC4C28FA7AD52D94D'),
	(22, 90, 'FF15DF3A00006C84441BDF92ECDA186C'),
	(23, 91, '06E28E668D8D1BCCC4363F97BAF603DA'),
	(24, 96, '116FE2522E2EFECFF4BFAFBCEB04B393'),
	(25, 104, 'D147F382BFBF6AA44422EFA7EC9C1EA9'),
	(26, 105, 'D5DBEDE3B0B050C334CC4FAEF41F55F5'),
	(27, 107, '58F473216464230BB4DC9F8D7B15597D'),
	(28, 108, '7363AAF339394987746D3F86DA32E243'),
	(29, 110, '5F00D8EE3838118DD4037FABDE65D5E6'),
	(30, 111, '3D838CD17171074554756FB5F2AD1A2B'),
	(31, 114, '7C2856ACD5D5C86BB4C01FAA86134A2D'),
	(32, 116, '997AA8268B8B9EEFF4AA1F9D4A6A44BA'),
	(33, 120, '1462D8027F7FDB8AA48ECFB46ACD5D5B'),
	(34, 121, '6504B983C7C79BF224E1DF8F82F4F3CC'),
	(35, 122, '26C0CCC75959DB1EE4EF6F9B0F6A3772'),
	(36, 115, '44A82CCCAEAE67A5549D8F995632BC97'),
	(37, 77, 'A4216066EEEEEA133469FF9CA33AA36C'),
	(38, 77, 'EBE8634E1B1B14055491CFBD0E9B583F'),
	(39, 127, 'CB8807B52525EA722412EF8806140A0F'),
	(40, 129, '5483EDCD04048F6EE4880F97D4863ED7'),
	(41, 130, 'DBAB2B2BA3A399988499DF94915ED410'),
	(42, 132, '44237B0CA6A6551444953FBBFB65C28F'),
	(43, 133, '60C8EAE9181814F2244BCFBB4AEB773F'),
	(44, 136, '1613934EF6F67E9224F3CF95B2A75D55'),
	(45, 137, '461937C69F9F4D822479AF8F808B11CA'),
	(46, 141, 'B21593817E7EB3D224BCDF9ACA256C3D'),
	(47, 139, '977FD30735359B5664C27FBED83D0544'),
	(48, 140, '7FBDACDDB9B9B70994B5FFB9ADF9F0F5'),
	(49, 150, '9D966BAB56564C0EE463AFB37139BAED'),
	(50, 82, '4B4733C2A2A220D2247F2FA51E2E9E92'),
	(51, 153, '187591A8444475ADD4689F84B7A08F3A'),
	(52, 161, 'F1D15E2FE9E9DB55548F6F8B098B11A3'),
	(53, 163, '99A0D1A90A0AABDCC4685FB860975F45'),
	(54, 164, '32B3FB061F1FC4EBB413EFA39C6F6974'),
	(55, 165, '850E4F6832324F2EE4271F8FC1453BC4'),
	(56, 168, 'F1BDB5153B3BBCABB4FBEF83AAB0DA07'),
	(57, 169, '3E3F2F7E1A1AD03EE4146F8C6650226D'),
	(58, 170, '362E6E79717122E33465AFA9E4707073'),
	(59, 171, '028DFAA6D1D17AD5547FCFA4EB48FD0C'),
	(60, 172, 'EE817F6979790BDEE452DFA814149E91'),
	(61, 176, 'BAC5DDF129296B2994891FB18E7CF32B'),
	(62, 177, '777FAA4E58586AE664C19FA97D7311CE'),
	(63, 179, '66AC2C4D57576A7CC4FA3FA193D1125C'),
	(64, 181, '637A262A2828C64664646F95EEDEFC68'),
	(65, 195, '74A6B69D7575CE93340CCFB82580B67B'),
	(66, 199, 'C1EE0FBBF0F0EA7004349FB87BF7FAED'),
	(67, 203, '9E94D2488E8EE2F994A30FA42F2B6AFD'),
	(68, 204, 'C7A8932A4B4BF090044C8FB09AAA590B'),
	(69, 206, 'FC1F1D8D43436F488428DFAAD5BC34E5');
/*!40000 ALTER TABLE `transacaoinscricao` ENABLE KEYS */;

-- Copiando estrutura para tabela cursoigrejacri.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(60) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Senha` varchar(45) DEFAULT NULL,
  `Status` varchar(1) DEFAULT NULL COMMENT 'A - Ativo\nI - Inativo',
  `DataCadastro` datetime DEFAULT NULL,
  `Rua` varchar(45) DEFAULT NULL,
  `Complemento` varchar(100) DEFAULT NULL,
  `Bairro` varchar(45) DEFAULT NULL,
  `Cidade` varchar(45) DEFAULT NULL,
  `Estado` varchar(2) DEFAULT NULL,
  `Numero` varchar(45) DEFAULT NULL,
  `Cep` varchar(45) DEFAULT NULL,
  `TelefoneCelular` varchar(45) DEFAULT NULL,
  `TelefoneFixo` varchar(45) DEFAULT NULL,
  `Cpf` varchar(11) DEFAULT NULL,
  `DataNascimento` date DEFAULT NULL,
  `CongregacaoId` int(11) NOT NULL,
  `TipoAcesso` varchar(1) DEFAULT NULL COMMENT 'E - Email\nC - Cpf',
  `CongregaHaQuantoTempo` varchar(45) DEFAULT NULL,
  `RecebePastoreiro` varchar(1) DEFAULT NULL COMMENT 'S - Sim,\nN - Não',
  `QuemPastoreia` varchar(45) DEFAULT NULL,
  `FrequentaCelula` varchar(1) DEFAULT NULL COMMENT 'S - Sim,\nN - Nao',
  `QuemLider` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_Usuarios_Congregacao1_idx` (`CongregacaoId`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela cursoigrejacri.usuarios: ~95 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
REPLACE INTO `usuarios` (`Id`, `Nome`, `Email`, `Senha`, `Status`, `DataCadastro`, `Rua`, `Complemento`, `Bairro`, `Cidade`, `Estado`, `Numero`, `Cep`, `TelefoneCelular`, `TelefoneFixo`, `Cpf`, `DataNascimento`, `CongregacaoId`, `TipoAcesso`, `CongregaHaQuantoTempo`, `RecebePastoreiro`, `QuemPastoreia`, `FrequentaCelula`, `QuemLider`) VALUES
	(1, 'Francieli dos Santos', 'Santos.cieli@gmail.com', 'FF67C08A3003E91501E576B3BA0C4AB7', 'A', '2021-01-10 08:43:25', 'Rua JC 52', '', 'Jardim Curitiba', 'Goiânia', 'GO', '26', '74481290', '62994269769', NULL, '', '1989-04-27', 1, 'E', 'Menos de 1 ano', 'S', 'Byanka', 'S', 'Byanka'),
	(2, 'Priscila Martins de Sousa ', 'Priscilamartiins@hotmail.com', 'DD0B745705434CC872C4779F659D9237', 'A', '2021-01-10 08:44:10', 'Rua 12', '', 'Setor Morada do Sol', 'Goiânia', 'GO', '02', '74475196', '62995615053', '62995615053', '', '1998-12-01', 1, 'E', '2 anos ', 'S', 'Pastor Adriano e celilia ', 'S', 'Fernando Fernandes '),
	(3, 'Kheuren Paula Do Nascimento Castro Oliveira', 'kheurenzita@gmail.com', 'F28375B3C60C3078E62266C3B8E37F56', 'A', '2021-01-10 09:12:26', 'Rua 506', '', 'Jardim Mont Serrat', 'Aparecida de Goiânia', 'GO', 'Qd 8 lote 07', '74917350', '62996406046', NULL, '', '1989-01-19', 2, 'E', '9 anos ', 'S', 'Daniel', 'S', ''),
	(4, 'Rosenylce Wanderley França Neto', 'hamalain@hotmail.com', '6B734D70318EBAA9240E01CC1F056C83', 'A', '2021-01-10 09:31:26', 'Avenida Carrinho Cunha', '', 'Parque das Flores', 'Goiânia', 'GO', 'S/n', '74595236', '62984607688', '62994607688', '', '1962-01-06', 1, 'E', 'Um ano', 'S', 'Pastor Roberto', 'S', 'Solange '),
	(5, 'Adriano Raimundo dos Santos', 'adrianoraimundodossantos43@gmail.com', '139E2CF6EB29775BFDAEA25CA96BA1D0', 'A', '2021-01-10 09:34:23', 'Viela da bangalô Qd.152LT.12 setor morada do ', '', 'Setor Morada do Sol', 'Goiânia', 'GO', '', '74475228', '62992556583', NULL, '', '1972-12-21', 1, 'E', '13', 'S', 'Pr.Diarlei', 'S', 'Alvo mais que a Neve'),
	(6, 'Elias Porto Loiola', 'elias1portoloiola@gmail.com', 'EDEBEE1DFF51417FCAE4DD6936608DA0', 'A', '2021-01-10 09:49:50', 'Rua RB 18 A', 'Qd 18 Lt 47', 'Residencial Recanto do Bosque', 'Goiânia', 'GO', '', '74474335', '62984121803', NULL, '', '2008-03-18', 1, 'E', '13 anos', 'S', 'Pr Cícero ', 'S', 'Olívio Costa'),
	(7, 'Rosenylce Wanderley França Neto ', 'studiopurodesign@gmail.com', '0D7801B28630D0EB64211615C9FEFA59', 'I', '2021-01-10 09:52:44', 'Avenida Carrinho cunha', '', 'Parque das flores ', 'Goiania', 'GO', '0', '7459523696', '62984607688', '62984607688', '', '1962-01-06', 1, 'E', 'Um ano', 'S', 'Pastor Roberto', 'S', 'Solange '),
	(8, 'Vandilson Francisco de almeida', 'sememail@cursoigrejacristobrasil.kinghost.net', '6D2E2119322DBA61AD53E1B4CCF4495C', 'A', '2021-01-10 10:02:00', 'Rua Copacabana Qd 19 LT 19', '', 'Jardim Marista', 'Trindade', 'GO', '', '744000000', '998140432', NULL, '47216255100', '1969-12-03', 1, 'C', '', 'S', 'Ivair', 'S', 'Carlos'),
	(9, 'Vinicius de Oliveira Sousa', 'Vynis2005@gmail.com', '20DEE6728E9EFCB6606B7707990A36C4', 'A', '2021-01-10 10:08:15', 'Rua 506', '', 'Jardim Mont Serrat', 'Aparecida de Goiânia', 'GO', '', '74917350', '62991333856', NULL, '', '1986-09-13', 2, 'E', '', 'S', '', 'S', ''),
	(10, 'Jessica Martins Amaro ', 'jessicaamaro2011@hotmail.com', '1B87D1AD1AE826648AD9D9B8EECCE368', 'A', '2021-01-10 10:44:51', 'Rua Dom Pedrodom Pedro ll ', '', 'Jardim Califórnia', 'Trindade', 'GO', 'S/n', '75383806', '62986430885', NULL, '', '1991-02-15', 1, 'E', '12 anos ', 'S', 'Pr Regina ', 'S', 'Eu'),
	(11, 'Carolina Bueno de Lima Barbosa ', 'carolblima01@gmail.com', 'B62228B5484F43EAA7742F19F1AB6E0A', 'A', '2021-01-10 11:51:26', 'Rua Ipiranga', '', 'Jardim Maria Inês', 'Aparecida de Goiânia', 'GO', 'Qd 88 lote 06', '74914370', '6292688849', NULL, '', '1995-07-26', 2, 'E', '2 meses', 'S', 'Kheuren e Vinícius ', 'N', ''),
	(12, 'Maykon wander de sousa ribeiro', '', '1FEAE1713D2D3B8CFA3CCF573ECF8C5C', 'A', '2021-01-10 12:06:06', 'Rua BF45', 'Qd 73 lt 2', 'Floresta', 'Goiânia', 'GO', '00', '74477119', '62993542213', '6235959344', '01506823106', '1987-07-25', 1, 'C', '4 anos', 'S', 'Wadson e Emanuela', 'S', 'Maykon wander de sousa Ribeiro '),
	(13, 'Luciano Ferreira Dos Santos ', 'Luceebrunferreira@gmail.com', 'B62228B5484F43EAA7742F19F1AB6E0A', 'A', '2021-01-10 12:12:07', 'L20 Q33 L40', '', 'Lago Azul 2', 'Goiânira ', 'GO', '', '75370000', '62992171775', NULL, '', '1987-10-13', 4, 'E', '5 anos ', 'S', 'Pastor José Antônio ', 'S', 'José Luiz '),
	(14, 'Kessynara Alves fidelis', '', '6D7FFF117D76BCC23A4B57C91A686A5A', 'A', '2021-01-10 13:05:00', 'Rua A10', '', 'Da Vitória', 'Goiânia', 'GO', 'S/n', '74477021', '62994119373', '62994119373', '70471642193', '1998-03-04', 1, 'C', '5 anos', 'S', '', 'S', 'Maykon Wander'),
	(15, 'Fernando  Fernandes  Rosa Rodrigues ', 'fernandesfernando202@gmail.com', 'C2866A6791DAD954336EDB575618AF09', 'A', '2021-01-10 19:18:09', 'Rua da Divisa', 'Lote 09 casa 02', 'Setor Morada do Sol', 'Goiânia', 'GO', '169', '74473830', '62992137032', NULL, '', '2000-04-16', 1, 'E', '6', 'S', 'Adriano e Cecília ', 'S', 'Fernando Fernandes'),
	(16, 'Alexandre Sousa Calixto', 'alexandrecalixto.souza2020@gmail.cim', '7AC78520A9306F5FA8E57E62386927E8', 'A', '2021-01-10 19:30:16', 'Rua Dom Pedro II', '', 'Jardim Nova Esperança', 'Goiânia', 'GO', '', '74465140', '62984075325', NULL, '', '1981-04-28', 1, 'E', '2 ', 'S', 'Roberto leão', 'S', 'Marco aurelio'),
	(17, 'Jeferson moreira teles ', '', 'ACE1C60F5F1122C0F9243CA3FDB0C60A', 'A', '2021-01-10 19:38:35', 'Rua VF 1', '', 'Vila Finsocial', 'Goiânia', 'GO', '1', '74473015', '62993388406', NULL, '70425243141', '1998-09-30', 1, 'C', '23', 'S', 'Adriano é Cecília ', 'S', 'Fernando '),
	(18, 'Murilo Henrique Monteiro Matos ', 'Murilohmatos@Hotmail.com', '9FD05BFCA4C4B8C7CAE0D6DEED915AA2', 'A', '2021-01-10 19:45:46', 'Rua Senador Morais Filho', 'Casa', 'Setor Campinas', 'Goiânia', 'GO', '178', '74515010', '62991567080', NULL, '', '1993-01-09', 1, 'E', '4', 'S', 'Pastor Santiago', 'S', 'Wendel'),
	(19, 'Orlando José Manzi', 'orlando.manzi2013@gmail.com', '1A488C85772B9C650D70D5DBBDD27917', 'A', '2021-01-10 20:17:41', 'Rua BF13A', 'Qd. 17 LT. 22', 'Floresta', 'Goiânia', 'GO', '22', '74477150', '6291025288', '6235953041', '', '1978-09-10', 1, 'E', '7 anos', 'S', 'Posteiro Daniel e Pastora Cecília', 'S', 'Kelvin e Maiara'),
	(20, 'Ineizilha Pereira Campos', 'sememail@cursoigrejacristobrasil.kinghost.net', 'BED24623EDCFE284F33ED2F8C4E40FDE', 'A', '2021-01-10 20:27:21', 'Rua SV 25', 'Qd 20 LT 14', 'Residencial Solar Ville', 'Goiânia', 'GO', 'S/n', '74470551', '73986272385', NULL, '32351542134', '1964-02-23', 1, 'C', '20 anos', 'S', 'PR Juliane e Vinycius', 'S', 'PR Juliane e Vinycius'),
	(21, 'Marília Gabriela ', 'Mariliag288@gmail.com', 'B62228B5484F43EAA7742F19F1AB6E0A', 'A', '2021-01-10 21:28:16', 'Rua BM9', 'Em frente a mata...', 'Residencial Brisas da Mata', 'Goiânia', 'GO', 'Qd 20 lt 31', '74475353', '62991889968', NULL, '', '2004-09-24', 1, 'E', '3 anos ', 'S', 'Pabllo e Carol ', 'S', 'Pabllo e Carol'),
	(22, 'Maria Clara Cavarlhaes Queiroz ', 'tiiocelscarvalhooliveira@gmail.com', '4019B8F5365328B1F4005241F6CC724D', 'A', '2021-01-11 10:53:23', 'Rua T9 Qd20A Lt18', 'Próximo ao supermercado pipoca', 'Residencial triunfo II', 'Goianira ', 'GO', 'SN', '753700000', '62994278385', '35165686', '', '2007-04-26', 4, 'E', '3 anos ', 'S', 'Iraci e José Antônio ', 'S', 'Stefany'),
	(24, 'Sirlei Márcia \0\0\0\0\0\0\0\0\0\0Carvalhaes Ramos', 'sirleicarvalhaesramos123@gmail.com', 'C86ACBD2873A6BE04202D349B0359B84', 'A', '2021-01-11 10:58:06', 'Rua T9 Qd20A Lt18', 'Perto do supermercado pipoca', 'Residencial triunfo II', 'Goianira ', 'GO', 'SN', '753700000', '62992489413', '35165686', '', '1975-12-09', 4, 'E', '3 anos', 'S', 'Edivon e Marcelene', 'S', 'Virgínia '),
	(25, 'Antônio Marcos \0\0\0\0\0 Ramos', '', 'EF8372F2162BE57574435A864AC21B4E', 'A', '2021-01-11 11:01:38', 'Rua T9 Qd20A Lt18', 'Perto do supermercado pipoca ', 'Residencial triunfo II', 'Goianira ', 'GO', 'SN', '753700000', '62991169119', '35165686', '99358638168', '1983-10-20', 4, 'C', '10 anos', 'S', 'Edivon e Marcelene', 'S', 'Virgínia '),
	(26, 'Paulo Silva de Jesus ', 'cursoigrejacristobra@cursoigrejacristobrasil.kinghost.net', 'B62228B5484F43EAA7742F19F1AB6E0A', 'A', '2021-01-11 12:41:47', 'Rua vf3 ', '', 'Finsocial ', 'Goiânia ', 'GO', '21', '7447310', '62993964668', NULL, '70497507196', '1999-01-21', 1, 'C', '3', 'S', 'Adriano e Cecilia', 'S', 'Fernando '),
	(27, 'Claudineia Marques ', 'neiamarks2016@gmail.com', '9E085C0C9F74BDE28F1FCBD712AE1984', 'A', '2021-01-11 12:42:32', 'Rua RDR 5', 'Qd:02 lt:11', 'Residencial Dom Rafael', 'Goiânia', 'GO', '03', '74376030', '62998439075', NULL, '', '1984-12-22', 5, 'E', '2 anos', 'S', 'Pastora Beth e João bosco', 'S', 'Pastora beth'),
	(28, 'Cleudineia marques', '', '9637C117CC59A2E61AD9EBFE5F6EE973', 'A', '2021-01-11 12:48:20', 'Rua RDR 5', 'Qd:02 lt:11', 'Residencial Dom Rafael', 'Goiânia', 'GO', '03', '74376030', '62998439075', NULL, '89128737253', '1984-12-22', 5, 'C', '2 anos', 'S', 'Pastora Beth e João bosco', 'S', 'Pastora Beth '),
	(29, 'Paloma Andressa Marques vasconcelos ', 'Palomaandressamarkesvsc@gamil.com', '8BE7AED7C71F700FA2D1CFDAF01F89DE', 'A', '2021-01-11 13:07:23', 'Rua RDR 5', 'Qd:02 lt:11', 'Residencial Dom Rafael', 'Goiânia', 'GO', '03', '74376030', '62996463622', NULL, '', '2006-01-07', 5, 'E', '2 anos', 'S', 'Pastora Beth ', 'S', 'Pastora Beth '),
	(30, 'Marcilene Barbosa de Santana Souza', 'MarcileneBarbosadeSantana2001@hotmail.com', '09228DA400132FAE6A5A596893ABF112', 'A', '2021-01-11 14:30:28', 'Rua 29 qd 03 LT 39', '', 'Triunfo', 'Goianira Goiás', 'GO', '', '75370000', '629982101683', NULL, '', '1988-04-17', 4, 'E', '8', 'S', 'Adriano e Cecília ', 'S', 'Edvon'),
	(31, 'Edivon Borges de souza', 'sememail@cursoigrejacristobrasil.kinghost.net', '6BF9F89BD5DF1C3C3CC0ED8060D11AA3', 'A', '2021-01-11 14:34:27', 'Rua-29 ', 'Qd_03 TL_ 39', 'Residencial Triunfo', 'Goiânira', 'GO', '0', '75370000', '62993723030', '62982914315', '01972501143', '1986-02-23', 4, 'C', '8', 'S', 'Adriano e Cecília', 'S', 'Edivon'),
	(32, 'Cecília carneiro Mendonça dos Santos', 'xcecilicms@gmail.com', 'E4897F4A78F7F8E5F9BB8C356F006DD0', 'A', '2021-01-11 14:43:32', 'Rua T 8', '', 'Setor Morada do Sol', 'Goiânia', 'GO', '', '74475228', '62992722153', NULL, '', '1973-10-27', 1, 'E', '17 anos', 'S', 'Pastores Diarley, Arlete, vilmar,Lia ', 'S', 'Fernando'),
	(33, 'Bruna Joyce da silva ', 'brunajoyce118@gmail.com', 'B62228B5484F43EAA7742F19F1AB6E0A', 'A', '2021-01-11 21:03:42', 'Estrada de São Geraldo', '', 'Parque Maracanã', 'Goiânia', 'GO', '175', '74482070', '6291004859', NULL, '', '1996-09-27', 1, 'E', '1 ano ', 'S', 'Adriano e Cecília', 'N', 'Não '),
	(34, 'Jose Luiz filas dos Santos ', 'jl3346326@gmail.com', 'B62228B5484F43EAA7742F19F1AB6E0A', 'A', '2021-01-11 21:27:58', 'Rua L19 ', '11', 'Lago azul 2', 'Goianira', 'GO', '33 ', '75374970', '62996750581', '62996750581', '', '1997-04-19', 4, 'E', '2 ,10 meses ', 'S', 'Luciano ', 'S', 'Eu mesmo '),
	(35, 'Emilly Cristina Ferreira', 'joyce.emilly_2011@hotmail.com', '16ED3AA63516775E15A2AF5BFC695819', 'A', '2021-01-17 09:22:22', 'Rua Couto Magalhães', '', 'Setor Cristina', 'Trindade', 'GO', '', '75383603', '62992991356', NULL, '', '2006-11-04', 1, 'E', '', 'S', 'Cecília e Adriano', 'S', 'Jairo e Jurece '),
	(36, 'Jakeline Wesline Silva Teixeira', 'sememail@cursoigrejacristobrasil.kinghost.net', '5620BF859E1FDA586DBC80AD4673044F', 'A', '2021-01-17 09:30:03', 'Rua JC4', 'Chácara 14', 'Jardim Curitiba', 'Goiânia', 'GO', '14', '74480470', '62992159502', NULL, '70353642185', '1995-11-25', 1, 'C', 'Muito tempo ', 'S', 'Pastora Regina ', 'S', 'Irene '),
	(37, 'Emilly Cristina Ferreira', '', '7EE29CBAA0CD5EF45D6173C321AEAC41', 'A', '2021-01-17 09:47:16', 'Rua Couto Magalhães Qd 09 lt 34', '', 'Setor Cristina', 'Trindade', 'GO', '', '71397769114', '62992991356', NULL, '71397769114', '2006-11-04', 1, 'C', '10 anos ', 'S', 'Cecília e Adriano', 'S', 'Jairo e Jurece'),
	(38, 'Joyce Cristina Freire ferreira', '', 'B62228B5484F43EAA7742F19F1AB6E0A', 'A', '2021-01-17 09:53:01', 'Rua Couto Magalhães quadra 09 lote 34', '', 'Setor Cristina', 'Trindade', 'GO', '73', '75383603', '62992861301', NULL, '00259952192', '1983-12-14', 1, 'C', '10 anos', 'S', 'Pastor Adriano e Pastora Cecília', 'S', 'Jairo e Jurece'),
	(39, 'Luana Waleria França Rodrigues ', 'sememail@cursoigrejacristobrasil.kinghost.net', 'A99C2F159C181D01851AFA74CF1B0674', 'A', '2021-01-17 09:57:23', 'Rua SC 1', 'Qd3 LT 46', 'Jardim Vista Bela', 'Goiânia', 'GO', '', '74474200', '62992205252', NULL, '04641243107', '1992-02-09', 1, 'C', '3 anos ', 'N', '', 'S', 'Eu'),
	(40, 'Raimunda nonata carvalho dos santos', '', 'B62228B5484F43EAA7742F19F1AB6E0A', 'A', '2021-01-17 10:50:16', 'Rua Jerusalém q 4 l 9 casa2', '', 'Setor Parque Tremendão', 'Goiânia', 'GO', '', '74475009', '996953397', NULL, '84367105172', '1971-05-02', 1, 'C', '5 anos', 'S', 'Adriano e cecilia', 'S', 'Vana'),
	(41, 'Guilherme Henrique Nogueira mendes', '', '0882C5DD80E3BE1DD215F8C8EB1309B9', 'A', '2021-01-17 10:54:39', 'Rua João pessoa', '', 'Sao Francisco ', 'Goiânia ', 'GO', 'Quadra 59, lote  15', '0', '62991681251', '000000000', '70229068154', '1995-10-01', 1, 'C', 'Cinco anos', 'S', 'Líder ', 'S', 'Maykon '),
	(42, 'Janeth alves', '', '63B452CEA8C85201F6C1E216AF6E9864', 'A', '2021-01-17 10:59:42', 'Rua A10', 'Qd 35 lt 02', 'Da Vitória', 'Goiânia', 'GO', '', '74477021', '62993373759', '00000000000', '70471646180', '2000-10-28', 1, 'C', '3 anos', 'S', 'Maykon', 'S', 'Maykon'),
	(43, 'Selma Dias Muniz', 'selmadiasmuniz2019@gmail.com', 'CF19CA539997F5B00809A7E9A23278B2', 'A', '2021-01-17 11:55:07', 'Rua VF 43', '', 'Vila Finsocial', 'Goiânia', 'GO', 'Qd 50  Lt 2', '74473390', '62982522763', NULL, '', '1987-08-19', 1, 'E', '03 anos', 'S', 'Natanael e Olivia', 'S', 'Selma (Eu mesma)'),
	(44, 'João Nascimento Gomes', 'joaonascimentogomes2030@gmail.com', '647431B5CA55B04FDF3C2FCE31EF1915', 'A', '2021-01-17 12:06:54', 'Rua VF 43', '', 'Vila Finsocial', 'Goiânia', 'GO', 'Qd 50 Ltd 02', '74473390', '62993701438', NULL, '', '1991-08-26', 1, 'E', '03 anos', 'S', 'Natanael e Olivia', 'S', 'João e Selma ( eu e minha esposa)'),
	(45, 'Vangela Maria Lima de Oliveira ', 'vangelamariadeoliveira2017@gmail.com', 'B62228B5484F43EAA7742F19F1AB6E0A', 'A', '2021-01-17 12:26:49', 'Rua 19 de Novembro', '', 'Vila Maria Dilce', 'Goiânia', 'GO', 'Q5 L9', '74583037', '62991199478', '', '', '1996-09-13', 1, 'E', '1 ano ', 'S', 'Santiago ', 'S', 'Ana Carolina '),
	(46, 'Mateus da Silveira Batista', 'mattrex33@gmail.com', 'B0B5BD5528DACAE3E195D19A223F669A', 'A', '2021-01-17 14:55:21', 'Rua 8', 'rua B - 72, Vila São Paulo', 'Setor São José', 'Goiânia', 'GO', '', '74440400', '995490871', '32714794', '', '2000-03-25', 1, 'E', '5 anos', 'N', '', 'S', 'Jéssica'),
	(47, 'João dias Muniz moro ', 'sememail@cursoigrejacristobrasil.kinghost.net', '2F376AAE2694599061DBCEC04C38BAE2', 'A', '2021-01-17 19:34:21', 'Rua VF 106 qd 80 ltb16 ', '', 'Vila Finsocial', 'Goiânia', 'GO', '', '74473788', '6285794243', NULL, '00394471113', '1981-07-30', 1, 'C', '9 meses ', 'S', 'E Regina ', 'S', 'Selma '),
	(48, 'Wendel irias chagas ', 'Wendelirias266@gmail.com', 'DE5261F924262402A5D96662735BA6BD', 'A', '2021-01-17 19:56:29', 'Rua VF 92', '', 'Vila Finsocial', 'Goiânia', 'GO', '', '74473780', '62992587273', '62992587273', '', '1976-09-28', 1, 'E', '5', 'S', 'Pastor.adriano e Cecília', 'S', 'Fernando'),
	(49, 'Tiago de oliveira purificação', 'Thiagoserte@hotmail.com', 'CD8B89FEB0BB854A8BC1DB24EA41EA7E', 'A', '2021-01-17 21:08:27', 'Rua 3', '', 'Setor Parque Tremendão', 'Goiânia', 'GO', '', '74475809', '62994269257', '35172277', '', '1992-07-24', 1, 'E', '2 meia', 'S', 'Pastor Adriano e Cecília', 'S', 'Fernando'),
	(50, 'Barbara camila vieira de souza', 'Vieirabarbara999@outlook.com', 'B62228B5484F43EAA7742F19F1AB6E0A', 'A', '2021-01-17 21:13:46', 'Rua 3', '', 'Setor Parque Tremendão', 'Goiânia', 'GO', '3', '74475809', '995759648', '35172277', '', '1999-07-29', 1, 'E', '2 anos', 'S', 'Cecília ', 'S', 'Fernando'),
	(51, 'ANA BEATRIZ DE OLIVEIRA ', 'annab.oliveira@hotmail.com', '5FD521DEDB677CB43A9C0A1F97611FE2', 'A', '2021-01-17 23:07:33', 'Avenida Botafogo', 'de 50 a 1350 - lado par', 'Setor Pedro Ludovico', 'Goiânia', 'GO', '', '74820010', '62982147336', '6235873433', '', '1973-10-26', 2, 'E', '', 'S', '', 'S', ''),
	(52, 'Luciano Ferreira dos Santos', 'sememail@cursoigrejacristobrasil.kinghost.net', 'E99E1C191E5DFA3D7E01587DEFF9B681', 'A', '2021-01-18 10:59:47', 'Rua l20 qd 33 LT 40', '', 'Lago azul 2', 'Goianira', 'GO', '', '75370000', '62992171775', NULL, '02149170108', '1987-10-13', 4, 'C', '5 anos', 'S', 'José Antônio', 'S', 'José Luiz'),
	(53, 'Mayara angelica Bertoldo de araujo ', 'Mayarabertoldo1@hotmail.com', '38A0BEBD515D8E7537F0B96ECD3CCDBD', 'A', '2021-01-18 11:42:19', 'Rua 3', '', 'Jardim Santo Antônio', 'Goiânia', 'GO', '0', '74853150', '62983252601', '62983252601', '', '1996-08-16', 2, 'E', '1 ano ', 'N', '', 'S', 'Pedro'),
	(54, 'Marieh da Silva Cruz ', 'marieh_silva@hotmail.com', '024546FEBD78ADD27B7D4FB06316063A', 'A', '2021-01-18 11:44:42', 'Rua 50', 'Qd37 lt8 casa 1', 'Jardim Bela Vista - Continuação', 'Aparecida de Goiânia', 'GO', '0', '74912220', '62986066567', '6232789250', '', '1993-03-31', 2, 'E', '1 mês ', 'N', '', 'N', ''),
	(55, 'FERNANDA PEREIRA SILVA ', 'fernandapereira.rm@gmail.com', '1951305CC8C5BA964A63B89E98980948', 'A', '2021-01-18 13:44:39', 'Rua VM 3 B', '', 'Setor Novo Planalto', 'Goiânia', 'GO', 'Sn', '74480340', '06299580057', '06232953393', '', '1982-05-17', 5, 'E', '14 anos ', 'S', 'Pastora Regina ', 'S', 'Fernanda'),
	(56, 'Isabella de Assis cerino', 'augustocerino@hotmail.com', '20C918B7077068B51FCEE17CF2BE1924', 'A', '2021-01-20 11:51:00', 'Rua CP39', 'Qd 46 lote 09', 'Conjunto Primavera', 'Goiânia', 'GO', '09', '74477210', '62994439631', NULL, '', '2005-05-12', 3, 'E', '3 anos ', 'S', 'Pastores ', 'S', 'Flávio e Jéssica '),
	(57, 'Jairo Rufino Rubin ', '', '8921BC8AF9ABC00965C7575A4B7F269D', 'A', '2021-01-21 09:51:58', 'Rua Serafim', '', 'Jardim Califórnia', 'Trindade', 'GO', 'S/n', '75383830', '993831184', '32941299', '45591911153', '1968-07-01', 1, 'C', '10 anos', 'S', 'Carlos china', 'S', 'Jairo  e Jurece '),
	(58, 'Wendel Felipe Guimarães Lima ', '', '9EE64DBE7638C926ED0A21D363711774', 'A', '2021-01-23 14:12:23', 'Rua CP50', '', 'Conjunto Primavera', 'Goiânia', 'GO', '', '74477243', '62992024424', NULL, '75609525187', '1995-05-13', 3, 'C', '4 MESES', 'S', 'Marcos', 'S', 'Flavio e Jessica '),
	(59, 'Cinthya Rodrigues Dos Santos ', '', '42003BC88DB5841130A1C31334EDD062', 'A', '2021-01-23 15:50:35', 'Rua CP50', '', 'Conjunto Primavera', 'Goiânia', 'GO', '', '74477243', '62991242506', NULL, '03842227140', '1993-12-08', 3, 'C', '5 meses', 'S', 'Vanessa e Marcos ', 'S', 'Jessica e Flávio'),
	(60, 'Genilda Ramos Valverde dos Santos ', 'sememail@cursoigrejacristobrasil.kinghost.net', '231365D513674EA90BE2BAAF6D77A651', 'A', '2021-01-23 21:19:33', 'Eu Bm9 Qd 20 LT 31', 'Qd 20 LT 31', 'Brisa da Mata ', 'Goiânia ', 'GO', '00', '7400000000', '62991889968', NULL, '80121691187', '1975-10-09', 1, 'C', '5', 'S', 'Luana Rodrigues ', 'S', 'Leão De Juda'),
	(61, 'Anna Carolliny', 'sememail@cursoigrejacristobrasil.kinghost.net', 'CD5D01C3A71A0094152CE0E4707CF8E0', 'A', '2021-01-23 23:50:59', 'Rua da Divisa', '', 'Setor Morada do Sol', 'Goiânia', 'GO', '', '74473830', '62993375811', NULL, '07182234114', '2000-08-14', 1, 'C', '6 anos ', 'S', 'Heloísa e Juliano ', 'S', 'Anna Carolliny e Pabllo '),
	(62, 'Jéssica Martins amaro', 'Jessicaanaro2011@hotmail.com', '451B7ED3A3F81564A51F3B904E345406', 'A', '2021-01-24 09:25:50', 'Rua dom Pedro 2 ', 'Centro esportivo', 'Jardim california', 'Trindade', 'GO', '', '74', '986430885', NULL, '', '1991-02-15', 1, 'E', '15 anos', 'S', 'Regina e Luzimar', 'S', 'Jéssica amaro'),
	(63, 'Jéssica Martins amaro', '', '451B7ED3A3F81564A51F3B904E345406', 'A', '2021-01-24 09:34:52', 'Rua dom Pedro 2 ', 'Centro esportivo', 'Jardim california', 'Trindade', 'GO', '', '7538000', '986430885', NULL, '05047194167', '1991-02-15', 1, 'C', '15 anos', 'S', 'Regina Luzimar', 'S', 'Jéssica martins'),
	(64, 'Carlos Alberto Ferreira', 'Carlos.chinasburger@hotmail.com', '3B2A2239679AA5D3C5399078B17D6325', 'A', '2021-01-24 09:42:27', 'Rua Couto Magalhães', '', 'Setor Cristina', 'Trindade', 'GO', 'Rua polto Magalhães qd 09 LT 34', '75383603', '62995294686', NULL, '', '1978-05-28', 1, 'E', '6', 'S', 'Cícero e Adriano', 'S', 'Jairo '),
	(65, 'Tatiana carneiro Mendonça da Silva', 'sememail@cursoigrejacristobrasil.kinghost.net', 'E10ADC3949BA59ABBE56E057F20F883E', 'A', '2021-01-24 14:05:11', 'Estrada de São Geraldo', '', 'Parque Maracanã', 'Goiânia', 'GO', 'Chácara 175', '74482070', '62992374129', '992374129', '96522631172', '1977-10-25', 1, 'C', '14 anos', 'S', ' pastor Adriano', 'N', ''),
	(66, 'Karolainy Cardoso Ferreira', 'karolainycardosoferreira@gmail.com', 'B62228B5484F43EAA7742F19F1AB6E0A', 'A', '2021-01-24 16:42:55', 'Rua Alterosa', '', 'Residencial Anglo', 'Goiânia', 'GO', '07', '74474253', '062994249031', NULL, '', '2000-12-18', 1, 'E', '6 anos ', 'S', 'Cecília', 'S', 'Byanka'),
	(67, 'Lucas Eluan Bernardes dos Santos', 'llucaseluan69@gmail.com', '734F77DE6BA237037E0E5668E1A49631', 'A', '2021-01-24 20:13:26', 'Rua R 49', 'Quadra 47 lote 21', 'Vila Itatiaia', 'Goiânia', 'GO', '', '74690740', '62999941643', NULL, '', '2000-10-17', 1, 'E', '1 ano', 'S', 'Marco Aurélio', 'S', 'Eu (Lucas Eluan)'),
	(68, 'Joseph Ozorio Dos Santos', 'josephsaude8624@gmail.com', '9F3F722647794E75259716354D14CC95', 'A', '2021-01-24 21:07:30', 'Rua A23A', '', 'Da Vitória', 'Goiânia', 'GO', '', '74477039', '62981462276', '35955788', '', '1986-07-24', 1, 'E', '14 anos', 'S', 'Adriano e Cecilia', 'S', 'Fernando'),
	(69, 'Cleudineia marques', 'neiamarks2016@gamil.com', '17F25CBDEC5522CA169E68EC87404B24', 'A', '2021-01-26 16:23:21', 'Rua RDR 5r', 'Qd:02 lt:11', 'Residencial Dom Rafael', 'Goiânia', 'GO', '03', '74376030', '62998439075', NULL, '', '1984-12-22', 5, 'E', '6anos', 'S', 'Pastora beth', 'S', 'Pastora beth'),
	(70, 'Istefanny dias leite ', 'sememail@cursoigrejacristobrasil.kinghost.net', 'B62228B5484F43EAA7742F19F1AB6E0A', 'A', '2021-01-27 22:25:28', 'Rua VM L', 'Qd 19 lt 37', 'Vila Mutirão I', 'Goiânia', 'GO', '', '74480250', '62994287025', NULL, '71160409196', '2001-08-09', 1, 'C', '7 meses ', 'S', 'Amanda e Kaio ', 'S', 'Wadson e Emanuela '),
	(71, 'Fábio Júnior Pereira de Sousa ', 'cursoigrejacristobra@cursoigrejacristobrasil.kinghost.net', 'E10ADC3949BA59ABBE56E057F20F883E', 'A', '2021-01-28 18:59:20', 'Rua 606 quadra 521', 'Casa 01', 'Setor São José', 'Goiânia', 'GO', 'Casa 01', '74440520', '62981320428', '62981320428', '03634947152', '1992-06-24', 1, 'C', '5 anos ', 'S', 'Santiago e gabi', 'S', 'Diogo'),
	(72, 'Cícera Keyla Ferreira Mota', 'keylafarma76@gmail.com', '20B35ED6509B8A664B41222E2F14D097', 'A', '2021-01-28 21:11:34', 'Avenida Governador Virgílio Távora', 'Casa', 'Aeroporto', 'Juazeiro do Norte', 'CE', '66', '63020735', '88996720227', '', '', '1976-05-31', 1, 'E', '4 meses', 'S', 'Regina', 'S', 'Fernanda'),
	(73, 'Thainara Silva De Oliveira', 'thainarasilva516@gmail.com', '15C47C49706A8B6339CCBEA924355761', 'A', '2021-01-28 22:33:53', 'Rua CP39', '', 'Conjunto Primavera', 'Goiânia', 'GO', '4608', '74477210', '62993686370', '6238777210', '', '2005-02-26', 3, 'E', '4 anos', 'S', 'Marcos e Vanessa', 'S', 'Jéssica e Flávio '),
	(74, 'Irene da Silva Souza Teixeira', 'Irene.silva9189@gmail.com', '82DF4967EA810A1C9D2A6ECB041F62B5', 'A', '2021-01-29 09:34:04', 'Rua JC4', '', 'Jardim Curitiba', 'Goiânia', 'GO', 'Chácara 14', '74480470', '62991320245', NULL, '', '1976-08-28', 1, 'E', '18', 'S', 'Pastora Regina', 'S', 'Irene'),
	(75, 'Jackeline Cunha da Conceição', 'jackelinegoodlook@gmail.com', '71D90021D606FA6E1E73DD76A68CCED0', 'A', '2021-01-29 22:48:49', 'Rua 612', 'Casa', 'Setor São José', 'Goiânia', 'GO', '817', '74440600', '62981216650', NULL, '', '1986-08-24', 1, 'E', '14 anos', 'S', 'Juveni/ Lia', 'S', 'Juveni Cardoso'),
	(76, 'Ronaldo Pantiere Araujo Ribeiro', 'ronaldopantielearaujoribeiro@gmail.com', 'AF47CEBD706C58B237E979C0D49B6B3D', 'A', '2021-01-29 23:02:37', 'Rua 612', 'Casa', 'Setor São José', 'Goiânia', 'GO', '817', '74440600', '62999632399', NULL, '', '1981-11-13', 1, 'E', '7 anos', 'S', 'Juveni/Lia', 'S', 'Juveni Cardoso'),
	(77, 'Celma Cândida Moraes', 'sememail@cursoigrejacristobrasil.kinghost.net', '25FBE6617D47D563BE345B7B13211208', 'A', '2021-01-30 10:35:23', 'Rua 609 Quadra 505 lote 07', '', 'Setor São José', 'Goiânia', 'GO', '730', '74440550', '6285001251', '6232333120', '38020556168', '1963-06-11', 1, 'C', 'Mais de 20 anos', 'S', 'Pastores Vilmar, Leomar, Santiago e Gaby', 'S', 'Eu mesma, Celma'),
	(78, 'Simone Cardoso Gomes', 'simone.cardoso.gomes.2018@gmail.com', 'B62228B5484F43EAA7742F19F1AB6E0A', 'A', '2021-01-30 16:39:32', 'Rua Osvaldo Cruz', '', 'Setor Cristina', 'Trindade', 'GO', '', '75383606', '6284441043', NULL, '', '1968-12-12', 1, 'E', '', 'S', 'Joyce e carlos', 'S', 'Carlos'),
	(79, 'Wesley Souza Lopes', 'Wsouzalopis@gmail.com', 'E10ADC3949BA59ABBE56E057F20F883E', 'A', '2021-01-30 19:49:29', 'Rua Pedro Roque de Brito', 'Qd 30 lt 20 ksa 02', 'Setor dos Bandeirantes', 'Trindade', 'GO', 'sn', '75380685', '62991644015', NULL, '', '2006-04-29', 3, 'E', '3 anos', 'S', 'Flávio', 'S', 'Flávio e Jéssica'),
	(80, 'Lindalva Monteiro Matos ', 'sememail@cursoigrejacristobrasil.kinghost.net', 'FA1773B95D97C9C33FDB39DCCEBC6BCB', 'A', '2021-01-31 09:36:29', 'Rua senador morais filho ', 'Qd 5 Lt 6 ', 'Camiles ', 'Goiania ', 'GO', '178', '74000000', '6285467744', NULL, '53055527100', '1970-07-12', 1, 'C', '4 anos ', 'S', 'Pastora Vana Lúcia ', 'N', ''),
	(81, 'Simone Cardoso Gomes', 'sememail@cursoigrejacristobrasil.kinghost.net', 'C2899130E2ADC01E96FB6C00E1E89275', 'A', '2021-01-31 09:47:39', 'Rua Osvaldo Cruz', 'Atrás da coca cola', 'Setor Cristina', 'Trindade', 'GO', 'Quadra 16 lote 01', '75383606', '6284441043', NULL, '50841831149', '1968-12-12', 1, 'C', 'Três anos', 'S', 'Joyce e carlos', 'S', 'Carlos e Joyce'),
	(82, 'Raisse daiane', 'raisses@hotmail.com', 'E10ADC3949BA59ABBE56E057F20F883E', 'A', '2021-01-31 09:50:59', 'Rua VF 55 A', 'Qd 84 Lr 12', 'Vila Finsocial', 'Goiânia', 'GO', '', '74473515', '62991059758', '6235173643', '', '1989-09-04', 1, 'E', '1 ano', 'N', '', 'S', 'Weudson '),
	(83, 'Mariana gabriela', 'sememail@cursoigrejacristobrasil.kinghost.net', 'EEFC7B2BA7DF4C57E48F30DAD21BEA65', 'A', '2021-01-31 10:11:24', 'Rua só 14 qd 11 lt25', 'Casa 03', 'Setor perím', 'Goiania', 'GO', '265', '740000', '62994482112', NULL, '70115976116', '2001-01-20', 1, 'C', 'Dois anos e meio ', 'S', 'Pablo e Anna Carolina', 'N', 'Anna e Pablo '),
	(84, 'Vitória Cristina Leão', 'vitoriavivileao054@gmail.com', '51E2ADAB67A1006352AC36945B156055', 'A', '2021-01-31 10:39:37', 'Rua São Rafael', 'Qd. 10 lt.06', 'Residencial Maria Lourença', 'Goiânia', 'GO', 'S/N', '74595170', '62982304579', NULL, '', '2006-03-30', 1, 'E', '1 ano e 3 meses', 'S', 'Pr. Roberto Leão ', 'S', 'Marco Aurélio e Chrisllainy'),
	(85, 'Eliana Francisca dos santos', 'elianafrancisca24@gmail.com', 'DC0227C48BC15C43989300DAE76767FA', 'A', '2021-01-31 10:40:23', 'Rua do Sol Poente', 'Qd 01 Lt 05', 'Setor Morada do Sol', 'Goiânia', 'GO', '03', '74475143', '62994542122', NULL, '', '1975-06-16', 1, 'E', '3 anos ', 'S', 'PR Cícero ', 'S', 'Pr Andreia '),
	(86, 'Arlan Xavier de macedo', 'sememail@cursoigrejacristobrasil.kinghost.net', '08D8D7AED9D9E168AC4409D4A98A544C', 'A', '2021-01-31 11:05:51', 'Rua do Sol Poente', 'Qd 01 Lt 5 ', 'Setor Morada do Sol', 'Goiânia', 'GO', '03', '74475143', '62994568111', '', '79714030110', '1976-03-01', 1, 'C', '3 anos ', 'S', 'PR Cícero ', 'S', 'PR Andreia '),
	(87, 'Laura Isabely Pereira Galvão', '', 'B62228B5484F43EAA7742F19F1AB6E0A', 'A', '2021-01-31 11:48:44', 'Rua Antônio Elias de Souza', '', 'Setor Parque Tremendão', 'Goiânia', 'GO', 'Quadra 8 lote18', '74475032', '62995625800', NULL, '08474794129', '2004-01-02', 1, 'C', '2 anos ', 'S', 'Pastora Cleudilene ', 'S', 'Leandro Bento'),
	(88, 'Ednelson alves ferreira', 'ednelsonbrither@gmail.com', '4B7CDFB470BE1296D807F7F22964DC5F', 'A', '2021-01-31 16:58:29', 'Avenida Padre Feijó', '', 'Ipiranga', 'Goiânia', 'GO', '0', '74453180', '064992755527', NULL, '', '1996-06-12', 1, 'E', '1 ano', 'N', '', 'S', 'Pablo e anna '),
	(89, 'Kelly Marques Teixeira', 'cursoigrejacristobra@cursoigrejacristobrasil.kinghost.net', 'B62228B5484F43EAA7742F19F1AB6E0A', 'A', '2021-01-31 18:30:32', 'Avenida do Sol', '', 'Conjunto Primavera', 'Goiânia', 'GO', 'Quadra 14 lote 22', '74477279', '62993214967', NULL, '71352960109', '2005-01-30', 3, 'C', 'Há uns 2 meses', 'S', '', 'S', 'Jéssica e Flávio'),
	(90, 'Gabriel Henrique Aguiar e Silva', 'gbiel160dragonballz@gmail.com', 'B62228B5484F43EAA7742F19F1AB6E0A', 'A', '2021-01-31 18:38:55', 'Rua cp 39 Qd 45 lt 18', 'Goiás', 'Conjunto primavera', 'Goiânia', 'GO', '00', '74465477', '62991917099', NULL, '', '2003-03-22', 3, 'E', '2 meses ', 'S', 'Pastor Marcos e pastora Vanessa', 'S', 'Jéssica'),
	(91, 'Fernanda Pereira ', 'sememail@cursoigrejacristobrasil.kinghost.net', '1951305CC8C5BA964A63B89E98980948', 'A', '2021-01-31 20:51:03', 'Rua VM 3 B', 'Qd 90 lt 16', 'Setor Novo Planalto', 'Goiânia', 'GO', 'S.n', '74480340', '62999580057', '6232953393', '92562345134', '1982-05-17', 1, 'C', '14', 'S', 'Pr Regina', 'S', 'Fernanda '),
	(92, 'João Gabriel Gomes Damaceno ', 'neilagomes-gyn@hotmail.com', '9029F398332424FB67A9E89ACADA1041', 'A', '2021-01-31 21:23:01', 'Rua CP.33 qd.57 lt.18', 'Rua da feira ', 'Conjunto Primavera', 'Goiânia', 'GO', 's/n', '74477213', '62983009610', NULL, '', '2010-01-14', 3, 'E', '9 anos', 'S', 'Pastores', 'S', 'Leonardo e Geisla '),
	(93, 'Débora Rodrigues da Silva', 'sememail@cursoigrejacristobrasil.kinghost.net', '8868FA001DDA0E201B343AA5742F1972', 'A', '2021-01-31 21:48:05', 'Rua jatobá quandra 1 B Lot 17', '', 'Vale verde', 'GOIANIA', 'GO', '', '75370000', '991331471', NULL, '99074168191', '1981-09-21', 3, 'C', '3 anos', 'S', 'Pastor Marcos e pastora Vanessa', 'S', 'Gesla'),
	(94, 'Marizete Pereira Tavares ', '', '25D55AD283AA400AF464C76D713C07AD', 'A', '2021-01-31 22:34:52', 'Rua das Quaresmeiras Qd32 Lt 12', '', 'Cidade das flores ', 'Goianira', 'GO', '12', '75370000', '62985327892', NULL, '91961157187', '1972-06-03', 4, 'C', '4 anos ', 'S', 'Luciano e José luiz', 'S', 'José luiz'),
	(95, 'Isabel Campos da Silva', 'isabelcamposdasilva7@gmail.com', '945E8BB0491C591950DC663A4094C097', 'A', '2021-02-01 11:55:53', 'Rua Osvaldo de Albuquerque', 'Qd 09, lt01, cs 01', 'Residencial Pilar dos Sonhos', 'Goiânia', 'GO', '00', '74494280', '62995425397', '62993936592', '', '2005-05-14', 1, 'E', '15', 'S', 'Juliane', 'S', 'Vinycius'),
	(96, 'Ronaldo Pantiere Araujo Ribeiro', '', 'AF47CEBD706C58B237E979C0D49B6B3D', 'A', '2021-02-01 17:37:49', 'Rua 612', 'Casa', 'Setor São José', 'Goiânia', 'GO', '817', '74440600', '62999632399', NULL, '88631613134', '1981-11-13', 1, 'C', '7 anos', 'S', 'Juveni/Lia', 'S', 'Juveni Cardoso');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

-- Copiando estrutura para view cursoigrejacri.vw_contagem_geral_congregacao
-- Criando tabela temporária para evitar erros de dependência de VIEW
CREATE TABLE `vw_contagem_geral_congregacao` (
	`Nome` VARCHAR(45) NULL COLLATE 'utf8_general_ci',
	`PagamentoConfirmado` DECIMAL(42,0) NULL,
	`AguardandoPagamento` DECIMAL(42,0) NULL,
	`NaoEmitioPagamento` DECIMAL(42,0) NULL,
	`TotalInscricoes` DECIMAL(42,0) NULL
) ENGINE=MyISAM;

-- Copiando estrutura para view cursoigrejacri.vw_contagem_inscricao
-- Criando tabela temporária para evitar erros de dependência de VIEW
CREATE TABLE `vw_contagem_inscricao` (
	`Nome` VARCHAR(45) NULL COLLATE 'utf8_general_ci',
	`Inscricoes` DECIMAL(42,0) NULL
) ENGINE=MyISAM;

-- Copiando estrutura para view cursoigrejacri.vw_contagem_inscricao_curso
-- Criando tabela temporária para evitar erros de dependência de VIEW
CREATE TABLE `vw_contagem_inscricao_curso` (
	`titulo` VARCHAR(60) NULL COLLATE 'utf8_general_ci',
	`Quantidade` BIGINT(21) NULL
) ENGINE=MyISAM;

-- Copiando estrutura para view cursoigrejacri.vw_relatorio_iscricoes
-- Criando tabela temporária para evitar erros de dependência de VIEW
CREATE TABLE `vw_relatorio_iscricoes` (
	`idUsuario` INT(11) NOT NULL,
	`inscricao` INT(11) NOT NULL,
	`Nome` VARCHAR(60) NULL COLLATE 'utf8_general_ci',
	`Celular` VARCHAR(45) NULL COLLATE 'utf8_general_ci',
	`Fixo` VARCHAR(45) NULL COLLATE 'utf8_general_ci',
	`Titulo` VARCHAR(60) NULL COLLATE 'utf8_general_ci',
	`Status` VARCHAR(20) NULL COLLATE 'utf8mb4_general_ci',
	`Congregacao` VARCHAR(45) NULL COLLATE 'utf8_general_ci',
	`DataInscricao` DATETIME NULL
) ENGINE=MyISAM;

-- Copiando estrutura para view cursoigrejacri.vw_contagem_geral_congregacao
-- Removendo tabela temporária e criando a estrutura VIEW final
DROP TABLE IF EXISTS `vw_contagem_geral_congregacao`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vw_contagem_geral_congregacao` AS select `congregacaoGeral`.`Nome` AS `Nome`,coalesce((select count(0) from (((`congregacao` join `usuarios` on(`usuarios`.`CongregacaoId` = `congregacao`.`Id`)) join `inscricaousuario` on(`inscricaousuario`.`UsuarioId` = `usuarios`.`Id`)) join `processoinscricoes` on(`inscricaousuario`.`ProcessoInscricaoId` = `processoinscricoes`.`Id`)) where `usuarios`.`Status` = 'A' and `inscricaousuario`.`Status` <> 'CA' and (`inscricaousuario`.`Status` = 'CO' or `processoinscricoes`.`Tipo` = 'G') and `congregacaoGeral`.`Id` = `congregacao`.`Id`),0) AS `PagamentoConfirmado`,coalesce((select count(0) from (((`congregacao` join `usuarios` on(`usuarios`.`CongregacaoId` = `congregacao`.`Id`)) join `inscricaousuario` on(`inscricaousuario`.`UsuarioId` = `usuarios`.`Id`)) join `processoinscricoes` on(`inscricaousuario`.`ProcessoInscricaoId` = `processoinscricoes`.`Id`)) where `usuarios`.`Status` = 'A' and `inscricaousuario`.`Status` <> 'CA' and `inscricaousuario`.`Status` = 'AG' and `processoinscricoes`.`Tipo` = 'P' and `congregacaoGeral`.`Id` = `congregacao`.`Id` group by `congregacao`.`Nome`),0) AS `AguardandoPagamento`,coalesce((select count(0) from (((`inscricaousuario` join `usuarios` on(`inscricaousuario`.`UsuarioId` = `usuarios`.`Id`)) join `processoinscricoes` on(`inscricaousuario`.`ProcessoInscricaoId` = `processoinscricoes`.`Id`)) join `cursos` on(`processoinscricoes`.`CursoId` = `cursos`.`Id`)) where `usuarios`.`Status` = 'A' and !(`inscricaousuario`.`Id` in (select `transacaoinscricao`.`InscricaoUsuarioId` from `transacaoinscricao`)) and `inscricaousuario`.`Status` <> 'CA' and `processoinscricoes`.`Tipo` = 'P' and `usuarios`.`CongregacaoId` = `congregacaoGeral`.`Id` order by `usuarios`.`Nome`),0) AS `NaoEmitioPagamento`,coalesce((select count(0) from ((`congregacao` join `usuarios` on(`usuarios`.`CongregacaoId` = `congregacao`.`Id`)) join `inscricaousuario` on(`inscricaousuario`.`UsuarioId` = `usuarios`.`Id`)) where `usuarios`.`Status` = 'A' and `inscricaousuario`.`Status` <> 'CA' and `congregacaoGeral`.`Id` = `congregacao`.`Id` group by `congregacao`.`Nome`),0) AS `TotalInscricoes` from `congregacao` `congregacaoGeral` union select 'Total' AS `Nome`,sum(coalesce((select count(0) from (((`congregacao` join `usuarios` on(`usuarios`.`CongregacaoId` = `congregacao`.`Id`)) join `inscricaousuario` on(`inscricaousuario`.`UsuarioId` = `usuarios`.`Id`)) join `processoinscricoes` on(`inscricaousuario`.`ProcessoInscricaoId` = `processoinscricoes`.`Id`)) where `usuarios`.`Status` = 'A' and `inscricaousuario`.`Status` <> 'CA' and (`inscricaousuario`.`Status` = 'CO' or `processoinscricoes`.`Tipo` = 'G')),0)) AS `PagamentoConfirmado`,sum(coalesce((select count(0) from (((`congregacao` join `usuarios` on(`usuarios`.`CongregacaoId` = `congregacao`.`Id`)) join `inscricaousuario` on(`inscricaousuario`.`UsuarioId` = `usuarios`.`Id`)) join `processoinscricoes` on(`inscricaousuario`.`ProcessoInscricaoId` = `processoinscricoes`.`Id`)) where `usuarios`.`Status` = 'A' and `inscricaousuario`.`Status` <> 'CA' and `inscricaousuario`.`Status` = 'AG' and `processoinscricoes`.`Tipo` = 'P'),0)) AS `AguardandoPagamento`,sum(coalesce((select count(0) from (((`inscricaousuario` join `usuarios` on(`inscricaousuario`.`UsuarioId` = `usuarios`.`Id`)) join `processoinscricoes` on(`inscricaousuario`.`ProcessoInscricaoId` = `processoinscricoes`.`Id`)) join `cursos` on(`processoinscricoes`.`CursoId` = `cursos`.`Id`)) where `usuarios`.`Status` = 'A' and !(`inscricaousuario`.`Id` in (select `transacaoinscricao`.`InscricaoUsuarioId` from `transacaoinscricao`)) and `inscricaousuario`.`Status` <> 'CA' and `processoinscricoes`.`Tipo` = 'P'),0)) AS `NaoEmitioPagamento`,sum(coalesce((select count(0) from ((`congregacao` join `usuarios` on(`usuarios`.`CongregacaoId` = `congregacao`.`Id`)) join `inscricaousuario` on(`inscricaousuario`.`UsuarioId` = `usuarios`.`Id`)) where `usuarios`.`Status` = 'A' and `inscricaousuario`.`Status` <> 'CA'),0)) AS `TotalInscricoes`;

-- Copiando estrutura para view cursoigrejacri.vw_contagem_inscricao
-- Removendo tabela temporária e criando a estrutura VIEW final
DROP TABLE IF EXISTS `vw_contagem_inscricao`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vw_contagem_inscricao` AS select `TABELA`.`Nome` AS `Nome`,`TABELA`.`Inscricoes` AS `Inscricoes` from (select `congregacaoGeral`.`Nome` AS `Nome`,coalesce((select count(0) from ((`cursoigrejacri`.`congregacao` join `cursoigrejacri`.`usuarios` on(`cursoigrejacri`.`usuarios`.`CongregacaoId` = `cursoigrejacri`.`congregacao`.`Id`)) join `cursoigrejacri`.`inscricaousuario` on(`cursoigrejacri`.`inscricaousuario`.`UsuarioId` = `cursoigrejacri`.`usuarios`.`Id`)) where `cursoigrejacri`.`usuarios`.`Status` = 'A' and `cursoigrejacri`.`inscricaousuario`.`Status` <> 'CA' and `congregacaoGeral`.`Id` = `cursoigrejacri`.`congregacao`.`Id` group by `cursoigrejacri`.`congregacao`.`Nome`),0) AS `Inscricoes` from `cursoigrejacri`.`congregacao` `congregacaoGeral` union select 'Total' AS `Nome`,sum(coalesce((select count(0) from ((`cursoigrejacri`.`congregacao` join `cursoigrejacri`.`usuarios` on(`cursoigrejacri`.`usuarios`.`CongregacaoId` = `cursoigrejacri`.`congregacao`.`Id`)) join `cursoigrejacri`.`inscricaousuario` on(`cursoigrejacri`.`inscricaousuario`.`UsuarioId` = `cursoigrejacri`.`usuarios`.`Id`)) where `cursoigrejacri`.`usuarios`.`Status` = 'A' and `cursoigrejacri`.`inscricaousuario`.`Status` <> 'CA' and `congregacaoGeral`.`Id` = `cursoigrejacri`.`congregacao`.`Id` group by `cursoigrejacri`.`congregacao`.`Nome`),0)) AS `Inscricoes` from `cursoigrejacri`.`congregacao` `congregacaoGeral`) `TABELA`;

-- Copiando estrutura para view cursoigrejacri.vw_contagem_inscricao_curso
-- Removendo tabela temporária e criando a estrutura VIEW final
DROP TABLE IF EXISTS `vw_contagem_inscricao_curso`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vw_contagem_inscricao_curso` AS select `cursos`.`Titulo` AS `titulo`,(select count(0) from ((`inscricaousuario` join `processoinscricoes` on(`processoinscricoes`.`Id` = `inscricaousuario`.`ProcessoInscricaoId`)) join `usuarios` on(`usuarios`.`Id` = `inscricaousuario`.`UsuarioId`)) where `usuarios`.`Status` = 'A' and `processoinscricoes`.`CursoId` = `cursos`.`Id` and `inscricaousuario`.`Status` <> 'CA') AS `Quantidade` from `cursos` union select 'Total' AS `titulo`,(select count(0) from ((`inscricaousuario` join `processoinscricoes` on(`processoinscricoes`.`Id` = `inscricaousuario`.`ProcessoInscricaoId`)) join `usuarios` on(`usuarios`.`Id` = `inscricaousuario`.`UsuarioId`)) where `usuarios`.`Status` = 'A' and `inscricaousuario`.`Status` <> 'CA') AS `Quantidade`;

-- Copiando estrutura para view cursoigrejacri.vw_relatorio_iscricoes
-- Removendo tabela temporária e criando a estrutura VIEW final
DROP TABLE IF EXISTS `vw_relatorio_iscricoes`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vw_relatorio_iscricoes` AS select `usuarios`.`Id` AS `idUsuario`,`inscricaousuario`.`Id` AS `inscricao`,`usuarios`.`Nome` AS `Nome`,`usuarios`.`TelefoneCelular` AS `Celular`,`usuarios`.`TelefoneFixo` AS `Fixo`,`cursos`.`Titulo` AS `Titulo`,case `inscricaousuario`.`Status` when 'AG' then if(`processoinscricoes`.`Tipo` = 'G','Pagamento Confirmado','Aguardando Pagamento') when 'CO' then 'Pagamento Confirmado' end AS `Status`,`congregacao`.`Nome` AS `Congregacao`,`inscricaousuario`.`DataInscricao` AS `DataInscricao` from ((((`processoinscricoes` join `inscricaousuario` on(`processoinscricoes`.`Id` = `inscricaousuario`.`ProcessoInscricaoId`)) join `cursos` on(`processoinscricoes`.`CursoId` = `cursos`.`Id`)) join `usuarios` on(`inscricaousuario`.`UsuarioId` = `usuarios`.`Id`)) join `congregacao` on(`congregacao`.`Id` = `usuarios`.`CongregacaoId`)) where `inscricaousuario`.`Status` <> 'CA' and `usuarios`.`Status` = 'A' order by `cursos`.`Titulo`,`usuarios`.`Nome`;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
