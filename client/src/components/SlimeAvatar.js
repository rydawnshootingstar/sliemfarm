import React from 'react';
import {Card, Image, Popup} from 'semantic-ui-react';
import { SERVER } from '../config';

class SlimeAvatar extends React.Component{

    render(){
        const {slimeId, generationId, nickname, bday, image, traits} = this.props.slime;
        const info = traits ? traits.map(trait=> trait.traitValue).join(',') : '';

        //guard clause: render empty div if no slimeId is present
        if(!slimeId){
            return <div></div>
        }

        return (
            <div style={{marginBottom: '20px'}}>
            
            <div className="message-left">
            <div className="nes-balloon from-left" style={{marginLeft: '50%'}}>
            <p>{`ID: ${slimeId}`}</p>
            <p>{`Generation: ${generationId}`}</p>
            </div>
            <Popup trigger={image && <Image centered src={`${SERVER.ADDRESS}/images/${image}`} />}
            content={info}
            position='top right'
            horizontalOffset={-30}
            flowing
            ></Popup>
            </div>

            </div>
        )
    }
}

export default SlimeAvatar;