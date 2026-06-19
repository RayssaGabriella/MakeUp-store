-- Execute este script no seu MariaDB (ex: via `mysql -u root -p < sql/schema.sql`)

CREATE DATABASE IF NOT EXISTS makeup_store
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE makeup_store;

CREATE TABLE IF NOT EXISTS makeups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  marca VARCHAR(255) NOT NULL,
  categoria VARCHAR(255) NOT NULL,
  cor VARCHAR(255) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL
);
