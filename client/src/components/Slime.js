import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import SlimeAvatar from './SlimeAvatar';
import { getSlime } from '../actions/slime';

/*
    -Slime objects will be provided as props via store with the following attributes:
        slimeId, bday, nickname, traits, generationId, image
*/

class Slime extends React.Component{

    componentDidMount(){
        this.props.getSlime();
    }

    render(){
        return (
            <div>
                <SlimeAvatar slime={this.props.slime} />     
                <button className="nes-btn" onClick={this.props.getSlime}>New Slime</button>
            </div>
        )
    }
}

/*
    -incoming state from redux -> incoming props for this component
    -variable names can stay as they are
*/

const mapStateToProps =(state)=> {
    const {slime}= state;
    return {slime}
}

/*
    -shorthand for mapping dispatch with an action 
    -action definition is in generation.js
*/

const componentConnector = connect(
    mapStateToProps,
    {getSlime}
);

export default componentConnector(Slime);