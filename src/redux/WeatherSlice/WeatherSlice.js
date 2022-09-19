import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchWeatherData = createAsyncThunk(
  "weather/getWeatherData",
  async (coordinat) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinat.lat}&lon=${coordinat.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    );
    return res.data;
  }
);

export const fetchGetCity = createAsyncThunk(
  "weather/getWeatherCity",
  async (city) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
    );
    return res.data;
  }
);

export const weatherSlice = createSlice({
  name:"weatherapp",
  initialState: {
    weatherTheme: window.localStorage.getItem("theme")
      ? window.localStorage.getItem("theme")
      : null,
    weatherDataStatus: "idle",
    weatherGetCityStatus: "idle",
    weatherCurrentData: [],
    weatherCurrentCity: "",
    weatherDailyData: [],
    getCityCoord: {},
    weatherClouds:'',
    getCityName: "",
    durum:false,
    icon:'',
    isWeatherDataError: null,
  },
  reducers: {
    changeTheme: (state, action) => {
      state.weatherTheme = action.payload;
    },
  },
  extraReducers: {
    [fetchWeatherData.pending]: (state) => {
      state.weatherDataStatus = "loading";
    },
    [fetchWeatherData.fulfilled]: (state, action) => {
      state.weatherDataStatus = "succeeded";
      const { current,daily,clouds,timezone } = action.payload;
      state.weatherCurrentData = current;
      state.weatherDailyData = daily;
      state.weatherClouds = clouds;
      state.durum= false;
      state.icon= daily[0].weather[0].icon;
      const sliceTimezone = timezone.indexOf("/");
      const result = timezone.slice(sliceTimezone + 1);
      state.weatherCurrentCity = result;
    },
    [fetchWeatherData.rejected]: (state, action) => {
      state.weatherDataStatus = "failed";
      state.isWeatherDataError = action.error.message;
    },
    [fetchGetCity.pending]: (state) => {
      state.weatherGetCityStatus = "loading";
    },
    [fetchGetCity.fulfilled]: (state, action) => {
      state.weatherGetCityStatus = "succeeded";
      const { coord, name } = action.payload;
      state.getCityCoord = coord;
      state.getCityName = name;
      state.durum= true;
    },
    [fetchGetCity.rejected]: (state, action) => {
      state.weatherGetCityStatus = "failed";
      state.isWeatherDataError = action.error.message;
    },
  },
});


export const { changeTheme, changeLocation } = weatherSlice.actions;
export default weatherSlice.reducer;