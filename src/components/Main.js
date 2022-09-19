import {useEffect} from 'react'
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content'
import Loading from '../components/Loading/Loading';
import { useSelector, useDispatch } from 'react-redux';
import {fetchWeatherData} from '../redux/WeatherSlice/WeatherSlice';


const defaultCity = { lat: 41.015137, lon: 28.97953 };
function Main() {
const isDataLoading = useSelector((state) => state.weatherapp.weatherDataStatus);
const weatherGetCityStatus = useSelector((state) => state.weatherapp.weatherGetCityStatus);
 
const dispatch = useDispatch();
  
useEffect(() => {
  if (isDataLoading === "idle") {
    dispatch(fetchWeatherData(defaultCity));
  }    
}, [dispatch, isDataLoading]);

if(isDataLoading === 'idle'){
  return(
  <div className='flex justify-center items-center w-full h-screen dark:bg-neutral-800 dark:bg-opacity-95'>
    <Loading/>
  </div>
  )
}

  if(isDataLoading === 'loading'){
    return(
    <div className='flex justify-center items-center w-full h-screen dark:bg-neutral-800 dark:bg-opacity-95'>
      <Loading/>
    </div>
    )
  }

  return (
    <div className="lg:flex">
        <Sidebar/>
        <Content/>
    </div>
  )
}

export default Main