import React from 'react';

export class DramaCard extends React.Component {
    render() {
        const { drama, onDramaClick } = this.props;
        return <div className='drama-card' onClick
        ={() => { onDramaClick (drama); }}>{drama.Title}</div>;
    }
}