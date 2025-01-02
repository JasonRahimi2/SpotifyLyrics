async function getMostRecent() {
    const apiURL = 'https://spotifylyrics-ueg6.onrender.com/spotifylyrics'
    await fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
    let dataLength = data.length;
    const songTable = document.getElementById('songTable'); 

    while (songTable.hasChildNodes()) {
        songTable.removeChild(songTable.firstChild);
    }

    const headers = document.createElement('tr');
    const songTitleHeader = document.createElement('th');
    const artistNameHeader = document.createElement('th');
    songTitleHeader.innerHTML = 'Song Title';
    artistNameHeader.innerHTML = 'Artist Name';
    headers.appendChild(songTitleHeader);
    headers.appendChild(artistNameHeader);
    songTable.appendChild(headers);

        for (let i = dataLength - 5; i < dataLength; i++) {

            var tr = document.createElement('tr');
            var songtitle = document.createElement('td')
            var artistname = document.createElement('td')
            songtitle.innerHTML = data[i].SongTitle;
            artistname.innerHTML = data[i].ArtistName;
            tr.appendChild(songtitle);
            tr.appendChild(artistname);
            songTable.appendChild(tr);
        }


        document.getElementById("songTable").style.visibility = "visible"
});    
}


async function sendData(artist, song) {
    let artistName = artist;
    let songTitle = song;
    const apiURL = 'https://spotifylyrics-ueg6.onrender.com/spotifylyrics'

    await fetch(apiURL, {
        method: 'POST',
 body: JSON.stringify({
    ArtistName: artistName,
    SongTitle: songTitle
 }),
     headers: {
        'Content-Type': 'application/json'
 }
 } ) 
 .then(response => response.json())
 .then(data => {
 })
}

function showMyLyrics() {
    document.getElementById("lyricText").style.visibility = "visible"
}


function capitalizeFirstLetter(string) {
    if (string.trim() != '') {
    const substrings = string.split(" ");

    for (let i = 0; i < substrings.length; i++) {
        substrings[i] = substrings[i][0].toUpperCase() + substrings[i].substr(1);
    }
    return substrings.join(" ");
    }
} 

function getMyLyrics() {
errorMessage.innerHTML = '';
let myArtist = document.getElementById("artist").value;
const capitalizedMyArtist = capitalizeFirstLetter(myArtist);
let mySongName = document.getElementById("song").value;
const capitalizedMySongName = capitalizeFirstLetter(mySongName);

fetch(`https://api.lyrics.ovh/v1/${capitalizedMyArtist}/${capitalizedMySongName}`, { signal: AbortSignal.timeout(2000)})
.then((res) => res.json())
.then((data) => {

if (!data.lyrics) {
    throw new Error('Nothing found');
} 

let myString = data.lyrics
let mySplitString = myString.split("\n")
let myArray = mySplitString

document.getElementById("imageHolder").innerHTML = "";

for (item in myArray) {
    let x = document.createElement("div")
    x.setAttribute("id", "mySlide")
    let y = document.createElement("p")
    y.innerHTML = myArray[item] 
    x.append(y)
    document.getElementById("imageHolder").append(x);
    
}    



for (item in myArray) {
    

    document.getElementById("lyricText").innerHTML = myArray.join("<br>")

    
}

})


.then (() => {
    sendData(capitalizedMyArtist, capitalizedMySongName);
})

.catch(error => {
    errorMessage = document.getElementById('errorMessage');
    if (error.name === 'TimeoutError') {
    errorMessage.innerHTML = 'Incorrect input or try again later';
    console.error('Fetch request was aborted due to incorrect input or timeout');
}
else {
    errorMessage.innerHTML = 'Unexpected error, try again';
    console.error("Error: ", error);
}
});



}

