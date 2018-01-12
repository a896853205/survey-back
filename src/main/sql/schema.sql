/*
Navicat MySQL Data Transfer

Source Server         : myself
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : survey

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2018-01-12 17:10:38
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `b_answer`
-- ----------------------------
DROP TABLE IF EXISTS `b_answer`;
CREATE TABLE `b_answer` (
  `id` char(36) NOT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `dt` date DEFAULT NULL,
  `score` varchar(255) DEFAULT NULL,
  `inquiry_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of b_answer
-- ----------------------------

-- ----------------------------
-- Table structure for `b_answer_detial`
-- ----------------------------
DROP TABLE IF EXISTS `b_answer_detial`;
CREATE TABLE `b_answer_detial` (
  `id` char(36) NOT NULL,
  `answer_id` char(36) DEFAULT NULL,
  `solution` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of b_answer_detial
-- ----------------------------

-- ----------------------------
-- Table structure for `b_comment`
-- ----------------------------
DROP TABLE IF EXISTS `b_comment`;
CREATE TABLE `b_comment` (
  `id` char(36) NOT NULL,
  `begin_score` varchar(255) DEFAULT NULL,
  `end_score` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of b_comment
-- ----------------------------

-- ----------------------------
-- Table structure for `b_inquiry`
-- ----------------------------
DROP TABLE IF EXISTS `b_inquiry`;
CREATE TABLE `b_inquiry` (
  `id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `switch` char(1) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `create_time` date DEFAULT NULL,
  `end_time` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `state` char(1) DEFAULT NULL COMMENT '处理状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of b_inquiry
-- ----------------------------

-- ----------------------------
-- Table structure for `b_opation`
-- ----------------------------
DROP TABLE IF EXISTS `b_opation`;
CREATE TABLE `b_opation` (
  `id` char(36) NOT NULL,
  `symbol` varchar(255) DEFAULT NULL,
  `question_id` char(36) DEFAULT NULL,
  `content` varchar(36) DEFAULT NULL,
  `score` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of b_opation
-- ----------------------------

-- ----------------------------
-- Table structure for `b_question`
-- ----------------------------
DROP TABLE IF EXISTS `b_question`;
CREATE TABLE `b_question` (
  `id` char(36) NOT NULL,
  `inquiry_id` char(36) DEFAULT NULL,
  `num` int(255) DEFAULT NULL,
  `type_id` varchar(36) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `essential` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of b_question
-- ----------------------------

-- ----------------------------
-- Table structure for `b_question_type`
-- ----------------------------
DROP TABLE IF EXISTS `b_question_type`;
CREATE TABLE `b_question_type` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of b_question_type
-- ----------------------------

-- ----------------------------
-- Table structure for `s_role`
-- ----------------------------
DROP TABLE IF EXISTS `s_role`;
CREATE TABLE `s_role` (
  `id` char(3) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of s_role
-- ----------------------------
INSERT INTO `s_role` VALUES ('1', 'manager');

-- ----------------------------
-- Table structure for `s_user`
-- ----------------------------
DROP TABLE IF EXISTS `s_user`;
CREATE TABLE `s_user` (
  `id` char(36) NOT NULL COMMENT '编号',
  `account` varchar(255) DEFAULT NULL COMMENT '账号',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `role_id` char(3) DEFAULT NULL COMMENT '权限',
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `portrait` varchar(255) DEFAULT NULL COMMENT '头像路径',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of s_user
-- ----------------------------
INSERT INTO `s_user` VALUES ('1', '896853605', 'a896853605', '1', '钱程', null);
