import "./App.css";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Recipe from "./components/Recipe";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const APP_ID = "90b7bf17";
  const APP_KEY = "cca06f49a6e42a83b8ad0b056c81c081";
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const getData = async () => {
    const result = await Axios.get(url);
    setRecipes(result.data.hits);
    console.log(result);
    setQuery("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };
  const onChange = (e) => {
    setQuery(e.target.value);
  };
  console.log("recipes", recipes);
  console.log(uuidv4());

  return (
    <div className="App ">
      <h1>Food Search App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search food"
          onChange={onChange}
          value={query}
        />

        <input type="submit" value="Search" />
      </form>
      <div className="recipes">
        {recipes !== [] &&
          recipes.map((recipe) => {
            return (
              <div>
                <Recipe key={uuidv4()} recipe={recipe} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
