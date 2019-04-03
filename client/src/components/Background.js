import React from 'react';

const Background = ()=> (
    <div style={{    
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: 'hidden',
        zIndex: -100}}
        >
    <video loop muted autoPlay poster="img/videoframe.jpg" style={{
        position: 'absolute',
        top: '0%',
        left: '0%',
        width: 'auto',
        height: 'auto',
        minWidth: '100%',
        minHeight: '100%'
    }}>
        <source src="http://localhost:3000/webm/slimes.webm" type="video/webm" />
    </video>
</div>
)

export default Background;

/*
        <source src="video/big_buck_bunny.mp4" type="video/mp4" />
        <source src="video/big_buck_bunny.ogv" type="video/ogg" />
*/