
console.log("SurSagar Site");

let songIndex = 2;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Random Song One", filePath: "songs/1.mp3", coverPath: "covers/1.jpg",timestamp:"3:16"},
    {songName: "Random Song Two", filePath: "songs/2.mp3", coverPath: "covers/2.jpg",timestamp:"1:48"},
    {songName: "Random Song Three", filePath: "songs/3.mp3", coverPath: "covers/3.jpg",timestamp:"4:02"},
    {songName: "Random Song Four", filePath: "songs/4.mp3", coverPath: "covers/4.jpg",timestamp:"4:00"},
    {songName: "Random Song Five", filePath: "songs/5.mp3", coverPath: "covers/5.jpeg",timestamp:"1:00"},
    {songName: "Random Song Six", filePath: "songs/6.mp3", coverPath: "covers/6.jpeg",timestamp:"0:55"},
    {songName: "Random Song Seven", filePath: "songs/7.mp3", coverPath: "covers/7.jpeg",timestamp:"0:30"},
    {songName: "Random Song Eight", filePath: "songs/8.mp3", coverPath: "covers/8.jpeg",timestamp:"4:00"},
    {songName: "Random Song Nine", filePath: "songs/9.mp3", coverPath: "covers/9.jpeg",timestamp:"4:04"},
    {songName: "Random Song Ten", filePath: "songs/10.mp3", coverPath: "covers/10.jpg",timestamp:"2:12"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    element.getElementsByClassName("timestamp")[0].innerText = songs[i].timestamp;
})

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.src = "pause.png";
    }
    else{
        audioElement.pause();
        masterPlay.src="circle-play-regular.svg";
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        audioElement.play();
        element.src="circle-play-regular.svg";
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        console.log(songIndex);
        e.target.src="pause.png";
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        e.target.src="pause.png";
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=10){
        songIndex = 1;
    }
    else{
        songIndex += 1;
    }
    const getElement = document.getElementsByClassName('card-img-top-next')[0];
    const getElementMain = document.getElementsByClassName("card-img-top-main")[0];
    const getElementFour = document.getElementsByClassName("card-img-top-prev")[0];
    const getElementAnother = document.getElementsByClassName("card-title")[0];//prev
    const getElementFive = document.getElementsByClassName("card-title")[1];//main
    const getElementSix = document.getElementsByClassName("card-title")[2];//next
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    getElement.src=getElementMain.src;
    getElementMain.src=getElementFour.src;
    getElementFour.src=songs[songIndex+2].coverPath;
    getElementAnother.innerHTML=songs[songIndex-1].songName;//prev
    getElementFive.innerHTML=songs[songIndex].songName;//main
    getElementSix.innerHTML=songs[songIndex+1].songName;//next
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.src="pause.png";

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=1){
        songIndex = 1;
    }
    else{
        songIndex -= 1;
    }
    const getElement = document.getElementsByClassName('card-img-top-next')[0];
    const getElementMain = document.getElementsByClassName("card-img-top-main")[0];
    const getElementFour = document.getElementsByClassName("card-img-top-prev")[0];
    const getElementAnother = document.getElementsByClassName("card-title")[0];//prev
    const getElementFive = document.getElementsByClassName("card-title")[1];//main
    const getElementSix = document.getElementsByClassName("card-title")[2];//next
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    getElementFour.src=getElementMain.src;
    getElementMain.src=getElement.src;
    getElement.src=songs[songIndex+2].coverPath;
    getElementAnother.innerHTML=songs[songIndex-2].songName;//prev
    getElementFive.innerHTML=songs[songIndex-1].songName;//main
    getElementSix.innerHTML=songs[songIndex].songName;//next

    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.src="pause.png";
})
    