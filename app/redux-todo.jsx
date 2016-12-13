var redux = require('redux');

console.log('Start Redux-Todo ...');

var stateDefault = {
		searchText:'',
		showCompleted:false,
		todos:[]
};
var reducer = (state = stateDefault, action)=>{
	switch (action.type) {
		case 'CHANGE_SEARCH_TEXT':
			return {
				...state,
				searchText:action.searchText
			};

		default:
			return state;

	}

};
var store = redux.createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(()=>{
	var state = store.getState();

	document.getElementById('app').innerHTML = state.searchText;
	console.log('new state',state);
});

store.dispatch({
	type:'CHANGE_SEARCH_TEXT',
	searchText:'Go to the park'
});

store.dispatch({
	type:'CHANGE_SEARCH_TEXT',
	searchText:'Shove the snow'
});
