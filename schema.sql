CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS users, user_sessions, cards, user_cards, decks, deck_cards, mods, mod_actions, mod_votes, games CASCADE;


CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    uav INT DEFAULT 20
);

CREATE TABLE friends (
    friend_1 UUID REFERENCES users(id),
    friend_2 UUID REFERENCES users(id),
    PRIMARY KEY (friend_1, friend2)
)

CREATE TABLE cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    types VARCHAR(255)[],
    cost VARCHAR(255),
    attack INT NOT NULL,
    defense INT NOT NULL
);

CREATE TABLE user_cards (
    user_id UUID REFERENCES users(id),
    card_id UUID REFERENCES cards(id),
    PRIMARY KEY (user_id, card_id)
);

CREATE TABLE decks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    descr TEXT,
    creator_id UUID REFERENCES users(id),
    general_id UUID REFERENCES cards(id)
);

CREATE TABLE deck_cards (
    deck_id UUID REFERENCES decks(id),
    card_id UUID REFERENCES cards(id),
    PRIMARY KEY (deck_id, card_id)
);

CREATE TABLE mods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    deck_id UUID REFERENCES decks(id)
);

CREATE TABLE mod_actions (
    mod_id UUID REFERENCES mods(id),
    card_id UUID REFERENCES cards(id),
    action BOOLEAN NOT NULL,
    PRIMARY KEY (mod_id, card_id)
);

CREATE TABLE mod_votes (
    mod_id UUID REFERENCES mods(id),
    user_id UUID REFERENCES users(id),
    liked BOOLEAN NOT NULL,
    PRIMARY KEY (mod_id, user_id)
);

CREATE TABLE games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deck_1_id UUID REFERENCES decks(id),
    deck_2_id UUID REFERENCES decks(id),
    player_1_won BOOLEAN NOT NULL,
    played_at TIMESTAMP DEFAULT NOW()
);
