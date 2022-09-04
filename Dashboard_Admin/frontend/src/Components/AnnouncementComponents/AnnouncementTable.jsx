import React, { useEffect, useState } from 'react';
import AnnouncementTableContents from './AnnouncementTableContents';
import PageNumber from './AnnouncementPageNumber';

import Modal from "../CommonComponents/Modal"
import TextField from "@mui/material/TextField";

//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

import { useAnnouncementContext } from "../../hooks/useAnnouncementContext"

const Table = () => {
    //get all announcement
    const { announcements, dispatch } = useAnnouncementContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('https://drims-demo.herokuapp.com/api/announcements/')
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_ANNOUNCEMENT', payload: json })
            }
        }

        fetchWorkouts()
    }, [dispatch])

    // const announcement = props.list
    const [currentPage, setCurrentPage] = useState(1);
    const announcementsPerPage = 5;
    //Get Id of selected Resident
    const [announcementID, setAnnouncementID] = useState(null);
    //Set action flag
    const [action, setAction] = useState(null);
    const [showModal, setShowModal] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(null);

    //FOR SNACKBAR
    const [snackbar, toggleSnackbar] = useState(false);
    const [Deletesnackbar, toggleDeletesnackbar] = useState(false);

    //For Modal contents
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const actionButton = (
        <React.Fragment>
            <Button size="small"
                onClick={() => {
                    toggleSnackbar(false)
                    toggleDeletesnackbar(false)
                }}>
                <p style={{ color: "white", margin: 0 }}>Undo</p>
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    toggleSnackbar(false)
                    toggleDeletesnackbar(false)
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    if (announcements) {

        // Get current announcement
        let indexOfLastResident = currentPage * announcementsPerPage;
        let indexOfFirstResident = indexOfLastResident - announcementsPerPage;
        let currentAnnouncement;
        currentAnnouncement = announcements.slice(indexOfFirstResident, indexOfLastResident);

        // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);

        const getAnnouncementID = id => setAnnouncementID(id);
        const getAction = action => setAction(action);
        const getModal = modal => setShowModal(modal);
        const getDelete = del => setShowDeleteModal(del)
        const getTitle = title => setTitle(title)
        const getDes = des => setDescription(des)

        // Delete Announcement
        const handleDelete = async () => {

            const response = await fetch('https://drims-demo.herokuapp.com/api/announcements/'
                + announcementID, {
                method: 'DELETE'
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'DELETE_ANNOUNCEMENT', payload: json })
            }
        }

        // Update Announcement
        const handleUpdate = async () => {

            const response = await fetch('https://drims-demo.herokuapp.com/api/announcements/'
                + announcementID, {
                method: 'PATCH',
                body: JSON.stringify({
                    announcementTitle: title,
                    announcementDetail: description
                }),
                headers: {
                    'Content-Type': 'application/json'
                }

            })

            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'UPDATE_ANNOUNCEMENT', payload: json })
            }
        }

        return (
            <div>
                {/* View/Update Announcement */}
                <Modal
                    shown={showModal}
                    close={() => {
                        setShowModal(false);
                    }}>
                    <div className="announcementModals">
                        <h2 className="marginBottom">{action === "view" ? "View" : "Update"}  Announcement</h2>
                        <div className="flex-column addAnnouncement">
                            <div>
                                <h4>Tittle</h4>
                                <TextField
                                    id="outlined-multiline-static"
                                    placeholder="Input Description"
                                    multiline
                                    defaultValue={title}
                                    rows={1}
                                    fullWidth
                                    inputProps={{
                                        maxLength: 80
                                    }}
                                    disabled={action === "view" ? true : false}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <h4>Description (Optional)</h4>
                                <TextField
                                    id="outlined-multiline-static"
                                    placeholder="Input Description"
                                    multiline
                                    defaultValue={description}
                                    rows={7}
                                    fullWidth
                                    inputProps={{
                                        maxLength: 400
                                    }}
                                    disabled={action === "view" ? true : false}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="rightAlign ModalButtons" style={{ marginTop: "23px" }}>
                            <button
                                className="borderedButton"
                                onClick={() => {
                                    setShowModal(false)
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("contentBlur").className = "resident";
                                    document.getElementById("headerBlur").className = "header";
                                }}>
                                Cancel
                            </button>
                            <button
                                className="solidButton buttonBlue"
                                hidden={action === "view" ? "hidden" : ""}
                                onClick={() => {
                                    setShowModal(false)
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("contentBlur").className = "resident";
                                    document.getElementById("headerBlur").className = "header";
                                    handleUpdate()
                                    toggleSnackbar(true)
                                }}>
                                Update
                            </button>
                        </div>
                    </div>
                </Modal>

                {/* Delete Resident */}
                <Modal
                    shown={showDeleteModal}
                    close={() => {
                        setShowDeleteModal(false)
                    }}>
                    <div className="deleteModals">
                        <h2> Remove Announcement?</h2>
                        <div>
                            <p>Are you sure you want to remove this announcement? All data removed are archived and can be restored.</p>
                        </div>
                        <div className="rightAlign ModalButtons">
                            <button
                                className="borderedButton"
                                onClick={() => {
                                    setShowDeleteModal(false)
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("contentBlur").className = "resident";
                                    document.getElementById("headerBlur").className = "header";
                                }}>
                                Cancel
                            </button>
                            <button
                                className="solidButton buttonRed"
                                onClick={() => {
                                    setShowDeleteModal(false)
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("contentBlur").className = "resident";
                                    document.getElementById("headerBlur").className = "header";
                                    handleDelete()
                                    toggleDeletesnackbar(true)
                                }}>
                                Remove
                            </button>
                        </div>
                    </div>
                </Modal>

                <Snackbar
                    open={snackbar}
                    onClose={() => { toggleSnackbar(false) }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={2000}
                    message={`${title} information has been updated!`}
                    ContentProps={{
                        sx: {
                            background: "#DBB324",
                            width: 560,
                            ml: 30,
                            mt: 10
                        }
                    }}
                    action={actionButton}
                />
                <Snackbar
                    open={Deletesnackbar}
                    onClose={() => {
                        toggleDeletesnackbar(false)
                    }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={2000}
                    message={`${title} has been removed!`}
                    ContentProps={{
                        sx: {
                            background: "#D82727",
                            width: 560,
                            ml: 30,
                            mt: 10
                        }
                    }}
                    action={actionButton}
                />

                <div id='contentBlur' className='resident'>
                    {/* {isPending && <div>Loading...</div>}
                    {error && <div>{error}</div>} */}
                    <table className='Announcement_table'>
                        <thead>
                            <tr>
                                <td><h4>Title</h4> </td>
                                <td><h4>Date</h4></td>
                                <td><h4>Time</h4></td>
                                <td><h4>ACTION</h4></td>
                            </tr>
                        </thead>
                        <tbody>
                            <AnnouncementTableContents
                                announcement={currentAnnouncement}
                                id={getAnnouncementID}
                                action={getAction}
                                flag={getModal}
                                del={getDelete}
                                title={getTitle}
                                description={getDes}
                            />
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={2}>
                                    <h4>Total Announcement: {announcements.length}</h4>
                                </td>
                                <td colSpan={2}>
                                    <PageNumber
                                        announcementsPerPage={announcementsPerPage}//ResidentPerPage
                                        totalAnnouncement={announcements.length}
                                        paginate={paginate}
                                    />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }
};

export default Table;