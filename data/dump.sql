SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE `customer` (
  `id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `phone` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `has_song` (
  `upc` int(10) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`upc`,`title`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `item` (
  `upc` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `type` enum('CD','DVD') NOT NULL,
  `category` enum('ROCK','POP','RAP','COUNTRY','CLASSICAL','NEW_AGE','INSTRUMENTAL') NOT NULL,
  `company` varchar(255) NOT NULL,
  `year` year(4) NOT NULL,
  `price` decimal(10,2) unsigned NOT NULL,
  `stock` int(10) unsigned NOT NULL,
  PRIMARY KEY (`upc`),
  KEY `title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE `lead_singer` (
  `upc` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`upc`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `order` (
  `id` int(10) unsigned NOT NULL,
  `customer_id` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `card_number` varchar(255) NOT NULL,
  `card_expiry` varchar(7) NOT NULL,
  `expected_date` date NOT NULL,
  `delivered_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `order_item` (
  `order_id` int(10) unsigned NOT NULL,
  `upc` int(10) unsigned NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  PRIMARY KEY (`order_id`,`upc`),
  KEY `upc` (`upc`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `return` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(10) unsigned NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE `return_item` (
  `return_id` int(10) unsigned NOT NULL,
  `upc` int(10) unsigned NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  PRIMARY KEY (`return_id`,`upc`),
  KEY `upc` (`upc`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `has_song`
  ADD CONSTRAINT `has_song_ibfk_1` FOREIGN KEY (`upc`) REFERENCES `item` (`upc`);

ALTER TABLE `lead_singer`
  ADD CONSTRAINT `lead_singer_ibfk_1` FOREIGN KEY (`upc`) REFERENCES `item` (`upc`);

ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`);

ALTER TABLE `order_item`
  ADD CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`upc`) REFERENCES `item` (`upc`),
  ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);

ALTER TABLE `return`
  ADD CONSTRAINT `return_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);

ALTER TABLE `return_item`
  ADD CONSTRAINT `return_item_ibfk_2` FOREIGN KEY (`upc`) REFERENCES `item` (`upc`),
  ADD CONSTRAINT `return_item_ibfk_1` FOREIGN KEY (`return_id`) REFERENCES `return` (`id`);
