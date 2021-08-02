import React, { Component } from 'react'

export class weather extends Component {
    render() {
        return (

            <tbody>
                <tr>
                    <td>{this.props.date}</td>
                    <td>{this.props.description} </td>
                </tr>
            </tbody>


        )
    }
}

export default weather
