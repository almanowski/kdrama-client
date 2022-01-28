import React from 'react';
import {connect} from 'react-redux';
import Form from 'react-bootstrap/Form';

import {setFilter} from '../../actions/actions';

import './visibility-filter-input.scss'

function VisibilityFilterInput(props) {
    return <Form.Control onChange={e => props.setFilter(e.target.value)} value={props.VisibilityFilter} placeholder="Search drama..." className="drama-search" />;
}

export default connect(null, {setFilter})(VisibilityFilterInput);