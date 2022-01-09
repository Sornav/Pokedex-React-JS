import React from "react";
import { DASHBOARD_COMPONENT_IDS } from "../componentIDs";
import PokemonCard from "../../components/PokemonCard";

const getPokemonCard = (data, color, width) => (
  <PokemonCard data={data} color={color} width={width} />
);

const getComponent = (componentId = "", data = {}, color, width) => {
  switch (componentId) {
    case DASHBOARD_COMPONENT_IDS.POKEMON_CARD:
      return getPokemonCard(data, color, width);
    default:
      return <></>;
  }
};

const DashboardGetter = {
  getComponent,
};

export default DashboardGetter;
