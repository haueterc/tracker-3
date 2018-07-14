import './Home.css';
import React from 'react';
import { connect } from 'react-redux';
import { getUser } from './../../ducks/reducer';
import NavBar from '../NavBar/NavBar';
import Login from '../../components/Login/Login';


class Home extends React.Component {
    render() {
        let { display_name } = this.props.user;
        return (
            <div id="main_div">
                <NavBar/>
                { display_name ? null : <Login/> }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser})(Home);