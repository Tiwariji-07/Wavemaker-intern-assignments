CREATE TABLE `transaction_type`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `transaction_type` ADD PRIMARY KEY `transaction_type_id_primary`(`id`);
CREATE TABLE `transactions`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `category_id` BIGINT NOT NULL,
    `month` BIGINT NOT NULL,
    `year` BIGINT NOT NULL,
    `debit_amount` BIGINT NOT NULL,
    `credit_amount` BIGINT NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `transaction_type_id` BIGINT NOT NULL
);
ALTER TABLE
    `transactions` ADD PRIMARY KEY `transactions_id_primary`(`id`);
CREATE TABLE `expense_budget`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `category_id` BIGINT NOT NULL,
    `budget_limit` BIGINT NOT NULL,
    `spent_value` BIGINT NOT NULL,
    `month` BIGINT NOT NULL,
    `year` BIGINT NOT NULL,
    `is_recurring` TINYINT(1) NOT NULL,
    `is_active` TINYINT(1) NOT NULL
);
ALTER TABLE
    `expense_budget` ADD PRIMARY KEY `expense_budget_id_primary`(`id`);
CREATE TABLE `category`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `category_name` BIGINT NOT NULL
);
ALTER TABLE
    `category` ADD PRIMARY KEY `category_id_primary`(`id`);
CREATE TABLE `bill_reminder`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `bill_name` VARCHAR(255) NOT NULL,
    `reminder_date` DATE NOT NULL,
    `is_recurring` TINYINT(1) NOT NULL,
    `bill_amount` BIGINT NOT NULL,
    `is_active` TINYINT(1) NOT NULL
);
ALTER TABLE
    `bill_reminder` ADD PRIMARY KEY `bill_reminder_id_primary`(`id`);
CREATE TABLE `user`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(255) NULL,
    `date_of_birth` DATE NULL,
    `occupation` VARCHAR(255) NULL
);
ALTER TABLE
    `user` ADD PRIMARY KEY `user_id_primary`(`id`);
ALTER TABLE
    `user` ADD UNIQUE `user_email_unique`(`email`);
ALTER TABLE
    `transactions` ADD CONSTRAINT `transactions_category_id_foreign` FOREIGN KEY(`category_id`) REFERENCES `category`(`id`);
ALTER TABLE
    `transactions` ADD CONSTRAINT `transactions_id_foreign` FOREIGN KEY(`id`) REFERENCES `user`(`id`);
ALTER TABLE
    `expense_budget` ADD CONSTRAINT `expense_budget_category_id_foreign` FOREIGN KEY(`category_id`) REFERENCES `category`(`id`);
ALTER TABLE
    `expense_budget` ADD CONSTRAINT `expense_budget_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);
ALTER TABLE
    `bill_reminder` ADD CONSTRAINT `bill_reminder_id_foreign` FOREIGN KEY(`id`) REFERENCES `user`(`id`);
ALTER TABLE
    `transactions` ADD CONSTRAINT `transactions_transaction_type_id_foreign` FOREIGN KEY(`transaction_type_id`) REFERENCES `transaction_type`(`id`);