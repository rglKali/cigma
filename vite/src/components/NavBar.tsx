import { useMemo } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useTheme } from "../hooks";
import { 
	LightModeOutlined, 
	DarkModeOutlined, 
	HomeOutlined, 
	PersonOutlined, 
	CropPortraitOutlined,
	DashboardOutlined,
	DashboardCustomizeOutlined,
	VideogameAssetOutlined,
	AssessmentOutlined
} from "@mui/icons-material";


type NavBarProps = {
	width: number,
	update: (page: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ width, update }) => {
	const { theme, toggleTheme } = useTheme()

	const getIcon = (name: string) => {
		switch (name) {
			case 'Home': return <HomeOutlined/>
			case 'Profile': return <PersonOutlined/>
			case 'Cards': return <CropPortraitOutlined/>
			case 'Decks': return <DashboardOutlined/>
			case 'Mods': return <DashboardCustomizeOutlined/>
			case 'Games': return <VideogameAssetOutlined/>
			case 'Stats': return <AssessmentOutlined/>
			default: return 
		}
	}

	const getItem = (name: string) => {
		return (
			<ListItem key={name} disablePadding>
				<ListItemButton onClick={() => update(name)}>
					<ListItemIcon>{getIcon(name)}</ListItemIcon>
					<ListItemText primary={name} />
				</ListItemButton>
			</ListItem>
		);
	}

	const toggler = useMemo(() => {
		switch (theme) {
			case 'light': return (
				<ListItem key='light' disablePadding>
					<ListItemButton onClick={toggleTheme}>
						<ListItemIcon><LightModeOutlined/></ListItemIcon>
						<ListItemText primary="Theme" />
					</ListItemButton>
				</ListItem>
			)
			case 'dark': return (
				<ListItem key='dark' disablePadding>
					<ListItemButton onClick={toggleTheme}>
						<ListItemIcon><DarkModeOutlined/></ListItemIcon>
						<ListItemText primary="Theme" />
					</ListItemButton>
				</ListItem>
			)
		}
	}, [theme])

	return (
		<Drawer variant="permanent" open>
			<Box sx={{ width: width }}>
				<List>
					{['Home', 'Profile', 'Cards', 'Decks', 'Mods', 'Games', 'Stats'].map(name => getItem(name))}
				</List>
				<Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
					{toggler}
				</Box>
			</Box>
		</Drawer>
	);
};

export default NavBar;
