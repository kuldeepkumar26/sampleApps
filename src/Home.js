import React from 'react';
import { Component } from 'react';
import happyMom from './happyMom.jpg';
import mydiary from './mydiary.jpg';

class Home extends Component {
    render() {
        return (
        <div className="container bootstrap snippet">
            <div className="row">
                <div className="panel">
                    <div className="cover-photo">
                        <div className="fb-timeline-img">
                            <img src={mydiary} alt=""/>
                        </div>
                        <div className="fb-name">
                            <h3 id="patientName">Lake Sharma</h3>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="profile-thumb" id=" " >
                            <img src={happyMom} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Home;