import React, {Component} from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import materielIncorrect from '../assets/materielIncorrect.svg';
import dechetIncorrect from '../assets/dechetIncorrect.svg';
import infaisabiliteIntervention from '../assets/infaisabiliteIntervention.svg';
import PhotoDetail from './PhotoDetail';
import {EVENEMENT_TYPE} from '../constants';


class EvenementDetail extends Component {

    render() {
        let {colors} = this.props.theme;
        let {evenement} = this.props;
        return (
            <div style={{width: '100%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', padding: '20px 30px', marginBottom: 5, border: '1px solid rgba(185, 193, 205, 0.34)'}}>
                <div style={{paddingBottom: 15, borderBottom: '1px solid #dbdde4', display: 'flex', alignItems: 'center'}}>
                    <div style={{minWidth: 100}}>
                        {
                            EVENEMENT_TYPE.MI === evenement.typeId ? <img src={materielIncorrect}/> : EVENEMENT_TYPE.DI === evenement.typeId ? <img src={dechetIncorrect}/> : <img src={infaisabiliteIntervention}/>
                        }
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                        <div style={{fontFamily: 'robotoRegular', fontSize: 12, color: colors.DARK_BLUE}}>
                            <Moment locale="fr" parse="HH:mm" format="HH[h]mm">{evenement.date}</Moment>
                        </div>
                        <div style={{fontFamily: 'robotoBold', fontSize: 17, color: colors.MEDIUM_BLUE}}>
                            {evenement.type}
                        </div>
                        <div style={{fontFamily: 'robotoRegular', color: colors.DARK_BLUE}}>
                            {evenement.sousTypeId} : {evenement.sousType}
                        </div>
                    </div>
                </div>
                <div style={{flex: 1, display: 'flex', flexWrap: 'wrap', paddingTop: 15}}>
                    {
                        evenement.fichierEvenements.map( photo => <PhotoDetail key={photo.fichierId} photo={photo}/>)
                    }
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
    {}
)(EvenementDetail)
