CREATE TABLE IF NOT EXISTS usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE,
    pass TEST NOT NULL,
    APIKEY TEXT NOT NULL DEFAULT (hex(randomblob(16)))
);

INSERT INTO usuarios (nombre, pass) VALUES
('admin', 'admin'),
('user1','user1'),
('user2','user2');