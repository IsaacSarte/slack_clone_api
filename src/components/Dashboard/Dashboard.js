import React, {useState, useEffect} from 'react';

// API
import * as UserAPI from '../../UserAPI.js';

// Helpers
import Headers from '../../Helpers/Headers.js';

// Components
import DashboardHeader from '../Header/DashboardHeader/DashboardHeader.jsx';
import Sidebar from '../Sidebar/Sidebar.js';
import Chat from '../Chat/Chat.js';

// CSS
import styles from './styles/dashboard.module.css';

const Dashboard = () => {

    /* State Management */

    // Headers State Management
    const [headers] = useState(Headers);

    // User DB State Management
    const [userDB, setUserDB] = useState([]);

    // Dm State Management
    const [recentDMS, setRecentDMS] = useState([]);
    const [filteredDMS, setFilteredDMS] = useState([]);

    // Channel State Management
    const [channelDB, setChannelDB] = useState([]);

    // Chat State Management
    const [chat, setChat] = useState('');

    // Loaders State Management
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const [isRecentLoaded, setIsRecentLoaded] = useState(false);
    const [isChannelLoaded, setIsChannelLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorLoading, setErrorLoading] = useState(false);

    /* useEffect */

    useEffect(() => {
        // getting all users
        UserAPI.listUsers(headers)
            .then((res) => {
                setUserDB(res.data.data);
                setIsUserLoaded(true);
            })
            .catch((e) => {
                console.log(`Failed to Get All Users`);
                setErrorLoading(true);
            })

        // getting all users with chat history with another user
        UserAPI.getRecent(headers)
            .then((res) => {
                setRecentDMS(res.data.data);
                setIsRecentLoaded(true);
            })
            .catch((e) => {
                console.log(`${e}`);
                setErrorLoading(true);
            })

        // getting all users for search bar purposes
        UserAPI.getAllUsersChannel(headers)
            .then((res) => {
                setChannelDB(res.data.data);
                setIsChannelLoaded(true);
            })
            .catch((e) => {
                console.log(`Error: ${e}`);
                setErrorLoading(true);
            })
    }, [headers]);

    useEffect(() => {
        // setting interval
        const interval = setInterval(() => {
            UserAPI.getAllUsersChannel(headers)
                .then((res) => {
                    setChannelDB(res.data.data);
                    setIsChannelLoaded(true);
                })
                .catch((e) => {
                    console.log(`Error: ${e}`);
                    setErrorLoading(true);
                })
            return () => clearInterval(interval);
        }, 5000);
    }, [headers]);

    useEffect(() => {
        // remove duplications
        let filteredUIDs = new Set();
        recentDMS.forEach((dm) => {
            filteredUIDs.add(dm.uid);
        });

        let tempRecents = [];
        filteredUIDs.forEach((email) => {
            let found = recentDMS.find((user) => user.uid === email);
            tempRecents.push(found);
        });

        setFilteredDMS(tempRecents);
    },[recentDMS]);

    useEffect(() => {
        // initializing
        let dep = 3;
        let num = 0;

        if (isUserLoaded) {
            num++
        }
            
        if (isRecentLoaded) num++
        if (isChannelLoaded) num++

        if (num === dep)
            setIsLoaded(true);

        let found = userDB.find((user) => user.uid === headers.uid);
        setChat(found);

    },[isUserLoaded, isRecentLoaded, isChannelLoaded]);

    useEffect(() => {}, [filteredDMS, channelDB]);

    const errorMsg = () => {
        return <div>Please Sign In again to Continue 😊</div>
    }

    return (
        <div className={styles.dashboard}>
            {/* Error Message */}
            {errorLoading ? errorMsg() : null}

            <div className={styles.main_Container}>

                {/* Dashboard Header Component */}
                <div className={styles.header_Container}>
                    {isLoaded && (
                        <DashboardHeader 
                            userDB={userDB}
                            setUserDB={setUserDB}
                            channelDB={channelDB}
                            setChat={setChat}
                        />
                    )}
                </div>

                {/* Sidebar Component */}
                <div className={styles.sidebar_Dashboard}>
                        {isLoaded && (
                            <Sidebar 
                                userDB={userDB}
                                recentDMS={recentDMS}
                                channelDB={channelDB}
                                chat={chat}
                                setChat={setChat}
                                setChannelDB={setChannelDB}
                            />
                        )}
                </div>

                {/* Chat Component */}
                <div className={styles.chat_Dashboard}>
                        {isLoaded && (
                            <Chat 
                                userDB={userDB}
                                chat={chat}
                                recentDMS={recentDMS}
                                setRecentDMS={setRecentDMS}
                                setUserDB={setUserDB}
                            />
                        )}
                </div>

            </div>

        </div>
    )
}

export default Dashboard;