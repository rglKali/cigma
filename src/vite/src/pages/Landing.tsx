import React from 'react';
import { Container, Typography } from '@mui/material';

const Landing: React.FC = () => {
  return (
    <Container>
      <Typography variant="h2" align='center'>Cigma Online</Typography>
      <Container>
        <Typography variant="h4">Présentation</Typography>
        Vos clients sont les créateurs de <i>Cigma</i>, un jeu de carte à collectionner. Dans une une partie de Cigma, deux joueurs s’affrontent avec des paquets de cartes, appelé <i>deck</i>, qu’ils ont préparés chacun de leur côté. La création de son propre deck à partir de sa collection de cartes fait partie intégrante de l’expérience de jeu.
        <br/>
        Une autre équipe de développeurs s’occupera de l’implémentation des règles du jeu et de l’interface permettant de jouer. Vous devrez vous occuper de la gestion des collections de cartes, de l’historique des parties jouées, de la création et stockage des decks et des fonctionnalités sociales (partage de decks, suggestions de modifications aux decks des autres, etc.).
      </Container>
      <br/>
      <Container>
        <Typography variant="h4">Les cartes</Typography>
        Une carte représente un personnage, est désignée par un nom unique, et possède un coût, une ou plusieurs couleurs, une valeur d’attaque, une valeur de défense, et un ou plusieurs types. Les coûts sont exprimés en <i>mana</i> qui peuvent être de cinq couleurs différentes (jaune, bleu, noir, rouge ou vert). Les couleurs d’une carte sont celles des manas dans son coût. Le type d’une carte peut être simple comme <i>nain</i> ou multiple comme <i>humain, elfe, rôdeur et roi</i>.
        <br/>
        <b>Par exemple</b>, <i>Legolas</i> est une carte qui coûte trois manas verts et un mana jaune ; qui a comme types <i>guerrier et elfe</i> ; dont l’attaque vaut 2 et la défense 3 ; et dont les couleurs sont <i>jaune et vert</i>.
      </Container>
      <br/>
      <Container>
        <Typography variant="h4">Les decks</Typography>
        Voici les règles de construction d’un deck. Un deck est constitué de 16 cartes qui doivent être toutes différentes. L’une d’entre elles est choisie pour être le général du deck. Pour qu’un deck soit légal, les couleurs de chaque carte doivent être incluses dans les couleurs de son général. Par exemple, un deck dont le général est <i>Legolas</i> ne peut contenir que des cartes <i>jaunes</i> ; des cartes <i>vertes</i> ; et bien sûr des cartes <i>vertes et jaunes</i>. N’importe quelle carte peut être choisie comme général.
        <br/>
        Pour jouer au jeu Cigma physique, les joueurs sont limités par les cartes qu’ils possèdent. Dans Cigma online, à partir du moment où un utilisateur possède une carte dans sa collection virtuelle, il pourra l’utiliser dans n’importe quel nombre de decks.
      </Container>
      <br/>
      <Container>
        <Typography variant="h4">Fonctionnalités</Typography>
        Un utilisateur se connecte avec une adresse email et un mot de passe ; les autres utilisateurs peuvent le voir à travers un pseudo. Chaque utilisateur possède également un certain nombre d’UAVs (Unité d’Argent Virtuel) qui lui permettent d’ajouter de nouvelles cartes à sa collection.
        <br/>
        On veut pouvoir obtenir des statistiques sur les parties jouées. Typiquement on veut connaître les dernières parties jouées par un utilisateur par un certain deck, ainsi que le pourcentage de victoire d’un deck contre un autre.
        <br/>
        Finalement, on veut qu’un utilisateur puisse suggérer une modification d’un autre deck, c’est-à-dire le remplacement d’un certain nombre de cartes du deck par d’autres. On veut également que les autres utilisateurs puissent approuver la modification.
      </Container>
      <br/>
      <Container>
        <Typography variant="h4">Site Web</Typography>
        Le site web doit présenter les pages suivantes :
        <ul>
          <li> Une page de connexion qui demande à l’utilisateur son adresse e-mail et son mot de passe.</li>
          <li>Une page <i>ma collection</i> qui indique les cartes possédées par l’utilisateurs et avec un bouton permettant d’acheter une nouvelle carte au hasard aux prix d’1 UAV.</li>
          <li>Une page <i>mes decks</i> qui donne la liste des decks de l’utilisateur.</li>
          <li>Une page permettant d’indiquer le résultat d’une partie de Cigma en indiquant les decks impliqués et le vainqueur. (Evidemment, cette page disparaîtra une fois que l’autre équipe de développeurs aura implémenté le jeu en ligne.)</li>
          <li>Une page montrant le profil d’un utilisateur. En plus de son pseudo, elle affiche la liste de ses decks et des cinq dernières parties qu’il a joué (et avec quel deck).</li>
          <li>Une page permettant la construction d’un deck légal. Lors de l’ajout d’une carte, on permettra la recherche des cartes par leur nom, leur type, etc.</li>
          <li>Une page permettant de voir toutes les informations pertinentes sur un deck : son créateur, son titre, le texte expliquant la stratégie du deck, son général, la liste de ses cartes triées par coût croissant, ses statistiques (nombre de victoires et nombre de défaites avec ce deck). Chaque carte doit être représentée entièrement, par exemple :<br/><i>Legolas, cout : VVVJ, type : elfe et guerrier, attaque : 2, défense : 2.</i><br/>D’autre part, un bouton doit permettre de copier le deck parmi ses propres decks.</li>
          <li>Une page qui permet à l’utilisateur connexté de suggérer une modification d’un deck d’un autre utilisateur, c’est-à-dire d’enlever des cartes et d’en rajouter d’autres.</li>
          <li>Une page permettant de visualiser une telle suggestion de modification d’un deck : le nom du deck, quel utilisateur a suggéré la modification, quelles sont les cartes en moins et les cartes en plus. Si l’utilisateur connecté est le propriétaire du deck, il peut créer un nouveau deck qui correspond au deck d’origine auxquels sont appliquées les modifications suggérées. Sinon, l’utilisateur peut indiquer qu’il approuve la modification. (Le nombre de personnes ayant approuvé cette modification doit aussi être indiqué sur cette page.)</li>
        </ul>
      </Container>
    </Container>
  );
}

export default Landing;
