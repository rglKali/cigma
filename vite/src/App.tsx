import { useMemo, useState } from "react";
import { useAuth } from "./hooks";
import { Box } from "@mui/material";
import NavBar from "./components/NavBar";
import { AuthPage, HomePage, ProfilePage, CardsPage } from "./pages";


const App = () => {
  const { token } = useAuth()
  const [ page, setPage ] = useState<string>('Home')

	const drawerWidth = 200;

  const content = useMemo(() => {
    if (token === null) {
      return <AuthPage />
    }
    switch (page) {
			case 'Home': return <HomePage/>
			case 'Profile': return <ProfilePage/>
			case 'Cards': return <CardsPage/>
		}
  }, [token, page])

  return (
		<Box sx={{display: "flex"}}>
			<NavBar width={drawerWidth} update={setPage}/>
			<Box sx={{
				width: { sm: `calc(100% - ${drawerWidth}px)` },
				ml: { sm: `calc(${drawerWidth}px * 1.1)` },
			}}>
				{content}
			</Box>
		</Box>
	)
}

export default App;
