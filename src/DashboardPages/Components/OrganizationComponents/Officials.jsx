import React, { useState, useEffect } from "react"
// import Select from 'react-select';
import Avatar from "../NewImageFiles/Resident/Avatar.svg"
import View from "../NewImageFiles/ActionButton/View.svg"
import Update from "../NewImageFiles/ActionButton/Update.svg"
import Delete from "../NewImageFiles/ActionButton/Delete.svg"
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';

import Modal from "../CommonComponents/Modal"
// import useFetch from "../usFetch"

//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useOrganizationContext } from "../../hooks/useOrganizationContext"

import format from "date-fns/format";
function Officials() {

    //get all officials
    const { organizations, dispatch } = useOrganizationContext()

    // get all resident that are officials
    const [filteredResident, setFilteredResident] = useState([])
    useEffect(() => {
        const fetchOfficials = async () => {
            const response = await fetch('https://drims-demo.herokuapp.com/api/organization/')
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_OFFICIAL', payload: json })

                const resresponse = await fetch('https://drims-demo.herokuapp.com/api/residents/')
                const resjson = await resresponse.json()

                if (resresponse.ok) {
                    setFilteredResident(resjson)
                    // json.map(official => {
                    //     resjson.filter(head => head._id === official.resident_id).map((filteredHead) => {
                    //         // setFilteredResident(current => [...current, filteredHead])
                    //         console.log(filteredHead)
                    //     })
                    // })

                }
            }
        }

        fetchOfficials()
    }, [dispatch])

    const [modalShown, toggleModal] = useState(false);
    const [updateModalShown, toggleUpdateModal] = useState(false);
    const [deleteModal, toggleDeleteModal] = useState(false)

    const positionOptions = ['Chairman', 'Chairperson', 'Kagawad', 'SB Member', 'Member'];
    const [snackbar, toggleSnackbar] = useState(false);
    const [deleteSnackbar, toggleDeleteSnackbar] = useState(false);

    const action = (
        <React.Fragment>
            {/* <Button size="small" onClick={() => { toggleSnackbar(false) }}>
                <p style={{ color: "white", margin: 0 }}>Undo</p>
            </Button> */}
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    toggleSnackbar(false)
                    toggleDeleteSnackbar(false)
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const [position, setPosition] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [nameOfMember, setNameOfMember] = useState('')
    const [bday, setBday] = useState('')
    const [id, setId] = useState(null)
    const [residentID, setResidentID] = useState(null)

    // handle update official
    const handleUpdate = async () => {

        const response = await fetch('https://drims-demo.herokuapp.com/api/organization/'
            + id, {
            method: 'PATCH',
            body: JSON.stringify({
                resident_id: residentID,
                position: position
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'UPDATE_OFFICIAL', payload: json })
            toggleUpdateModal(false)
            document.getElementById("topBlur").className = "topbar flex-row";
            document.getElementById("sideBlur").className = "sidebar";
            document.getElementById("contentBlur").className = "flex-row";
            document.getElementById("headerBlur").className = "header";
            toggleSnackbar(true)

            //update announcement
            const activity = "Updated an official: " + nameOfMember
            const content = { activity }
            fetch('https://drims-demo.herokuapp.com/api/activity/', {
                method: 'POST',
                body: JSON.stringify(content),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    // handle delete official
    const handleDelete = async () => {

        const response = await fetch('https://drims-demo.herokuapp.com/api/organization/'
            + id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_OFFICIAL', payload: json })
            toggleDeleteModal(false)
            document.getElementById("topBlur").className = "topbar flex-row";
            document.getElementById("sideBlur").className = "sidebar";
            document.getElementById("contentBlur").className = "flex-row";
            document.getElementById("headerBlur").className = "header";
            toggleDeleteSnackbar(true)

            //delete announcement
            const activity = "Deleted an official: " + nameOfMember
            const content = { activity }
            fetch('https://drims-demo.herokuapp.com/api/activity/', {
                method: 'POST',
                body: JSON.stringify(content),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    if (organizations) {
        return (
            <div className="official">
                {/* View Official */}
                {modalShown && (
                    <Modal
                        shown={modalShown}
                        close={() => {
                            toggleModal(false);
                        }}
                        align="center">
                        <div>
                            <div className="modalheader">
                                <label className='label'>Detailed Information</label><br />
                            </div>
                            <div>
                                <img src={Avatar} alt="" className="modalAvatar" />
                                <h3 style={{ fontSize: "20px" }}>{nameOfMember}</h3>
                                <div className="marginTop8">
                                    <h6 style={{ fontSize: "14px" }} >{position}</h6>
                                </div>
                            </div>
                            <div className="details leftAlign">
                                <div className="flex-row marginBottom marginTop">
                                    <h4>Details</h4>
                                </div>
                                <div className="flex-row borderBottom1 marginTop paddingBottom">
                                    <h4 style={{ width: 120, textAlign: "left" }}>Birthday:</h4>
                                    <p style={{ width: 230, textAlign: "left" }}>{format(new Date(bday), "MMMM dd, yyyy")}</p>
                                </div>
                                <div className="flex-row borderBottom1 marginTop paddingBottom">
                                    <h4 style={{ width: 120, textAlign: "left" }}>Address:</h4>
                                    <p style={{ width: 230, textAlign: "left" }}>{address}</p>
                                </div>
                                <div className="flex-row borderBottom1 marginTop paddingBottom">
                                    <h4 style={{ width: 120, textAlign: "left" }}>Email:</h4>
                                    <p style={{ textAlign: "left" }}>{email}</p>
                                </div>
                                <div className="flex-row marginTop paddingBottom">
                                    <h4 style={{ width: 120, textAlign: "left" }}>Phone No.:</h4>
                                    <p style={{ textAlign: "left" }}>{phone}</p>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className='borderedButton exit marginTop'
                                onClick={() => {
                                    toggleModal(false)
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("contentBlur").className = "flex-row";
                                    document.getElementById("headerBlur").className = "header";
                                }}>
                                EXIT
                            </button>
                        </div>
                    </Modal>
                )}

                {/* UpdateOfficial */}
                {updateModalShown && (
                    <Modal
                        shown={updateModalShown}
                        close={() => {
                            toggleUpdateModal(false);
                        }}>
                        <div className="Editmodal officalModal">
                            <h2 className="marginBottom">Edit Official</h2>
                            <div className="flex-row addOfficial space-between">
                                <div className="selects">
                                    <h4>Resident's Name</h4>
                                    <TextField
                                        value={nameOfMember}
                                        disabled
                                        style={{ marginTop: "8px", marginBottom: "16px", width: "100%" }}
                                    />
                                    <h4 style={{ marginBottom: "8px" }}>Position</h4>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        value={position}
                                        options={positionOptions}
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} />}
                                        onChange={(e, newValue) => setPosition(newValue)}
                                        sx={{
                                            "& .MuiOutlinedInput-root:hover": {
                                                "& > fieldset": {
                                                    borderColor: "#7175F4"
                                                }
                                            }
                                        }}
                                    />
                                </div>

                                <div className="addOfficialDetails">
                                    <div className="modalheader">
                                        <label className='label'>Detailed Information</label><br />
                                    </div>
                                    <div className="details">
                                        <div className="addOfficialDetailsHeader">
                                            <img src={Avatar} alt="" className="modalAvatar" />
                                            <h3 style={{ fontSize: "20px" }}>{nameOfMember}</h3>
                                            <div className="marginTop8">
                                                <h6 style={{ fontSize: "14px" }} >{position}</h6>
                                            </div>
                                        </div>
                                        <div className="topAlign">
                                            <div className="flex-row marginBottom marginTop">
                                                <h3>Details</h3>
                                            </div>
                                            <div className="flex-row borderBottom1 paddingBottom">
                                                <h4 style={{ width: "30%", textAlign: "left" }}>Birthday:</h4>
                                                <p style={{ textAlign: "left" }}>{bday}</p>
                                            </div>
                                            <div className="flex-row borderBottom1 marginTop paddingBottom">
                                                <h4 style={{ width: "30%", textAlign: "left" }}>Address:</h4>
                                                <p style={{ width: "70%", textAlign: "left" }}>{address}</p>
                                            </div>
                                            <div className="flex-row borderBottom1 marginTop paddingBottom">
                                                <h4 style={{ width: "30%", textAlign: "left" }}>Email:</h4>
                                                <p style={{ textAlign: "left" }}>{email}</p>
                                            </div>
                                            <div className="flex-row marginTop paddingBottom">
                                                <h4 style={{ width: "30%", textAlign: "left" }}>Phone No.:</h4>
                                                <p style={{ textAlign: "left" }}>{phone}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="ModalButtons">
                                <button
                                    className="solidButton buttonBlue"
                                    onClick={() => {
                                        handleUpdate()
                                    }}>
                                    Update
                                </button>
                                <button
                                    className="borderedButton"
                                    onClick={() => {
                                        toggleUpdateModal(false)
                                        document.getElementById("topBlur").className = "topbar flex-row";
                                        document.getElementById("sideBlur").className = "sidebar";
                                        document.getElementById("contentBlur").className = "flex-row";
                                        document.getElementById("headerBlur").className = "header";
                                    }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}

                {/* delete official */}
                <Modal
                    shown={deleteModal}
                    close={() => {
                        toggleDeleteModal(false)
                    }}>
                    <div className="deleteModals">
                        <h2> Remove Official?</h2>
                        <div>
                            <p>Are you sure you want to remove <span style={{ fontWeight: "bold" }}>{nameOfMember}</span>? All data removed are archived and can be restored.</p>
                        </div>
                        <div className="rightAlign ModalButtons">
                            <button
                                className="solidButton buttonRed"
                                onClick={() => {
                                    handleDelete()
                                }}>
                                Remove
                            </button>
                            <button
                                className="borderedButton"
                                onClick={() => {
                                    toggleDeleteModal(false)
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("contentBlur").className = "flex-row";
                                    document.getElementById("headerBlur").className = "header";
                                }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>

                {/* update Snackbar */}
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={snackbar}
                    onClose={() => { toggleSnackbar(false) }}
                    autoHideDuration={5000}
                    message={`${nameOfMember} information has been updated!`}
                    action={action}
                    ContentProps={{
                        sx: {
                            background: "#836B16",
                            width: 560,
                            ml: 30,
                            mt: 10
                        }
                    }}
                />
                {/* delete snackbar */}
                <Snackbar
                    open={deleteSnackbar}
                    onClose={() => {
                        toggleDeleteSnackbar(false)
                    }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={2000}
                    message={`${nameOfMember} has been removed!`}
                    ContentProps={{
                        sx: {
                            background: "#D82727",
                            width: 560,
                            ml: 30,
                            mt: 10
                        }
                    }}
                    action={action}
                />

                <div id="contentBlur" className="flex-row">
                    {organizations.map((props) => {
                        let obj = filteredResident.find(data => data._id === props.resident_id);
                        return (
                            obj && (
                                <div className="flex-column officialCard " key={props._id}>
                                    <div className="avatar">
                                        <img src={Avatar} alt="" style={{ width: "100px" }} />
                                    </div>
                                    <div style={{ textOverflow: "ellipsis", overflow: "hidden", width: "180px", whiteSpace: "nowrap", fontWeight: "bold", fontSize: "20px" }}>
                                        {obj.firstName} {obj.lastName}
                                    </div>
                                    <p className="marginTop8">{props.position}</p>
                                    <div className="flex-row actions">
                                        <button className="solidButton squareButton buttonGreen" style={{ marginRight: "16px" }}
                                            onClick={() => {
                                                setPosition(props.position)
                                                setAddress(obj.address)
                                                setEmail(obj.email)
                                                setPhone(obj.contactNumber)
                                                setNameOfMember(obj.firstName + " " + obj.lastName)
                                                setBday(obj.birthday)
                                                toggleModal(true)
                                                document.getElementById("sideBlur").className += " blur";
                                                document.getElementById("topBlur").className += " blur";
                                                document.getElementById("headerBlur").className += " blur";
                                                document.getElementById("contentBlur").className += " blur";
                                            }}>
                                            <img src={View} alt="" />
                                        </button>
                                        <button className="solidButton squareButton buttonBlue" style={{ marginRight: "16px" }}
                                            onClick={() => {
                                                setPosition(props.position)
                                                setAddress(obj.address)
                                                setEmail(obj.email)
                                                setPhone(obj.contactNumber)
                                                setNameOfMember(obj.firstName + " " + obj.lastName)
                                                setBday(obj.birthday)
                                                setId(props._id)
                                                setResidentID(props.resident_id)
                                                toggleUpdateModal(true)
                                                document.getElementById("sideBlur").className += " blur";
                                                document.getElementById("topBlur").className += " blur";
                                                document.getElementById("headerBlur").className += " blur";
                                                document.getElementById("contentBlur").className += " blur";
                                            }}>
                                            <img src={Update} alt="" />
                                        </button>
                                        <button className='delete squareButton'
                                            onClick={() => {
                                                setNameOfMember(obj.firstName + " " + obj.lastName)
                                                setId(props._id)
                                                toggleDeleteModal(true)
                                                document.getElementById("sideBlur").className += " blur";
                                                document.getElementById("topBlur").className += " blur";
                                                document.getElementById("headerBlur").className += " blur";
                                                document.getElementById("contentBlur").className += " blur";
                                            }}>
                                            <img src={Delete} alt="" />
                                        </button>
                                    </div>
                                </div>
                            )
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Officials
