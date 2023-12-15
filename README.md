### Cigma Online
Your customers are the creators of Cigma, a collectible card game. They want to create an online version of their game. In a game of Cigma, two players compete against each other with packs of cards, called decks, which they have each prepared separately. Creating your own deck from your card collection is an integral part of the gaming experience.

Another team of developers will take care of implementing the game rules and the interface for playing. You will have to take care of the management of card collections, the history of games played, the creation and storage of decks and social features (sharing decks, suggesting modifications to other people's decks, etc.)


### Requirements
python~=3.11.6  
node.js~=20.0.9


### Code structure
|-- data/               <- Project data
|-- src/                <- Source files
    |-- api/            <- REST backend sources (Flask)
    |-- vite/           <- Vite Frontend sources (React)
    |-- __init__.py     <- Flask factory
    |-- manage.py       <- Flask CLI
    |-- schema.sql      <- Initial SQL schema
|-- .env                <- Project environment
|-- .gitignore          <- ignore files set
|-- LICENSE             <- MIT License
|-- README.md           <- Project README


### Installation
1. Create virtual environment (Optional)
    > python -m venv venv
    > source venv/bin/activate

2. Install dependencies
    > pip install -r requirements.txt

3. Initialize the [env](.env)
    > source .env

3. Build the frontend interface
    > flask build

4. Execute the initial SQL schema
    > flask schema

5. Load the cards from json-preset into the database (Optional)
    > flask load {preset-name}

    Available presets:
        - tes

5. Run the development server
    > flask run
