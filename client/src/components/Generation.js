import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { getGeneration } from '../actions/generation';

//3 ms
const MIN_DELAY = 3000;

class Generation extends React.Component{

    /*
        -the timer should be attached to the object, not state, 
            since it does not reflect anything that needs to be rendered
        -instantiate it to null
    */
    timer = null;

    /*
        -when this component mounts, start updating state
    */
    componentDidMount(){
        this.getNextGeneration();
    }

    /*
        -destroy the timer currently keeping track of 
    */
    componentWillUnmount(){
        clearTimeout(this.timer);
    }

    /*
        -fetches current generation data from database via API call
        -recursively calls based on how much time has passed between now and expiration time of the current generation
        -if the difference between times is somehow less than MIN_DELAY (3 seconds), default to that
        -assign setTimeout call to variable so it can later be cancelled by reference
    */
    getNextGeneration = ()=> {
        this.props.getGeneration();

        let now = moment();
        let then = moment(this.props.expiration);
        let delay = Math.abs(then.diff(now));

        this.timer = setTimeout(()=> this.getNextGeneration(), delay < MIN_DELAY ? MIN_DELAY : delay);
    }


    render(){
        const {generationId, expiration} = this.props;

        return (
            <div className="nes-container is-rounded" style={{marginBottom: '100px'}}>
            <p className="nes-text">Generation {generationId}</p>
            <span className="nes-text is-warning">Expires on:</span>
                <p>{moment(expiration).format()}</p>
            </div>
                
        )
    }
}

/*
    -incoming state from redux -> incoming props for this component
    -variable names can stay as they are
*/

const mapStateToProps = (state)=> {
    const {generationId, expiration, status} = state.generation;
    return {
       generationId, expiration, status
     };
}

/*
    -shorthand for mapping dispatch with an action 
    -action definition is in generation.js
*/

const componentConnector = connect(
    mapStateToProps,
    {getGeneration}
);

export default componentConnector(Generation);