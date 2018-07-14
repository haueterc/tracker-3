import React, { Component } from 'react';
import  { connect } from 'react-redux';
import  { Navbar
        , Nav
        , NavDropdown
        , NavItem
        , MenuItem
        , Image
} from 'react-bootstrap';
import './NavBar.css';

class NavBar extends Component {
    render() {
        let { display_name, picture } = this.props.user;
        return (
        <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            { display_name ?
            <Navbar.Brand className="lifting-pic">
                <span>
                    <Image 
                        rounded
                        href="" 
                        alt=""
                        className="profile_pic"
                        src={picture} />
                </span>
            </Navbar.Brand>
            : null}
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
            <NavDropdown eventKey={1} title="Range" id="basic-nav-dropdown">
                <MenuItem eventKey={1.1}>Today</MenuItem>
                <MenuItem eventKey={1.2}>Last 7 Days</MenuItem>
                <MenuItem eventKey={1.3}>Last 30 Days</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={1.4}>Date Range</MenuItem>
            </NavDropdown>
            </Nav>
            <Nav>
            <NavDropdown eventKey={2} title="Sort" id="basic-nav-dropdown">
                <MenuItem eventKey={2.1}>Most Active</MenuItem>
                <MenuItem eventKey={2.2}>Most Recent</MenuItem>
            </NavDropdown>
            </Nav>
            <Nav pullRight>
            <NavItem>
                { display_name ? display_name : null }
            </NavItem>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(NavBar);




