import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDsEebjF_6BURXEx2Fw_jfESwFbUoczB_Y",
    authDomain: "nbafullstack-860f8.firebaseapp.com",
    databaseURL: "https://nbafullstack-860f8.firebaseio.com",
    projectId: "nbafullstack-860f8",
    storageBucket: "nbafullstack-860f8.appspot.com",
    messagingSenderId: "679152466743",
    appId: "1:679152466743:web:b1d64f2e564ca74dda78b2"
  };
  
  firebase.initializeApp(firebaseConfig);

  const firebaseDb = firebase.database();
  const firebaseArticles = firebaseDb.ref('articles');
  const firebaseTeams = firebaseDb.ref('teams');
  const firebaseVideos = firebaseDb.ref('videos');

  const firebaseLooper = (snapshot) => {

    const data = [];
    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id:childSnapshot.key
        })
    });
    return data;
  }

  export {
      firebase,
      firebaseDb,
      firebaseArticles,
      firebaseTeams,
      firebaseVideos,
      firebaseLooper
  }