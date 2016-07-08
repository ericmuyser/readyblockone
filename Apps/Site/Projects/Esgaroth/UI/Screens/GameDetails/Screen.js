const Framework = require('../../../../../../../Framework')
const {React, ReactDOM, ReactNative, PropTypes, T, connect, AppWrapper, AppConfig, Platform, Component, AppRegistry, Navigator, StyleSheet, Text, View, TouchableHighlight, WebView, Animated, Dimensions, Router, Route, Link, createStore, browserHistory, compose, applyMiddleware, thunkMiddleware, Provider, syncHistoryWithStore, routerReducer, combineReducers, createLogger, renderToString} = Framework

import Layout from '../../Layouts/Stoke';
import Markdown from '../../../../../Shared/UI/Components/Markdown';
import Timeline from '../../../../../Shared/UI/Components/Timeline';

import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../../../Actions'

class Screen extends Component {
    static propTypes = {
    }

    constructor() {
        super()

        this.state = {
            page: {
                title: '',
                slim: false
            }
        }
    }

    componentWillMount() {
        Framework.getStyles(Framework.Platform.Env.isServer ? require('fs').readFileSync(__dirname + '/Screen.css').toString() : require('./Screen.css'), 'stokelayout-', (styles) => { this.setState({styles: styles}) })
    }

    onPageChange(state) {
        this.setState({
            page: state
        });
    }

    render() {
        const { site, location, game } = this.props

        //if (!this.state.styles) { return <View></View> }

        const content = (
            <Markdown src={"/Apps/Site/Projects/Esgaroth/Pages/" + (location || 'home') + ".md"} onChange={(state) => this.onPageChange(state)} />
        )

        const page = this.state.page

        const breadcrumb = (
            <ul className="breadcrumb">
                <li><a href="/"><i className="icon-home"></i> {site.title}</a></li>
                <li><a href="/games">Games</a></li>
                <li><a href={location}>{page.title}</a></li>
            </ul>
        )

        return Framework.wrapStyles(this.state.styles,
            <Layout breadcrumb={breadcrumb}>
                {!page.slim && (
                    <View className="box">
                        <View className="tab-header">
                            {page.title}
                        </View>
                        <View className="padded">
                            {game.timeline && <Timeline stages={game.timeline} />}
                            {content}
                        </View>
                    </View>
                )}
                {page.slim && (
                    content
                )}
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    const { site, games, routing } = state

    // TODO: Figure out WTF is going on here. Server is string, browser is object
    var location = null
    if (typeof routing.locationBeforeTransitions === 'string') {
        location = routing.locationBeforeTransitions.replace('/', '')
    } else if (typeof routing.locationBeforeTransitions === 'object' && routing.locationBeforeTransitions) {
        location = routing.locationBeforeTransitions.pathname.replace(/^\//, '').replace(/\/$/, '')
    } else if (typeof window !== 'undefined') {
        location = window.location.pathname.replace('/', '')
    }

    const code = location.replace('/games/', '')
    const game = games.list.reduce((prev, current) => (prev.code === code && prev) || (current.code === code && current))

    return {
        site,
        game,
        location
    }
}

export default connect(mapStateToProps)(Screen);
