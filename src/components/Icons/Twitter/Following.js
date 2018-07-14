import React, { Component } from 'react';
import { Well, Grid, Row, Col, Image } from 'react-bootstrap';
import './Following.css';
import { connect } from 'react-redux';

class Following extends Component {
    render () {
        let { users } = this.props.twitterFriends;
        let panel = 'hello';
        users ? panel = (
                <Well bsSize="small">
                    <Grid>
                        <Row>
                            <Col xs={4} sm={3} md={2} lg={1}>
                                <span>
                                    <Image 
                                        rounded
                                        href="" 
                                        alt=""
                                        className="profile_pic"
                                        src={users[0].profile_image_url_https} />
                                </span>
                            </Col>
                            <Col xs={4} sm={3} md={2} lg={1}>{users[0].name}</Col>
                            <Col xs={4} sm={3} md={2} lg={1}>{users[0].followers_count}</Col>
                            <Col xsHidden={true} sm={3} md={2} lg={1}>[ITEM 4]</Col>
                            <Col xsHidden={true} smHidden={true} md={2} lg={1}>[ITEM 5]</Col>
                            <Col xsHidden={true} smHidden={true} md={2} lg={1}>[ITEM 6]</Col>
                            <Col xsHidden={true} smHidden={true} mdHidden={true} lg={1}>[ITEM 7]</Col>
                            <Col xsHidden={true} smHidden={true} mdHidden={true} lg={1}>[ITEM 8]</Col>
                            <Col xsHidden={true} smHidden={true} mdHidden={true} lg={1}>[ITEM 9]</Col>
                            <Col xsHidden={true} smHidden={true} mdHidden={true} lg={1}>[ITEM 10]</Col>
                            <Col xsHidden={true} smHidden={true} mdHidden={true} lg={1}>[ITEM 11]</Col>
                            <Col xsHidden={true} smHidden={true} mdHidden={true} lg={1}>[ITEM 12]</Col>
                        </Row><br/>
                        <Row>{users[0].description}</Row>
                    </Grid>
                </Well>
            ) : 'hello';
        return (
            <div>
               {panel}
            </div>
        )
   }
}

function mapStateToProps(state){
    return {
        user: state.user,
        twitterFriends: state.twitterFriends
    }
}

export default connect(mapStateToProps)(Following);