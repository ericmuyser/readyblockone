const Framework = require('../../../../Framework')
const {React, ReactDOM, ReactNative, AppWrapper, AppConfig, Platform, Component, AppRegistry, Navigator, StyleSheet, Text, View, TouchableHighlight, WebView, Animated, Dimensions, Router, Route, Link, fetch, createStore, browserHistory, Provider, syncHistoryWithStore, routerReducer, combineReducers, renderToString} = Framework

import {
    TEST
} from './Actions'

function game() {
    return {
        players: [],
        enemy: {
            name: 'sss'
        }
    }
}


function games() {
    return {
        list: [
        ]
    }
}

function site() {
    const isLocal = typeof window !== 'undefined' && window.location.hostname.indexOf('.local') !== -1

    return {
        title: 'Pokelingo',
        description: '',
        isLocal: isLocal,
        copyright: {
            date: '2014-' + new Date().getFullYear(),
            company: 'Pokelingo'
        },
        analytics: {
            GA: {
                id: 'UA-51024992-1'
            }
        },
        support: {
            isEnabled: true
        }
    }
}

const reducers = {
    games,
    game,
    site
}

import {reducer as reduxAsyncConnect} from 'redux-connect'

export default {
    routing: routerReducer,
    reduxAsyncConnect,
    ...reducers
}
