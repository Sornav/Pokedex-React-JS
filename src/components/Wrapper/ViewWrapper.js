import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import FabButton from "../FabButton";
import Header from "../Header";

const viewWrapperStyle = (theme) => ({
  view: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "10vh 90vh",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
});
const useViewWrapper = makeStyles(viewWrapperStyle);

const ViewWrapper = ({
  children,
  sectionProps,
  handleNext,
  handlePrevious,
  setSearchValue,
  setFilter,
}) => {
  const classes = useViewWrapper();

  let headerComponent = (
    <Header setSearchValue={setSearchValue} setFilter={setFilter} />
  );

  if (!children || Array.isArray(children)) {
    return null;
  }
  let Fab = (
    <FabButton handleNext={handleNext} handlePrevious={handlePrevious} />
  );

  return (
    <section className={classes.view} {...sectionProps}>
      {headerComponent}
      {Fab}
      {children}
    </section>
  );
};

ViewWrapper.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node.isRequired,
  sectionProps: PropTypes.object,
};

ViewWrapper.defaultProps = {
  header: null,
  sectionProps: undefined,
};

export default ViewWrapper;
