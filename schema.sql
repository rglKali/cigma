CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS 
    users, 
    cards, 
    user_cards, 
    decks, 
    deck_cards, 
    -- mods, 
    -- mod_actions, 
    -- mod_votes, 
    -- games 
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
    types VARCHAR(255)[],
    manas VARCHAR(255)[],
    attack INT NOT NULL,
    defense INT NOT NULL
);

CREATE TABLE user_cards (
    user_id UUID NOT NULL REFERENCES users(id),
    card_id UUID NOT NULL REFERENCES cards(id),
    PRIMARY KEY (user_id, card_id)
);

CREATE TABLE decks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    creator_id UUID NOT NULL REFERENCES users(id),
    general_id UUID NOT NULL REFERENCES cards(id)
);

CREATE TABLE deck_cards (
    deck_id UUID NOT NULL REFERENCES decks(id),
    card_id UUID NOT NULL REFERENCES cards(id),
    PRIMARY KEY (deck_id, card_id)
);

-- CREATE TABLE mods (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     user_id UUID NOT NULL REFERENCES users(id),
--     deck_id UUID NOT NULL REFERENCES decks(id),
-- );

-- CREATE TABLE mod_actions (
--     mod_id UUID NOT NULL REFERENCES mods(id),
--     old_id UUID NOT NULL REFERENCES cards(id),
--     new_id UUID NOT NULL REFERENCES cards(id),
--     PRIMARY KEY (mod_id, old_id, new_id)
-- );

-- CREATE TABLE mod_votes (
--     mod_id UUID NOT NULL REFERENCES mods(id),
--     user_id UUID NOT NULL REFERENCES users(id),
--     liked BOOLEAN NOT NULL,
--     PRIMARY KEY (mod_id, user_id)
-- );

-- CREATE TABLE games (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     winner_id UUID NOT NULL REFERENCES decks(id),
--     looser_id UUID NOT NULL REFERENCES decks(id),
--     played_at TIMESTAMP DEFAULT NOW()
-- );
