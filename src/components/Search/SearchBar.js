import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData, fetchGetCity  } from "../../redux/WeatherSlice/WeatherSlice";

function SearchBar() {
    
const [search, setSearch] = useState("");
const [getCity, setGetCity] = useState("false");
const weatherGetCityStatus = useSelector((state) => state.weatherapp.weatherGetCityStatus);
const getCityCoord = useSelector((state) => state.weatherapp.getCityCoord);
const data = useSelector((state) => state.weatherapp.weatherCurrentData);
const durum = useSelector((state) => state.weatherapp.durum);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchGetCity(search));
  };

  useEffect(() => {
    if (weatherGetCityStatus === "succeeded" && durum) {
      dispatch(fetchWeatherData(getCityCoord));
      setGetCity("false");
    }
  }, [weatherGetCityStatus, getCity, dispatch, getCityCoord]);

  return (
    <>
      <div className="flex items-center justify-center font-light text-lg">
        <div className="dark:text-white">
          <BiSearch size={20} />
        </div>

        <div className="w-56 dark:text-white">
          <form onSubmit={handleSubmit}>
            <input
              className="outline-none w-full pl-3 py-1 bg-transparent"
              placeholder="Search for places..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>

      </div>
      {weatherGetCityStatus === "failed" && (
        <div className="text-red-600 mt-1">City is not found!</div>
      )}
    </>
  )
}

export default SearchBar;