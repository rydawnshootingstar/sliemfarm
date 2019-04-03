import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { generationActionCreator } from '../actions/generation';

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
    -gets called by getNextGeneration
    */
    getGeneration = ()=> {
        axios.get('http://localhost:3000/generation').then((res)=> {

        const {generationId, expiration} = res.data.generation;

            // this.props.dispatch(
            //     generationActionCreator({
            //         generationId: generationId, 
            //         expiration: expiration}
            //     )
            // );

            this.props.dispatchGeneration({
                generationId: generationId,
                expiration: expiration    
            });
            

        }).catch((err)=> console.log(`API ERROR: GET /generation ${err}`));
    }

    /*
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
        const {generationId, expiration } = this.props;
        return (
            <div className="nes-container is-rounded" style={{marginBottom: '100px'}}>
            <p className="nes-text">Generation {generationId}</p>
            <span className="nes-text is-warning">Expires on:</span>
                <p>{moment(expiration).format()}</p>
            </div>
                
        )
    }
}

//incoming state from redux -> incoming props for this component. 
//we will leave the variable names as they are
const mapStateToProps = (state)=> {
    const {generationId, expiration} = state.generation;
    return {
       generationId, expiration
     };
}

/*
    a note on mapping dispatch to props: this method below, passing only mapStateToProps and leaving the expected
    second parameter blank will give us access to this.props.dispatch and allos us to call it with an action generator
    every time. 

    If, however, we wish to be more specific and pre-define what action we want to use, we can manually configure it
    like so
*/

/*
    this mapping of getGeneration to basically a call to itself with dispatch as a parameter can be shortened
    see below...
*/
// const mapDispatchToProps = (dispatch)=> {
//     return {
//         dispatchGeneration: (generation)=> dispatch(generationActionCreator(generation)),
//         getGeneration: ()=> getGeneration(dispatch)
//     };
// };

/*
we can also convert the local getGeneration function to one mapped in our mapDispatchToProps call.
If we want to use the inline mapDispatch to props, we need to turn it into an even more confusing function
*/

// const getGeneration = (dispatch)=> {
//     axios.get('http://localhost:3000/generation').then((res)=> {

//     const {generationId, expiration} = res.data.generation;
//             dispatch(
//                 generationActionCreator({
//                     generationId: generationId, 
//                     expiration: expiration}
//                 )
//             );

        
//     }).catch((err)=> console.log(`API ERROR: GET /generation ${err}`));
// }

/*
    here is the more confusing version with an arrow funciton returning the other arrow function with dispatch in it
    to do this, we need to install thunk to use this function
*/
const getGeneration = ()=> (dispatch)=> {
    axios.get('http://localhost:3000/generation').then((res)=> {

    const {generationId, expiration} = res.data.generation;
            dispatch(
                generationActionCreator({
                    generationId: generationId, 
                    expiration: expiration}
                )
            );

        
    }).catch((err)=> console.log(`API ERROR: GET /generation ${err}`));
}
//explicit dispatch prop
//export default connect(mapStateToProps, mapDispatchToProps)(Generation);
//implied dispatch prop
//export default connect(mapStateToProps)(Generation);
/*
    here's the even shorter syntax with the implicit function syntax 
*/
const componentConnector = connect(
    mapStateToProps,
    {getGeneration}
);

export default componentConnector(Generation);