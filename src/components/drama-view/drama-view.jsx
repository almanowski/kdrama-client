import React from 'react';
import PropTypes from 'prop-types';
import {Container, Col, Row} from 'react-bootstrap';
import {ArrowLeftCircle} from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';

import './drama-view.scss';

export class DramaView extends React.Component {

  render() {
    const { drama, onBackClick } = this.props;

    return (
      <Container>
        <div className="drama-view">
        <button className="back-button" onClick={() => { onBackClick(null) }}>
            <ArrowLeftCircle color="#07004d" size={50}/>  
          </button>
        
        <Row className="mt-5 mb-3">
          <Col>
            <Row className="mb-5">  
              <div className="drama-title">
                <h1 className="value">{drama.Title}</h1>
              </div>
            </Row>
            <Row className="mb-4">
              <div className="drama-episode">
                <span className="label">Episodes: </span>
                <span className="value">{drama.Episodes}</span>
              </div>
            </Row>
            <Row className="mb-4">
              <div className="drama-releaseYear">
                <span className="label">Release Year: </span>
                <span className="value">{drama.ReleasYear}</span>
              </div>
            </Row>
            <Row className="mb-4">
              <div className="drama-director">
                <span className="label">Director: </span>
                <Link to={`/directors/${drama.Director.Name}`} className="value">{drama.Director.Name}</Link>
              </div>
            </Row>
            <Row className="mb-4">
              <div className="drama-writer">
                <span className="label">Writer: </span>
                <span className="value">{drama.Writer}</span>
              </div>
            </Row>
            <Row className="mb-4">
              <div className="drama-genre">
                <span className="label">Genre: </span>
                {drama.Genre.map(({genreId, Name}) => (
                  <Link to={`/genres/${drama.Genre.Name}`} key={drama.Genre.genreId}>
                    <span className="value">{Name}, </span>
                  </Link>
                ))}
              </div>
            </Row>
          </Col>
          
          <Col>
            <div className="drama-poster">
              <img src={drama.ImagePath} crossOrigin ="anonymous" alt="Korean drama poster" className="float-right" />
            </div>
          </Col>
        </Row>
          
        <Row className="mb-5">
        <div className="drama-description">
          <span className="value">{drama.Description}</span>
        </div>
        </Row>
        </div>
      </Container>
    );
  }
};

DramaView.propTypes = {
  drama: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Episodes: PropTypes.string.isRequired,
    ReleasYear: PropTypes.string.isRequired,
    Genre: PropTypes.array,
    Director: PropTypes.object.isRequired,
    Writer: PropTypes.array.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired
};
