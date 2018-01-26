import { createStore, combineReducers, applyMiddleware } from "redux";
import { connect, Dispatch, MapStateToProps } from 'react-redux';

import App from "../components/app.component";
import {IAction, Actions} from "../actions/app.actions";
import { IReducerState } from "../reducers/app.reducer"

export interface IMapState {
	get: IReducerState
}

const mapStateToProps = (state:IMapState) => {
	return {
		get: state.get,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
	return {
		setNickname: (msg: string) => dispatch(Actions.setNickname(msg)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
