import React, {Component} from 'react';
import {connect} from 'react-redux';
import Round from './Round'


class RoundsList extends Component {
    render() {
        let {colors} = this.props.theme;
        let {rounds, interventions} = this.props;
        return (
            <div style={{width: '100%', display:'flex', flexDirection: 'column', flex: 1}}>
                <div style={{width: '100%', minHeight: 50, display:'flex', alignItems: 'center', padding: '0 204px', backgroundColor: colors.LIGHT_GREY, color: colors.PURPLE}}>
                    <div style={{fontFamily: 'din'}}>TOTAL :&nbsp;</div>
                    <div style={{fontFamily: 'dinMedium', fontSize: '17'}}>{rounds.length} TOURNÉES : {interventions.length} INTERVENTIONS</div>
                </div>
                <div style={{padding: '10px 204px 0', flex: 1, overflow: 'auto'}}>
                    {
                        rounds.map((round) => <Round key={round.id} round={round} />)
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        theme: state.appContent.theme,
        rounds: state.appContent.rounds,
        interventions: state.appContent.interventions
    }
}

export default connect(
    mapStateToProps,
    {}
)(RoundsList)
