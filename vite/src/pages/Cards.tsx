import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import Card, { CardProps } from '../components/CardContainer';
import Loading from '../components/Loading';
import { useAuth } from '../hooks';

type CardsPageProps = {}


const CardsPage: React.FC<CardsPageProps> = () => {
	const [ cards, setCards ] = useState<Array<CardProps> | null>(null);
	const [ loading, setLoading ] = useState<boolean>(true)
	const [ error, setError ] = useState<string | null>(null)
	const [ balance, setBalance ] = useState<number>(0)
	const [ toggler, toggle ] = useState<boolean>(false)
	const { token } = useAuth()

	useEffect(() => {
		const getBalance = async () => {
			const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token, op: 'get_profile'}),
      })
      const data = await response.json()
			setBalance(data.data.balance)
		}
		setLoading(true)
		getBalance().then(_ => setLoading(false))
	}, [toggler])

	useEffect(() => {
		const getCards = async () => {
			const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token, op: 'get_cards'}),
      })
      const data = await response.json()
			setCards(data.data)
		}

		getCards()
	}, [toggler])

	const handleBuy = async () => {
		setError(null)
		const response = await fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({token, op: 'buy_a_card'}),
		})
		if (response.ok) {
			toggle(!toggler)
		} else {
			const data = await response.json()
			setError(data.message)
		}
	}

	if ( loading || (cards === null)) return <Loading/>

	return (
		<>
			<Button disabled={balance == 0} onClick={handleBuy}>Buy a new card!</Button>
			{error === null ? null : <Typography variant="h6" color="error">
				{error}
			</Typography>}
			<Grid container spacing={2}>
				{cards.map((card, index) => (
					<Grid key={index} item xs={12} sm={6} md={4} lg={3}>
						<Card {...card} />
					</Grid>
				))}
			</Grid>
		</>
	)
};

export default CardsPage;
