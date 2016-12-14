var axios = require('axios');

export var changeName = (name)=>{
	return {
		type:'CHANGE_NAME',
		name
	}
};

export var addHobby = (hobby)=>{
	return {
		type:'ADD_HOBBY',
		hobby
	}
};

export var removeHobby = (id)=>{
	return {
			type:'REMOVE_HOBBY',
			id
	}
};

export var addMovie = (title, genre)=>{
	return {
		type:'ADD_MOVIE',
		title,
		genre
	}
};

export var removeMovie = (id)=>{
	return {
		type:'REMOVE_MOVIE',
		id
	}
};


export var startFetchingLocation = ()=>{
	return {
		type:'START_FETCHING_LOCATION'
	}
};

export var completeFetchingLocation = (url)=>{
	return {
		type:'COMPLETE_FETCHING_LOCATION',
		url
	}
};

export var fetchLocation = ()=>{
	return (dispatch, getState)=>{
		dispatch(startFetchingLocation());

		axios.get('http://ipinfo.io/').then(function(res){
			var loc = res.data.loc;
			var baseURl = 'https://www.google.ca/maps/?q=';
				dispatch(completeFetchingLocation(baseURl + loc));
		});
	};

};
