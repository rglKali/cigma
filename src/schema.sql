DROP TABLE IF EXISTS userCards, deckVersions, deckCards, games, decks, users, cards CASCADE;

-- Create Card Table
CREATE TABLE cards (
    card_id SERIAL PRIMARY KEY,
    card_name VARCHAR(50) UNIQUE NOT NULL,
    card_types VARCHAR(50)[],
    mana_cost VARCHAR(100),
    attack INT NOT NULL,
    defense INT NOT NULL
);

-- Create User Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(64) NOT NULL,
    username VARCHAR(50),
    uav INT NOT NULL DEFAULT 0
);

-- Create UserCards Table
CREATE TABLE userCards (
    user_id INT NOT NULL,
    card_id INT NOT NULL,
    PRIMARY KEY (user_id, card_id)
);

-- Create Deck Table
CREATE TABLE decks (
    deck_id SERIAL PRIMARY KEY,
    deck_name VARCHAR(50) NOT NULL,
    deck_desc TEXT,
    user_id INT NOT NULL,
    deck_version INT
);

-- Create DeckVersion Table
CREATE TABLE deckVersions (
    version_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    general_id INT NOT NULL,
    deck_id INT NOT NULL,
    approved BOOLEAN
);

-- Create DeckCards Table
CREATE TABLE deckCards (
    version_id INT NOT NULL,
    card_id INT NOT NULL,
    PRIMARY KEY (version_id, card_id)
);

-- Create Game Table
CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    winner_deck_id INT NOT NULL,
    looser_deck_id INT NOT NULL
);

-- UserCards Table
ALTER TABLE userCards
ADD CONSTRAINT fk_usercards_user_id
FOREIGN KEY (user_id) 
REFERENCES users(user_id)
ON DELETE CASCADE;

ALTER TABLE userCards
ADD CONSTRAINT fk_usercards_card_id
FOREIGN KEY (card_id)
REFERENCES cards(card_id)
ON DELETE CASCADE;

-- Decks Table
ALTER TABLE decks
ADD CONSTRAINT fk_decks_user_id
FOREIGN KEY (user_id)
REFERENCES users(user_id)
ON DELETE CASCADE;

-- DeckVersions Table
ALTER TABLE deckVersions
ADD CONSTRAINT fk_deckversions_user_id
FOREIGN KEY (user_id)
REFERENCES users(user_id)
ON DELETE CASCADE;

ALTER TABLE deckVersions
ADD CONSTRAINT fk_deckversions_general_id
FOREIGN KEY (general_id)
REFERENCES cards(card_id)
ON DELETE CASCADE;

ALTER TABLE deckVersions
ADD CONSTRAINT fk_deckversions_deck_id
FOREIGN KEY (deck_id)
REFERENCES decks(deck_id)
ON DELETE CASCADE;

-- DeckCards Table
ALTER TABLE deckCards
ADD CONSTRAINT fk_deckcards_version_id
FOREIGN KEY (version_id)
REFERENCES deckVersions(version_id)
ON DELETE CASCADE;

ALTER TABLE deckCards
ADD CONSTRAINT fk_deckcards_card_id
FOREIGN KEY (card_id)
REFERENCES cards(card_id)
ON DELETE CASCADE;

-- Games Table
ALTER TABLE games
ADD CONSTRAINT fk_games_winner_deck_id
FOREIGN KEY (winner_deck_id)
REFERENCES deckVersions(version_id)
ON DELETE CASCADE;

ALTER TABLE games
ADD CONSTRAINT fk_games_looser_deck_id
FOREIGN KEY (looser_deck_id)
REFERENCES deckVersions(version_id)
ON DELETE CASCADE;
