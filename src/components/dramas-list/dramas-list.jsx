import React from 'react';
import {Col} from 'react-bootstrap';
import {connect} from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import {DramaCard} from '../drama-card/drama-card';

import './drama-list.scss'

const mapStateToProps = state => {
  const {visibilityFilter} = state;
  return {visibilityFilter};
};

function DramasList(props) {
  const {dramas, visibilityFilter} = props;
  let filteredDramas = dramas;

  if(visibilityFilter !== '') {
    filteredDramas = dramas.filter(d => d.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if(!dramas) return <div className="main-view" />;

  return <>
    <Col md={12} className="filter-col">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
     </Col>
    {filteredDramas.map(d => (
      <Col xs={12} md={6} lg={4} xl={3} xxl={2} key={d._id} className="mb-5 main-view-col">
        <DramaCard drama={d} />
      </Col>
    ))}
  </>
}

export default connect(mapStateToProps)(DramasList);