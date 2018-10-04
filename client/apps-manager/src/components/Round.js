import React, {Component} from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {act_onClickTournee} from '../actions';
import plusIcon from '../assets/plus.svg';
import minusIcon from '../assets/minus.svg';
import eventIcon from '../assets/suezEvent.svg';
import Intervention from './Intervention';
import './Round.css';
import {TOURNEE_STATUS_CODE} from '../constants';
import {hasEvenement, isTourneeOpen, findTourneeStatus} from '../utils';


class Round extends Component {

    _tournee () {
        let {colors} = this.props.theme;
        let {round} = this.props;
        return (
            <div style={{backgroundColor: colors.MEDIUM_BLUE, padding:'10px 14px'}}>
                {
                    round.interventions.map((intervention) => <Intervention key={intervention.id} intervention={intervention} />)
                }
            </div>
        )
    }

    render() {
        let {colors} = this.props.theme;
        let {round, tourneesOpen} = this.props;
        let _nbIntervTerminees = round.interventions.filter( intervention => intervention.status === 2).length;
        let _tStatus = TOURNEE_STATUS_CODE[findTourneeStatus(round)];
        return (
            <div style={{marginBottom: 10}}>
                <div  style={{cursor: 'pointer', backgroundColor: 'white', color: colors.MEDIUM_BLUE, height: 70, padding: 5, display: 'flex', alignItems: 'center', border: '1px solid rgba(61, 70, 108, 0.18)'}} className={"round " + (isTourneeOpen(round.id, tourneesOpen) !== -1 ? 'round-open' : '')} onClick={() => this.props.act_onClickTournee(round.id)}>
                    {
                        isTourneeOpen(round.id, tourneesOpen) !== -1 ?  <img src={minusIcon} style={{margin: '0 23px'}}/> : <img src={plusIcon} style={{margin: '0 23px'}}/>
                    }
                    <div style={{flex: 1, textTransform: 'capitalize'}}><Moment locale="fr" format="DD MMM YYYY">{round.date}</Moment></div>
                    <div style={{flex: 2, fontFamily: 'robotoMedium'}}>{round.chauffeurName}</div>
                    <div style={{flex: 1}}>Tournée N°{round.id}</div>
                    <div>{round.camion} -&nbsp;</div>
                    <div style={{flex: 3, fontFamily: 'robotoMedium'}}>{_tStatus}</div>
                    <div style={{fontFamily: 'robotoRegular'}}>{_nbIntervTerminees}/{round.interventions.length}&nbsp;</div>
                    <div>{_nbIntervTerminees > 1 ? 'interventions terminées':'intervention terminée'}</div>
                    <div style={{width: 70, textAlign: 'center'}}>
                        {hasEvenement(round) && <img src={eventIcon} />}
                    </div>
                </div>
                {
                   isTourneeOpen(round.id, tourneesOpen) !== -1 && this._tournee()
                }
            </div>

        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        theme: state.appContent.theme,
        tourneesOpen: state.appContent.tourneesOpen,
    }
}

export default connect(
    mapStateToProps,
    {act_onClickTournee}
)(Round)
