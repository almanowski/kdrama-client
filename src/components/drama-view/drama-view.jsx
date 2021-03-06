import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Container, Col, Row, Button} from 'react-bootstrap';
import {ArrowLeftCircle} from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';

import './drama-view.scss';

import {setUser} from '../../actions/actions';

class DramaView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    this.getUser(token);
  }

  getUser(token) {
    const username = localStorage.getItem('user');

    axios.get(`https://mykdrama-api.herokuapp.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      this.props.setUser(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  

  addFav() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://mykdrama-api.herokuapp.com/users/${username}/favs/${this.props.drama._id}`, {},
      { headers: {
        Authorization: `Bearer ${token}`
      }, method: 'POST'
    })
    .then(response => {
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    })
  } 

  removeFav = (drama) => {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://mykdrama-api.herokuapp.com/users/${username}/favs/${drama._id}`, { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    })
    .then((response) => {
      this.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const {drama, user, onBackClick} = this.props
    const favdramas = user.FavDramas
    console.log(favdramas)
    let button
    if (favdramas) {
      const isFavorite = favdramas.some(d => d === drama._id)
      {isFavorite ? 
        button = <Button className="label" variant="outline-secondary" value={drama._id} onClick={() => this.removeFav(drama)}>Remove Favorite</Button> :
        button = <Button value={drama._id} onClick={(e) => this.addFav(e, drama)} className="label">Add Favorite</Button>
      }
    }    

    return (
      <Container>
        <div className="drama-view">

          <button className="back-button" onClick={() => { onBackClick(null) }}>
              <ArrowLeftCircle color="#07004d" size={50}/>  
          </button>
          
          <Row className="mt-1 mb-4">

            <Col xs={{span: 12, order: 2}} md={{span:6, order: 1}} className="drama-view-col">
              <Row className="mb-4">  
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
                  <Link to={`/directors/${drama.Director.Name}`} className="value link">
                    {drama.Director.Name}
                  </Link>
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
                  {drama.Genre.map((g) => (<Link key={g.Name} to={`/genres/${g.Name}`} className='value link'>
                    {g.Name}
                  </Link>)).reduce((prev, curr) => [prev, ", ", curr])}
                </div>
              </Row>
              <Row>
                {button}
              </Row>
            </Col>
            
            <Col xs={{span: 12, order: 1}} md={{span:6, order: 2}} className="mb-4">
              <div className="drama-poster">
                <img src={drama.ImagePath} crossOrigin ="anonymous" alt="Korean drama poster" className="float-img" />
              </div>
            </Col>

          </Row>
            
          <Row className="mb-4">
            <div className="drama-description">
              <span className="value">{drama.Description}</span>
            </div>
          </Row>
          
        </div>
      </Container>
    );
  }
};

let mapStateToProps = state => {
  const {user} = state;
  return {user};
}

export default connect(mapStateToProps, {setUser} )(DramaView);

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
