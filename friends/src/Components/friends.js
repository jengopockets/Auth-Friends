import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function Friends({history}) {
    const [friendsList, setFriendsList] = useState([]);
    const [newFriend, setNewFriend] = useState({});

    const handleChanges = event => {
        setNewFriend({...newFriend, [event.target.name]: event.target.value})
    }
    const handleSubmit = event => {
        event.preventDefault()
        const token = localStorage.getItem("token");
        const url = "http://localhost:5000/api/friends";
        if(token) {
            axios
                .post(url,newFriend, {
                    headers: {
                        Authorization:`${token}`
                    }
                })
                .then(response => {
                    setFriendsList(response.data);
                })
                .catch(event => {
                    localStorage.removeItem("token");
                    history.push("/")
                });
                setNewFriend({
                    name:'',
                    age:'',
                    email:''
                })
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        const url = "http://localhost:5000/api/friends";
        if (token) {
            axios
                .get(url, {
                    headers: {
                        Authorization:`${token}`
                    }
                })
                .then(response => {
                    setFriendsList(response.data);
                })
                .catch(event => {
                    localStorage.removeItem("token");
                    history.push("/")
                });
        }
    }, [history]);
    if(!friendsList) return<div>Loading</div>
    return(
        <>
        <div className="friendHeader">
          <p>My Friends</p>
      </div>
   
      {friendsList.map(friend => 
      <div className="friendList">
        <p className="friendName">Name: {friend.name}</p>
        <p className="friendAge">Age: {friend.age}</p>
        <p className="friendEmail">Email: {friend.email}</p>
      </div>)}

        <form onSubmit={handleSubmit}>
            <input type='text' name='name' placeholder='name' onChange={handleChanges} value={newFriend.name} />
            <input type='text' name='age' placeholder='age'  onChange={handleChanges} value={newFriend.age}  />
            <input type='email' name='email' placeholder='email'  onChange={handleChanges}  value={newFriend.email} />
            <button type='submit'>submit</button>

        </form>

      <button
        className="btn logoutButton"
        onClick={() => {
          localStorage.removeItem("token");
          history.push("/");
        }}
      >
        Logout
      </button>
        </>
    )
}