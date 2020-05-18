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
        this.handleDDChange = this.handleDDChange.bind(this);
    }

    handleSubmit() {
        alert('lol');
    }

    handleDDChange(e) {
        this.setState({ numFaces: parseInt(e.target.value) });
    }

    render() {
        const optionItems = constructRange(20).map(
            (i) => <option key={i}>{i}</option>
        );

        return (
            <form onSubmit={this.handleSubmit}>
                <h3 className="m-1 text-left">
                    Number of faces: 
                </h3>
                <select 
                id="dropdown" 
                className="m-2"
                onChange={this.handleDDChange}>
                    {optionItems}
                </select>
                
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

function constructRange(N) {
    return [ ...Array(N).keys() ].map( i => i+1);
}