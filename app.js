var redirect_uri = 'http://127.0.0.1:5500/index.html'; 

var spotify_client_id = '9f6d09d009334625827646cd4ac23d96';
var client_secret = '';

const TOKEN = "https://accounts.spotify.com/api/token";
const AUTHORIZE_SPOTIFY = "https://accounts.spotify.com/authorize"

var songList = [];
var playlist_title;


//Funcoes de manipulacao dos dados de entrada

function genSongList(s){
    temp = "";
    for(i = 0; i<s.length ; i++){
        if(s[i] != '\n' && s[i] != '\0'){
            temp += s[i];
        }
        else {songList.push(temp); temp = "";}
    }
}

function setPlaylistInfo(){
    playlist_title = document.getElementById("plTitle").value
    var musics = document.getElementById("musicList").value
    musics += '\0'
    genSongList(musics);
}


//Funcoes API Spotify
function handleSpfyAuthResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if ( data.refresh_token  != undefined ){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let auth = spotify_client_id + ':' + client_secret;
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(auth));
    xhr.send(body);
    xhr.onload = handleSpfyAuthResponse
}

function spfy_fetchAccessToken(code){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + spotify_client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}


function handleRedirect(qstring){
    const urlparam = new URLSearchParams(qstring);
    var spfy_code = urlparam.get('code');
    spfy_fetchAccessToken(spfy_code);
    window.history.pushState("", "", redirect_uri);
}


function onPageLoad(){
    var queryString = window.location.search 
    if(queryString.length > 0){
        handleRedirect(queryString);
    }
}

function requestAuthSpotify(){

    //debugger;
    setPlaylistInfo();
    let url = AUTHORIZE_SPOTIFY;
    url += "?client_id=" + spotify_client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=playlist-modify-public";
    window.location.href = url;
}