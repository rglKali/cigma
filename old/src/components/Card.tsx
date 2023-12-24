import React from 'react';
import { Box, Typography, Chip } from '@mui/material'; // Import necessary MUI components
import Voronoi from './Voronoi';

export type CardProps = {
	name: string;
	attack: number;
	defense: number;
	types: string[];
	mana: Record<string, number>;
};

const CardContainer: React.FC<CardProps> = ({ name, attack, defense, types, mana }) => {
  return (
		<Box boxShadow={3} p={2} borderRadius={8}>
			<Typography variant="h6">{name}</Typography>
			<Typography>Attack: {attack}</Typography>
			<Typography>Defense: {defense}</Typography>
			<Typography>Types:</Typography>
			<Box>
				{types.map((type, index) => (
					<Chip key={index} label={type} style={{ marginRight: '5px' }} />
				))}
			</Box>
			<Typography>Mana:</Typography>
			<Voronoi colors={mana} />
			{/* <Box>
				{Object.entries(mana).map(([key, value]) => (
					<Chip key={key} label={`${key}: ${value}`} style={{ marginRight: '5px' }} />
				))}
			</Box> */}
		</Box>
  );
};

export default CardContainer;
