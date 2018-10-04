import React, {Component} from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {act_onSelectIntervention} from '../actions';
import photoIcon from '../assets/photo.svg';
import noPhotoIcon from '../assets/noPhoto.svg';
import './Event.css';


class Event extends Component {

    render() {
        let {colors} = this.props.theme;
        let {event} = this.props;
        return (
            <div style={{padding: '0 40px', display: 'flex', alignItems: 'center', fontFamily: 'robotoRegular', fontSize: 14, color: colors.PURPLE, height: 50,
                        borderTop: '1px solid rgba(219, 221, 236, 1)', borderLeft: '1px solid rgba(219, 221, 236, 1)', borderRight: '1px solid rgba(219, 221, 236, 1)'}} 
                        onClick={()=> this.props.act_onSelectIntervention(this.props.interventionId)}
                        className='event'>
                <div style={{fontFamily: 'robotoBold'}}>
                    <Moment locale="fr" parse="HH:mm" format="HH[h]mm">{event.date}</Moment>&nbsp;-&nbsp;{event.type}
                </div>
                <div style={{paddingLeft: 20}}>
                    {event.sousType}
                </div>
                <div style={{paddingLeft: 20, flex: 1}}>
                    {event.type}
                </div>
                {
                    event.nbFichier > 0 ?
                        <div style={{display: 'flex', paddingLeft: 20}}>
                        <img src={photoIcon}/>
                        <div style={{paddingLeft: 5}}>{event.nbFichier}&nbsp;photo(s)</div>
                    </div> :
                        <div style={{display: 'flex', paddingLeft: 20, color: '#abb4c2'}}>
                        <img src={noPhotoIcon}/>
                        <div style={{paddingLeft: 5}}>{event.nbFichier}&nbsp;photo(s)</div>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        theme: state.appContent.theme
    }
}

export default connect(
    mapStateToProps,
    {act_onSelectIntervention}
)(Event)
