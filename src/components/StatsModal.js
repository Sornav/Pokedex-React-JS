import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import SVG from "react-inlinesvg";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  modal: {
    margin: "auto",
    height: "42vh",
    width: "50vw",
  },
  paper: {
    background: `linear-gradient(#99E5FF 10%,#00BFFF)`,
    borderRadius: "0.5rem",
    outline: "none",
    boxShadow: "0 0 0.3rem 0.3rem #99E5FF",
    padding: "0",
    height: "inherit",
  },
  contentArea: {
    display: "grid",
    gridTemplateRows: "14vh auto auto auto auto auto",
    width: "100%",
    height: "39vh",
    overflow: "hidden",
    paddingTop: "1vh",
  },
  Item: {
    display: "grid",
    gridTemplateColumns: "12.5vw 21vw 3vw",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    alignItems: "center",
    paddingLeft: "5vw",
    padding: "0",
    margin: "0",
  },
  progress: {
    width: "20vw",
    height: "0.53vh",
    background: "#FFA500",
    color: "white",
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#36096d",
      backgroundimage: "linear-gradient(315deg, #36096d 0%, #37d5d6 74%)",
    },
  },
}));

export default function TransitionsModal({
  open,
  handleClose,
  data,
  width,
  id,
}) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.contentArea}>
              <SVG
                src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                loader={
                  <Skeleton
                    variant="rect"
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: "1",
                      borderRadius: "2rem",
                      color: "grey",
                    }}
                    animation="wave"
                  />
                }
                cacheRequests={true}
              />
              {Object.keys(data).map((value) => {
                return (
                  <div className={classes.Item}>
                    <Paper
                      style={{
                        width: "11vw",
                        height: "fit-content",
                        opacity: "0.5",
                        margin: "auto",
                        borderRadius: "0.4rem",
                        boxShadow: "5rem",
                      }}
                    >
                      <Typography
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          paddingLeft: "1vw",
                          margin: "auto",
                          fontSize: width === "xs" ? "1vh" : "2vh",
                        }}
                      >
                        {data[value].stat.name}
                      </Typography>
                    </Paper>
                    <LinearProgress
                      variant="determinate"
                      value={data[value].base_stat}
                      className={classes.progress}
                      maxValue={250}
                    />
                    <Typography>{data[value].base_stat}</Typography>
                  </div>
                );
              })}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
