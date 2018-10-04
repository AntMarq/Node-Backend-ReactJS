import React, {Component} from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {act_onSelectPhoto} from '../actions';
import loupeIcon from '../assets/loupe.svg';
import './PhotoDetail.css';
import {getEvenementImage} from '../services/WebServices';

class PhotoDetail extends Component {

    render() {
        let {photo} = this.props;
        return (
            <div style={{marginRight: 15}}>
                <div style={{position: 'relative', width: 150, height: 150, backgroundImage: `url(${getEvenementImage(photo.fichierId)})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', borderRadius: 10}}>
                    <img src={loupeIcon} style={{position: 'absolute', bottom: 0, left: 0, cursor: 'pointer', opacity: 0.5}} className="loupe" onClick={() => this.props.act_onSelectPhoto(photo)}/>
                </div>
                <div style={{fontFamily: 'robotoRegular', textAlign: 'center'}}>
                    <Moment locale="fr" parse="HH:mm" format="HH[h]mm">{photo.date}</Moment>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        theme: state.appContent.theme,
        selectedRound: state.appContent.selectedRound,
        selectedIntervention: state.appContent.selectedIntervention
    }
}

export default connect(
    mapStateToProps,
    {act_onSelectPhoto}
)(PhotoDetail)
