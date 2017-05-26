import React, { Component } from 'react'
import { StyleSheet, ScrollView, ActivityIndicator, AppState, Button } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SplashScreen from 'react-native-splash-screen'

import * as actions from '../../actions/station'
import TidePhrase from './tide-phrase'
import WeatherRow from './weather-row'
import TodaysTides from './todays-tides'
import DetailPanel from './detail-panel'
import NetworkError from '../network-error'
import SaveLocationButton from '../buttons/save-location-button'
import RemoveLocationButton from '../buttons/remove-location-button'
import NavigationBarItem from '../buttons/navigation-bar-item'
import { fetchLocation } from '../../lib/location'

const StationDetail = class extends Component {
  constructor(props) {
    super(props)

    this.handleAppStateChange = this.handleAppStateChange.bind(this)

    this.state = {
      previousAppState: null,
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state

    if (params && params.location) {
      this.props.fetchTideData(params.location)
      this.props.findCityName(params.location)
    } else {
      this.findCurrentLocation()
    }

    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = (appState) => {
    this.setState({ previousAppState: appState })

    if (appState === 'unknown') {
      return
    }

    if (appState === 'active' && this.state.previousState !== 'active') {
      this.findCurrentLocation()
    }
  }

  findCurrentLocation() {
    fetchLocation().then((location) => {
      this.props.fetchTideData(location)
      this.props.findCityName(location)
    })
  }

  render() {
    const { loading, error, location } = this.props
    const { city, tides, weather } = this.props.current
    const { navigate } = this.props.navigation

    if (loading) {
      return <ActivityIndicator style={styles.loadingIndicator} size="large" />
    }

    if (error) {
      return <NetworkError location={location} />
    }

    return (
      <ScrollView style={styles.container}>
        <TidePhrase
          city={city}
          tides={tides.formatted}
          todaysTides={tides.todaysTides}
          navigate={navigate}
        />
        <WeatherRow weather={weather.currentWind} icon="wind" />
        <WeatherRow weather={weather.currentWeather} icon={weather.icon} />
        <TodaysTides
          tideTable={tides.formatted}
          todaysTides={tides.todaysTides}
          navigate={navigate}
        />
        <DetailPanel wind={weather.wind} tideChart={tides.hourly} />

        {this.props.isSaved
          ? <RemoveLocationButton city={city} deleteLocation={this.props.deleteLocation} />
          : <SaveLocationButton
            saveLocation={this.props.saveLocation}
            location={this.props.location}
            city={city}
          />}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

StationDetail.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <NavigationBarItem
      title="My Locations"
      navigate={() => navigation.navigate('SavedLocations')}
    />
  ),
})

const mapStateToProps = ({ stations }) => ({
  current: stations.current,
  loading: stations.loading,
  error: stations.error,
  saved: stations.saved,
  location: stations.location,
  isSaved: !!stations.saved[stations.current.city],
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(StationDetail)
