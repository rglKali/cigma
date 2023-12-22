## Cigma Online
The Final Project on my BDD course on S3 in Gustave Eiffel University.
Technology stack I had to work with was Flask and Psycopg2.


### Core features:
1. RPC backend, implemented with flask & psycopg2
    - A single endpoint to serve all types of requests
    - Universal interface for all the requests, processed by backend
    - Full error handling coverage. All possible errors are covered with appropriate HTML error codes
    - Custom Flask cli commands to build fronted or execute schema
    - A single entry point for both RPC-Backend [POST] and SPA-Frontend [GET]

2. SQL database, built with PostgreSQL
    - Tables represent all the game data
    - Views represent statistics for cards, decks, etc..
    - Functions abstract complex querries from Python, like Many-to-Many relation querriyng
    - Initial execution from file (default to schema.sql, but may be configered via cli argument)
    - Support for JSON-serialized presets for cards, types and elems

2. SPA frontend, implemented with React, TypeScript & Material UI
    - Custom api connector to interract with an RPC server
    - Various custom hooks and contexts
    - Pre-built light and dark themes, default to system
    - localStorage utilisation for handling jwt token and cache game data

3. JWT-based authorization
    - Imeplemented from scratch (no 3rd party libs) using hashlib, hmac and base64
    - Fully stateless (requires no backend session management)
    - Automatically expires in a week (but may be changed by the env variable)

4. ENV-based config
    - All the sensitive information is stored in the environment variables
    - No hardcoding for global any type of variables


### Requirements
Python~=3.11.6  
Node.js~=20.0.9  
PostgreSQL~=16.1  


### Code structure
|-- controllers/        <- Logic functions  
|-- presets/            <- Cards presets  
|-- vite/               <- Frontend sources  
|-- main.py             <- Main program script  
|-- db.py               <- DB connector  
|-- jwt.py              <- JWT codecs  
|-- schema.sql          <- Initial SQL schema    
|-- .environ            <- Project environment  
|-- requirements.txt    <- Dependencies  
|-- LICENSE             <- MIT License  
|-- README.md           <- Project README  


### Installation
1. Create virtual environment (Optional)
    > python -m venv venv  
    > source venv/bin/activate

2. Install dependencies
    > pip install -r requirements.txt

3. Initialize the [environment](.environ)
    > source .environ

3. Build the frontend interface
    > flask build

4. Execute the initial SQL schema
    > flask schema

5. Load the cards from json-preset into the database (Optional)
    > flask preset {name}

    Available presets:
    - tes (default)

5. Run the development server
    > flask run


### Présentation
Vos clients sont les créateurs de _Cigma_ , un jeu de carte à collectionner. Ils souhaitent créer une version en ligne de leur jeu. Dans une une partie de Cigma, deux joueurs s’affrontent avec des paquets de cartes, appelé _deck_ , qu’ils ont préparés chacun de leur côté. La création de son propre deck à partir de sa collection de cartes fait partie intégrante de l’expérience de jeu.

Une autre équipe de développeurs s’occupera de l’implémentation des règles du jeu et de l’interface permettant de jouer. Vous devrez vous occuper de la gestion des collections de cartes, de l’historique des parties jouées, de la création et stockage des decks et des fonctionnalités sociales (partage de decks, suggestions de modifications aux decks des autres, etc.)

### Les cartes
Une carte représente un personnage, est désignée par un nom unique, et possède un coût, une ou plusieurs couleurs, une valeur d’attaque, une valeur de défense, et un ou plusieurs types. Les coûts sont exprimés en _mana_ qui peuvent être de cinq couleurs différentes (jaune, bleu, noir, rouge ou vert). Les couleurs d’une cartes sont celles des manas dans son coût. Le type d’une carte peut être simple comme _nain_ ou multiple comme _humain, elfe, rôdeur et roi_.

**Par exemple** , _Legolas_ est une carte qui coûte trois manas verts et un mana jaune ; qui a comme types _guerrier et elfe_ ; dont l’attaque vaut 2 et la défense 3 ; et dont les couleurs sont _jaune et vert_.

### Les decks
Voici les règles de construction d’un deck. Un deck est constitué de 16 cartes qui doivent être toutes différentes. L’une d’entre elles est choisie pour être le général du deck. Pour qu’un deck soit légal, les couleurs de chaque carte doivent être incluses dans les couleurs de son général. Par exemple, un deck dont le général est _Legolas_ ne peut contenir que des cartes _jaunes_ ; des cartes _vertes_ ; et bien sûr des cartes _vertes et jaunes_. N’importe quelle carte peut être choisie comme général.

Pour jouer au jeu Cigma physique, les joueurs sont limités par les cartes qu’ils possèdent. Dans Cigma online, à partir du moment où un utilisateur possède une carte dans sa collection virtuelle, il pourra l’utiliser dans n’importe quel nombre de decks.

### Fonctionnalités
Un utilisateur se connecte avec une adresse email et un mot de passe ; les autres utilisateurs peuvent le voir à travers un pseudo. Chaque utilisateur possède également un certain nombre d’UAVs (Unité d’Argent Virtuel) qui lui permettent d’ajouter de nouvelles cartes à sa collection.

On veut pouvoir obtenir des statistiques sur les parties jouées. Typiquement on veut connaître les dernières parties jouées par un utilisateur par un certain deck, ainsi que le pourcentage de victoire d’un deck contre un autre.

Finalement, on veut qu’un utilisateur puisse suggérer une modification d’un autre deck, c’est-à-dire le remplacement d’un certain nombre de cartes du deck par d’autres. On veut également que les autres utilisateurs puissent approuver la modification.

### Site Web
Le site web doit présenter les pages suivantes :
- Une page de connexion qui demande à l’utilisateur son adresse e-mail et son mot de passe.
- Une page _ma collection_ qui indique les cartes possédées par l’utilisateurs et avec un bouton permettant d’acheter une nouvelle carte au hasard aux prix d’1 UAV.
- Une page _mes decks_ qui donne la liste des decks de l’utilisateur.
- Une page permettant d’indiquer le résultat d’une partie de Cigma en indiquant les decks impliqués et le vainqueur. (Evidemment, cette page disparaîtra une fois que l’autre équipe de développeurs aura implémenté le jeu en ligne.)
- Une page montrant le profil d’un utilisateur. En plus de son pseudo, elle affiche la liste de ses decks et des cinq dernières parties qu’il a joué (et avec quel deck).
- Une page permettant la construction d’un deck légal. Lors de l’ajout d’une carte, on permettra la recherche des cartes par leur nom, leur type, etc.
- Une page permettant de voir toutes les informations pertinentes sur un deck : son créateur, son titre, le texte expliquant la stratégie du deck, son général, la liste de ses cartes triées par coût croissant, ses statistiques (nombre de victoires et nombre de défaites avec ce deck). Chaque carte doit être représentée entièrement, par exemple :  
_Legolas, cout : VVVJ, type : elfe et guerrier, attaque : 2, défense : 2._  
D’autre part, un bouton doit permettre de copier le deck parmi ses propres decks.
- Une page qui permet à l’utilisateur connexté de suggérer une modification d’un deck d’un autre utilisateur, c’est-à-dire d’enlever des cartes et d’en rajouter d’autres.
- Une page permettant de visualiser une telle suggestion de modification d’un deck : le nom du deck, quel utilisateur a suggéré la modification, quelles sont les cartes en moins et les cartes en plus. Si l’utilisateur connecté est le propriétaire du deck, il peut créer un nouveau deck qui correspond au deck d’origine auxquels sont appliquées les modifications suggérées. Sinon, l’utilisateur peut indiquer qu’il approuve la modification. (Le nombre de personnes ayant approuvé cette modification doit aussi être indiqué sur cette page.)


### Corréctions
Dans le cadre du développement de la version en ligne du jeu de Cigma, les joueurs souhaitent connaitre certains classements pour plus de compétition entre eux. On veut donc sans divulguer les informations des utilisateurs du site, donner l’accès aux informations suivantes :  
1) On veut les types de cartes les plus jouées en proportion des decks où elles sont légales. 
2) On veut la liste des 3 généraux avec le meilleur taux de victoire, classés par ordre décroissant. 
3) On veut, pour chaque utilisateur, son taux de participation aux propositions de modifications.
