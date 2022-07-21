import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { AccountContext } from "../App";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Layout({ body }) {
  let history = useNavigate();
  const { account, fetchUserData } = useContext(AccountContext);

  const logout = () => {
    localStorage.clear();
    fetchUserData();
    history("/");
    return;
  };
  return (
    <Box style={{ backgroundColor: "#f3f3f4" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        style={{ backgroundColor: "white", color: "#5a5a5a" }}
      >
        <Toolbar>
          <div className="project-name">Story Pointing App</div>
          <Typography
            className="project-name"
            sx={{ flexGrow: 1, marginLeft: 1, fontSize: 7 }}
          >
            WeB 3.0
          </Typography>

          {account?.name && (
            <>
              <Avatar
                alt="Remy Sharp"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                }}
                src={account?.profileImg}
              ></Avatar>
              <p style={{ color: "black", margin: 10, fontWeight: "bold" }}>
                {account?.name}
              </p>
              <Button
                aria-controls={`ewrwr`}
                variant="outlined"
                sx={{ textTransform: "none" }}
                style={{ marginLeft: 10 }}
                onClick={() => logout()}
              >
                <LogoutIcon />
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <div>
        <DrawerHeader />
        {body()}
      </div>
    </Box>
  );
}
