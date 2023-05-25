import './App.css';
import * as React from "react";
import axios from "axios";
const { useEffect, useState } = React;

interface UserName {
  fisrt: string;
  last: string;
  title: string;

}
interface UserPicture {
  thumbnail: string;
}
interface UserInfo {
  name: UserName;
  picture: UserPicture;
}
const fetchapi = (pageNumber: number = 1) => {
  return axios.get(`https://randomuser.me/api?page=${pageNumber}`)
    .then(({ data }) => {
      // console.log(res);
      return data;
    })
    .catch(err => {
      console.error(err)
    })
}

const getFullUsername = (userInfo: UserInfo) => {
  const { name: { first, last } } = userInfo;
  return `${first} ${last}`;

}

export default function App() {
  const [counter, setCounter] = useState(0);
  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [userInfos, setUserInfos] = useState([])
  const [randomUserDataJSON, setrandomUserDataJSON] = useState("");

const fetchNextUser = () =>{
  fetchapi(nextPageNumber).then((randomData) => {
    // setrandomUserDataJSON(JSON.stringify(randomData, null, 2) || 'no user data found');
    const newUserInfos=[
      ...userInfos,
      ...randomData.results,
    ]
    setUserInfos(randomData.results);
    setNextPageNumber(randomData.info.page + 1)
  })
}

  useEffect(() => {
    fetchNextUser(nextPageNumber)
  }, [])
  return (
    <div className="App">
      <h1>Hello Shivam</h1>
      <h2>There is some magic here..</h2>
      <p>{counter}</p>
      <button onClick={() => {
        setCounter(counter + 1)
      }}>Increment here</button>
      <button onClick={()=>{
        fetchNextUser();
      }}>fetch next user</button>
      {
        userInfos.map((userInfo: UserName, idx: number) => (
          <div key={idx}>
            <p>{getFullUsername(userInfo)}</p>
            <img src={userInfo.picture.thumbnail}></img>
          </div>
        ))
      }

      <p>{randomUserDataJSON}</p>
    </div>
  );
}
