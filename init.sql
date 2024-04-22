CREATE TABLE IF NOT EXISTS restaurants (
    id TEXT PRIMARY KEY,
    rating INTEGER CHECK (rating >= 0 AND rating <= 4),
    name TEXT,
    site TEXT,
    email TEXT,
    phone TEXT,
    street TEXT,
    city TEXT,
    state TEXT,
    lat FLOAT,
    lng FLOAT
);