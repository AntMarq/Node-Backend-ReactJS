//  ####### INIT #######
export const act_initAppData = ()=>{
    return {
        type : 'INIT_DATA'
    }
};

export const act_dataLoaded = (rounds)=>{
    return {
        type:'DATA_LOADED', rounds
    }
};

//  ####### LOGIN PAGE #######
export const act_emailChanged = (l)=>{
    return {
        type : 'LOGIN_EMAIL_CHANGED',l
    }
};

export const act_kmlChanged = (b)=>{
    return {
        type : 'LOGIN_KML_CHANGED',b
    }
};

export const act_doLogin = (p)=>{
    return {
        type : 'LOGIN_AUTHENTICATE',p
    }
};

export const act_onLoginSuccess = (tokenData)=>{
    return {
        type:'LOGIN_SUCCESS', tokenData
    }
};

export const act_onLoginFailed=(err)=>{
    return {
        type:'LOGIN_FAILED',err
    }
};

export const act_signOut = () => {
    return {
        type: 'SIGNOUT'
    }
};

//  ####### REALTIME #######
export const act_onRT_InterUpdate=(frame)=>{
    return {
        type:'REALTIME_UPDATE_INTER', frame
    }
};

export const act_onRT_EventUpdate=(frame)=>{
    return {
        type:'REALTIME_UPDATE_EVENT', frame
    }
};

//  ####### TOURNEES #######
export const act_onClickTournee = (tourneeId) => {
    return {
      type: 'ON_CLICK_TOURNEE', tourneeId
    }
};

export const act_onClickEvenementIntervention = (interventionId) => {
    return {
      type: 'ON_CLICK_EVENEMENT_INTERVENTION', interventionId
    }
};

export const act_onSelectIntervention = (interventionId) => {
    return {
      type: 'ON_SELECT_INTERVENTION', interventionId
    }
};

export const act_onFetchInterventionSuccess = (intervention) => {
    return {
        type: 'ON_FETCH_INTERVENTION_SUCCESS', intervention
    }
};

export const act_onDownloadPdf = (pdfInterId, numBi) => {
  return {
      type: 'ON_DOWNLOAD_PDF', pdfInterId, numBi
  }
};

//  ####### INTERVENTIONS #######
export const act_goToTournees = () => {
    return {
        type: 'GO_TO_HOME'
    }
};

export const act_onSelectPhoto = (photo) => {
    return {
        type: 'ON_SELECT_PHOTO', photo
    }
};

export const act_closePhotoModal = () => {
    return {
        type: 'CLOSE_PHOTO_MODAL'
    }
};

//  ####### EVENEMENTS #######
export const act_onFetchEvenementSuccess = (evenement) => {
    return {
        type: 'ON_FETCH_EVENEMENT_SUCCESS', evenement
    }
};

//  ####### NOTIFS #######
export const act_onNotifClicked = (notif) => {
    return {
        type: 'ON_NOTIF_CLICKED', notif
    }
};

export const act_onNotifRemoved = (notif) => {
    return {
        type: 'ON_NOTIF_REMOVED', notif
    }
};
