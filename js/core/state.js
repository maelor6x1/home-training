import {loadState,saveState} from './storage.js';
export const state=loadState();
export function commit(){saveState(state)}
export function setAnswers(key,value){state.answers[key]=value;commit()}
export function setOnboard(value){state.onboard=value;commit()}
