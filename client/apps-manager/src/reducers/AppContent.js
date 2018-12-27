//reducer.js

import {push} from 'react-router-redux';
import {act_dataLoaded, act_onLoginFailed, act_onLoginSuccess,act_get_All_Recipes,act_onAllRecipesSuccess, act_onFetchEvenementSuccess, act_onFetchInterventionSuccess, act_onSelectIntervention, act_goToTournees} from '../actions';
import {STORAGE_KEYS, ROLES} from '../constants';
import {RealTimeProvider} from '../providers/RealTimeProvider';
import {doLogin, fetchAllRecipes, fetchIntervention, fetchEvenement, fetchPdfInterId} from '../services/WebServices';
import {THEME} from '../style';
import {updateInterventionStatus, updateEvenement, isTourneeOpen, isInterventionOpen, findTourneeFromInterventionId, showPdf} from '../utils';


const reducer = (state, action)=>{

    if(!state){
        let rmbr = JSON.parse((localStorage.getItem(STORAGE_KEYS.rememberMe) || 'false'));
        state= {
            isLogged:false,
            theme:THEME,
            loginMail :rmbr ? localStorage.getItem(STORAGE_KEYS.userLogin):'',
            loginRmbrMe:rmbr,
            isLoggingIn:false,
            username: "",
            firstname: "",
            lastname: "",
            userId: undefined,
            agenceName:"",
            agenceId: undefined,
            rounds: [],
            interventions: [],
            tourneesOpen: [],
            interventionsOpen: [],
            selectedRound: {},
            selectedIntervention: {},
            notifs:[],
            selectedPhoto: {},
            recipes:[]
        };
    }

    switch(action.type){
        // case 'INIT_DATA':
        //     console.log("INIT_DATA");
        //     Promise.all([fetchAllRecipes()]).then(
        //         (results)=>{
        //             action.asyncDispatch(act_dataLoaded(results[0]));
        //         }
        //     )
        //     return {...state};
        // break;
        // case 'DATA_LOADED':
        // console.log("DATA_LOADED");
        //     RealTimeProvider.start(state.agenceId);
        //     action.asyncDispatch(push('/home'));
        //     let _interventions = [];
        //     action.rounds.forEach(round => _interventions = _interventions.concat(round.interventions));
        //     action.rounds.sort((a, b) => {return new Date(a.date) > new Date(b.date)});
        //     return {...state,  isLoggingIn:false, rounds: action.rounds, interventions: _interventions};
        // break;
        case 'RESET_PWD_BACK_REQUEST':
            action.asyncDispatch(push('/login'));
            return {...state};
        break;
        break;
        case 'LOGIN_EMAIL_CHANGED':
            return {...state, loginMail:action.l};
        break;
        case 'LOGIN_AUTHENTICATE':
            doLogin(state.loginMail, action.p).then((tokenData)=>{
                action.asyncDispatch(act_onLoginSuccess(tokenData))

                // if(ROLES.ADMIN === tokenData.role) {
                //     action.asyncDispatch(act_onLoginSuccess(tokenData))
                // } else {
                //     action.asyncDispatch(act_onLoginFailed(417))
                // }
                })
                .catch((err)=>{
                    action.asyncDispatch(act_onLoginFailed(err)
                    )}
                );

            return {...state, isLoggingIn:true, loginErrorMsg:undefined};
        break;
        case 'LOGIN_KML_CHANGED':
            if(action.b){
                localStorage.setItem(STORAGE_KEYS.rememberMe, 'true')
            }
            else{
                localStorage.removeItem(STORAGE_KEYS.rememberMe);
                localStorage.removeItem(STORAGE_KEYS.userLogin)
            }
            return {...state, loginRmbrMe:action.b};
        break;
        case 'LOGIN_SUCCESS':
            let _loginState = true;
                if(state.loginRmbrMe){
                    localStorage.setItem(STORAGE_KEYS.userLogin, state.loginMail);
                }
                action.asyncDispatch(act_goToTournees());


            return {...state, isLoggingIn:_loginState, isLogged:true, username: action.tokenData.username, firstname: action.tokenData.firstname,
                lastname: action.tokenData.lastname, userId: action.tokenData.userId, agenceName:action.tokenData.agenceName, agenceId: action.tokenData.agenceId};
        break;
        case 'LOGIN_FAILED':
            let _ret = {isLoggingIn:false};
            if(action.err && action.err === 401){
                _ret.loginErrorMsg = "wrong login and/or password";
            } 
            // else if (action.err && action.err === 417) {
            //     _ret.loginErrorMsg = "You are not allowed to use this portal";
            // }
            return {...state, ..._ret};
        break;
        case 'GET_ALL_RECIPES' :
            console.log("coucou");
            fetchAllRecipes(action.p).then((data)=>{
                    console.log("recipes = ", data);
                    action.asyncDispatch(act_onAllRecipesSuccess(data))
            })
            .catch((err)=>{
                action.asyncDispatch(act_onLoginFailed(err)
                )}
            );
            return {...state}
        break;

        case 'REALTIME_UPDATE_INTER':
            let _round  = state.selectedRound;
            let _selectedInter = state.selectedIntervention;
            let _notifs = state.notifs;
            if(_round && _round.id === action.frame.tourneeId){     
                _round = updateInterventionStatus(action.frame.id, action.frame.tourneeId, action.frame.status, action.frame.pdfInterId, action.frame.heureReelDebut, action.frame.heureReelFin, [_round])[0];
                _selectedInter = {...state.selectedIntervention, status:action.frame.status, pdfInterId: action.frame.pdfInterId, heureReelDebut: action.frame.heureReelDebut, heureReelFin: action.frame.heureReelFin};
            }
            else{
                _notifs.push({type:'inter', inter: action.frame.id, status:action.frame.status})
            }

            let _rounds = updateInterventionStatus(action.frame.id, action.frame.tourneeId, action.frame.status, action.frame.pdfInterId, action.frame.heureReelDebut, action.frame.heureReelFin, state.rounds);
            return {...state, rounds:_rounds, selectedRound:_round, selectedIntervention:_selectedInter, notifs:_notifs};
        break;
        case 'REALTIME_UPDATE_EVENT':
            fetchEvenement(action.frame.id).then((evenement)=>{
                action.asyncDispatch(act_onFetchEvenementSuccess(evenement))
            })
            return {...state};
        break;
        case 'ON_FETCH_EVENEMENT_SUCCESS':
            let _tournees = updateEvenement(action.evenement, state.rounds);
            let _selInter  = state.selectedIntervention;
            let _selRound  = state.selectedRound;

            if(_selInter.id && _selInter.id === action.evenement.interventionId){ 
                _selRound = findTourneeFromInterventionId(_tournees, action.evenement.interventionId);
                _selInter = {...state.selectedIntervention, evenements:[...state.selectedIntervention.evenements,action.evenement ]}
            }
            else{
                _selRound = findTourneeFromInterventionId(_tournees, action.evenement.interventionId);
            }
            return {...state, rounds: _tournees, selectedIntervention:_selInter, selectedRound:_selRound, notifs:[...state.notifs, {type:'event', event:action.evenement}]};
        break;
        case 'ON_CLICK_TOURNEE':
            let _tourneesOpen = state.tourneesOpen;
            let _findTournee = isTourneeOpen(action.tourneeId, _tourneesOpen);
            if(_findTournee !== -1) {
                _tourneesOpen.splice(_findTournee, 1);
            } else {
                _tourneesOpen.push(action.tourneeId);
            }
            return {...state, tourneesOpen: [..._tourneesOpen]};
        break;
        case 'ON_CLICK_EVENEMENT_INTERVENTION':
            let _interventionsOpen = state.interventionsOpen;
            let _findIntervention = isInterventionOpen(action.interventionId, _interventionsOpen);
            if(_findIntervention !== -1) {
                _interventionsOpen.splice(_findIntervention, 1);
            } else {
                _interventionsOpen.push(action.interventionId);
            }
            return {...state, interventionsOpen: [..._interventionsOpen]};
        break;

        case 'ON_SELECT_INTERVENTION':
            fetchIntervention(action.interventionId).then((intervention)=>{
                action.asyncDispatch(act_onFetchInterventionSuccess(intervention))
            });
            return {...state};
        break;
        case 'ON_FETCH_INTERVENTION_SUCCESS':
            let __tourneesOpen =  state.tourneesOpen;
            let __tournee = findTourneeFromInterventionId(state.rounds, action.intervention.id);
            let _tourneeIdx = isTourneeOpen(__tournee.id, __tourneesOpen);
            
            if(_tourneeIdx !== -1) {
                __tourneesOpen.splice(_tourneeIdx, 1);
            }
            action.asyncDispatch(push('/home/intervention/'+action.intervention.id));
            return {...state, selectedIntervention: action.intervention, selectedRound: __tournee, tourneesOpen:[...__tourneesOpen]};
        break;

        case 'ON_DOWNLOAD_PDF':
            fetchPdfInterId(action.pdfInterId).then((blob) => {
               showPdf(blob, action.numBi);
        });
            return {...state};
        break;
        case 'ON_NOTIF_CLICKED':
            let _inter = action.notif.inter || action.notif.event.interventionId;
            action.asyncDispatch(act_onSelectIntervention(_inter));
            return {...state, notifs:state.notifs.filter(it=> it !== action.notif)};
        break;
        case 'ON_NOTIF_REMOVED':
            return {...state, notifs:state.notifs.filter(it=> it !== action.notif)};
        break;
        case 'GO_TO_HOME':
            action.asyncDispatch(push('/home'));
            return {...state, selectedRound:{}, selectedIntervention:{}};
        break;
        case "SIGNOUT":
            RealTimeProvider.close(state.agenceId);
            action.asyncDispatch(push('/login'));
            return {...state, selectedRound:{}, selectedIntervention:{}};
        break;
        case 'ON_SELECT_PHOTO':
            return {...state, selectedPhoto: action.photo};
        break;

        case 'CLOSE_PHOTO_MODAL':
            return {...state, selectedPhoto: {}};
            break;
        default : return {...state}
    }
};


export default reducer;