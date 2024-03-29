import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {createSongPost} from '../../actions/songFetching'
import { fetchSearch , addResponse} from "../../actions/searchFetching";
import './form.css'

const SongForm = () => {
    const [dataOfSong, setData] = useState({
        name: '', artist: '', username: '', prompt: '',
    });
    const [arrayOfSongs, setSongs] = useState([])

    const dispatch = useDispatch();
  
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [])

    const [prompt, setPrompt] = useState(JSON.parse(localStorage.getItem('currentPrompt')))
    useEffect(() => {
        setPrompt(JSON.parse(localStorage.getItem('currentPrompt')))
        setData({ ...dataOfSong, prompt: prompt.prompt, username: user.result.username})
    }, [])
    console.log(prompt.prompt)

    const doSongSubmission = async (e) =>{
        e.preventDefault();
        //dispatch(createSongPost(dataOfSong));
        setData({ ...dataOfSong, username: user.result.username, prompt: prompt.prompt})
        let array = await fetchSearch(dataOfSong.name);
        console.log(array)
        setSongs(array)
    }

    function arrayToString(array){
        var artistString = array.join(', ');
        return artistString
    }

    const setInfoToDisplay = () => {
        var curPrompt = this.resultTracks.dataOfSong.prompt;
        localStorage.setItem("cp", curPrompt);

        var curSong = this.resultTracks.song.name
        localStorage.setItem("cS", curSong);

        var curSongImg = this.resultTracks.song.albumCoverURL
        localStorage.setItem("cSImg", curSongImg);

    }

    const getSearchResults = (resultTracks) => {
        console.log("this was called")
        if (!resultTracks){
            return null;
        }
        return resultTracks.map((song, index) => {
            return (<div className="individualSong" key={index} onClick={() => dispatch(addResponse({song: song, user: dataOfSong.username, prompt: dataOfSong.prompt}))}>
                <div className="songDiv">
                    <img className="songImg" src = {song.albumCoverURL} width={60} height={60} alt="Image cannot be displayed"/>
                </div>
                <div className="songartist">
                        <h3 className="songName">{song.name}</h3>
                        <h3 className="artistName">{arrayToString(song.artists)}</h3>
                </div>
                <div className="album">
                        <h3 className="albumName">{song.album}</h3>
                </div>
            </div>
        )})
    }
    
    return (
        <div className="Song-form-container">
            <form className="song-form" onSubmit={doSongSubmission}>
                <h2 className="songHead">Creating a SongPost</h2>
                <input value={dataOfSong.name} onChange={(e) => setData({ ...dataOfSong, name: e.target.value })} type="song" placeholder="song" id="song" name="song"/>

                <button type="submit">Search</button>
            </form>
            <div className="songList">
                <div className="listLegend">
                    <div className="legendTitle">TITLE</div>
                    <div className="legendAlbum">ALBUM</div>
                </div>
                <div className="searchResults">
                    {getSearchResults(arrayOfSongs)}
                </div>
            </div>
        </div>
    );
}

export default SongForm;