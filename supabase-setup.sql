-- Supabase Migration SQL
-- Bu SQL'i Supabase Dashboard > SQL Editor'de çalıştırın

-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- User roles enum
CREATE TYPE user_role AS ENUM ('b2b', 'manager');

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    role user_role DEFAULT 'b2b' NOT NULL,
    "emailVerified" TIMESTAMP WITH TIME ZONE,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- NextAuth accounts table
CREATE TABLE accounts (
    "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INTEGER,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    PRIMARY KEY (provider, "providerAccountId")
);

-- NextAuth sessions table
CREATE TABLE sessions (
    "sessionToken" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires TIMESTAMP WITH TIME ZONE NOT NULL
);

-- NextAuth verification tokens table
CREATE TABLE "verificationTokens" (
    identifier TEXT NOT NULL,
    token TEXT NOT NULL,
    expires TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY (identifier, token)
);

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    category VARCHAR(100),
    image VARCHAR(500),
    is_active INTEGER DEFAULT 1 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    customer_name VARCHAR(255),
    customer_phone VARCHAR(20),
    status VARCHAR(50) DEFAULT 'pending' NOT NULL,
    order_type VARCHAR(50) DEFAULT 'dine-in' NOT NULL,
    total INTEGER NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Order items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    product_id INTEGER REFERENCES products(id) NOT NULL,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL
);

-- Reservations table
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255),
    reservation_date TIMESTAMP WITH TIME ZONE NOT NULL,
    party_size INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE "verificationTokens" ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (bu kısım isteğe bağlı - güvenlik için)
-- Products - herkes okuyabilir
CREATE POLICY "Anyone can read products" ON products FOR SELECT USING (true);

-- Reservations - herkes ekleyebilir
CREATE POLICY "Anyone can insert reservations" ON reservations FOR INSERT WITH CHECK (true);

-- Sample admin user (manager rolü ile)
INSERT INTO users (name, email, role) VALUES 
('Admin User', 'admin@karagozdoner.com', 'manager')
ON CONFLICT (email) DO NOTHING;

-- Sample products data (menü verilerini ekleyelim)
INSERT INTO products (name, description, price, category, image, is_active) VALUES 
('Klasik Döner', 'Geleneksel lezzetimiz', 45.00, 'Ana Yemek', 'https://raw.githubusercontent.com/hakkurgithub/karagozdoner/main/public/images/klasik-doner.jpg', 1),
('Tavuk Döner', 'Özel baharatlarla', 50.00, 'Ana Yemek', 'https://raw.githubusercontent.com/hakkurgithub/karagozdoner/main/public/images/tavuk-doner.jpg', 1),
('Adana Kebap', 'Acılı nefis lezzet', 65.00, 'Kebap', 'https://raw.githubusercontent.com/hakkurgithub/karagozdoner/main/public/images/adana-kebap.jpg', 1),
('Ayran', 'Ev yapımı ayran', 8.00, 'İçecek', 'https://raw.githubusercontent.com/hakkurgithub/karagozdoner/main/public/images/ayran.jpg', 1)
ON CONFLICT DO NOTHING;