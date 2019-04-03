import React from 'react';
import { connect } from 'react-redux';

import { Grid, Form, Segment, Image, Button, Header, Message, Icon } from 'semantic-ui-react';

import { signUp, login } from '../actions/account';

/*
    this component's layout and design is still heavily being experimented with
        Test Colors:
        #50514F //black
        #40A6F0 //blue
        #FAC05E //yellow
        #DAD7CD //off-white
*/

class Login extends React.Component {


    state = {
        password: '',
        username: '',
        loading: false
    }

    handleChange = ((e) => {
        this.setState({ [e.target.name] : e.target.value });
    });

    handleSignup = ((e)=> {
        let {username, password} = this.state;
        //prevents page reload
        e.preventDefault();
        if(this.isFormValid({username, password})){
            this.setState({loading: true});
            this.props.signUp({username, password}).then(()=> {
                this.setState({loading: false});
            }).catch(()=> {
                this.setState({loading: false});
            });
        }
    });

    handleLogin = ((e)=> {
        let {username, password, errors} = this.state;
        //prevents page reload
        e.preventDefault();
        if(this.isFormValid({username, password})){
            this.setState({loading: true});
            this.props.login({username, password}).then(()=> {
                this.setState({loading: false});
            }).catch(()=> {
                this.setState({loading: false});
            });
        }
    });

//computed property doesn't count as a "function" so it can be rendered as jsx
    get Error(){
        if(this.props.account.status === 'error' && this.props.account.message !== 'Invalid Session'){
            return (
                <Message  className='nes-text is-error'><h3>Error:</h3> {this.props.account.message}</Message>
            )
        }
    }
        

    //form is "valid for submission" simply if it contains both
    isFormValid = ({ username, password })=> {
        return username && password;
    }

    render(){

        const {username, password, loading} = this.state;

        return (
            <Grid
            textAlign="center"
            verticalAlign="middle"
            className="app"
            /* style={{backgroundColor: '#DAD7CD'}} */
            >
            <Grid.Column style={{maxWidth: '550px', marginTop:'15%', zIndex:0}}>
        {/*}
                <span>
                <Image src="http://localhost:3000/slimeIcon" style={{fill:'blue'}} centered size="small" />
                <span className="nes-text"  style={{fontSize: '25px', textShadow: '2px 2px #DAD7CD'}} >Welcome to SlimeFarm</span>      
                </span>
        */}
                <div className="nes-container is-rounded" style={{clear:"left", backgroundColor:"#FAC05E"}}>
                    <div className="nes-field">
                        <label for="name_field">Username</label>
                        <input type="text" 
                        name="username" 
                        value={username} className="nes-input" 
                        placeholder="username"
                        onChange={this.handleChange}
                        />
                    </div>
                    <br />
                    <div className="nes-field">
                        <label for="name_field">Password</label>
                        <input type="password" 
                        name="password" 
                        value={password} className="nes-input" 
                        placeholder="password"
                        onChange={this.handleChange}
                        />
                    </div>
                    <br />
                    <button 
                    disabled={loading} 
                    className={loading ? "nes-btn is-disabled" : "nes-btn is-secondary"}
                    onClick={this.handleSignup}
                    >
                    Sign Up
                    </button>
                    {' '}
                    <button 
                    disabled={loading} 
                    className={loading ? "nes-btn is-disabled" : "nes-btn is-primary"}
                    onClick={this.handleLogin}
                    >
                    Login 
                    </button>
                </div>
                <br />
                {this.Error}
            </Grid.Column>
            
            </Grid>

        )
    }
}

const mapStateToProps = (state)=> {
    const {account} = state;
    return {account};
}

export default connect(mapStateToProps, {signUp, login})(Login);

                 /*
                        <Form.Input fluid name="email" 
                        icon="mail" 
                        iconPosition="left" 
                        placeholder="Email Address"
                        onChange={this.handleChange}
                        type="email"
                        value={email}
                        className={errors.find((x)=> /.*email.*./test(x)) ? 'error' : ''} 
                        />


                        <Form.Input fluid name="password" 
                        icon="lock" 
                        iconPosition="left" 
                        placeholder="password"
                        onChange={this.handleChange}
                        type="password"
                        value={password}
                        className={errors.find((x)=> /.*password.*./test(x)) ? 'error' : ''}
                        />
                        <Button color="blue" fluid size="large" disabled={loading}
                        className={loading ? 'loading' : ''}
                        >Submit</Button>

                {
                    errors && errors.map((err,index)=> <Message  className='nes-text is-error' key={index}><h3>Error:</h3> {err}</Message>)
                }
                 */
