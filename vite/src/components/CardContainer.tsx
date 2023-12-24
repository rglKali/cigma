import React from 'react';
import { Box, Typography, Chip } from '@mui/material'; // Import necessary MUI components
import Voronoi from './Voronoi';

export type CardProps = {
	name: string;
	attack: number;
	defense: number;
	types: Array<string>;
	manas: Array<string>;
};

function countOccurrences(arr: string[]): { [key: string]: number } {
  const charCount: { [key: string]: number } = {};

  // Loop through the array and count occurrences
  for (const char of arr) {
    if (charCount[char]) {
      charCount[char]++;
    } else {
      charCount[char] = 1;
    }
  }

  return charCount;
}

const CardContainer: React.FC<CardProps> = ({ name, attack, defense, types, manas }) => {
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
			<Voronoi colors={manas} />
			<Box>
				{Object.entries(countOccurrences(manas)).map(([key, value]) => (
					<Chip key={key} label={`${key}: ${value}`} style={{ marginRight: '5px' }} />
				))}
				{/* {manas.map((type, index) => (
					<Chip key={index} label={type} style={{ marginRight: '5px' }} />
				))} */}
			</Box>
		</Box>
  );
};

export default CardContainer;
