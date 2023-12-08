-- Cards Table - Represents the attributes of each card
CREATE TABLE Cards (
    card_id INT PRIMARY KEY AUTO_INCREMENT,
    card_name VARCHAR(50) UNIQUE NOT NULL,
    mana_cost_yellow INT NOT NULL,
    mana_cost_blue INT NOT NULL,
    mana_cost_black INT NOT NULL,
    mana_cost_red INT NOT NULL,
    mana_cost_green INT NOT NULL,
    attack INT NOT NULL,
    defense INT NOT NULL
);

CREATE TABLE CardTypes (
    card_id INT NOT NULL,
    card_type VARCHAR(50) NOT NULL,
    FOREIGN KEY (card_id) REFERENCES Cards(card_id)
);

-- Users Table - Represents user accounts:
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    virtual_money INT NOT NULL
);

-- UserCards Table - Tracks which cards users own:
CREATE TABLE UserCards (
    user_id INT NOT NULL,
    card_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (card_id) REFERENCES Cards(card_id),
    PRIMARY KEY (user_id, card_id)
);

-- Decks Table - Represents decks created by users:
CREATE TABLE Decks (
    deck_id INT PRIMARY KEY AUTO_INCREMENT,
    deck_name VARCHAR(50) NOT NULL,
    general_card_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (general_card_id) REFERENCES Cards(card_id)
);

-- DeckCards Table - Represents cards within a deck:
CREATE TABLE DeckCards (
    deck_id INT NOT NULL,
    card_id INT NOT NULL,
    FOREIGN KEY (deck_id) REFERENCES Decks(deck_id),
    FOREIGN KEY (card_id) REFERENCES Cards(card_id),
    PRIMARY KEY (deck_id, card_id)
);

-- GameHistory Table - Tracks game history:
CREATE TABLE GameHistory (
    game_id INT PRIMARY KEY AUTO_INCREMENT,
    player1_user_id INT NOT NULL,
    player2_user_id INT NOT NULL,
    winner_user_id INT NOT NULL,
    deck1_id INT NOT NULL,
    deck2_id INT NOT NULL,
    FOREIGN KEY (player1_user_id) REFERENCES Users(user_id),
    FOREIGN KEY (player2_user_id) REFERENCES Users(user_id),
    FOREIGN KEY (winner_user_id) REFERENCES Users(user_id),
    FOREIGN KEY (deck1_id) REFERENCES Decks(deck_id),
    FOREIGN KEY (deck2_id) REFERENCES Decks(deck_id)
);

-- DeckModifications Table - Tracks suggested modifications to decks:
CREATE TABLE DeckModifications (
    modification_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    original_deck_id INT NOT NULL,
    modified_deck_id INT NOT NULL,
    approved BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (original_deck_id) REFERENCES Decks(deck_id),
    FOREIGN KEY (modified_deck_id) REFERENCES Decks(deck_id)
);
