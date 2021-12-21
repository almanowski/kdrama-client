import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';

import './drama-card.scss'

export class DramaCard extends React.Component {
  render() {
    const { drama, onDramaClick } = this.props;

    return (
      <Card> 
        <Card.Img 
        variant="top" 
        src={drama.ImagePath} 
        crossOrigin ="anonymous" 
        alt="Korean drama poster"
        style={{width:'15.85rem'}}
        />

        <Card.Body>
          <Card.Title className="mb-3">{drama.Title}</Card.Title>
          <Card.Text className="mb-3">{drama.Description}</Card.Text>
          <Button onClick={() => onDramaClick(drama)} variant="primary">More</Button>
        </Card.Body>
      </Card>
    );
  }
}

DramaCard.propTypes = {
  drama: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onDramaClick: PropTypes.func.isRequired
};