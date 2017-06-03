import request from '../lib/request'
import { geoCodeLocation } from '../lib/location'
import {
  SAVE_LOCATION,
  FETCH_TIDES,
  FETCH_TIDE_CHART,
  FETCH_WEATHER,
  FIND_CITY_NAME,
  START_LOADING_TIDES,
  FINISHED_LOADING_TIDES,
  DELETE_LOCATION,
  FETCH_ALL_STATIONS,
} from '../types'

export function fetchTides(location) {
  return (dispatch) => {
    dispatch({ type: START_LOADING_TIDES })

    const result = request(`/tides?latitude=${location.latitude}&longitude=${location.longitude}`)
    result
      .then((json) => {
        dispatch({
          type: FETCH_TIDES,
          tides: json,
        })
      })
      .finally(() => {
        dispatch({ type: FINISHED_LOADING_TIDES })
      })
  }
}

export function fetchTideChart(location) {
  return (dispatch) => {
    dispatch({ type: START_LOADING_TIDES })

    const result = request(
      `/tide-chart?latitude=${location.latitude}&longitude=${location.longitude}`,
    )
    result
      .then((json) => {
        dispatch({
          type: FETCH_TIDE_CHART,
          tideChart: json,
        })
      })
      .finally(() => {
        dispatch({ type: FINISHED_LOADING_TIDES })
      })
  }
}

export function fetchWeather(location) {
  return (dispatch) => {
    dispatch({ type: START_LOADING_TIDES })

    const result = request(`/weather?latitude=${location.latitude}&longitude=${location.longitude}`)
    result
      .then((json) => {
        dispatch({
          type: FETCH_WEATHER,
          weather: json,
        })
      })
      .finally(() => {
        dispatch({ type: FINISHED_LOADING_TIDES })
      })
  }
}

export function findCityName(location) {
  return (dispatch) => {
    geoCodeLocation(location).then((city) => {
      dispatch({
        type: FIND_CITY_NAME,
        location,
        city,
      })
    })
  }
}

export function fetchAllStations() {
  return (dispatch) => {
    request('/get-stations').then((stations) => {
      dispatch({
        type: FETCH_ALL_STATIONS,
        stations,
      })
    })
  }
}

export function saveLocation(location) {
  return { type: SAVE_LOCATION, location }
}

export function deleteLocation(city) {
  return { type: DELETE_LOCATION, city }
}

export function startLoadingTides() {
  return { type: START_LOADING_TIDES, loading: true }
}

export function finishedLoadingTides() {
  return { type: FINISHED_LOADING_TIDES, loading: false }
}