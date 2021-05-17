import {
  Divider,
  Drawer,
  IconButton,
  List,
  makeStyles,
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setOpen } from "../dashBoardSlice";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  responsive: {
    [theme.breakpoints.down("sm")]: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
  },
  textSidebar: {
    textDecoration: "none",
    fontWeight: 500,
    color: "#3f51b5",
    fontSize: "1rem",
    lineHeight: "1.5",
    letterSpacing: "0.00938em",
    fontFamily: "Roboto",
  },

  iconSidebar: {
    display: "inline",
  },
}));

const Sidebar = (props) => {
  const { data } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const open = useSelector((state) => state.dashBoard.open);

  const handleDrawerClose = () => {
    dispatch(setOpen(false));
  };
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !open && classes.drawerPaperClose,
          classes.responsive
        ),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List datalist={data}>
        {data.map(({ text, icon, link }, index) => (
          <Link className={classes.textSidebar} to={link} key={index}>
            <ListItem button>
              {icon && (
                <ListItemIcon className={classes.iconSidebar}>
                  {icon}
                </ListItemIcon>
              )}
              <ListItemText>{text}</ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
