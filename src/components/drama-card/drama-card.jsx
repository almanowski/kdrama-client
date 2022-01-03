import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import './drama-card.scss'

export class DramaCard extends React.Component {
  render() {
    const {drama} = this.props;

    return (
      <Card style={{ width: '16.5rem' }}> 
        <Card.Img variant="top" src={drama.ImagePath} crossOrigin ="anonymous" alt="Korean drama poster" />
        <Card.Body>
          <Card.Title className="mb-3">{drama.Title}</Card.Title>
          <Card.Text className="mb-3">{drama.Description}</Card.Text>
          <Link to={`/korean-dramas/${drama._id}`}>
            <Button variant="primary">More</Button>
          </Link>
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
};