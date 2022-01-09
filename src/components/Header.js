import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { DebounceInput } from "react-debounce-input";
import FilterListIcon from "@material-ui/icons/FilterList";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    color: "black",
    boxShadow: "0 0 0 0",
  },
  toolbar: {
    minHeight: "inherit",
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    width: "100vw",
    overflow: "hidden",
    paddingTop: "1.5rem",
    paddingRight: "2rem",
    paddingLeft: "0.5rem",
    padding: "1rem",
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: "0.4rem",
    backgroundColor: "#A6DCED",
    transition: "width 300ms, height 300ms",
    boxShadow: "0 0 0.1rem 0.1rem white",
    "&:hover": {
      boxShadow: "0 0 0.2rem 0.2rem #0000FF",
      transition: "height 300ms",
    },
    marginRight: 0,

    width: "40rem",
  },
  searchIcon: {
    padding: "0.2rem",
    paddingTop: "0.2rem",
    height: "inherit",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "38rem",
    transition: "height 300ms",
    transition: theme.transitions.create("width"),
    paddingLeft: `calc(0.1em + ${theme.spacing(0.1)}rem)`,
    backgroundColor: "transparent",
    border: "white",
    outline: "none",
    height: "inherit",
  },
  inputInput: {
    padding: "1vh",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(0.1em + ${theme.spacing(0.1)}rem)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  sectionDesktop: {
    display: "flex",
    justifyContent: "flex-end",
  },

  SearchIconButton: {
    padding: "0.1rem",
    margin: "0",
  },
  IconButtonSearch: {
    padding: "0.1rem",
    color: "white",
    paddingTop: "0.3rem",
  },
}));

export default function PrimarySearchAppBar({ setSearchValue, setFilter }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const typeMenu = [
    "all",
    "fire",
    "grass",
    "bug",
    "water",
    "normal",
    "poison",
    "rock",
    "ground",
    "flying",
  ];

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      style={{
        background: "rgba(0, 0, 0, 0.3)",
      }}
      MenuListProps={{
        disablePadding: true,
      }}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {typeMenu.map((value) => (
        <MenuItem
          data-my-value={value}
          key={value}
          style={{
            background: `linear-gradient(#99E5FF 10%,#00BFFF)`,
            minHeight: "0",
            paddingTop: "0",
            paddingBottom: "0",
          }}
          onClick={(e) => {
            setFilter(e.currentTarget.dataset.myValue);
            handleMenuClose();
          }}
        >
          <Typography
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
              opacity: "0.7",
            }}
          >
            {value}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.search}>
            <DebounceInput
              style={{ fontSize: `calc(0.63vh + 0.63vw)` }}
              placeholder="Search for pokemon...."
              className={classes.inputRoot}
              minLength={1}
              debounceTimeout={1000}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <IconButton className={classes.IconButtonSearch}>
              <div classes={classes.SearchIconButton}>
                <SearchIcon classes={classes.SearchIcon} />
              </div>
            </IconButton>
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              className={classes.SearchIconButton}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <FilterListIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
