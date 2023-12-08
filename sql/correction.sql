-- Add a table to track card usage in decks:
CREATE TABLE CardUsage (
    card_id INT NOT NULL,
    deck_id INT NOT NULL,
    FOREIGN KEY (card_id) REFERENCES Cards(card_id),
    FOREIGN KEY (deck_id) REFERENCES Decks(deck_id),
    PRIMARY KEY (card_id, deck_id)
);

-- Add a column for win count in the Decks table:
ALTER TABLE Decks
ADD COLUMN win_count INT DEFAULT 0;

-- Add a table to track user participation in deck modifications:
CREATE TABLE UserDeckModification (
    user_id INT NOT NULL,
    modification_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (modification_id) REFERENCES DeckModifications(modification_id),
    PRIMARY KEY (user_id, modification_id)
);

-- Types of cards most played in proportion to legal decks:
SELECT ct.card_type, COUNT(*) / (SELECT COUNT(DISTINCT deck_id) FROM Decks) AS proportion
FROM CardTypes ct
JOIN CardUsage cu ON ct.card_id = cu.card_id
GROUP BY ct.card_type
ORDER BY proportion DESC;

-- Top 3 generals with the best win rates:
SELECT d.general_card_id, COUNT(*) AS total_games, SUM(d.win_count) AS total_wins,
       (SUM(d.win_count) / COUNT(*)) AS win_rate
FROM Decks d
GROUP BY d.general_card_id
ORDER BY win_rate DESC
LIMIT 3;

-- User participation rate in deck modifications:
SELECT u.username, 
       COUNT(udm.modification_id) AS total_modifications,
       (COUNT(udm.modification_id) / (SELECT COUNT(*) FROM DeckModifications)) AS participation_rate
FROM Users u
LEFT JOIN UserDeckModification udm ON u.user_id = udm.user_id
GROUP BY u.user_id;
