import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
//import Card from 'react-bootstrap';


class Movie extends React.Component {
    render() {
        return (
            <div>
            <p>{this.props.Title}</p>
            <p>{this.props.description}</p>
            <p>{this.props.data}</p>
            
            </div>
        )

    }
}

export default Movie;