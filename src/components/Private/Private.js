import './Private.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import NavBar from '../NavBar/NavBar';
import Twitter from '../Icons/Twitter/Twitter';
import Dashboard from './Dashboard/Dashboard';


class Private extends Component {
    componentDidMount() {
        this.props.getUser();
    }

    render() {
        return (
            <div id="main_div">
                <NavBar/>
                <Twitter/>
                <Dashboard/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser})(Private);