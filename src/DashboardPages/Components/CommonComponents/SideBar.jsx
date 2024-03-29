import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation, Navigate } from "react-router-dom";
import Logo from "../NewImageFiles/Sidebar/Logo.svg";
import { useLogout } from '../../hooks/useLogout'
import Modal from "./Modal";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { io } from "socket.io-client";
import { useAuthContext } from '../../hooks/useAuthContext';
import { messageCount } from "./messageCount"
import { useMessageContext } from "../../hooks/useMessageContext"
export default function SideBar() {
    const { messages, dispatch } = useMessageContext()
    const path = useLocation().pathname

    const { setCount, count } = messageCount()
    const { logout } = useLogout()

    const [logoutModal, setlogoutModal] = useState(false)

    const xButton = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    setlogoutModal(false)
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const { user } = useAuthContext();

    const [currentUser, setCurrentUser] = useState();

    const [contacts, setContacts] = useState([]);

    // Message received
    const [arrivalMessage, setArrivalMessage] = useState(null);

    // Socket for realtime updates
    const socket = useRef();

    useEffect(() => {
        if (user) setCurrentUser(user)
    }, []);

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/messages/get-contacts');

            const json = await response.json();

            if (response.ok) {
                if (json.length > 0) {
                    // console.log(json);
                    setContacts(json)
                }
            }

            if (!response.ok) {
                // console.log(json.error);
            }
        }

        fetchContacts()
    }, [currentUser])

    // Connect to socket
    useEffect(() => {
        if (currentUser) {
            socket.current = io(process.env.REACT_APP_SOCKET_URL);
            socket.current.emit("add-user", currentUser.id);

            // If user is ADMIN, update the contacts side if there are new messges
            if (socket.current) {
                socket.current.on("update-contacts", (data) => {
                    setArrivalMessage(data);
                });
            }
        }
    }, [currentUser]);

    useEffect(() => {
        // Checks if there is a conversation selected
        if (arrivalMessage) {
            const newArrivalMessage = arrivalMessage;
            // Replace the item in contacts if it is from the message being received
            const x = contacts.find((c) => c.resident_id === newArrivalMessage.resident_id);
            const y = contacts.filter((c) => c.resident_id !== newArrivalMessage.resident_id);
            if (x) {
                x.message_thread = newArrivalMessage.message_thread;
                const newContacts = [x, ...y]
                setContacts(newContacts)
            } else {
                const newContacts = [newArrivalMessage, ...y];
                setContacts(newContacts);
            }
        }
    }, [arrivalMessage]);

    useEffect(() => {
        if (contacts) {
            const counts = contacts.filter(contact => {
                return contact.message_thread.read_by_admin == false
            }).length

            dispatch({ type: 'ADD_MESSAGE_COUNT', payload: counts })
        }
    }, [arrivalMessage || contacts])

    // useEffect(() => {
    //     setMessageCount(count)
    // }, [contacts])

    // console.log(MessageCount)
    return (
        <>
            <Modal
                shown={logoutModal}
                close={() => {
                    setlogoutModal(false)
                }}>
                <div className="deleteModals">
                    <div className='modalHeader'>
                        <h2> Log Out of the System?</h2>
                        {xButton}
                    </div>
                    <div>
                        <p>
                            You won’t be able to see messages and updates from the
                            community while you’re log out. Are you sure?
                        </p>
                    </div>
                    <div className="rightAlign ModalButtons">
                        <button
                            className="solidButton buttonRed"
                            onClick={() => {
                                logout()
                            }}>
                            Logout
                        </button>
                        <button
                            className="borderedButton"
                            onClick={() => {
                                setlogoutModal(false)
                            }}>
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
            <div id="sideBlur" className="sidebar">
                <div className="logo flex-row">
                    <img src={Logo} alt="" />
                    <p>DRIMS </p>
                </div>
                <div className="navbar">
                    <NavLink to="/admin/overview">
                        <div className="flex-row navLinks">
                            <div className="navlinkIcon overview"></div>
                            <p>Overview</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/organization">
                        <div className="flex-row navLinks">
                            <div className="navlinkIcon organization"></div>
                            Organization
                        </div>
                    </NavLink>
                    <NavLink to="/admin/residents">
                        <div className="flex-row navLinks">
                            <div className="navlinkIcon residents"></div>
                            Residents
                        </div>

                    </NavLink>
                    <NavLink to="/admin/announcement">
                        <div className="flex-row navLinks">
                            <div className="navlinkIcon announcements"></div>
                            Announcements
                        </div>

                    </NavLink>
                    <NavLink to="/admin/events">
                        <div className="flex-row navLinks">
                            <div className="navlinkIcon events"></div>
                            Events
                        </div>
                    </NavLink>
                    <NavLink to="/admin/project">
                        <div className="flex-row navLinks">
                            <div className="navlinkIcon projects"></div>
                            Projects
                        </div>
                    </NavLink>
                    <NavLink to="/admin/messages">
                        <div className="flex-row navLinks">
                            <div className="navlinkIcon messages"></div>
                            Messages
                            {messages > 0 && (
                                <div className="messageNotif">
                                    {messages}
                                </div>
                            )}
                        </div>
                    </NavLink>
                    <div className="lowerNav">
                        <NavLink to="/admin/help">
                            <div className="flex-row navLinks">
                                <div className="navlinkIcon helpIcon"></div>
                                Help
                            </div>
                        </NavLink>
                        <NavLink to="/admin/activity_logs">
                            <div className="flex-row navLinks">
                                <div className="navlinkIcon activityLogs"></div>
                                Activity Logs
                            </div>
                        </NavLink>
                        <a style={{ cursor: "pointer" }}
                            onClick={() => {
                                setlogoutModal(true)
                            }}>
                            <div className="flex-row navLinks" >
                                <div className="navlinkIcon logout"></div>
                                Logout
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
