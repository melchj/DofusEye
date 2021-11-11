import React from 'react';

export const Header = () => {
    const headerStyle = {
        width: '100%',
        padding: '2%',
        backgroundColor: '#2fd854',
        color: 'white',
        textAlign: 'center'
    }

    return(
        <div style={headerStyle}>
            <h1>Dofus Eye</h1>
        </div>
    );
}