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
            <img src={this.props.imgURL} alt="Girl in a jacket" width="500" height="600"></img>
            </div>
        )

    }
}

export default Movie;