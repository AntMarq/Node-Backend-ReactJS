import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import {Alert} from 'reactstrap';
import Moment from 'react-moment';
import eventIcon from '../../assets/suezEvent.svg';
import {act_onNotifRemoved, act_onNotifClicked} from '../../actions';
import Header  from '../../components/Header';
import RoundsList  from '../../components/RoundsList';
import InterventionDetail  from '../../components/InterventionDetail';
import {INTERVENTION_STATUS} from '../../constants';

class Home extends Component {

  _createAlert(notif, idx){
    return notif.type==='inter' ? 
          <Alert color="light" 
              key={`int${idx}`}
              toggle={()=>this.props.act_onNotifRemoved(notif)} 
              style={{...styles.notif, bottom:idx*145}}>
              <p style={{textAlign:'start', fontSize:12, margin:5}} ><Moment locale="fr" date={new Date()} format="HH[h]mm"/></p>
              Statut de l'intervention {notif.inter} est maintenant : {INTERVENTION_STATUS[notif.status]}
              <p><a style={styles.link} onClick={()=>this.props.act_onNotifClicked(notif)}>Voir l'intervention</a> </p>
          </Alert> :
          <Alert color="light" 
              key={`evnt${idx}`}
              toggle={()=>this.props.act_onNotifRemoved(notif)} 
              style={{...styles.notif, bottom:idx*145}}>
              <p style={{textAlign:'start', fontSize:12, margin:5}} ><Moment locale="fr" date={new Date()} format="HH[h]mm"/> </p>
              <img src={eventIcon} /> Un nouvel évènement pour l'intervention #{notif.event.interventionId} vient d'arriver.
              <p><a style={styles.link} onClick={()=>this.props.act_onNotifClicked(notif)}>Voir l'évènement</a> </p>
          </Alert>
  }


  render(){
    let {colors} = this.props.theme;
    return (
      <div style={{height:'100%', display:'flex', flexDirection: 'column', flex:1, backgroundColor:colors.MAIN_THEME_BACKGROUND, color: 'white'}}>
          {
            this.props.notifs.map((notif, idx)=>this._createAlert(notif, idx))
          }
          <Header/>
          <Route exact path={this.props.match.path} component={RoundsList} />
          <Route path={`${this.props.match.path}/intervention/:id`} component={InterventionDetail} />
      </div>
    )
  }
  
}

const styles={
  notif:{
    position:'absolute', 
    textAlign:'end',
    lineHeight: '30px',  
    right:10,
    borderWidth:1,
    borderColor:'rgba(61, 70, 108, 0.18)',
    borderRadius:8,
    fontSize:14,
    transition:'initial',
    zIndex: 10
  },
  link:{
    textDecoration:'underline',
    color:'#3C3C3C',
    cursor:'pointer'
  }

};

function mapStateToProps(state, ownProps){
    return {
       theme: state.appContent.theme,
       username: state.appContent.username,
       rounds: state.appContent.rounds,
       selectedIntervention: state.appContent.selectedIntervention,
       notifs:state.appContent.notifs
    }
}

export default connect(
  mapStateToProps,
  {act_onNotifRemoved, act_onNotifClicked}
)(Home)