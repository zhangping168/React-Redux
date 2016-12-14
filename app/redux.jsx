var redux = require('redux');


console.log('Start Redux ...');

var actions = require('./actions/index.jsx');
var store = require('./store/configStore.jsx').config();

store.subscribe(()=>{
  var state = store.getState();

  console.log('new State',state);

  if(state.map.isFetching){
    document.getElementById('app').innerHTML = 'Loading...';
  }else if(state.map.url){
    document.getElementById('app').innerHTML = '<a href="'+state.map.url +'" target="_blank">View your location</a>';
  }

});

store.dispatch(actions.fetchLocation());
store.dispatch(actions.changeName('ZhangPing'));

store.dispatch(actions.addHobby('Watching TV'));
store.dispatch(actions.addHobby('Reading Book'));
store.dispatch(actions.addHobby('Playing Videogame'));

store.dispatch(actions.addMovie('Running Bride'));
store.dispatch(actions.addMovie('The Matrix'));
store.dispatch(actions.addMovie('Jason Bourne'));

store.dispatch(actions.removeHobby(2));
store.dispatch(actions.removeMovie(1));
