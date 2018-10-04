import React, {Component} from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {act_onClickEvenementIntervention, act_onSelectIntervention, act_onDownloadPdf} from '../actions';
import plusIcon from '../assets/plusOrange.svg';
import minusIcon from '../assets/minusOrange.svg';
import pdf from '../assets/pdf.svg';
import './Intervention.css';
import Event from './Event';
import {INTERVENTION_STATUS} from '../constants/index'
import {isInterventionOpen} from '../utils';


class Intervention extends Component {

    _evenement () {
        let {colors} = this.props.theme;
        let {intervention} = this.props;

        return (
            <div style={{marginTop: 15, marginBottom: 5, backgroundColor: colors.MAIN_THEME_BACKGROUND}}>
                {
                    intervention.evenements.map((event) => <Event key={event.id} event={event} interventionId={intervention.id} />)
                }
            </div>
        )
    }

    render() {
        let {colors} = this.props.theme;
        let {intervention, interventionsOpen} = this.props;
        return (
            <div style={{display: 'flex', flexDirection: 'column', paddingBottom: 10}}>
                <div style={{height: 70, width: '100%', display: 'flex'}}>
                    <div style={{minWidth: 155, marginRight: 10, padding: '0 15px', border: '1px solid rgba(219, 221, 236, 1)', color: colors.ORANGE, backgroundColor: 'white', fontFamily: 'robotoMedium', fontSize: 14, display: 'flex', alignItems: 'center', textAlign: 'center', position: 'relative'}} className={"event-button " + (intervention.evenements.length < 1 ? 'no-events ' : ' ') + (isInterventionOpen(intervention.id, interventionsOpen) !== -1 ? 'intervention-open' : '')} onClick={() => {if(intervention.evenements.length > 0) this.props.act_onClickEvenementIntervention(intervention.id)}}>
                        <div style={{fontFamily: 'robotoMedium', flex: 1}}>
                            {intervention.evenements.length > 0 ? isInterventionOpen(intervention.id, interventionsOpen) !== -1 ? <img src={minusIcon}/> : <img src={plusIcon}/> : ''}&nbsp;&nbsp;{intervention.evenements.length}&nbsp;évènement(s)
                        </div>
                    </div>
                    <div style={{border: '1px solid rgba(219, 221, 236, 1)', color: colors.PURPLE, backgroundColor: 'white', fontFamily: 'robotoRegular', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, minWidth: 0}} className='intervention' onClick={() => this.props.act_onSelectIntervention(intervention.id)}>
                        <div style={{flex: 1, ...styles.containerDatas}}>
                            <div style={{fontFamily: 'robotoBold', ...styles.data}}>
                                <Moment locale="fr" parse="HH:mm" format="HH[h]mm">{intervention.heureDebut}</Moment>&nbsp;>&nbsp;<Moment locale="fr" parse="HH:mm" format="HH[h]mm">{intervention.heureFin}</Moment>
                            </div>
                            {
                                intervention.heureReelDebut && intervention.heureReelFin ?
                                    <div style={{fontFamily: 'robotoRegular', ...styles.data}}>
                                        <Moment locale="fr" parse="HH:mm" format="HH[h]mm">{intervention.heureReelDebut}</Moment>&nbsp;>&nbsp;<Moment locale="fr" parse="HH:mm" format="HH[h]mm">{intervention.heureReelFin}</Moment>
                                    </div> : ""
                            }
                        </div>
                        <div style={{flex: 2, borderLeft: '1px solid rgba(61, 70, 108, 0.31)', ...styles.containerDatas}}>
                            <div style={{fontFamily: 'robotoBold', ...styles.data}}>
                                {intervention.clientName}
                            </div>
                            <div style={{fontFamily: 'robotoRegular', ...styles.data}}>
                                {intervention.numRue}&nbsp;{intervention.rue},&nbsp;{intervention.codePostal}&nbsp;{intervention.ville}
                            </div>
                        </div>
                        <div style={{flex: 1, borderLeft: '1px solid rgba(61, 70, 108, 0.31)', ...styles.containerDatas}}>
                            <div style={{fontFamily: 'robotoBold', ...styles.data}}>
                                N°{intervention.id}
                            </div>
                            <div style={{fontFamily: 'robotoRegular', ...styles.data}}>
                                {intervention.prestation}
                            </div>
                        </div>
                        <div style={{flex: 4, borderLeft: '1px solid rgba(61, 70, 108, 0.31)', ...styles.containerDatas}}>
                            <div style={{fontFamily: 'robotoBold', ...styles.data}}>
                                {intervention.codeMateriel}&nbsp;-&nbsp;{intervention.materiel}
                            </div>
                            <div style={{fontFamily: 'robotoRegular', ...styles.data}}>
                                {intervention.codeDechet}&nbsp;-&nbsp;{intervention.dechet}
                            </div>
                        </div>
                        <div style={{width: 30, textAlign: 'center', zIndex: 5}}>
                            {intervention.pdfInterId ? <img src={pdf} className="intervention-pdf-icon" onClick={(e) => {e.preventDefault(); e.stopPropagation(); this.props.act_onDownloadPdf(intervention.pdfInterId, intervention.numBi)}}/> : ""}
                        </div>
                        <div style={{width: 85, ...styles.containerDatas}}>
                            <div style={{fontFamily: 'robotoBold', ...styles.data}} className={'status-'+(intervention.status)}>
                                {INTERVENTION_STATUS[intervention.status]}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    isInterventionOpen(intervention.id, interventionsOpen) !== -1 && this._evenement()
                }
            </div>
        )
    }

}

const styles = {
    containerDatas: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '0 10px'
    },
    data: {
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
};



function mapStateToProps(state, ownProps){
    return {
        theme: state.appContent.theme,
        interventionsOpen: state.appContent.interventionsOpen
    }
}

export default connect(
    mapStateToProps,
    {act_onClickEvenementIntervention, act_onSelectIntervention, act_onDownloadPdf}
)(Intervention)
