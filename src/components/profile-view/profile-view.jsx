import React from 'react';
import axios from 'axios';
import {Container, Col, Row, Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './profile-view.scss';
import UpdateProfile from './update-profile';



export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      favdramas: [],
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
      this.setState({
        username: response.data.Username,
        email: response.data.Email,
        favdramas: response.data.FavDramas
      });
    })
    .catch(function(error) {
      console.log(error);
    });
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

  deleteUser() {
    const answer = window.confirm('Are you sure you want to delete your account?');
    if (answer) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      axios.delete(`https://mykdrama-api.herokuapp.com/users/${user}`,{
        headers: { 
          Authorization: `Bearer ${token}` 
        } 
      })
      .then(() => {
        alert(user + ' has been deleted.');
        localStorage.clear();
        window.location.pathname = '/';
      })
      .catch(function (error) {
          console.log(error);
      })
    }  
  }


  render() {
    const {drama} = this.props
    const {username, email, favdramas} = this.state

    return(
      <Container>
        <Row>
          <Col xs={12} xl={10}>
            <h1>{username}</h1>
          </Col>

          <Col className="delete-user-button">
            <Button type="submit" variant="outline-secondary" onClick={() => this.deleteUser()} >Delete Account</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="email">{email}</p>
          </Col>
        </Row>

        <Row  className="mt-4">
          <Col xs={12} xl={4} className="mr-5 mb-5">
            <UpdateProfile />
          </Col>

          <Col>
            <Row className="favoritedramad-col mb-3"> 
              <Col xs={12} xl={6}>
                <h4 className="favorite-dramas-title">Favourite Dramas</h4>
              </Col>
            </Row>
            <Row>
              {favdramas && drama.map((drama) => {
                if ( drama._id === favdramas.find((fav) => fav === drama._id)) {
                  return (
                    <Col key={drama._id} className="favDrama mb-5">

                      <Card style={{ width: '16.5rem' }}> 

                        <Card.Img variant="top" src={drama.ImagePath} crossOrigin ="anonymous" alt="Korean drama poster" className="favDramaImg" />
                        
                        <Card.Body>

                          <Card.Title className="favDramaTitle">
                            {drama.Title}
                          </Card.Title>

                          <Button variant="outline-secondary" value={drama._id} onClick={() => this.removeFav(drama)}>
                            Delete
                          </Button>

                          <Link to={`/korean-dramas/${drama._id}`}>
                            <Button variant="primary" className="float-right">
                              Details
                            </Button>
                          </Link>

                        </Card.Body>
                      </Card>

                    </Col>
                  )
                }
              })}         
            </Row>
          </Col> 
        </Row>
     </Container>
    )
  }  
}