
import moment from 'moment';
import SearchBar from '../Search/SearchBar';
import { BsThermometerSun } from "react-icons/bs";
import { AiOutlineCloud } from "react-icons/ai";
import { useSelector } from "react-redux";
function Sidebar() {
 
  const weatherCurrentData = useSelector(
    (state) => state.weatherapp.weatherCurrentData
  );
  const weatherCurrentCity = useSelector(
    (state) => state.weatherapp.weatherCurrentCity
  );
  const getCityName = useSelector((state) => state.weatherapp.getCityName);
  const weatherClouds = useSelector((state) => state.weatherapp.weatherClouds);
  const icon = useSelector((state) => state.weatherapp.icon);
  return (
    <div className="xl:max-w-xs xl:w-full xl:h-screen w-full items-center p-8 flex flex-col dark:bg-neutral-800">

        <SearchBar/>
        <div className="w-60 h-28 mt-9 mb-5 p-5 rounded-3xl relative dark:text-white bg-sky-100/50 dark:bg-neutral-900 ">
              <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-center">
                {getCityName ? getCityName : weatherCurrentCity}
              </span>
            </div>
            <div className='rounded-3xl shadow-lg bg-sky-100/50 dark:bg-neutral-900 p-12'>
            <div className="pb-5">
            <img
              src={require(`../../images/${icon}.png`)}
              alt="icon"
              width="150px"
              height="150px"
            />
          </div>

        <div className="text-7xl font-light pb-8  dark:text-white">
            {Math.floor(weatherCurrentData.temp)}
            <span>°</span>
            <span className="text-4xl font-normal relative bottom-6">C</span>
        </div>

        <div className="dark:text-white">
            <span className="text-xl">{moment().format("dddd")}</span>,
            <span className="pl-1 text-xl text-gray-400">
              {moment().format("LT")}
            </span>
          </div>

          <hr className="my-8 dark:border-neutral-700" />

          
          <div className="text-sm dark:text-white">
            <div className="flex mb-3 pl-1">
              <BsThermometerSun size={20} />
              <span className="ml-3">
                Feels like {Math.round(weatherCurrentData.feels_like)} ° C
              </span>
            </div>

            <div className="flex">
              <AiOutlineCloud size={20} />
              <span className="ml-4">
                Cloudly - {weatherCurrentData.clouds}%
              </span>
            </div>
          </div>
      </div>
      </div>
  )
}

export default Sidebar