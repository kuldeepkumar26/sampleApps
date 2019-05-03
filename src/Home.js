import React from 'react';
import { Component } from 'react';
import happyMom from './happyMom.jpg';
import mydiary from './mydiary.jpg';
import './Home.css';
import Panel from './Panel.js';

class Home extends Component {
    render() {
        return (
        <div className="container bootstrap snippet">
            <div className="row1">
                <div className="panel">
                    <div className="cover-photo">
                        <div className="fbTimelineImg">
                            <img src={mydiary} alt=""/>
                        </div>
                        <div className="fbName">
                            <h3 id="patientName">Lake Sharma</h3>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="profile-thumb" id="imageDiv" >
                            <img src={happyMom} alt=""/>
                        </div>
                    </div>
                </div>
                <div style={{height :'30px'}}></div>
                <Panel></Panel>
            </div>
        </div>
        )
    }
}

export default Home;