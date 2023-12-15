import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const SideBar: React.FC = () => {
    return (
        <Drawer variant="permanent">
            <List>
                <ListItem button component={Link} to="/app/">
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/app/profile">
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button component={Link} to="/app/cards/my">
                    <ListItemText primary="Cards" />
                </ListItem>
                <ListItem button component={Link} to="/app/decks/my">
                    <ListItemText primary="Decks" />
                </ListItem>
                <ListItem button component={Link} to="/app/games/my">
                    <ListItemText primary="Games" />
                </ListItem>
                <ListItem button component={Link} to="/app/stats">
                    <ListItemText primary="Stats" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default SideBar;
