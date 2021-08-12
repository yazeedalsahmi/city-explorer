import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Form, Button, Card, Table, CardColumns } from 'react-bootstrap/';

import axios from 'axios';

import Weather from './component/Weather';
import Movie from './component/Movie';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dataRenderedInCard: '',
      errorMsg: '',
      displayMap: false,
      displarErrorMsg: false,
      renderedLocWeatherData: [],
      showWeather: false,
      weatherErr: '',
      dspErrWeather: false,
      movieInfo:'',
      showMovie : false,
      movieError:''

    }
  }
  viewData = async (event) =>{
    event.preventDefault();
    let selectCity = event.target.userInput.value;
    let locationURL =`https://us1.locationiq.com/v1/search.php?key=pk.370701c55ed7503519f7418b1098f8d2&q=${selectCity}&format=json`;
    console.log(locationURL);
    let locValue = await axios.get(locationURL);
    // let weatherVal= locValue.data[0];
    // let weatherLat=weatherVal.lat;
    // let weatherLon=weatherVal.lon;
    // console.log(weatherLat);
    // console.log(weatherLon);
    let weatherData = `${process.env.REACT_APP_URL}/weather?searchQuery=${selectCity}`;
    let movieDataInfo = `${process.env.REACT_APP_URL}/movies?city=${selectCity}`;
    try{
      let movieValue = await axios.get(movieDataInfo);
      console.log(movieValue)
      this.setState({
        movieInfo: movieValue.data,
        showMovie: true
      })
      console.log(this.state.movieInfo)
    }
    catch(err){
      this.setState({
        movieError: err,
        showMovie: false
      })
    }
  try {
    
    this.setState({
      dataRenderedInCard: locValue.data[0],
      displayMap:true,
      displarErrorMsg:false,
    })
  }
  catch{
    this.setState({
      errorMsg: 'sorry ,Error in response !!!',
      displarErrorMsg : true,
      displayMap : false,
    })
  }
      try { 
        let locWeatherValue = await axios.get(weatherData);
        console.log(locWeatherValue);
        if(locWeatherValue.data !== undefined){
          this.setState({
            renderedLocWeatherData: locWeatherValue.data,
            showWeather: true,
            dspErrWeather: false,
          }) 
        }
        console.log(locWeatherValue.data)
      }

    catch {
      this.setState({
        weatherErr: 'sorry , no weather data availabe for your location',
        showWeather: false,
        dspErrWeather: true

      })

    }
  };
  
  render() {
    return (
      <div>
        <Form onSubmit={this.viewData}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>City Explorer</Form.Label>
            <Form.Control type="text" placeholder="Enter your city" name='userInput' />
          </Form.Group>
          <Button variant="primary" type="submit" >
            Explore!
          </Button>
        </Form>

        {this.state.displarErrorMsg || this.state.displayMap && <Card className="bg-dark text-white">
          <Card.Img className='cardImg' src={`https://maps.locationiq.com/v3/staticmap?key=pk.370701c55ed7503519f7418b1098f8d2&center=${this.state.dataRenderedInCard.lat},${this.state.dataRenderedInCard.lon}`} alt="Card image" height='500px' />
          <Card.ImgOverlay>
            <Card.Title>name : {this.state.dataRenderedInCard.display_name}</Card.Title>
            <Card.Text>lat : {this.state.dataRenderedInCard.lat}</Card.Text>
            <Card.Text> lon : {this.state.dataRenderedInCard.lon}</Card.Text>
          </Card.ImgOverlay>
        </Card>}
        {this.state.displarErrorMsg && <p>{this.state.errorMsg}</p>}
        {this.state.showWeather &&
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>date</th>
                <th>description</th>
              </tr>
            </thead>
            {this.state.renderedLocWeatherData.map((element) => {
              return (<Weather
              date={element.date}
                description={element.description}
                
              />
              )
            })}
          </Table>
        }
         <CardColumns>
          {this.state.showMovie &&
          this.state.movieInfo.map(item=>(
            <Movie 
            Title={item.title}
            description={item.overview}
            imgURL={item.image_ur}
            data={item.released_on}
            vote={item.average_votes}
            />
          ))}
        </CardColumns>  
         
            {this.state.movieError && <p>error in getting data</p>}

      </div>
    )
  };
};

export default App;