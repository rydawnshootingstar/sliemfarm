import React from 'react';
import App from './app';
import Login from './Login';
import Background from './Background';

import { connect } from 'react-redux';

class Root extends React.Component{


    render(){
        return (

            this.props.account.loggedIn ? (<App />) : (<div><Background /><Login /></div>)

        )
    }
}

const mapStateToProps = (state)=> {
    const {account} = state;
    return {account}
}

export default connect(mapStateToProps)(Root);