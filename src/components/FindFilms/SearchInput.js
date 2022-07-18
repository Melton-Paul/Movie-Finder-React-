import React from "react";

export default function SearchInput({ setSearchMemory }) {
  const [searchValue, setSearchValue] = React.useState("");

  function handleChange(e) {
    const search = e.target.value;
    setSearchValue(search);
  }

  React.useEffect(() => {
    const typingTimer = setTimeout(() => {
      setSearchMemory(searchValue);
    }, 900);

    return () => {
      clearTimeout(typingTimer);
    };
  }, [searchValue, setSearchMemory]);

  return (
    <div className="input-group">
      <i className="fa fa-search"></i>
      <input
        type="text"
        id="searchBar"
        placeholder="What are you looking for?"
        value={searchValue}
        onChange={handleChange}
        autoFocus
      />
      <button className="btn" type="submit" id="searchBtn">
        Search
      </button>
    </div>
  );
}
