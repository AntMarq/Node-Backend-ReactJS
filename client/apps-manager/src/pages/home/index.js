import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody } from 'reactstrap'; 
import Moment from 'react-moment';
import eventIcon from '../../assets/suezEvent.svg';
import {act_onNotifRemoved, act_onNotifClicked} from '../../actions';
import Header  from '../../components/Header';
import RoundsList  from '../../components/RoundsList';
import InterventionDetail  from '../../components/InterventionDetail';
import {INTERVENTION_STATUS} from '../../constants';
import {act_get_All_Recipes, act_onAllRecipesSuccess} from '../../actions';


class Home extends Component {

  // _createAlert(notif, idx){
  //   return notif.type==='inter' ? 
  //         <Alert color="light" 
  //             key={`int${idx}`}
  //             toggle={()=>this.props.act_onNotifRemoved(notif)} 
  //             style={{...styles.notif, bottom:idx*145}}>
  //             <p style={{textAlign:'start', fontSize:12, margin:5}} ><Moment locale="fr" date={new Date()} format="HH[h]mm"/></p>
  //             Statut de l'intervention {notif.inter} est maintenant : {INTERVENTION_STATUS[notif.status]}
  //             <p><a style={styles.link} onClick={()=>this.props.act_onNotifClicked(notif)}>Voir l'intervention</a> </p>
  //         </Alert> :
  //         <Alert color="light" 
  //             key={`evnt${idx}`}
  //             toggle={()=>this.props.act_onNotifRemoved(notif)} 
  //             style={{...styles.notif, bottom:idx*145}}>
  //             <p style={{textAlign:'start', fontSize:12, margin:5}} ><Moment locale="fr" date={new Date()} format="HH[h]mm"/> </p>
  //             <img src={eventIcon} /> Un nouvel évènement pour l'intervention #{notif.event.interventionId} vient d'arriver.
  //             <p><a style={styles.link} onClick={()=>this.props.act_onNotifClicked(notif)}>Voir l'évènement</a> </p>
  //         </Alert>
  // }

  // Mounting the component causes an action
  componentDidMount(){
    // fetch("https://jsonbin.io/b/59f721644ef213575c9f6531")
    // .then( response => response.json())
    // .then( data => {
    //   let posts = {
    //     data: data
    //   };
    //   this.updatePosts(posts);
    // });
    console.log("data = ", this.props.act_get_All_Recipes());
  }


  render(){
    let {colors} = this.props.theme;
    return (
      <div>
        <Header/>
        <CardDeck style={{padding: 10}}>
          <Card>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
          <Card>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
          <Card>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
          <Card>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
          <Card>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
        </CardDeck>
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
  {act_onNotifRemoved, act_onNotifClicked,act_get_All_Recipes}
)(Home)