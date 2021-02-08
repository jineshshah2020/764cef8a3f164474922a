import React, { Component, Fragment } from 'react';
import { Button, Card, CircularProgress } from '@material-ui/core';
import axios from 'axios';

class Details extends Component {
    constructor(props){
        super(props);
        this.state = {
            details: null,
            weatherDetails: null,
            city: "",
            tempCapital: null,
            error: false
        }
    }

    componentDidMount = () => {
        if(this.props.location.data){
            const url = `https://restcountries.eu/rest/v2/name/${this.props.location.data}`
            axios.get(url)
            .then(res => {
                const data = res.data;
                let tempData = [];
                for(let i = 0; i < data.length; i++){
                    tempData.push(data[i])
                }
                this.setState({
                    details: tempData
                })
            })
            .catch(error => {
                this.setState ({
                    error: true
                })
            })
        }
    }

    getCapitalWeather = (event) => {
        this.setState ({
            tempCapital: this.state.details[event.currentTarget.id].capital
        })
        const url = `http://api.weatherstack.com/current?access_key=2ef64c2429bf0e891958d7a2cedf3a89&query=${this.state.details[event.currentTarget.id].capital}`;
        axios.get(url)
        .then(res => {
            this.setState({
                weatherDetails: res.data.current,
            })
        })
    }

    render() {
        const { details, weatherDetails, tempCapital, error } = this.state;
        return (
            <div>
                {this.props.location.data ? (
                    <Fragment>
                    {details ? details.map((detail, index) => {
                        return (
                        <div class="column">
                            <Card className="carding">
                                <h1>Country Details</h1>
                                <p>Capital : {detail.capital ? detail.capital : 'No Data'}</p>
                                <p>Population : {detail.population ? detail.population : 'No Data'}</p>
                                <p>Latlng : 
                                    {detail.latlng && detail.latlng.length > 0 ? 
                                        detail.latlng.map((lat) => {
                                            return (
                                                <span>{lat},</span>
                                            )
                                        }
                                    )
                                    :
                                        'No Data'
                                    }
                                </p>
                                <img
                                    src={detail.flag}
                                    alt="country flag image"
                                /><br />
                                {weatherDetails && tempCapital == detail.capital ? (
                                    <Fragment>
                                        <br />
                                        <h3>Weather Details</h3>
                                        <p>Temprature : {detail.latlng ? weatherDetails.temperature : 'No Data'}</p>
                                        {weatherDetails.weather_icons.map((image) => {
                                            return (
                                            <Fragment>
                                                <img
                                                    src={image}
                                                    alt="waether image"
                                                /><br />
                                            </Fragment>
                                            )
                                        }
                                        )}
                                        <p>Wind Speed : {weatherDetails.wind_speed ? weatherDetails.wind_speed : 'No Data'}</p>
                                        <p>Precip : {weatherDetails.precip ? weatherDetails.precip : 'No Data'}</p>
                                    </Fragment>
                                )
                                : tempCapital && tempCapital === detail.capital ?
                                    <CircularProgress color="secondary" />
                                : 
                                ( detail.capital && detail.capital !== "" &&
                                    <Button
                                        variant="contained" 
                                        color="primary"
                                        id={index}
                                        onClick={this.getCapitalWeather}
                                    >
                                        Capital Weather
                                    </Button>
                                )}
                            </Card>
                        </div>
                        )
                    })
                    : error ? (
                        <div class="column">
                            <Card className="carding">
                                No data found
                            </Card>
                        </div>
                    )
                    : 
                        <CircularProgress className='loader-centre' color="secondary" />
                    }
                    </Fragment>
                )
                :
                (
                    <div class="column">
                        <Card className="carding">
                            Page not found
                        </Card>
                    </div>
                )}
            </div>
        );
    }
}

export default Details;
