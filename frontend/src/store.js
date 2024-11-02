import React from 'react'
import {combineReducers,legacy_createStore} from 'redux'
const Cartitem=(state=0,action) => {
    if(action.type==="plus")
    {
        return state+1;
    }
    else if(action.type==="minus")
    {
        return state-1;
    }
    else if(action.type==="cval")
        {
            return action.cdata;
        }
    else{
        return state;
    }
}
const rootred=combineReducers({
    Cartitem
})
const store=legacy_createStore(rootred);
export default store;