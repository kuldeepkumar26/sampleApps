import React, {Component} from 'react';
import panelCss from './Panel.css';

class Panel extends Component {
    render() {
        return (
            <div id="allDiaryDiv" className="panel">
                <div>
                    <div className="panel-body" id="panelBody" >
                        <div className="fb-user-thumb">
                            <img src="./baby.gif" alt=""/>
                        </div>
                        <div className="fb-user-details">
                            <h3 id="title">nxnxbj</h3>
                            <p id="date">Tue Mar 19 2019</p>
                            <audio src="https://s3-ap-southeast-1.amazonaws.com/walkon-images-dev/1552999464144.x-wav" controls="controls"></audio>
                        </div>
                        <div className="clearfix"></div>
                        <div>
                            <img id="image"/>
                            <p className="fb-user-status" id="message">ndndnd</p>
                        </div>
                    </div>
                </div>
            </div>
                    
        )
    }
}

export default Panel;