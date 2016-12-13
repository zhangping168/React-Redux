var redux = require('redux');

console.log('Start Redux ...');

var stateDefault = {
	name : 'Anonymous',
	hobbies:[],
	movies:[]
};

var nextHobbyId = 1;
var nextMovieId = 1;
var oldReducer = (state = stateDefault, action)=>{

	switch (action.type){
		case 'CHANGE_NAME':
			return{
				...state,
				name:action.name
			};
		case 'ADD_HOBBY':
			return {
					...state,
					hobbies:[
						...state.hobbies,
						{
							id:nextHobbyId++,
							hobby:action.hobby
						}
					]
			}

		case 'REMOVE_HOBBY':
			return{
				...state,
				hobbies:state.hobbies.filter((hobby)=> hobby.id !== action.id )
			}
		case 'ADD_MOVIE':
			return {
				...state,
				movies:[
					...state.movies,
					action.movie
				]
			}

		case 'REMOVE_MOVIE':
			return {
				...state,
				movies:state.movies.filter((movie)=> movie.id !== action.id )
			}
		default:
			return state;
	}

};

var nameReducer = (state='No Name', action)=>{

		switch(action.type){
			case 'CHANGE_NAME':
				return action.name
			default:
				return state;
		}
};

var hobbiesReducer = (state=[], action)=>{

		switch(action.type){
			case 'ADD_HOBBY':
				return [
					...state,
					{
						id:nextHobbyId++,
						hobby:action.hobby
					}
				]
			case 'REMOVE_HOBBY':
				return state.filter((hobby)=> hobby.id !== action.id)
			default:
				return state;
		}
};
var moviesReducer = (state=[], action)=>{
	switch(action.type){
		case 'ADD_MOVIE':
			return [
				...state,
				action.movie
			]
		case 'REMOVE_MOVIE':
		return state.filter((movie)=> movie.id !== action.id)
		default:
			return state;
	}
};
var reducer = redux.combineReducers({
	name:nameReducer,
	hobbies:hobbiesReducer,
	movies: moviesReducer
});
var store = redux.createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(()=>{
	var state = store.getState();

	console.log('new State',state);

});
var action = {
	type:'CHANGE_NAME',
	name:'Ping'
};

store.dispatch(action);

store.dispatch({
	type:'ADD_HOBBY',
	hobby:'Running'
})

store.dispatch({
	type:'ADD_HOBBY',
	hobby:'Reading'
})

store.dispatch({
	type:'ADD_MOVIE',
	movie:{
		id:nextMovieId++,
		title:'First movie',
		genre:'Action'
	}
})

store.dispatch({
	type:'ADD_MOVIE',
	movie:{
		id:nextMovieId++,
		title:'Second movie',
		genre:'Comedy'
	}
})

store.dispatch({
	type:'REMOVE_HOBBY',
	id:2
});

store.dispatch({
	type:'REMOVE_MOVIE',
	id:1
});
