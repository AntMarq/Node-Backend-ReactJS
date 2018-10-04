/**
 * @author Guillaume Nachury
 * 
 * Cerbere - You shall not pass !!
 * Simple helper component that check is the user is logged in before navigating
 * 
 */
import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

const AUTH_VIEW = '/login';

function Cerbere({ component: Component, ...rest }) {
    
    return (<Route {...rest}  render={props => {
                return rest.isLogged ? (<Component {...props}/>) : (<Redirect to={AUTH_VIEW}/>)
                    }
                }
            />)
}

function mapStateToProps(state, ownProps){
    return {
        isLogged:state.appContent.isLogged
    }
}

export default connect(
  mapStateToProps,
  {}
)(Cerbere)