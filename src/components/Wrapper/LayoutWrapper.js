import React from "react";
import PropTypes from "prop-types";
import { withWidth } from "@material-ui/core";
import FlexGrid from "../utilityComponents/FlexGrid";

const LayoutWrapper = ({
  componentGetter,
  width,
  layoutConfig,
  data,
  setSearchValue,
  color,
}) => {
  const layout = layoutConfig[width];
  let count = 0;
  let colorCount = 0;
  const getComponent = (componentID) => {
    return data[count] ? (
      componentGetter.getComponent(
        componentID,
        data[count++],
        color[colorCount++],
        width,
        setSearchValue
      )
    ) : (
      <>
        <React.Fragment />
      </>
    );
  };

  // TODO : Need to find if we can solve FlexGrid without margin -7px
  return <FlexGrid layoutConfiguration={layout} getComponent={getComponent} />;
};

LayoutWrapper.propTypes = {
  componentGetter: PropTypes.shape({
    getComponent: PropTypes.func.isRequired,
  }).isRequired,
  dataToPass: PropTypes.object,
  width: PropTypes.string.isRequired,
  layoutConfig: PropTypes.object.isRequired,
};

LayoutWrapper.defaultProps = {
  dataToPass: {},
};

export default withWidth()(LayoutWrapper);
