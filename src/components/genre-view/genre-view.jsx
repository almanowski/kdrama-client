import React from 'react';
import PropTypes from 'prop-types';
import {Container, Col, Row} from 'react-bootstrap';
import {ArrowLeftCircle} from 'react-bootstrap-icons';

export function GenreView(props) {
  const {genre} = props;
  const {onBackClick} = props;

    return (
      <Container>
        <div className="genre-view">
        <button className="back-button" onClick={() => { onBackClick(null) }}>
            <ArrowLeftCircle color="#07004d" size={50}/>  
          </button>
        
        <Row className="mt-5 mb-3">
          <Col>
            <Row className="mb-4">
              <div className="genre-name">
                <h1>{genre.Name}</h1>
              </div>
            </Row>
            <Row className="mb-4">
            <div className="genre-birth">
                <p>{genre.Description}</p>
              </div>
            </Row>
          </Col>
        </Row>

        </div>
      </Container>
    );
};

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};