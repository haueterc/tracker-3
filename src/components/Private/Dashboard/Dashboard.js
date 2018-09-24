import React, { Component } from 'react';
import { connect } from 'react-redux';
import Twitter from '../../Icons/Twitter/Twitter';


class Dashboard extends Component {
    render() {
        return (
            <div>
                <Twitter/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Dashboard);