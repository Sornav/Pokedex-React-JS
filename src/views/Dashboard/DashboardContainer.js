import React from "react";
import DashboardComponent from "./DashboardComponent";
import { withWidth } from "@material-ui/core";

const promises = [];
const colorPromises = [];
const DashboardContainer = ({ width }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [color, setColor] = React.useState([]);
  const [pokemonDetails, setPokemonDetails] = React.useState([]);
  const [isSearchActive, setSearchActive] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const [searchColor, setSearchColor] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const n = width === "xs" ? 8 : 20;

  async function getData(url = "") {
    const response = await fetch(url, {
      method: "GET",
    });
    return response.json();
  }

  const setColorData = (colorPromises) => {
    Promise.all(colorPromises).then((results) => {
      const pokemon = results
        .slice(currentPage * n, currentPage * n + n)
        .map((data) => data.color.name);
      setColor(pokemon);
      setLoading(false);
    });
  };

  const filterPokemon = (data) => {
    if (filter.length === 0 || filter === "all") {
      return {
        name: data.name,
        id: data.id,
        types: data.types,
        stats: data.stats,
      };
    } else {
      if (
        data.types[0].type.name === filter ||
        (data.types.length > 1 && data.types[1].type.name === filter)
      ) {
        return {
          name: data.name,
          id: data.id,
          types: data.types,
          stats: data.stats,
        };
      }
    }
  };

  const setData = (promises) => {
    Promise.all(promises).then((results) => {
      const pokemon = results
        .slice(currentPage * n, currentPage * n + n)
        .map((data) => filterPokemon(data));
      setPokemonDetails(pokemon);
    });
  };

  //For fetching pokemon card details
  const getPokemonDetails = () => {
    if (promises.length <= currentPage * n + n) {
      for (let i = currentPage * n + 1; i <= currentPage * n + n; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const colorUrl = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
        colorPromises.push(fetch(colorUrl).then((res) => res.json()));
      }
    }
    setData(promises);
    setColorData(colorPromises);
  };
  React.useEffect(() => {
    getPokemonDetails();
  }, [currentPage]);

  const getNextData = () => {
    setLoading(true);
    setCurrentPage(currentPage + 1);
  };
  const getPreviousData = () => {
    if (currentPage == 0) return;
    setLoading(true);
    setCurrentPage(currentPage - 1);
  };

  //For getting search value
  React.useEffect(() => {
    if (searchValue.length === 0) {
      setSearchActive(false);
      setSearchResult([]);
    } else {
      setLoading(true);
      getData(`https://pokeapi.co/api/v2/pokemon-species/${searchValue}/`).then(
        (data) => {
          console.log(data.color.name);
          return setSearchColor(data.color.name);
        }
      );
      getData(`https://pokeapi.co/api/v2/pokemon/${searchValue}/`)
        .then((data) => {
          setLoading(false);
          return setSearchResult(data);
        })
        .catch((error) => {
          setLoading(false);
          setSearchResult([]);
        });

      setSearchActive(true);
    }
  }, [searchValue]);

  //For getting Filtered Value
  React.useEffect(() => {
    if (filter.length === 0) {
      return;
    } else {
      setData(promises);
    }
  }, [filter]);

  return (
    <DashboardComponent
      handleNext={getNextData}
      handlePrevious={getPreviousData}
      pokemonDetails={isSearchActive ? searchResult : pokemonDetails}
      loading={loading}
      color={isSearchActive ? [searchColor] : color}
      setSearchValue={setSearchValue}
      setFilter={setFilter}
    />
  );
};

export default withWidth()(DashboardContainer);
