import React, {Component} from 'react';
import {connect} from 'react-redux';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {act_signOut} from '../actions';
import logo from '../assets/suezLogo.svg'

class Header extends Component {
    render() {
        let {colors} = this.props.theme;
        let _txt = this.props.selectInt.id ? 'DETAIL INTERVENTION' : 'LISTE DES TOURNÉES';
        return (
            <div style={{height: 50, width: '100%', display:'flex', backgroundColor:colors.DARK_BLUE, color: 'white', alignItems: 'center'}}>
                <img src={logo} style={{marginLeft: 34}}/>
                <div style={{fontFamily: 'dinMedium', fontSize: '18', paddingLeft: 10}}>SUIVIS DES TOURNÉES :</div>
                <div style={{flex: 1, paddingLeft: 5, fontFamily: 'din', fontSize: '17'}}>{_txt}</div>
                <div style={{fontFamily: 'din', fontSize: '18'}}>{this.props.agenceName.toUpperCase()}</div>
                <div style={{padding: '0 25px', color: colors.LIGHT_GREEN, fontFamily: 'dinMedium', fontSize: '18'}}>
                    <UncontrolledDropdown >
                        <DropdownToggle caret style={{padding: '0 25px', color: colors.LIGHT_GREEN, 
                                        boxShadow:'0 0 0 3px rgba(134, 142, 150, 0)',
                                        cursor:'pointer',
                                        fontFamily: 'dinMedium', fontSize: '18', backgroundColor:'transparent'}} >
                                        {`${this.props.firstname}`}&nbsp;{`${this.props.lastname}`}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={()=>this.props.act_signOut()}>Se déconnecter</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
                <div style={{width: 197, textAlign: 'center', color: colors.LIGHT_GREEN, fontFamily: 'dinMedium', fontSize: '18'}}>MESSAGERIE</div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        theme: state.appContent.theme,
        firstname: state.appContent.firstname,
        lastname: state.appContent.lastname,
        selectInt:state.appContent.selectedIntervention,
        agenceName:state.appContent.agenceName
    }
}

export default connect(
    mapStateToProps,
    {act_signOut}
)(Header)
