import { useEffect, useState } from "react";
import "./searchbar.css";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const SearchBar = () => {
  const [cocktails, setCocktails] = useState([]);
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    console.log("search ", searchTerm);
  };

  const clearInput = () => {
    setValue("");
  };

  useEffect(() => {
    async function fetchCocktails() {
      // You can await here
      const cocktails = await axios.get(`http://localhost:5000/cocktails/`);
      setCocktails(cocktails.data);
    }
    fetchCocktails();
  }, []);

  return (
    <div>
      <h1>Search Cocktails</h1>

      <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
          <SearchIcon onClick={() => onSearch(value)} />
          <CloseIcon id="clearBtn" onClick={clearInput} />
        </div>

        <div className="dropdown">
          {cocktails
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const strDrink = item.strDrink.toLowerCase();

              return (
                searchTerm &&
                strDrink.startsWith(searchTerm) &&
                strDrink !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearch(item.strDrink)}
                className="dropdown-row"
                key={item.strDrink}
              >
                {item.strDrink}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
