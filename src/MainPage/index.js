import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './index.css';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numFaces: 1,
            rolls: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        alert('lol');
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3 className="m-1 text-left">
                    Number of faces: 
                </h3>
                <input className="m-2"
                type="text" />

                <h3 className="m-1 text-left">
                    Enter the sequence of rolls
                </h3>
                <textarea className="m-2" 
                id="textbox" rows={4} />

                <div className="m-2">
                    <Button>
                        Submit
                    </Button>
                </div>     
            </form>      
        );
    }
}

export default MainPage;
