import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { api } from '../utils';
import Card, { CardProps } from '../components/Card';
import Loading from '../components/Loading';

type CardsPageProps = {}


const ProfilePage: React.FC<CardsPageProps> = () => {
	const [ cards, setCards ] = useState<Array<CardProps> | null>(null);

	useEffect(() => {
		const getCards = async () => {
			const response = await api({op: 'get_all_cards'})

			setCards(response.data)
		}

		getCards()
	}, [])

	if (cards === null) return <Loading/>

	return (
		<Grid container spacing={2}>
			{cards.map((card, index) => (
				<Grid key={index} item xs={12} sm={6} md={4} lg={3}>
					<Card {...card} />
				</Grid>
			))}
		</Grid>
	)
};

export default ProfilePage;
