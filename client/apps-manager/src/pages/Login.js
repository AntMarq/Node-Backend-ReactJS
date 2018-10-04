import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, CardBody, CardTitle, Form, FormGroup, Label, Input} from 'reactstrap';
import {act_emailChanged, act_kmlChanged, act_doLogin} from '../actions';
import spinner from '../assets/spinner.gif';
import suezLogo from '../assets/suezLogoWithName.svg';
import './Login.css';


class Login extends Component{

    state = {
        pwd: ""
    };

    _createInputState(){
        let {loginMail, loginRmbrMe, errorMsg, infoMsg} = this.props;  
        let {colors} = this.props.theme;      
        return (
            <Form>
            <FormGroup style={{marginBottom: 15}}>
            <Label for="emailField" style={{fontFamily: 'robotoRegular', color: 'white', marginBottom: 0}}>Identifiant</Label>
            <Input type="email" name="email" id="emailField" placeholder="Tapez votre identifiant ici" value={loginMail} style={{height: 60, border: '1px solid #c4de51', borderRadius: 8}}
                    onChange={e=>this.props.act_emailChanged(e.target.value)}
            />
            </FormGroup>
            <FormGroup style={{marginBottom: 15}}>
            <Label for="pwdField" style={{fontFamily: 'robotoRegular', color: 'white', marginBottom: 0}}>Mot de passe</Label>
            <Input type="password" name="password" id="pwdField" placeholder="Tapez votre mot de passe ici" value={this.state.pwd} style={{height: 60, border: '1px solid #c4de51', borderRadius: 8}}
                onChange={e=>this.setState({pwd:e.target.value})}
            />
            </FormGroup>
            <FormGroup check style={{marginBottom: 40}}>
            <Label check style={{color: 'white'}}>
                <Input type="checkbox" checked={loginRmbrMe} 
                onChange={e=>this.props.act_kmlChanged(e.target.checked)}/>{' '}
                Se souvenir de mon identifiant
            </Label>
            </FormGroup>
                <Button style={{height: 80, width: '100%', backgroundColor: '#aadc14', color: colors.PURPLE, borderRadius: 8, fontFamily: 'robotoBold'}}
                        onClick={()=>{this.props.act_doLogin(this.state.pwd); this.setState({pwd:""})}}>
                    CONNEXION
                </Button>
                {errorMsg && <div style={{textAlign:'center', color:colors.ERROR_MESSAGE}}>{errorMsg}</div>}
                {infoMsg && <div style={{textAlign:'center', color:colors.INFO_MESSAGE}}>{infoMsg}</div>}
            </Form>

        )

    }

    _createWaitState(){
        return (<CardBody><CardTitle style={{textAlign:'center'}}>Please wait</CardTitle>
                   <div style={{textAlign:'center'}}>
                         <img src={spinner} style={{width:50, height:50}}/>
                    </div>
                </CardBody>)
    }

render() {
    let block = this.props.isLoggingIn ? this._createWaitState() : this._createInputState();
       return (
           <div style={{height:'100%', display:'flex', flex:1, paddingTop:60, justifyContent:'center', background: 'linear-gradient(-135deg, #94c0c1, #02104e)'}}>
            <div style={{display: 'flex',flexDirection: 'column', width: 300}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center', width: '100%'}}>
                    <img src={suezLogo}/>
                    <div style={{fontFamily: 'dinMedium', fontSize: 38, letterSpacing: 2.70, color: '#83c306'}}>SI EMBARQUÉ</div>
                </div>
                <div>
                    {block}
                </div>
            </div>
           </div>
       )
    }

}

function mapStateToProps(state, ownProps){
    return {
        theme: state.appContent.theme,
        loginMail :state.appContent.loginMail,
        loginRmbrMe: state.appContent.loginRmbrMe,
        isLoggingIn: state.appContent.isLoggingIn,
        errorMsg: state.appContent.loginErrorMsg,
        infoMsg:state.appContent.loginInfoMsg
    }
}

export default connect(
  mapStateToProps,
  {act_emailChanged, act_kmlChanged, act_doLogin}
)(Login)