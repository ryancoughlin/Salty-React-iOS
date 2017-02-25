import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

import _ from 'lodash'
import BaseStyle from '../../base-styles'
import IconHeader from '../icon-header'
import ViewTideListButton from './view-tide-list-button'
import NextTideRow from './next-tide-row'

import tideIcon from '../../assets/images/tide.png'

export default class FutureTides extends Component {
  renderTideRow() {
    return _.map(this.props.todaysTides, (tide, i) => {
      return <NextTideRow tide={tide} key={i} />
    })
  }

  render() {
    const { tideTable } = this.props

    return (
      <View style={styles.container}>
        <IconHeader
          text="Today's Tides"
          icon={tideIcon}
          rightLabel={<ViewTideListButton tideTable={tideTable} />}
        />
        {this.renderTideRow()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 34,
  },
  futureTideRow: {
    marginLeft: 61,
    flexDirection: 'row',
    marginBottom: 5,
  },
  futureTideType: {
    width: 40,
    fontWeight: '600',
    fontSize: 14,
  },
  futureTideInfo: {
    fontFamily: BaseStyle.numericFontFamily,
    fontSize: 14,
  },
})
