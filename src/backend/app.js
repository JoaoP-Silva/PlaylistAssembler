var redirect_uri = 'http://127.0.0.1:5500/index.html'; 

var spotify_client_id = '9f6d09d009334625827646cd4ac23d96';
var client_secret = '';
var accessToken = null;
var refreshToken = null;

const TOKEN = "https://accounts.spotify.com/api/token";
const AUTHORIZE_SPOTIFY = "https://accounts.spotify.com/authorize"
const SPFY_SEARCH = "https://api.spotify.com/v1/search";
const SPFY_PROFILE = "https://api.spotify.com/v1/me"
const SPFY_CREATE_PLAYLIST = "https://api.spotify.com/v1/users/"
const SPFY_ADD_SONG = "https://api.spotify.com/v1/playlists/"

//User id for modify his profile
var userId;


//Lists for alocate all songs
var songList = [];

//Playlist parameters
var playlistTitle;
var playlistId;

//Variable string for the list of songs
/** Integer "streaming" to indicate the streaming service, obeys the following pattern: 
 *  -1 : not setted
 *   1 : spotify
 *   2 : deezer
 *   3 : applemusic
 */ 
var streaming = 1; 



//Funcoes de uso geral
function genSongList(s){
    localStorage.removeItem("songList");
    songList = [];
    var temp = "";
    for(var i = 0; i<s.length ; i++){
        if(s[i] !== '\n' && s[i] !== '\0'){
            temp += s[i];
        }
        else {
            temp.trim()
            if(temp === ""){continue;}
            songList.push(temp); 
            temp = "";
        }
    }
    debugger;
    localStorage.setItem("songList", JSON.stringify(songList));
}

function setPlaylistInfo(){
    playlistTitle = document.getElementById("plTitle").value
    localStorage.setItem("playlist_title", playlistTitle);
    var musics = document.getElementById("musicList").value
    musics += '\0'
    genSongList(musics);
}




export function onPageLoad(){
    playlistTitle = localStorage.getItem("playlist_title");
    streaming = parseInt(localStorage.getItem("streaming"));
    var queryString = window.location.search 
    if(queryString.length > 0){
        if(streaming === null){window.history.pushState("", "", redirect_uri);}
        switch(streaming){
            case 1:
                debugger;
                spfy_handleRedirect(queryString);
                //debugger;
                //spfy_getUserId();
                //spfy_createPlaylist();
                //spfy_addItensToPlaylist();
                break;
            default:
                break;
        }
        
    }
}




//Funcoes API Spotify
function handleSpfyAuthResponse(){
    if ( this.status === 200 ){
        var data = JSON.parse(this.responseText);
        if ( data.access_token !== undefined ){
            accessToken = data.access_token;
            localStorage.setItem("access_token", accessToken);
        }
        if ( data.refresh_token  !== undefined ){
            refreshToken = data.refresh_token;
            localStorage.setItem("refresh_token", refreshToken);
        }
        spfy_getUserId();
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

async function spfy_fetchAccessToken(code){
    debugger;
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + spotify_client_id;
    body += "&client_secret=" + client_secret;
    await callAuthorizationApi(body);
}


function spfy_handleRedirect(qstring){
    const urlparam = new URLSearchParams(qstring);
    var spfy_code = urlparam.get('code');
    spfy_fetchAccessToken(spfy_code);
    window.history.pushState("", "", redirect_uri);
}

export function requestAuthSpotify(){
    streaming = 1;
    localStorage.setItem("streaming", streaming.toString());
    setPlaylistInfo();
    let url = AUTHORIZE_SPOTIFY;
    url += "?client_id=" + spotify_client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=playlist-modify-public user-read-private";
    window.location.href = url;
}

function spfy_callAPI(method, url, body, callback){
    accessToken = localStorage.getItem("access_token");
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken)
    xhr.send(body);
    xhr.onload = callback;
}

function handleSpfyAddRes(){
    // var data = JSON.parse(this.responseText);
    if(this.status === 201){}
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function spfy_addSong(id){
    let url = SPFY_ADD_SONG;
    url += playlistId + '/tracks';
    let body = JSON.stringify({"uris" : [id]});
    spfy_callAPI('POST', url, body, handleSpfyAddRes);
}
function handleSpfySearchRes(){
    if(this.status === 200){
        debugger;
        var data = JSON.parse(this.responseText);
        var songId = "spotify:track:";
        songId += data.tracks.items[0].id.toString();
        console.log(data);
        console.log(songId);
        if(songId == null){alert("Music not found.")}
        spfy_addSong(songId);
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function spfy_searchSongs(){
    songList = JSON.parse(localStorage.getItem("songList"));
    localStorage.removeItem("songList");
    //Get all music spotify Ids
    for(var i in songList){
        let url = SPFY_SEARCH + "?q=";
        url += songList[i];
        url += "&type=track";
        url += "&limit=1";
        spfy_callAPI('GET', url, null, handleSpfySearchRes);
    }
}

function handleSpfyCreatePlaylistRes(){
    if(this.status === 201){
        var data = JSON.parse(this.responseText);
        alert("Playlist criada com sucesso.")
        playlistId = data.id;
        localStorage.setItem("playlist_id", playlistId);
        spfy_searchSongs();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function spfy_createPlaylist(){
    userId = localStorage.getItem("user_id");
    playlistTitle = localStorage.getItem("playlist_title");
    localStorage.removeItem("playlistTitle");
    if(playlistTitle === ""){playlistTitle = "QUEBRAPASSOS BALA DE EUCALIPTO"}
    let desc = "Playlist created using PlaylistAssembler."
    let url = SPFY_CREATE_PLAYLIST + userId + "/playlists";
    let body = JSON.stringify({"name": playlistTitle, "description": desc});
    spfy_callAPI('POST', url, body, handleSpfyCreatePlaylistRes);
}


function handleSpfyProfileRes(){
    if ( this.status === 200 ){
        var data = JSON.parse(this.responseText);
        userId = data.id;
        localStorage.setItem("user_id", userId);
        spfy_createPlaylist();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function spfy_getUserId(){
    spfy_callAPI('GET', SPFY_PROFILE, null, handleSpfyProfileRes);
}