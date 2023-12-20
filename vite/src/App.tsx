import { useState } from "react";
import { Box } from "@mui/material";
import NavBar from './components/NavBar'
import { HomePage, ProfilePage } from "./pages";

const App = () => {
	const [ page, setPage ] = useState<string>('Home')

	const drawerWidth = 200;

	const getContent = () => {
		switch (page) {
			case 'Home': return <HomePage/>
			case 'Profile': return <ProfilePage/>
		}
		return <></>
	}

	return (
		<Box sx={{display: "flex"}}>
			<NavBar width={drawerWidth} update={setPage}/>
			<Box sx={{
				width: { sm: `calc(100% - ${drawerWidth}px)` },
				ml: { sm: `calc(${drawerWidth}px * 1.1)` },
			}}>
				{getContent()}
			</Box>
		</Box>
	)
}

export default App;
