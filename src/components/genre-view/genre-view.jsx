import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import {ArrowLeftCircle} from 'react-bootstrap-icons';

export function GenreView(props) {
  const {genre, onBackClick} = props;

  return (
    <Container>
      <div className="genre-view">
        <button className="back-button" onClick={() => { onBackClick(null) }}>
            <ArrowLeftCircle color="#07004d" size={50}/>  
        </button>
        
        <Row className="mt-1 genre-view-row">
          <Col>
            <Row className="mb-4 genre-name">
              <h1>{genre.Name}</h1>
            </Row>
            <Row className="mb-4 genre-description">
              <p>{genre.Description}</p>
            </Row>
          </Col>
        </Row>

    </div>
  </Container>
  )
};

