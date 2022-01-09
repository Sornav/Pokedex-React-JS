import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import SVG from "react-inlinesvg";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import StatsModal from "./StatsModal";
import { Paper } from "@material-ui/core";

const viewWrapperStyle = (theme) => ({
  view: {
    display: "grid",
    gridTemplateRows: "4vh 20vh 5vh 4vh 3vh",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  content: {
    padding: "1vh",
  },
  card: {
    borderRadius: "1rem",
    width: (props) => (props.width === "xs" ? "23.8vw" : "9.1vw"),
    boxShadow: "0.2rem 0.2rem 0.2rem #9E9E9E",
    cursor: "pointer",
    backgroundImage: (props) => `radial-gradient(rgba(
      145, 146, 122, 0.62), ${props.color}), url(
        ../../assets/images/Card.png)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    "&:hover": {
      transform: "translateY( -0.3rem )",
      boxShadow: `0 0 0.3rem 0.3rem purple`,
    },
  },
});
const useViewWrapper = (props) => makeStyles(viewWrapperStyle)(props);
const PokemonCard = (props) => {
  const classes = useViewWrapper(props);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <StatsModal
        open={open}
        handleClose={handleClose}
        data={props.data.stats}
        width={props.width}
      />
      <Card className={classes.card} onClick={handleOpen}>
        <CardContent className={classes.content}>
          <section className={classes.view}>
            <Typography
              style={{
                display: "flex",
                margin: "auto",
                fontSize: `5vh`,
                opacity: "0.5",
                color: "white",
              }}
            >
              {"#" + props.data.id}
            </Typography>
            <SVG
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${props.data.id}.svg`}
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
            <Typography
              style={{
                textTransform: "uppercase",
                color: "#FFFFFF",
                fontWeight: "bold",
                fontFamily: "Papyrus",
                fontSize: props.width === "xs" ? "1.2vh" : "1.68vh",
                margin: "auto",
              }}
            >
              {props.data.name}
              <br />
            </Typography>

            {props.data.types.map((element) => {
              return (
                <Paper
                  style={{
                    width: "inherit",
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
                      fontSize: props.width === "xs" ? "1.2vh" : "1.68vh",
                    }}
                  >
                    {element.type.name}
                    <br />
                  </Typography>
                </Paper>
              );
            })}
          </section>
        </CardContent>
      </Card>
    </>
  );
};
export default PokemonCard;
