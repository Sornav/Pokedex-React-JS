import React from "react";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import KeyboardArrowLeftOutlinedIcon from "@material-ui/icons/KeyboardArrowLeftOutlined";
import { Fab } from "@material-ui/core";

const leftFabStyle = {
  margin: "auto",
  top: "20vh",
  bottom: "11vh",
  left: "1.2rem",
  position: "fixed",
  background: "#5DAAE0",
  color: "#FFFFFFA6",
  minHeight: "2rem",
  width: "2rem",
  height: "2rem",
};
const rightFabStyle = {
  margin: "auto",
  top: "20vh",
  bottom: "11vh",
  right: "1.2rem",
  left: "auto",
  position: "fixed",
  background: "#5DAAE0",
  color: "#FFFFFFA6",
  minHeight: "2rem",
  width: "2rem",
  height: "2rem",
};
const FabButton = ({ handleNext, handlePrevious }) => {
  return (
    <>
      <Fab size="small" style={rightFabStyle}>
        <KeyboardArrowRightOutlinedIcon onClick={handleNext} />
      </Fab>
      <Fab size="small" style={leftFabStyle}>
        <KeyboardArrowLeftOutlinedIcon onClick={handlePrevious} />
      </Fab>
    </>
  );
};

export default FabButton;
