import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constant";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setsuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState("false");

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setsuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    console.log("API CALL -" + searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setsuggestions(json[1]);
    //console.log(json[1]);
    //update cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="fixed flex justify-between items-center w-full shadow-lg bg-white p-2 px-3">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          alt="menu"
          src="https://cdn.iconscout.com/icon/free/png-256/hamburger-menu-462145.png"
        />
        <a href="/">
          <img
            className=" h-12 mx-6 -my-2"
            alt="utube logo"
            src="https://lh3.googleusercontent.com/3zkP2SYe7yYoKKe47bsNe44yTgb4Ukh__rBbwXwgkjNRe4PykGG409ozBxzxkrubV7zHKjfxq6y9ShogWtMBMPyB3jiNps91LoNH8A=s500"
          />
        </a>
      </div>
      <div className="flex ">
        <input
          className="px-5 w-[25em] border border-gray-400 p-2 rounded-l-full "
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
        <button className="border border-gray-400 px-5  py-2 rounded-r-full bg-gray-100 ">
          🔍
          {/* <img
            className="h-8"
            alt="searchicon"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnAlWBnJ-PpLiQdEiHfutdlogpxPJafCK4Cg&usqp=CAU"
          ></img> */}
        </button>
        {showSuggestions && suggestions.length > 0 && (
          <div className=" fixed bg-white px-2 w-[25rem] my-11 shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                  🔍{s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <img
          className="h-7 col-span-1 my-5"
          alt="user icon"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSYyNXOWAO3zkAU8IsCQ7ITRY1FxAnQq675gUmpbV_6A&s"
        ></img>
      </div>
    </div>
  );
};

export default Head;
