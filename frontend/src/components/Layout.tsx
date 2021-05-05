import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Tooltip,
} from "@material-ui/core";
import { Create } from "@material-ui/icons";
import { StoreState } from "config/store";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LanguageChooser from "./LanguageChooser";
import Login from "./Login";
import Logout from "./Logout";

const useStyles = makeStyles(
  {
    header: {
      display: "flex",
      alignItems: "center",
      "& a, & button": {
        color: "white",
      },
    },
    homeLink: {
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    content: {
      marginTop: 64,
      padding: "1rem",
    },
  },
  { name: "Layout" }
);

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { user } = useSelector((state: StoreState) => state.authentication);

  return (
    <>
      <AppBar>
        <Toolbar className={classes.header}>
          <Link to="/" className={classes.homeLink}>
            {t("appName")}
          </Link>
          {user ? (
            <>
              <Tooltip title={t("post.createTitle").toString()}>
                <Link to="/post/create" style={{ marginLeft: "auto" }}>
                  <IconButton>
                    <Create />
                  </IconButton>
                </Link>
              </Tooltip>
              <Logout />
            </>
          ) : (
            <div style={{ marginLeft: "auto" }}>
              <Login />
            </div>
          )}
          <LanguageChooser />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>{children}</main>
    </>
  );
};

export default Layout;
