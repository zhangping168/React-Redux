var nextHobbyId = 1;
var nextMovieId = 1;

export var nameReducer = (state='No Name', action)=>{

		switch(action.type){
			case 'CHANGE_NAME':
				return action.name
			default:
				return state;
		}
};

export var hobbiesReducer = (state=[], action)=>{

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

export var moviesReducer = (state=[], action)=>{
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

var mapDefault = {
	isFetching:false,
	url:undefined
};

export var mapReducer = (state = mapDefault, action)=>{
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
