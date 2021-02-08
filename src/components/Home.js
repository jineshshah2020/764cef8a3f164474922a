import React, { Component } from 'react';
import { Button, TextField, Card } from '@material-ui/core';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            country: ""
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { country } = this.state;
        return (
            <div class="column">
                <Card className="carding">
                    <TextField 
                        id="outlined-basic" 
                        label="Country Name" 
                        variant="outlined" 
                        placeholder="Enter country name here"
                        value={country}
                        onChange={this.changeHandler}
                        name="country"/><br />
                    <Button 
                        disabled={country.length <= 0 ? true : false} 
                        onClick={() => this.props.history.push({
                            pathname: '/details',
                            data: country
                        })}
                        style={{ marginTop: '10px' }}
                        variant="contained" 
                        color="primary"
                    >Submit
                    </Button>
                </Card>
            </div>
        );
    }
}

export default Home;
