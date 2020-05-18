import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { parseRolls, pearsonTest, outputFromState } from './helper';
import './index.css';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numFaces: 6,
            rolls: "",
            result: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRollChange = this.handleRollChange.bind(this);
        this.handleDDChange = this.handleDDChange.bind(this);
    }

    handleSubmit() {
        let res = null;
        try {
            res = parseRolls(
                this.state.rolls,
                this.state.numFaces
            );
        }
        catch(err) {
            alert(err.message);
        }

        finally {
            const ret = pearsonTest(res, this.state.numFaces);
            this.setState({ result: ret.probability});
        }
    }

    handleRollChange(e) {
        this.setState({ rolls: e.target.value });
    }

    handleDDChange(e) {
        this.setState({ numFaces: parseInt(e.target.value) });
    }

    render() {
        const optionItems = constructRange(20).map(
            (i) => <option key={i} value={parseInt(i)}>{i}</option>
        );

        return (
            <div>
                <h3 className="m-1 text-left">
                    Number of faces: 
                </h3>
                <select 
                id="dropdown" 
                value={this.state.numFaces}
                className="m-2"
                onChange={this.handleDDChange}>
                    {optionItems}
                </select>
                
                <h3 className="m-1 text-left">
                    Enter the sequence of rolls
                </h3>
                <textarea 
                className="m-2" 
                onChange={this.handleRollChange}
                id="textbox" rows={4} />

                <div className="m-2">
                    <Button onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </div>

                <hr className="my-3"/>

                {this.state.result ? 
                outputFromState(this.state.result) : null}
            </div>        
        );
    }
}

export default MainPage;

function constructRange(N) {
    return [ ...Array(N).keys() ].map( i => i+1);
}