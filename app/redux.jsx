var redux = require('redux');
var axios = require('axios');

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
				{
					id: nextMovieId++,
					title:action.title,
					genre:action.genre
				}
			]
		case 'REMOVE_MOVIE':
		return state.filter((movie)=> movie.id !== action.id)
		default:
			return state;
	}
};

var changeName = (name)=>{
	return {
		type:'CHANGE_NAME',
		name:name
	}
};

var addHobby = (hobby)=>{
	return {
		type:'ADD_HOBBY',
		hobby:hobby
	}
};

var removeHobby = (id)=>{
	return {
			type:'REMOVE_HOBBY',
			id:id
	}
};

var addMovie = (title, genre)=>{
	return {
		type:'ADD_MOVIE',
		title:title,
		genre:genre
	}
};

var removeMovie = (id)=>{
	return {
		type:'REMOVE_MOVIE',
		id:id
	}
};

var mapDefault = {
	isFetching:false,
	url:undefined
}
var mapReducer = (state = mapDefault, action)=>{
	switch (action.type) {
		case 'START_FETCHING_LOCATION':
				return {
					isFetching:true,
					url:undefined
				};

		case 'COMPLETE_FETCHING_LOCATION':
				return {
					isFetching:false,
					url:action.url
				};

		default:
			return state;
	}
};

var startFetchingLocation = ()=>{
	return {
		type:'START_FETCHING_LOCATION'
	}
};

var completeFetchingLocation = (url)=>{
	return {
		type:'COMPLETE_FETCHING_LOCATION',
		url:url
	}
};

var fetchLocation = ()=>{
	store.dispatch(startFetchingLocation());

	axios.get('http://ipinfo.io/').then(function(res){
		var loc = res.data.loc;
		var baseURl = 'https://www.google.ca/maps/?q=';
			store.dispatch(completeFetchingLocation(baseURl + loc));
	});

};


var reducer = redux.combineReducers({
	name:nameReducer,
	hobbies:hobbiesReducer,
	movies: moviesReducer,
	map:mapReducer
});
var store = redux.createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(()=>{
	var state = store.getState();

	console.log('new State',state);

	if(state.map.isFetching){
		document.getElementById('app').innerHTML = 'Loading...';
	}else if(state.map.url){
		document.getElementById('app').innerHTML = '<a href="'+state.map.url +'" target="_blank">View your location</a>';
	}

});

fetchLocation();
store.dispatch(changeName('ZhangPing'));

store.dispatch(addHobby('Watching TV'));
store.dispatch(addHobby('Reading Book'));
store.dispatch(addHobby('Playing Videogame'));

store.dispatch(addMovie('Running Bride'));
store.dispatch(addMovie('The Matrix'));
store.dispatch(addMovie('Jason Bourne'));

store.dispatch(removeHobby(2));
store.dispatch(removeMovie(1));
