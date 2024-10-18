
INSERT INTO brands (name, thumbnail, description, active, created_at, updated_at, created_by, updated_by)
VALUES
('Dell', 'dell.png', 'Thương hiệu laptop Dell', true, NOW(), NOW(), 'admin', 'admin'),
('HP', 'hp.png', 'Thương hiệu laptop HP', true, NOW(), NOW(), 'admin', 'admin'),
('Apple', 'apple.png', 'Thương hiệu Apple', true, NOW(), NOW(), 'admin', 'admin'),
('Asus', 'asus.png', 'Thương hiệu laptop Asus', true, NOW(), NOW(), 'admin', 'admin'),
('Lenovo', 'lenovo.png', 'Thương hiệu laptop Lenovo', true, NOW(), NOW(), 'admin', 'admin');

INSERT INTO categories (name, thumbnail, description, hot, active, created_at, updated_at, created_by, updated_by)
VALUES
('Laptop', 'laptop.png', 'Danh mục sản phẩm Laptop', true, true, NOW(), NOW(), 'admin', 'admin'),
('Chuột', 'mouse.png', 'Danh mục phụ kiện chuột', false, true, NOW(), NOW(), 'admin', 'admin'),
('Bàn phím', 'keyboard.png', 'Danh mục phụ kiện bàn phím', false, true, NOW(), NOW(), 'admin', 'admin'),
('Màn hình', 'monitor.png', 'Danh mục màn hình máy tính', true, true, NOW(), NOW(), 'admin', 'admin'),
('Tai nghe', 'headset.png', 'Danh mục tai nghe', false, true, NOW(), NOW(), 'admin', 'admin');

INSERT INTO products (name, price, discount, thumbnail, quantity, sold, description, active, sale, hot, category_id, brand_id, created_at, updated_at, created_by, updated_by)
VALUES
('Dell XPS 13', 52990000.00, 10.00, 'Dell_XPS_13.jpg', 100, 50, 'Laptop Dell XPS 13 mạnh mẽ', true, true, true, 1, 1, NOW(), NOW(), 'admin', 'admin'),
('HP Spectre x360', 42000000.00, 5.00, 'hp-spectre-x360.jpg', 150, 60, 'Laptop HP Spectre x360 2-in-1', true, true, false, 1, 2, NOW(), NOW(), 'admin', 'admin'),
('MacBook Pro 16', 109990000.00, 0.00, 'apple-macbook-pro.jpg', 80, 40, 'MacBook Pro 16 inch hiệu năng cao', true, false, true, 1, 3, NOW(), NOW(), 'admin', 'admin'),
('Asus ROG Zephyrus', 74900000.00, 15.00, 'asus-rog-zephyrus-g16.jpg', 120, 30, 'Laptop gaming Asus ROG Zephyrus', true, true, true, 1, 4, NOW(), NOW(), 'admin', 'admin'),
('Lenovo ThinkPad X1', 13000000.00, 10.00, 'lenovo-thinkpad-x1.jpg', 90, 70, 'Laptop Lenovo ThinkPad X1 Carbon', true, false, false, 1, 5, NOW(), NOW(), 'admin', 'admin'),

-- Chuột
('Chuột Logitech MX Master 3', 1000000.00, 10.00, 'chuot-khong-day-logitech.jpg', 200, 100, 'Chuột không dây Logitech MX Master 3', true, true, false, 2, 3, NOW(), NOW(), 'admin', 'admin'),
('Chuột Razer DeathAdder V2', 80000.00, 5.00, 'gaming-razer-deathadder-v2.jpg', 150, 70, 'Chuột gaming Razer DeathAdder V2', true, true, true, 2, 4, NOW(), NOW(), 'admin', 'admin'),
('Chuột SteelSeries Rival 600', 1000000.00, 8.00, 'chuot-co-day-silent-rapoo.jpg', 140, 60, 'Chuột gaming SteelSeries Rival 600', true, true, true, 2, 2, NOW(), NOW(), 'admin', 'admin'),
('Chuột Gaming Logitech G102 Gen2', 90000.00, 10.00, 'chuot-gaming-logitech-g102.jpg', 120, 80, 'Chuột không dây Corsair Dark Core RGB Pro', true, true, false, 2, 2, NOW(), NOW(), 'admin', 'admin'),

-- Bàn phím
('Bàn phím cơ Corsair K70 RGB', 150.00, 20.00, 'ban-phim-co-day-gaming-corsair-k70.jpg', 100, 60, 'Bàn phím cơ Corsair K70 RGB', true, true, true, 3, 4, NOW(), NOW(), 'admin', 'admin'),
('Bàn phím Logitech G Pro X', 130.00, 15.00, 'co-co-day-gaming-rapoo.jpg', 120, 80, 'Bàn phím cơ Logitech G Pro X', true, true, false, 3, 5, NOW(), NOW(), 'admin', 'admin'),
('Bàn Phím Cơ Bluetooth Dareu EK75 Pro', 160.00, 18.00, 'ban-phim-co-bluetooth-dareu-ek75.jpg', 110, 50, 'Bàn phím cơ Razer BlackWidow Elite', true, true, true, 3, 2, NOW(), NOW(), 'admin', 'admin'),

-- Màn hình
('Màn hình Dell UltraSharp 27', 12500000.00, 25.00, 'dell-ultrasharp.jpg', 60, 40, 'Màn hình Dell UltraSharp 27 inch 4K', true, true, true, 4, 2, NOW(), NOW(), 'admin', 'admin'),
('Màn hình Asus TUF Gaming 32', 400000.00, 30.00, 'msi-pro.jpg', 80, 50, 'Màn hình gaming Asus TUF 32 inch', true, true, true, 4, 3, NOW(), NOW(), 'admin', 'admin'),
('Màn hình LG UltraGear 34GN850', 7000000.00, 30.00, 'xiaomi-g27i.jpg', 50, 25, 'Màn hình LG UltraGear 34 inch 144Hz', true, true, true, 4, 3, NOW(), NOW(), 'admin', 'admin'),
('Màn hình Samsung Odyssey G9', 13000000.00, 35.00, 'samsung-s3.jpg', 30, 15, 'Màn hình cong Samsung Odyssey G9 49 inch', true, true, true,4, 4, NOW(), NOW(), 'admin', 'admin'),

-- Tai nghe
('Tai nghe gaming SteelSeries Arctis 7', 1800000.00, 20.00, 'tai-nghe-bluetooth.jpg', 100, 30, 'Tai nghe không dây SteelSeries Arctis 7', true, true, false, 5, 4, NOW(), NOW(), 'admin', 'admin'),
('Tai nghe Bose QuietComfort 35 II', 3000000.00, 0.00, 'tai-nghe-bluetooth-chup-tai-havit.jpg', 70, 50, 'Tai nghe chống ồn Bose QC35 II', true, false, true, 5, 4, NOW(), NOW(), 'admin', 'admin'),
('Tai nghe gaming HyperX Cloud II', 1000000.00, 15.00, 'tai-nghe-bluetooth-chup-tai-havit-h663bt.jpg', 130, 60, 'Tai nghe gaming HyperX Cloud II', true, true, false, 5, 1, NOW(), NOW(), 'admin', 'admin'),
('Tai nghe Sony WH-1000XM4', 3500000.00, 0.00, 'tai-nghe-bluetooth-chup-tai-jbl.jpg', 80, 50, 'Tai nghe chống ồn Sony WH-1000XM4', true, false, true, 5, 3, NOW(), NOW(), 'admin', 'admin');

