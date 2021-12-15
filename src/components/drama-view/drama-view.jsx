import React from 'react';

export class DramaView extends React.Component {
    render() {
        const { drama, onBackClick } = this.props;

        return (
            <div className='drama-view'>
                <div className='drama-poster'>
                    <img src={drama.ImagePath} crossOrigin = 'anonymous' width='150px'/>
                </div>
                <div className='drama-title'>
                    <span className='label'>Title: </span>
                    <span className='value'>{drama.Title}</span>
                </div>
                <div className='drama-description'>
                    <span className='label'>Description: </span>
                    <span className='value'>{drama.Description}</span>
                </div>
                <div className='drama-genre'>
                    <span className='label'>Genre: </span>
                    <span className='value'>{drama.Genre}</span>
                </div>
                <div className='drama-episode'>
                    <span className='label'>Episode: </span>
                    <span className='value'>{drama.Episode}</span>
                </div>
                <div className='drama-releaseYear'>
                    <span className='label'>Release Year: </span>
                    <span className='value'>{drama.ReleaseYear}</span>
                </div>
                <div className='drama-director'>
                    <span className='label'>Director: </span>
                    <span className='value'>{drama.Director}</span>
                </div>
                <div className='drama-writer'>
                    <span className='label'>Writer: </span>
                    <span className='value'>{drama.Writer}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }
}