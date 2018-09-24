import React, { Component } from 'react';
import { Well, Grid, Row, Col, Button } from 'react-bootstrap';
import {  FaTwitter } from 'react-icons/lib/fa';
import './Twitter.css';
import Following from './Following';
import { connect } from 'react-redux';
import { getTwitterUser } from '../../../ducks/reducer';
import { getTwitterFriends } from '../../../ducks/reducer';
import { getTwitterFriendsIds } from '../../../ducks/reducer';

class Twitter extends Component {
    constructor(props) {
        super(props);
        this.state={ showFollowing: false }
        this.onChangeFollowing = this.onChangeFollowing.bind(this);
    }
    onChangeFollowing() {
        this.setState({showFollowing: !this.state.showFollowing});
        if (!this.state.showFollowing) {
            this.props.getTwitterFriendsIds('@SamHarrisOrg');
        }
    }
//Immediately before initial rendering. You can change initial state before the inital render
    //componentWillMount() {}

//Immediately after initial rendering
   componentDidMount() {this.props.getTwitterUser('@SamHarrisOrg');}

//When the component is about to recieve new props
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps);
   }

//Before re-rendering but after recieving props or state
//Can return false to prevent re-rendering
   shouldComponentUpdate(nextProps, nextState) {
       console.log('shouldComponentUpdate', nextProps, nextState);
       return true;
    }

//Also before re-rendering but after recieving prop or state and shouldComponentUpdate
    componentWillUpdate(nextProps, nextState) {
console.log('componentWillUpdate', nextProps, nextState);
    }

//After component's updates are flushed to the actual DOM
    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate', prevProps, prevState);
    }

//immediately before removing components from the DOM
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
   render () {
       let { screen_name
           , followers_count
           , friends_count
           , listed_count } = this.props.twitterUser;
        return (
            <div>
                <Well bsSize="small">
                    <Grid>
                        <Row>
                            <Col xs={4} sm={3} md={2} lg={1}><FaTwitter size={32}/></Col>
                            <Col xs={4} sm={3} md={2} lg={1}><Button>@{ screen_name }</Button></Col>
                            <Col xs={4} sm={3} md={2} lg={1}>
                                <Button
                                    onClick={this.onChangeFollowing}>
                                        <span>following</span>
                                        <span className="positiveChange">+{ friends_count }</span>
                                </Button>
                            </Col>
                            <Col xsHidden={true} sm={3} md={2} lg={1}>followers <span className="positiveChange">+{ followers_count }</span></Col>
                            <Col xsHidden={true} smHidden={true} md={2} lg={1}>lists<span className="positiveChange">+{ listed_count }</span></Col>
                            <Col xsHidden={true} smHidden={true} md={2} lg={1}>[ITEM 6]</Col>
                            <Col xsHidden={true} smHidden={true} mdHidden={true} lg={1}>[ITEM 7]</Col>
                            <Col xsHidden={true} smHidden={true} mdHidden={true} lg={1}>[ITEM 8]</Col>
                            <Col xsHidden={true} smHidden={true} mdHidden={true} lg={1}>[ITEM 9]</Col>
                            <Col xsHidden={true} smHidden={true} mdHidden={true} lg={1}>[ITEM 10]</Col>
                            <Col xsHidden={true} smHidden={true} mdHidden={true} lg={1}>[ITEM 11]</Col>
                            <Col xsHidden={true} smHidden={true} mdHidden={true} lg={1}>[ITEM 12]</Col>
                        </Row>
                    </Grid>
                </Well>
                { this.state.showFollowing ? <Following/> : null }
            </div>
        )
   }
}

function mapStateToProps(state){
    return {
        user: state.user,
        twitterUser: state.twitterUser
    }
}

export default connect(mapStateToProps,{getTwitterUser, getTwitterFriends, getTwitterFriendsIds})(Twitter);