import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import moment from 'moment'
import _ from 'lodash'
import BaseStyle from '../../base-styles'
import TideDirectionArrow from './tide-direction-arrow'

export default class extends Component {
  get prettyTideTime() {
    return moment(this.props.tide.time).format('hh:mm a')
  }

  render() {
    const { tide } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <TideDirectionArrow direction={tide.tide} style={styles.tideArrow} />
          <Text style={styles.tideType}>{_.upperFirst(tide.tide)}</Text>
          <Text style={styles.digitText}>{this.prettyTideTime}</Text>
        </View>

        <View style={styles.heightContainer}>
          <Text style={styles.digitText}>{tide.height}&apos;</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BaseStyle.baseBackgroundColor,
    flexDirection: 'row',
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tideType: {
    color: BaseStyle.baseTextColor,
    fontWeight: '500',
    fontSize: 14,
    width: 40,
  },
  digitText: {
    color: BaseStyle.baseTextColor,
    fontSize: 14,
    fontFamily: BaseStyle.numericFontFamily,
  },
})
