import React from "react";
import layoutConfig from "../../layout-config/layout-config.json";
import DashboardGetter from "../../utils/component-getters/DashboardGetter";
import LayoutWrapper from "../../components/Wrapper/LayoutWrapper";
import ViewWrapper from "../../components/Wrapper/ViewWrapper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";

const DashboardComponent = ({
  pokemonDetails,
  loading,
  handleNext,
  handlePrevious,
  color,
  setSearchValue,
  setFilter,
}) => {
  if (!Array.isArray(pokemonDetails)) pokemonDetails = [pokemonDetails];
  pokemonDetails = pokemonDetails.filter((x) => {
    return x !== undefined;
  });

  const render = () => {
    if (loading || color.length === 0) {
      return <CircularProgress style={{ margin: "auto" }} />;
    } else if (pokemonDetails.length === 0) {
      return (
        <Typography style={{ margin: "auto" }}>No Results Found</Typography>
      );
    } else {
      return (
        <LayoutWrapper
          layoutConfig={layoutConfig}
          componentGetter={DashboardGetter}
          data={pokemonDetails}
          color={color}
        />
      );
    }
  };

  return (
    <ViewWrapper
      handleNext={handleNext}
      handlePrevious={handlePrevious}
      setSearchValue={setSearchValue}
      setFilter={setFilter}
    >
      {render()}
    </ViewWrapper>
  );
};
export default DashboardComponent;
