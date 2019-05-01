import React, {Component} from 'react';
import css from './Panel.css';
import BabyGif from './baby.gif';
//import fetch from 'fetch';

class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: null
        }
    }
    componentWillMount() {
    fetch('http://www.healtheoz.co.in/sharedData/JOawDvc73WgxRtMkH93xhDBKYh0TZkKrb4PmpydY')
        .then((response)=> {
            return response.json();
        })
        .then((myJson)=> {
            console.log("INSIDE",JSON.stringify(myJson));
            let data;
            try {
                data = myJson.sharedData.diary
            } catch(ex) {
                data = []
            }
            this.setState({
                isLoading: false,
                data: data
            })
        });
    }
    render() {
        var child = null;
        if(this.state.isLoading) {
            child = <div>loading..................</div>
        } else {
            child =  <PanelItems data={this.state.data}></PanelItems>
        }
        return (
            <div id="allDiaryDiv" className={css.panel}>
            {child}
            </div>
        )
    }
}

class PanelItems extends Component {
    constructor(props) {
        super(props);
        this.checkMediaType = this.checkMediaType.bind(this);
        this.getExtension = this.getExtension.bind(this);
        this.isAudio = this.isAudio.bind(this);
        this.isImage = this.isImage.bind(this);
    }
    render() {
        const data = this.props.data;
        const toShow = data.map((element)=> {
            var elem = null;
            if(element.mediaURL) {
                var typeOfMedia = this.checkMediaType(element.mediaURL);
                console.log("RRRRRRRR", typeOfMedia)
                if (typeOfMedia === 2) {
                    elem = <audio src={element.mediaURL} controls="controls"></audio>
                } else {
                    elem = <img id="imageInPanel" src={element.mediaURL} alt=""/>
                }
              } 
            return (
                <div key={element.id}> 
                <div  className={css.panelBody} id="panelBody" >
                <div className={css.fbUserThumb}>
                    <img src={BabyGif} alt=""/>
                </div>
                <div className={css.fbUserDetails}>
                    <h3 id="title">{element.title}</h3>
                    <p id="date">{element.dated}</p>
                    {elem}
                </div>
                <div className={css.clearfix}></div>
                <div>
                    <img id="image" alt=""/>
                    <p className={css.fbUserStatus} id="message">{element.message}</p>
                </div>
            </div>
            </div>
            )
        })
        return toShow;
    }

    checkMediaType(file) {
		var fileIsImage = this.isImage(file);
		if (fileIsImage) {
			return 1;
		}
		var fileIsAudio = this.isAudio(file);
		if (fileIsAudio) {
			return 2;
		}
	}
	getExtension(filename) {
		var parts = filename.split('.');
		return parts[parts.length - 1];
	}

	isImage(filename) {
		var ext = this.getExtension(filename);
		switch (ext.toLowerCase()) {
			case 'jpg':
			case 'jpeg':
			case 'gif':
			case 'bmp':
            case 'png':
                return true;
            default:
				return false;
		}
	}

	isAudio(filename) {
		var ext = this.getExtension(filename);
		switch (ext.toLowerCase()) {
			case 'x-wav':
			case 'wav':
				// etc
                return true;
            default:
                return false;
		}
	}
} 
export default Panel;