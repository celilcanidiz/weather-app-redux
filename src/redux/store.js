import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./WeatherSlice/WeatherSlice";

export const store = configureStore({
  reducer: {
    weatherapp: weatherSlice,
  },
});