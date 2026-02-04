-- ============================================
-- CampusCafe Seed Data
-- ============================================

-- Categories (5 categories)
INSERT INTO categories (name, description) VALUES
('Bebidas Calientes', 'Café, té, chocolate y otras bebidas calientes'),
('Bebidas Frías', 'Refrescos, jugos, smoothies y bebidas heladas'),
('Snacks', 'Botanas, galletas y aperitivos rápidos'),
('Postres', 'Pasteles, pays, brownies y dulces'),
('Comida', 'Sandwiches, ensaladas y platillos principales');

-- Products (25 products with varied stock)
INSERT INTO products (name, description, price, stock, category_id) VALUES
-- Bebidas Calientes (category_id = 1)
('Café Americano', 'Café negro tradicional 12oz', 28.00, 50, 1),
('Cappuccino', 'Espresso con leche espumada', 42.00, 35, 1),
('Latte', 'Espresso con leche vaporizada', 45.00, 8, 1),
('Chocolate Caliente', 'Chocolate con leche y crema', 38.00, 25, 1),
('Té Verde', 'Té verde orgánico', 25.00, 5, 1),

-- Bebidas Frías (category_id = 2)
('Frappé de Café', 'Café helado con crema batida', 55.00, 20, 2),
('Smoothie de Fresa', 'Smoothie de fresa con yogurt', 48.00, 3, 2),
('Limonada Natural', 'Limonada recién exprimida', 22.00, 40, 2),
('Jugo de Naranja', 'Jugo de naranja natural', 30.00, 15, 2),
('Agua Mineral', 'Agua mineral 500ml', 18.00, 100, 2),

-- Snacks (category_id = 3)
('Croissant', 'Croissant de mantequilla', 32.00, 12, 3),
('Muffin de Arándano', 'Muffin casero de arándano', 28.00, 7, 3),
('Galletas de Chocolate', 'Pack de 3 galletas', 25.00, 0, 3),
('Barra de Granola', 'Barra energética de granola', 20.00, 45, 3),
('Papas Fritas', 'Bolsa de papas fritas', 22.00, 60, 3),

-- Postres (category_id = 4)
('Brownie', 'Brownie de chocolate con nueces', 35.00, 9, 4),
('Cheesecake', 'Rebanada de cheesecake NY', 55.00, 6, 4),
('Pay de Manzana', 'Rebanada de pay de manzana', 45.00, 4, 4),
('Dona Glaseada', 'Dona con glaseado de azúcar', 22.00, 18, 4),
('Churros', 'Orden de 3 churros con chocolate', 38.00, 2, 4),

-- Comida (category_id = 5)
('Sandwich de Jamón', 'Sandwich con jamón, queso y vegetales', 58.00, 15, 5),
('Sandwich de Pollo', 'Sandwich con pechuga de pollo', 65.00, 10, 5),
('Ensalada César', 'Ensalada con pollo y aderezo césar', 72.00, 8, 5),
('Wrap Vegetariano', 'Wrap con vegetales y hummus', 55.00, 5, 5),
('Panini Caprese', 'Panini con tomate, mozzarella y albahaca', 62.00, 11, 5);

-- Customers (10 customers)
INSERT INTO customers (name, email, phone, student_id) VALUES
('María García', 'maria.garcia@universidad.edu', '555-0101', 'STU001'),
('Carlos López', 'carlos.lopez@universidad.edu', '555-0102', 'STU002'),
('Ana Martínez', 'ana.martinez@universidad.edu', '555-0103', 'STU003'),
('Pedro Sánchez', 'pedro.sanchez@universidad.edu', '555-0104', 'STU004'),
('Laura Rodríguez', 'laura.rodriguez@universidad.edu', '555-0105', 'STU005'),
('Miguel Hernández', 'miguel.hernandez@universidad.edu', '555-0106', 'STU006'),
('Sofia Torres', 'sofia.torres@universidad.edu', '555-0107', 'STU007'),
('Diego Flores', 'diego.flores@universidad.edu', '555-0108', 'STU008'),
('Valentina Cruz', 'valentina.cruz@universidad.edu', '555-0109', 'STU009'),
('Andrés Morales', 'andres.morales@universidad.edu', '555-0110', 'STU010');

-- Orders (18 historical orders)
INSERT INTO orders (customer_id, total, status, payment_method, created_at) VALUES
-- Last week orders
(1, 115.00, 'completed', 'card', CURRENT_TIMESTAMP - INTERVAL '7 days'),
(2, 87.00, 'completed', 'cash', CURRENT_TIMESTAMP - INTERVAL '6 days'),
(3, 152.00, 'completed', 'card', CURRENT_TIMESTAMP - INTERVAL '6 days'),
(4, 68.00, 'completed', 'cash', CURRENT_TIMESTAMP - INTERVAL '5 days'),
(5, 220.00, 'completed', 'card', CURRENT_TIMESTAMP - INTERVAL '5 days'),
(6, 45.00, 'completed', 'cash', CURRENT_TIMESTAMP - INTERVAL '4 days'),
(7, 98.00, 'completed', 'card', CURRENT_TIMESTAMP - INTERVAL '4 days'),
(8, 175.00, 'completed', 'cash', CURRENT_TIMESTAMP - INTERVAL '3 days'),
(9, 63.00, 'completed', 'card', CURRENT_TIMESTAMP - INTERVAL '3 days'),
(10, 134.00, 'completed', 'cash', CURRENT_TIMESTAMP - INTERVAL '2 days'),
-- Yesterday orders
(1, 89.00, 'completed', 'card', CURRENT_TIMESTAMP - INTERVAL '1 day'),
(2, 156.00, 'completed', 'cash', CURRENT_TIMESTAMP - INTERVAL '1 day'),
(3, 72.00, 'completed', 'card', CURRENT_TIMESTAMP - INTERVAL '1 day'),
-- Today orders
(4, 195.00, 'completed', 'card', CURRENT_TIMESTAMP - INTERVAL '2 hours'),
(5, 48.00, 'completed', 'cash', CURRENT_TIMESTAMP - INTERVAL '1 hour'),
(6, 127.00, 'completed', 'card', CURRENT_TIMESTAMP - INTERVAL '30 minutes'),
(7, 85.00, 'pending', 'card', CURRENT_TIMESTAMP - INTERVAL '10 minutes'),
(8, 210.00, 'processing', 'cash', CURRENT_TIMESTAMP - INTERVAL '5 minutes');

-- Order Items (items for each order)
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
-- Order 1
(1, 1, 2, 28.00),
(1, 11, 1, 32.00),
(1, 16, 1, 35.00),
-- Order 2
(2, 2, 1, 42.00),
(2, 12, 1, 28.00),
(2, 10, 1, 18.00),
-- Order 3
(3, 6, 2, 55.00),
(3, 17, 1, 55.00),
-- Order 4
(4, 3, 1, 45.00),
(4, 8, 1, 22.00),
-- Order 5
(5, 21, 2, 58.00),
(5, 23, 1, 72.00),
(5, 16, 1, 35.00),
-- Order 6
(6, 4, 1, 38.00),
(6, 12, 1, 28.00),
-- Order 7
(7, 22, 1, 65.00),
(7, 9, 1, 30.00),
-- Order 8
(8, 5, 2, 25.00),
(8, 24, 2, 55.00),
(8, 19, 1, 22.00),
-- Order 9
(9, 1, 1, 28.00),
(9, 16, 1, 35.00),
-- Order 10
(10, 6, 1, 55.00),
(10, 25, 1, 62.00),
(10, 10, 1, 18.00),
-- Order 11
(11, 2, 2, 42.00),
(11, 11, 1, 32.00),
-- Order 12
(12, 22, 2, 65.00),
(12, 16, 1, 35.00),
-- Order 13
(13, 3, 1, 45.00),
(13, 14, 1, 20.00),
-- Order 14
(14, 23, 2, 72.00),
(14, 6, 1, 55.00),
-- Order 15
(15, 4, 1, 38.00),
(15, 10, 1, 18.00),
-- Order 16
(16, 21, 1, 58.00),
(16, 7, 1, 48.00),
(16, 19, 1, 22.00),
-- Order 17
(17, 1, 2, 28.00),
(17, 17, 1, 55.00),
-- Order 18
(18, 25, 2, 62.00),
(18, 6, 1, 55.00),
(18, 16, 1, 35.00);
