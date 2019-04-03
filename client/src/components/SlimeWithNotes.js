import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import SlimeAvatar from './SlimeAvatar';
import { getSlime } from '../actions/slime';

/*
    -Slime objects will arrive from API calls in this format 
    -image is an attribute that we add
*/
const DEFAULT_SLIME = {
    slimeId: '',
    generationId: '',
    nickname: '',
    bday: '',
    traits: [],
    image: ''
}

class Slime extends React.Component{

    state={
        slime: DEFAULT_SLIME
    }

    componentDidMount(){

        this.getSlime();
    }

    /*
        -generate a new slime object and update state with its properties
        -slime image value gets formatted to correspond to our hosted images
        -note: design decision to deal with image names here rather than using backend ID values
            to allow us greater flexibility in adding traits in the future
    */
    // getSlime = ()=> {
    //     axios.get('http://localhost:3000/slime/new').then((res)=> {
    //         const slime = res.data.slime;
    //         slime.image = slime.traits.map(trait=> trait.traitValue).join('_').concat('.png');
    //         this.setState({
    //             slime
    //         })
           
    //     }).catch((err)=> {
    //         console.error('API ERROR: GET /slime/new', err);
    //     });
    // }

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