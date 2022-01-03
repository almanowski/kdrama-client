import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import {ArrowLeftCircle} from 'react-bootstrap-icons';

import './director-view.scss';

export function DirectorView(props) {
  const {director} = props;
  const {onBackClick} = props;

  return (
    <Container>
      <div className="director-view">
        <button className="back-button" onClick={() => { onBackClick(null) }}>
            <ArrowLeftCircle color="#07004d" size={50}/>  
        </button>
        
        <Row className="mt-1 director-view-row">
          <Col>
            <Row className="mb-4 director-name">
              <h1>{director.Name}</h1>
            </Row>
            <Row className="mb-4 director-bio">
              <p>{director.Bio}</p>
            </Row>
            <Row className="mb-4 director-birth">
              <p>{director.Birth}</p>
            </Row>
          </Col>
        </Row>

      </div>
    </Container>
  );
};
