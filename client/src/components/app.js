import React from 'react';
import { connect } from 'react-redux'
import {Container, Grid} from 'semantic-ui-react';
import moment from 'moment';
import 'normalize.css/normalize.css';
import '../styles/index.css';
import Generation from './Generation';
import Slime from './Slime';
import getBackground from '../utils/getBackground';
import { logout } from '../actions/account';


//grab just the hour off the current time: will be a value from 00-23
const now = moment().format('H');

class App extends React.Component{

    state={
        bg:''
    }

    /*
        -send our current time value to the helper function
        -helper function returns a value between 1-8 corresponding to the time of day
    */
    componentDidMount(){
        const bg = getBackground({time: now});
        this.setState({bg});
    }

    handleLogout =()=> {
        this.props.logout().then(()=> {
            console.log('logout')
        }).catch((err)=> {
            console.error(err);
        })
    }


    render(){
        return (
            <Grid textAlign='center' style={{ 
            height: '100vh', 
            backgroundImage: `url("http://localhost:3000/background/${this.state.bg}.png")`,
            backgroundSize: 'cover'
            }} 
            colums='equal' verticalAlign='middle'>

            <Grid.Column style={{ maxWidth: 450 }}>
            <Container>
            <button className="nes-btn" 
            onClick={this.handleLogout}
            style={{marginLeft:'90%'}}
            >
            Logout
            </button>
                <Generation />
                <Slime />
            </Container>
           </Grid.Column>
           </Grid>
        )
    }
}

export default connect(null, {logout})(App);