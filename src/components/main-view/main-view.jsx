import React from 'react';
import { DramaCard } from '../drama-card/drama-card';
import { DramaView } from '../drama-view/drama-view';

export class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
            dramas: [
                {
                    Title: 'Guardian: The Lonely and Great God',
                    _id: 1,
                    Episode: '16',
                    ReleaseYear: '2016',
                    Description: 'Kim Shin, a decorated military general from the Goryeo... - Wikipedia',
                    Genre: ['fantasy, ', 'romance'],
                    Director: ['Lee Eung-Bok'],
                    Writer: ['Kim Eun-Sook'],
                    ImagePath: 'https://dl.dropboxusercontent.com/s/eg39fi3emom8hly/poster_placeholder.png?dl=0'
                },
                {
                    Title: 'Oh my Venus',
                    _id: 2,
                    Episode: '16',
                    ReleaseYear: '2015',
                    Description: 'Kim Young-ho, a.k.a. John Kim, is a personal trainer to Hollywood stars...  - Wikipedia',
                    Genre: ['comedy, ', 'romance, ', 'drama'],
                    Director: ['Kim Hyung-suk'],
                    Writer: ['Kim Eun-Ji'],
                    ImagePath: 'https://dl.dropboxusercontent.com/s/eg39fi3emom8hly/poster_placeholder.png?dl=0'
                },
                {
                    Title: 'Suspicious Partner',
                    _id: 3,
                    Episode: '40',
                    ReleaseYear: '2017',
                    Description: 'The series is about Noh Ji-wook (Ji Chang-wook), a prosecutor, and Eun Bong-hee (Nam Ji-hyun), a prosecutor trainee,... - Wikipedia',
                    Genre: ['romance, ', 'comedy, ', 'legal, ', 'crime'],
                    Director: ['Park Sun-Ho'],
                    Writer: ['Kwon Ki-Young'],
                    ImagePath: 'https://dl.dropboxusercontent.com/s/eg39fi3emom8hly/poster_placeholder.png?dl=0'
                },
            ],
            selectedDrama: null
        }
    }

    setSelectedDrama(newSelectedDrama) {
        this.setState({
            selectedDrama: newSelectedDrama
        });
    }

    render() {
        const { dramas, selectedDrama } = this.state;

        if (dramas.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className='main-view'>
                {selectedDrama
                    ? <DramaView drama={selectedDrama} onBackClick={newSelectedDrama => 
                    { this.setSelectedDrama(newSelectedDrama); }}/>
                    : dramas.map(drama => (
                        <DramaCard key={drama._id} drama={drama} onDramaClick
                        ={(drama) => { this.setSelectedDrama(drama); }}/>
                    ))
                }
            </div>       
        );
    }
}

export default MainView;