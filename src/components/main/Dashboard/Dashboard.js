import React, { useEffect, useState } from "react";

// API
import * as UserAPI from "../../../UserAPI";

// Helpers
import Headers from "../../../Helpers/Headers";

// Components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";

// CSS
import './styles/dashboard.css';

const Dashboard = () => {

    /* State Management */
    const [headers] = useState(Headers);
    const [userDb, setUserDb] = useState([]);
    const [recentDms, setRecentDms] = useState([]);
    const [filteredRecents, setFilteredRecents] = useState([]);
    const [channelDb, setChannelDb] = useState([]);
    const [chat, setChat] = useState("");

    // Loading State Management
    const [usersAreLoaded, setUsersAreLoaded] = useState(false);
    const [recentsAreLoaded, setRecentsAreLoaded] = useState(false);
    const [channelsAreLoaded, setChannelsAreLoaded] = useState(false);
    const [loadingComplete, setLoadingComplete] = useState(false);

    // Error State Management
    const [isErrorLoading, setIsErrorLoading] = useState(false);

    /* useEffect */
    useEffect(() => {
      // getting all users
      UserAPI.listUsers(headers)
        .then((res) => {
          setUserDb(res.data.data);
          setUsersAreLoaded(true);
        })
        .catch((e) => {
          console.log("Failed to get all users");
          setIsErrorLoading(true);
        });

      // get all users with chat history with this guy
      UserAPI.getRecent(headers)
        .then((res) => {
          setRecentDms(res.data.data);
          setRecentsAreLoaded(true);
        })
        .catch((e) => {
          console.log(e);

          setIsErrorLoading(true);
        });

      // get everyone signed up para lumabas sa searchbar
      UserAPI.getAllUsersChannel(headers)
        .then((res) => {
          setChannelDb(res.data.data);
          setChannelsAreLoaded(true);
        })
        .catch((e) => {
          console.log("error: " + e);
          setIsErrorLoading(true);
        });
    }, [headers]);

    useEffect(() => {
      const interval = setInterval(() => {
        UserAPI.getAllUsersChannel(headers)
          .then((res) => {
            setChannelDb(res.data.data);
            setChannelsAreLoaded(true);
          })
          .catch((e) => {
            console.log("error: " + e);
            setIsErrorLoading(true);
          });
        return () => clearInterval(interval);
      }, 5000);
    }, [headers]);

    useEffect(() => {
      // remove duplications
      let filteredUids = new Set();
      recentDms.forEach((dm) => {
        filteredUids.add(dm.uid);
      });

      let tempRecents = [];
      filteredUids.forEach((email) => {
        let found = recentDms.find((user) => user.uid === email);
        tempRecents.push(found);
      });

      setFilteredRecents(tempRecents);
    }, [recentDms]);

    useEffect(() => {
      //initialize
      let dependencies = 3;
      let n = 0;

      if (usersAreLoaded)
        n++;
      if (recentsAreLoaded) 
        n++;
      if (channelsAreLoaded) 
        n++;

      if (n === dependencies) 
        setLoadingComplete(true);

      let found = userDb.find((user) => user.uid === headers.uid);

      setChat(found);
    }, [usersAreLoaded, recentsAreLoaded, channelsAreLoaded]);

    useEffect(() => {}, [filteredRecents, channelDb]);

    const displayErrorMsg = () => {
      return <div>Please sign in again to continue 😊</div>;
    };

    return (
        /* Main Dashboard */
        <div className="dashboard">
          {/* Error Message */}
          {isErrorLoading ? displayErrorMsg() : null}

          <div className="main-Container">

            {/* Dashboard Header Component */}
            <div className="header-Container">
              {loadingComplete && (
                  <Header
                    userDb={userDb}
                    setUserDb={setUserDb}
                    channelDb={channelDb}
                    setChat={setChat}
                  />
              )}
            </div>

            {/* Sidebar Component */}
            <div className="sidebar-Dashboard">
              {loadingComplete && (
                  <Sidebar
                    userDb={userDb}
                    recentDms={filteredRecents}
                    channelDb={channelDb}
                    chat={chat}
                    setChat={setChat}
                    setChannelDb={setChannelDb}
                  />
              )}
            </div>

            {/* Chat Component */}
            <div className="chat-Dashboard">
              {loadingComplete && (
                  <Chat
                    userDb={userDb}
                    chat={chat}
                    recentDms={recentDms}
                    setRecentDms={setRecentDms}
                    setUserDb={setUserDb}
                  />
              )}
            </div>
          </div>
        </div>
    );
}

export default Dashboard;