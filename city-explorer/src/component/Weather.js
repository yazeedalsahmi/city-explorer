import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

class Weather extends React.Component {
    render() {
        return (
            <p>
                {this.props.data}
                {this.props.description}
            </p>
        )

    }
}
export default Weather;