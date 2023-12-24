import React from 'react';
import { Grid, Typography, List, ListItem } from '@mui/material';

type HomePageProps = {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Presentation
        </Typography>
        <Typography variant="body1" paragraph>
        	Your customers are the creators of <i>Cigma</i>  a collectible card game. They want to create an online version of their game. In a game of Cigma, two players compete with packs of cards, called <i>deck</i>  which they have each prepared on their own. Creating your own deck from your card collection is an integral part of the gaming experience.
        </Typography>
        <Typography variant="body1" paragraph>
        	Another team of developers will take care of implementing the game rules and the interface for playing. You will have to take care of the management of card collections, the history of games played, the creation and storage of decks and social features (sharing decks, suggesting modifications to other people's decks, etc.)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
        	Cards
        </Typography>
        <Typography variant="body1" paragraph>
					A card represents a character, is designated by a unique name, and has a cost, one or more colors, an attack value, a defense value, and one or more types. Costs are expressed in <i>mana</i> which can be of five different colors (yellow, blue, black, red or green). The colors of a card are those of the mana in its cost. A card's type can be single like <i>dwarf</i> or multiple like <i>human, elf, ranger, and king</i> 
        </Typography>
        <Typography variant="body1" paragraph>
					<b>For example</b>, <i>Legolas</i> is a card that costs three green mana and one yellow mana; which has <i>warrior and elf</i> as types; whose attack is 2 and defense 3; and whose colors are <i>yellow and green</i> 
        </Typography>
      </Grid>
			<Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
        	Decks
        </Typography>
        <Typography variant="body1" paragraph>
					Here are the rules for building a deck. A deck is made up of 16 cards which must all be different. One of them is chosen to be the general of the deck. For a deck to be legal, the colors of each card must be included in the colors of its general. For example, a deck whose general is <i>Legolas</i> can only contain <i>yellow</i> cards; <i>green</i> cards; and of course <i>green and yellow</i> cards. Any card can be chosen as a general.
        </Typography>
        <Typography variant="body1" paragraph>
					To play the physical Cigma game, players are limited by the cards they own. In Cigma online, from the moment a user has a card in their virtual collection, they will be able to use it in any number of decks.
        </Typography>
      </Grid>
			<Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
					Features
        </Typography>
        <Typography variant="body1" paragraph>
					A user logs in with an email address and password; other users can see it through a nickname. Each user also has a certain number of UAVs (Virtual Money Units) which allow them to add new cards to their collection.
        </Typography>
        <Typography variant="body1" paragraph>
					We want to be able to obtain statistics on the games played. Typically we want to know the last games played by a user with a certain deck, as well as the winning percentage of one deck against another.
        </Typography>
				<Typography variant="body1" paragraph>
					Finally, we want a user to be able to suggest a modification of another deck, that is to say the replacement of a certain number of cards in the deck with others. We also want other users to be able to approve the modification.
        </Typography>
      </Grid>
			<Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
					Website
        </Typography>
        <Typography variant="body1" paragraph>
					The website must present the following pages:
        </Typography>
					<List>
						<ListItem>
							<Typography variant="body1">
								A login page that asks the user for their email address and password.
							</Typography>
						</ListItem>
						<ListItem>
							<Typography variant="body1">
								A <i>my collection</i> page which indicates the cards owned by the users and with a button allowing you to buy a new card at random at the price of 1 UAV.
							</Typography>
						</ListItem>
						<ListItem>
							<Typography variant="body1">
							  A <i>my decks</i> page which gives the list of the user's decks.
							</Typography>
						</ListItem>
						<ListItem>
							<Typography variant="body1">
							  A page allowing you to indicate the result of a Cigma game by indicating the decks involved and the winner. (Obviously, this page will disappear once the other dev team implements the online game.)
							</Typography>
						</ListItem>
						<ListItem>
							<Typography variant="body1">
								A page showing a user's profile. In addition to his nickname, it displays the list of his decks and the last five games he has played (and with which deck).
							</Typography>
						</ListItem>
						<ListItem>
							<Typography variant="body1">
							  A page allowing the construction of a legal deck. When adding a card, you will be able to search for cards by name, type, etc.
							</Typography>
						</ListItem>
						<ListItem>
							<Typography variant="body1">
							  A page allowing you to see all the relevant information about a deck: its creator, its title, the text explaining the deck's strategy, its general, the list of its cards sorted by increasing cost, its statistics (number of victories and number of defeats with this deck). Each card must be represented in full, for example:<br/>
								<i>Legolas, cost: VVVJ, type: elf and warrior, attack: 2, defense: 2.</i><br/>
								On the other hand, a button must allow you to copy the deck among your own decks.
							</Typography>
						</ListItem>
						<ListItem>
							<Typography variant="body1">
								A page which allows the connected user to suggest a modification of another user's deck, that is to say, to remove cards and add others.
							</Typography>
						</ListItem>
						<ListItem>
							<Typography variant="body1">
								A page allowing you to view such a suggested modification of a deck: the name of the deck, which user suggested the modification, what are the minus cards and the extra cards. If the logged in user is the deck owner, they can create a new deck that matches the original deck with the suggested changes applied. Otherwise, the user can indicate that they approve the change. (The number of people who approved this change should also be indicated on this page.)
							</Typography>
						</ListItem>
					</List>
      </Grid>
			<Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
					Fixes
        </Typography>
        <Typography variant="body1" paragraph>
					A user logs in with an email address and password; other users can see it through a nickname. Each user also has a certain number of UAVs (Virtual Money Units) which allow them to add new cards to their collection.
        </Typography>
        <List>
						<ListItem>
							<Typography variant="body1">
								We want the most played card types in proportion to the decks where they are legal.
							</Typography>
						</ListItem>
						<ListItem>
							<Typography variant="body1">
							We want the list of the 3 generals with the best victory rate, ranked in descending order.
							</Typography>
						</ListItem>
						<ListItem>
							<Typography variant="body1">
								We want, for each user, their participation rate in proposed modifications.
							</Typography>
						</ListItem>
					</List>
      </Grid>
    </Grid>
  );
};

export default HomePage;
