import "./home.css"

//stuff to get songs and prompts, not too sure what is necessary 
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getSongs} from '../actions/songFetching';
import {getPrompts} from '../actions/promptFetching';
import { getPlaylists } from "../actions/userFetching";
import { compileResponses } from "../actions/userFetching";
import { setUserData } from "../actions/userFetching";
import { addResponse } from "../actions/searchFetching";

import { newPlaylist } from "../actions/userFetching";

import Songs from '../components/Songs/printSongs';
import Prompts from '../components/Prompts/printPrompts';
import Users from '../components/Users/printUsers'
import SongForm from '../components/Forms/songForm.js';
import PromptForm from "../components/Forms/promptForm";
import FriendForm from "../components/Forms/friendForm.js";
import Friends from "../friends/Friends";

const Home = () => {
    const dispatch = useDispatch();

    var songVar = localStorage.getItem('songSubmitted');
    var cP = localStorage.getItem('cp');
    //console.log(cP);

    //console.log(songVar);

    function arrayToString(array){
        var artistString = array.join(', ');
        return artistString
    }


    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);
    useEffect(() => {
      dispatch(getPrompts());
  }, [dispatch]);
useEffect(() => {
    dispatch(getPlaylists());
}, [dispatch]);
useEffect(() => {
    dispatch(newPlaylist());
}, [dispatch]);
useEffect(() => {
    dispatch(compileResponses());
}, [dispatch]);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    useEffect(() => {
        const token = user?.token

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [])

    const [data, setUserData] = useState(JSON.parse(localStorage.getItem('userdata')))
    useEffect(() => {
        const token = user?.token

        setUserData(JSON.parse(localStorage.getItem('userdata')))
    }, [])

    const [prompt, setPrompt] = useState(JSON.parse(localStorage.getItem('currentPrompt')))
    useEffect(() => {
        setPrompt(JSON.parse(localStorage.getItem('currentPrompt')))
    }, [])
    //console.log(prompt)

    const [friendResponses, setFriendResponses] = useState(JSON.parse(localStorage.getItem('userdata')))
    useEffect(() => {
        setFriendResponses(JSON.parse(localStorage.getItem('userdata')))
    }, [])

    const [responses, setResponse] = useState(JSON.parse(localStorage.getItem('userresponse')))
    useEffect(() => {
        setResponse(JSON.parse(localStorage.getItem('userresponse')))
    }, [])

    const displayResponse = []
    // console.log(Object.keys(responses))
     if (data)
     {
         if (responses)
         {
             {Object.keys(responses).map((key, index) => {
                 if(responses[key][0].user === data.username)
                 {
                     for (const songEntries of responses[key])
                     {
                         if (songEntries.prompt === prompt.prompt)
                         {
                             displayResponse.push(
                             <div className="profileIndividualSong">
                                 <div>
                                     <img className="profileSongImg" src = {songEntries.song.albumCoverURL} width={70} height={70} alt="Image cannot be displayed"/>
                                 </div>
                                 <div className="songartist">
                                     <h3 className="songName">Song: {songEntries.song.name}</h3>
                                     <h3 className="artistName">Album: {songEntries.song.album}</h3>
                                 </div>
                                 <div className="album">
                                     <h3 className="albumName">Artist: {arrayToString(songEntries.song.artists)}</h3>
                                 </div>
                             </div>,
                             );
                         }
                     }
                 };
               })}
               if((displayResponse).length == 0){
                   displayResponse.push(
                       <div className="noResponse">
                           No response yet.
                       </div>
                   )
               }
         }
     }


     return (
        <>
        <div className="outside">
        <h1 className="homeTitle">
            <h1 className="homeHeader">Arpeggio</h1>
            <h3 className="subtitle">a new way to share music</h3>
        </h1>
        {songVar ? (
                <div className="todayAnswer">
                <h2 className="recentReponses">Your Recent Reponses: </h2>
                <div className="homePrompt">
                    {prompt.prompt}
                </div>
                <div className="todayresponse">
                    <h2 className="tresponse">{displayResponse}</h2>
                </div>
                </div>
    
        ) : (
            <div className="promptHead">
                <h1 className="declareP">
                    Current Prompt:
                </h1>
                <h1 className="prompt">
                {prompt.prompt}
            </h1>
            </div>
            
        )}
    
         {user ? (
            <div className="formAnswers">
                <div className="form">
                    {songVar ? (
                        <h1 className="thankYou">Thank you for submitting!</h1>       
                    ) : (
                        <SongForm />
                    )
                    }
                    
                </div>
            <div className="proForm">
                <h1 className="promptHeading">Write a Prompt</h1>
                <PromptForm />
            </div>
            </div>
        ) : (
            <div>
                <h1 className="loggedOutWarn"><a className="homeLink" href="http://localhost:3000/signin">Log In</a> or <a className="homeLink" href="http://localhost:3000/signup">Sign Up</a> for Access</h1>
            </div>
        )}
        </div>
        </>
        )
    }
    
    export default Home