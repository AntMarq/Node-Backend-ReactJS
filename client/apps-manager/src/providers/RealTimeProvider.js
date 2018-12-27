//Specific
import EventBus from 'vertx3-eventbus-client';
import {act_onRT_InterUpdate, act_onRT_EventUpdate} from '../actions';
import {URL} from '../constants';

export const RealTimeProvider = {
    init: (store) => {
        this._store = store;
    },

    start : (agenceId)=>{
        this._eb = new EventBus(URL.host+'/eventbus');
        this._eb.onopen = ()=> {
            this._eb.registerHandler('rt-data.'+agenceId, (error, message)=>{
                let _d = message.body;
                switch(_d.type){
                    case 'inter':
                        this._store.dispatch(act_onRT_InterUpdate(_d));
                    break;
                    case 'event':
                        this._store.dispatch(act_onRT_EventUpdate(_d));
                    break;
                    default: return;
                }
            });
        }
    },
    close : (agenceId)=>{
        this._eb.unregisterHandler('rt-data.'+agenceId, (error, message)=>{
        });
        this._eb.close();
    }
};