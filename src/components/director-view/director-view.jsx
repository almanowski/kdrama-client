import React from 'react';
import PropTypes from 'prop-types';
import {Container, Col, Row} from 'react-bootstrap';
import {ArrowLeftCircle} from 'react-bootstrap-icons';

export function DirectorView(props) {
  const {director} = props;
  const {onBackClick} = props;

    return (
      <Container>
        <div className="director-view">
        <button className="back-button" onClick={() => { onBackClick(null) }}>
            <ArrowLeftCircle color="#07004d" size={50}/>  
          </button>
        
        <Row className="mt-5 mb-3">
          <Col>
            <Row className="mb-4">
              <div className="director-name">
                <h1>{director.Name}</h1>
              </div>
            </Row>
            <Row className="mb-4">
            <div className="director-birth">
                <p>{director.Birth}</p>
              </div>
            </Row>
            <Row className="mb-4">
              <div className="director-bio">
                <p>{director.Bio}</p>
              </div>
            </Row>
          </Col>
        </Row>

        </div>
      </Container>
    );
};

DirectorView.propTypes = {
  drama: PropTypes.shape({
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Age: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
