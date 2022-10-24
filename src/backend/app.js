var redirect_uri = 'http://localhost:3000/playlist/';
var baseUrl = "http://localhost:3000/"

var NAPS_API_KEY = 'NzI1YmMzMmMtMTBmOC00NjhlLTk5NWQtM2YyZTcwYjE5ZDE3'
var NAPS_API_SECRET = 'NmIwZmYwMmUtMDVhMi00MGQyLWFhNGUtZWM3YzNkNWQ0ZGQy'
var accessTokenN = null;
var refreshTokenN = null;

const NAPS_API = "https://api.napster.com"
const TOKEN_NAPS = "https://api.napster.com/oauth/access_token"
const AUTH_NAPS = "https://api.napster.com/oauth/authorize"
const NAPS_CREATE_PLAYLIST = "https://api.napster.com/v2.2/me/library/playlists"
const NAPS_ADD_SONG = "https://api.napster.com/v2.2/me/library/playlists/"

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
var flag = 0;

//Lists for alocate all songs
var songList = [];
var songsIds = [];
var not_found = 0;
//Playlist parameters
var playlistTitle;
var playlistId;

//Variable string for the list of songs
/** Integer "streaming" to indicate the streaming service, obeys the following pattern: 
 *  -1 : not setted
 *   1 : spotify
 *   2 : deezer
 *   3 : napster
 */
var streaming = -1;


export function onPageLoad() {
    var queryString = window.location.search
    if (queryString.length > 0) {
        streaming = localStorage.getItem("streaming");
        switch (streaming) {
            case "1":
                spfy_handleRedirect(queryString);
                break;
            case "3":
                naps_handleRedirect(queryString);
                break;
            default:
                break;
        }
    }
}

//Funcoes API Spotify
function handleSpfyAuthResponse() {
    var data = JSON.parse(this.responseText);
    if (this.status === 200) {
        if (data.access_token !== undefined) {
            accessToken = data.access_token;
            localStorage.setItem("access_token", accessToken);
        }
        if (data.refresh_token !== undefined) {
            refreshToken = data.refresh_token;
            localStorage.setItem("refresh_token", refreshToken);
        }
        spfy_getUserId()
    }
    else {
        window.location.href = `${baseUrl}error?message=${data["error"]}`;
    }
}

function callAuthorizationApi(body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let auth = spotify_client_id + ':' + client_secret;
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(auth));
    xhr.send(body);
    xhr.onload = handleSpfyAuthResponse
}

async function spfy_fetchAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + spotify_client_id;
    body += "&client_secret=" + client_secret;
    await callAuthorizationApi(body);
}


function spfy_handleRedirect(qstring) {
    const urlparam = new URLSearchParams(qstring);
    var spfy_code = urlparam.get('code');
    spfy_fetchAccessToken(spfy_code);
    window.history.pushState("", "", redirect_uri);
}

export function requestAuthSpotify() {
    streaming = 1;
    localStorage.setItem("streaming", streaming.toString());
    //setPlaylistInfo();
    let url = AUTHORIZE_SPOTIFY;
    url += "?client_id=" + spotify_client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=playlist-modify-public user-read-private";
    window.location.href = url;
}

function spfy_callAPI(method, url, body, callback) {
    accessToken = localStorage.getItem("access_token");
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken)
    xhr.send(body);
    xhr.onload = callback;
}

function handleSpfyAddRes() {
    var data = JSON.parse(this.responseText);
    if (this.status === 201) {
        window.location.href = `${baseUrl}success?message=Playlist montada com sucesso.`;
    }
    else {
        window.location.href = `${baseUrl}error?message=${data["error"]}`;
    }
}

function spfy_addSongs(ids) {
    let url = SPFY_ADD_SONG;
    url += playlistId + '/tracks';
    let body = JSON.stringify({ "uris": ids });
    debugger;
    spfy_callAPI('POST', url, body, handleSpfyAddRes);
}

function handleSpfySearchRes() {
    var data = JSON.parse(this.responseText);
    if (this.status === 200) {
        var songId = "spotify:track:";
        if (data.tracks.total === 0) { alert("Music not found."); not_found++; }
        else {
            songId += data.tracks.items[0].id.toString();
            songsIds.push(songId);
        }
        if (songList.length === songsIds.length + not_found) { spfy_addSongs(songsIds); }
    }
    else {
        window.location.href = `${baseUrl}error?message=${data["error"]}`;
    }
}

function spfy_searchSongs() {
    //Get all music spotify Ids
    for (var i in songList) {
        let url = SPFY_SEARCH + "?q=";
        url += songList[i];
        url += "&type=track";
        url += "&limit=1";
        setTimeout(spfy_callAPI('GET', url, null, handleSpfySearchRes), 100);
    }
}

function handleSpfyCreatePlaylistRes() {
    var data = JSON.parse(this.responseText);
    if (this.status === 201) {
        playlistId = data.id;
        localStorage.setItem("playlist_id", playlistId);
        spfy_searchSongs();
    }
    else {
        window.location.href = `${baseUrl}error?message=${data["error"]}`;
    }
}

export function createPlaylist(title, songs) {
    debugger;
    playlistTitle = title;
    songList = songs;
    localStorage.setItem("songList", songList);
    switch (streaming) {
        case "1":
            spfy_createPlaylist();
            break;
        case "3":
            naps_create_playlist();
            break;
        default:
            break;
    }
}


function spfy_createPlaylist() {
    if (playlistTitle === "") { playlistTitle = "QUEBRAPASSOS BALA DE EUCALIPTO"; }
    let desc = "Playlist created using PlaylistAssembler.";
    let url = SPFY_CREATE_PLAYLIST + userId + "/playlists";
    let body = JSON.stringify({ "name": playlistTitle + "", "description": desc });
    spfy_callAPI('POST', url, body, handleSpfyCreatePlaylistRes);
}


function handleSpfyProfileRes() {
    var data = JSON.parse(this.responseText);
    if (this.status === 200) {
        userId = data.id;
        localStorage.setItem("user_id", userId);
    }
    else {
        window.location.href = `${baseUrl}error?message=${data["error"]}`;
    }
}

function spfy_getUserId() {
    spfy_callAPI('GET', SPFY_PROFILE, null, handleSpfyProfileRes);
}

//--------------------------FUNÇOES-NAPSTER---------------------------

function handleNapsResponse(){
    if ( this.status === 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if ( data.access_token !== undefined ){
            accessTokenN = data.access_token;
            localStorage.setItem("access_token", accessTokenN);
        }
        if ( data.refresh_token  !== undefined ){
            refreshTokenN = data.refresh_token;
            localStorage.setItem("refresh_token", refreshTokenN);
        }
    }
    else {
        window.location.href = `${baseUrl}error?message=${["Error"]}`;
    }
}

function callAuthNaps(body){
    let xhr2 = new XMLHttpRequest();
    xhr2.open("POST",TOKEN_NAPS,true);
    xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let auth = NAPS_API_KEY + ':' + NAPS_API_SECRET;
    xhr2.setRequestHeader('Authorization', 'Basic ' + btoa(auth));
    xhr2.send(body);
    xhr2.onload = handleNapsResponse
}

async function naps_fetch_token(naps_code){
    let body = "client_id=" + NAPS_API_KEY;
    body += "&client_secret=" + NAPS_API_SECRET;
    body += "&response_type=code";
    body += "&grant_type=authorization_code"; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&code=" + naps_code;
    await callAuthNaps(body);
}


function naps_handleRedirect(qstring){
    const urlp2 = new URLSearchParams(qstring);
    var naps_code = urlp2.get('code');
    naps_fetch_token(naps_code);
    window.history.pushState("","",redirect_uri);
}

export function requestAuthNapster(){
    streaming = 3;
    localStorage.setItem("streaming", streaming.toString());
    //setPlaylistInfo();
    let url = AUTH_NAPS;
    url += "?client_id=" + NAPS_API_KEY;
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&response_type=code";
    window.location.href = url;
}

function naps_call_api(method,url,body,callback){
    accessTokenN = localStorage.getItem("access_token");
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessTokenN)
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
    xhr.onload = callback;
}

function handleNapsAddRes(){
    if(this.status === 204){
        window.location.href = `${baseUrl}success?message=Playlist montada com sucesso.`;
    }else{
        window.location.href = `${baseUrl}error?message=${["Error"]}`
    }
}

function naps_addSongs(ids){
    let url = NAPS_ADD_SONG;
    url += playlistId + "/tracks";
    let body = '{"tracks":['+ids+']}';
    naps_call_api('POST', url, body, handleNapsAddRes);
}

function handleNapsSearchRes(){
    if(this.status === 200){
        var data = JSON.parse(this.responseText);
        if(data.meta.totalCount === 0){alert("Music not found."); not_found++;}
        else{
            var id = data.search.data.tracks[0].id;
            let songId = JSON.stringify({"id": id},);
            songsIds.push(songId);
        }
        if(songList.length === songsIds.length + not_found){naps_addSongs(songsIds);}
    }
    else {
        window.location.href = `${baseUrl}error?message=${["Error"]}`;
    }
}

function napsSearch_Songs(){
    //Get all music Napster Ids
    for(var i in songList){
        let url = NAPS_API + "/v2.2/search/verbose?query=";
        url += songList[i];
        url += "&type=track";
        url += "&per_type_limit=1";
        setTimeout(naps_call_api('GET', url, null, handleNapsSearchRes), 100);
    }
}

function handleNapsCreatePlaylistRes(){
    if(this.status === 201){
        var data = JSON.parse(this.responseText);
        playlistId = data.playlists[0].id;
        localStorage.setItem("playlist_id", playlistId);
        napsSearch_Songs();
    }
    else {
        window.location.href = `${baseUrl}error?message=${["Error"]}`;
    }
}

function naps_create_playlist(){
    if(playlistTitle === ""){playlistTitle = "QUEBRAPASSOS BALA DE EUCALIPTO";}
    let url = NAPS_CREATE_PLAYLIST
    let body = JSON.stringify({"playlists" : {"name": playlistTitle}});
    naps_call_api('POST', url, body, handleNapsCreatePlaylistRes);
}
