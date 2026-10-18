CREATE DATABASE IF NOT EXISTS shezz_beauty CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE shezz_beauty;

CREATE TABLE IF NOT EXISTS customers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(254) NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(22) NOT NULL,
  password_hash VARCHAR(200) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customer_sessions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  customer_id BIGINT UNSIGNED NOT NULL,
  token_hash CHAR(64) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT customer_sessions_customer_fk FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  INDEX customer_sessions_expiry_idx (expires_at)
);

CREATE TABLE IF NOT EXISTS appointments (
  id CHAR(36) NOT NULL PRIMARY KEY,
  customer_id BIGINT UNSIGNED NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  phone VARCHAR(22) NOT NULL,
  service_id TINYINT UNSIGNED NOT NULL,
  stylist_id ENUM('s1','s2','s3') NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status ENUM('Pending','Confirmed','Completed','Cancelled') NOT NULL DEFAULT 'Pending',
  payment_preference ENUM('Pay at salon','Online payment requested') NOT NULL DEFAULT 'Pay at salon',
  active_slot TINYINT GENERATED ALWAYS AS (IF(status='Cancelled',NULL,1)) STORED,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT appointments_customer_fk FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  UNIQUE KEY appointment_slot_unique (stylist_id,appointment_date,appointment_time,active_slot),
  INDEX appointments_customer_created_idx (customer_id,created_at)
);