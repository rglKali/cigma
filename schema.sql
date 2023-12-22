CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS 
    users, 
    cards, 
    user_cards, 
    types,
    card_types,
    elems,
    card_elems,
    decks, 
    deck_cards, 
    mods, 
    mod_actions, 
    mod_votes, 
    games 
CASCADE;


CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    uav INT DEFAULT 20
);

CREATE TABLE cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    lore TEXT,
    cost VARCHAR(255),
    attack INT NOT NULL,
    defense INT NOT NULL
);

CREATE TABLE types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    lore TEXT
);

CREATE TABLE card_types (
    card_id UUID REFERENCES cards(id),
    type_id UUID REFERENCES types(id),
    PRIMARY KEY (card_id, type_id)
);

CREATE TABLE elems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    color VARCHAR(255),
    lore TEXT
);

CREATE TABLE card_elems (
    card_id UUID REFERENCES cards(id),
    elem_id UUID REFERENCES types(id),
    amount INT NOT NULL,
    PRIMARY KEY (card_id, elem_id)
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
    winner_id UUID REFERENCES decks(id),
    looser_id UUID REFERENCES decks(id),
    played_at TIMESTAMP DEFAULT NOW()
);
