import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import './Login.css';

export default function Login() {
    
      return (
          <Nav
            bsStyle="tabs"
            justified
            activeKey={1}>
                <NavItem 
                    eventKey={1} 
                    href={process.env.REACT_APP_LOGIN}>
                    Login
                </NavItem>
          </Nav>
        );
    }
