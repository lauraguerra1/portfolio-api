CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    auth_token VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT current_timestamp(6),
    updated_at TIMESTAMPTZ DEFAULT current_timestamp(6)
);

CREATE TABLE projects (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    tech TEXT NOT NULL,
    link VARCHAR(255) NOT NULL,
    gh VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    instructions VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT current_timestamp(6),
    updated_at TIMESTAMPTZ DEFAULT current_timestamp(6)
);
