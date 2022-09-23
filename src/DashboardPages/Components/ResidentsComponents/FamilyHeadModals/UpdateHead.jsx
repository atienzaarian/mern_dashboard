import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Tabs } from '@mui/material';
import Upload from "../../NewImageFiles/Resident/UploadAvatar.svg"
import Avatar from "../../NewImageFiles/Resident/Avatar.svg"
import ViewFamily from "../ViewFamilyInformation"

//FOR SNACKBAR
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

import { useResidentContext } from "../../../hooks/userResidentContext"

function UpdateResident(props) {
    const { dispatch } = useResidentContext()
    
    const [loading, setLoading] = useState(false)
    const genderOptions = ['Male', 'Female', 'Other'];
    const religionOptions = ['Catholic', 'Christian', 'Muslim', 'Other'];
    const civilStatusOptions = ['Married', 'Single', 'Divorced', 'Widowed'];
    const educationAttainment = ['No Formal Education', 'Elementary', 'High School',
        'General Education Development', 'Vocational Qualificiation', 'Bachelor’s Degree',
        'Master’s Degree', 'Doctorate or Higher'];
    const familyMember = ['Father', 'Mother'];

    // for tabs
    const [value, setValue] = useState(0);
    function handleTabChange(event, value) {
        setValue(value);
    }

    //Resident data input
    const [lastName, setLastName] = useState(props.resident.lastName)
    const [firstName, setFirstName] = useState(props.resident.firstName)
    const [middleName, setMiddleName] = useState(props.resident.middleName)
    const [suffix, setSuffix] = useState(props.resident.suffix)
    const [birthday, setBday] = useState(props.resident.birthday)
    const [birthPlace, setBirthplace] = useState(props.resident.birthplace)
    const [gender, setGender] = useState(props.resident.gender)
    const [religion, setReligion] = useState(props.resident.religion)
    const [email, setEmail] = useState(props.resident.email)
    const [phone, setPhone] = useState(props.resident.contactNumber)
    const [address, setAddress] = useState(props.resident.address)
    const [civilStatus, setCivilStatus] = useState(props.resident.civilStatus)
    const [educationalAttainment, setEducationalAttainment] = useState(props.resident.educationalAttainment)
    const [occupation, setOccupation] = useState(props.resident.occupation)
    const [monthlyIncome, setMonthlyIncome] = useState(props.resident.monthlyIncome)
    const [sss, setSSS] = useState(props.resident.membership.sss)
    const [gsis, setGSIS] = useState(props.resident.membership.gsis)
    const [pagibig, setPagibig] = useState(props.resident.membership.pagibig)
    const [philhealth, setPhilhealth] = useState(props.resident.membership.philhealth)

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        const response = await fetch('https://drims-demo.herokuapp.com/api/residents/'
            + props.resident._id, {
            method: 'PATCH',
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
                suffix: suffix,
                birthday: birthday,
                birthplace: birthPlace,
                gender: gender,
                religion: religion,
                email: email,
                contactNumber: phone,
                address: address,
                civilStatus: civilStatus,
                educationalAttainment: educationalAttainment,
                occupation: occupation,
                monthlyIncome: monthlyIncome,
                membership: {
                    pagibig: pagibig,
                    sss: sss,
                    gsis: gsis,
                    philhealth: philhealth
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const json = await response.json()

        if (response.ok) {
            setLoading(false)
            dispatch({ type: 'UPDATE_RESIDENT', payload: json })
            props.setShown(false)
            props.snackbar(true)
            document.getElementById("topBlur").className = "topbar flex-row";
            document.getElementById("sideBlur").className = "sidebar";
            document.getElementById("ResidentcontentBlur").className = "resident";
            document.getElementById("headerBlur").className = "header";
            props.headName(lastName + ", " + firstName)

            // update family head
            const activity = "Updated a resident: " + lastName + ", " + firstName
            const content = { activity }
            fetch('https://drims-demo.herokuapp.com/api/activity/', {
                method: 'POST',
                body: JSON.stringify(content),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            setLoading(false)
        }
    }

    const xButton = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    props.setShown(false)
                    document.getElementById("topBlur").className = "topbar flex-row";
                    document.getElementById("sideBlur").className = "sidebar";
                    document.getElementById("ResidentcontentBlur").className = "resident";
                    document.getElementById("headerBlur").className = "header";
                }}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )
    return (
        <div>
            {props.shown ? (
                <div className="modal-backdrop">
                    <form onSubmit={handleSubmit}>
                        <div className="residentModals modal-content">
                            <div className='modalHeader'>
                                <h2 className="marginBottom">{props.action === "view" ? "View Head of the Family" : "Update Head of the Family"} </h2>
                                {xButton}
                            </div>
                            <div>
                                <div className="flex-column center">
                                    <div className='profileAvatar' style={{ marginBottom: "24px" }}>
                                        <img src={Avatar} alt="" />
                                        {props.action !== "view" && (
                                            <div className='uploadAvatar'>
                                                <label>
                                                    <img src={Upload} alt="" style={{ cursor: "pointer" }} />
                                                    <input type="file" />
                                                </label>
                                            </div>
                                        )}

                                    </div>
                                    <h4>{props.resident.lastName}, {props.resident.firstName} {props.resident.middleName}</h4>
                                    <p>{props.resident.role}</p>
                                </div>
                                <Box sx={{ width: '100%', height: '348px', mb: 4, borderBottom: 1, borderColor: '#9C9C9C' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: '#9C9C9C' }}>
                                        <Tabs value={value} onChange={handleTabChange}>
                                            <Tab label="Personal Information" />
                                            <Tab label="Background Information" />
                                        </Tabs>
                                    </Box>
                                    <Box sx={{ height: '250px', overflow: 'auto', padding: "24px 0" }}>
                                        {value === 0 && (
                                            <div className="flex-column tab">
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Last Name</h4>
                                                        <TextField
                                                            name='lastName'
                                                            value={lastName}
                                                            onChange={(e) => setLastName(e.target.value)}
                                                            sx={{
                                                                "& .MuiOutlinedInput-root:hover": {
                                                                    "& > fieldset": {
                                                                        borderColor: "#7175F4"
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>First Name</h4>
                                                        <TextField
                                                            value={firstName}
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                            sx={{
                                                                "& .MuiOutlinedInput-root:hover": {
                                                                    "& > fieldset": {
                                                                        borderColor: "#7175F4"
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Middle Name</h4>
                                                        <TextField
                                                            value={middleName}
                                                            onChange={(e) => setMiddleName(e.target.value)}
                                                            sx={{
                                                                "& .MuiOutlinedInput-root:hover": {
                                                                    "& > fieldset": {
                                                                        borderColor: "#7175F4"
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Suffix (If Applicable)</h4>
                                                        <TextField
                                                            placeholder="Input Suffix"
                                                            value={suffix}
                                                            onChange={(e) => setSuffix(e.target.value)}
                                                            sx={{
                                                                "& .MuiOutlinedInput-root:hover": {
                                                                    "& > fieldset": {
                                                                        borderColor: "#7175F4"
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Birthday</h4>
                                                        <TextField
                                                            id="date"
                                                            type="date"
                                                            value={birthday}
                                                            onChange={(e) => setBday(e.target.value)}
                                                            sx={{
                                                                "& .MuiOutlinedInput-root:hover": {
                                                                    "& > fieldset": {
                                                                        borderColor: "#7175F4"
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Birth Place</h4>
                                                        <TextField
                                                            value={birthPlace}
                                                            onChange={(e) => setBirthplace(e.target.value)}
                                                            sx={{
                                                                "& .MuiOutlinedInput-root:hover": {
                                                                    "& > fieldset": {
                                                                        borderColor: "#7175F4"
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Gender</h4>
                                                        <Autocomplete
                                                            style={{ width: "99%" }}
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            value={gender}
                                                            options={genderOptions}
                                                            renderInput={(params) => <TextField {...params} />}
                                                            onChange={(e, newValue) => setGender(newValue)}
                                                            sx={{
                                                                "& .MuiOutlinedInput-root:hover": {
                                                                    "& > fieldset": {
                                                                        borderColor: "#7175F4"
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Religion</h4>
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            value={religion}
                                                            options={religionOptions}
                                                            renderInput={(params) => <TextField {...params} placeholder="Choose Religion" />}
                                                            onChange={(e, newValue) => setReligion(newValue)}
                                                            sx={{
                                                                "& .MuiOutlinedInput-root:hover": {
                                                                    "& > fieldset": {
                                                                        borderColor: "#7175F4"
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Email Address</h4>
                                                        <TextField
                                                            placeholder="Input Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            sx={{
                                                                "& .MuiOutlinedInput-root:hover": {
                                                                    "& > fieldset": {
                                                                        borderColor: "#7175F4"
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Contact Number</h4>
                                                        <TextField
                                                            value={phone}
                                                            onChange={(e) => setPhone(e.target.value)}
                                                            sx={{
                                                                "& .MuiOutlinedInput-root:hover": {
                                                                    "& > fieldset": {
                                                                        borderColor: "#7175F4"
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <h4>Address</h4>
                                                <TextField
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    sx={{
                                                        "& .MuiOutlinedInput-root:hover": {
                                                            "& > fieldset": {
                                                                borderColor: "#7175F4"
                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )}
                                        {value === 1 && (
                                            <div className="flex-column tab">
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Civil Status</h4>
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            value={civilStatus}
                                                            options={civilStatusOptions}
                                                            renderInput={(params) => <TextField {...params} placeholder="Choose Civil Status" />}
                                                            onChange={(e, newValue) => setCivilStatus(newValue)}
                                                            sx={{
                                                                "& .MuiOutlinedInput-root:hover": {
                                                                    "& > fieldset": {
                                                                        borderColor: "#7175F4"
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Educational Attainment</h4>
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            value={educationalAttainment}
                                                            options={educationAttainment}
                                                            renderInput={(params) => <TextField {...params} />}
                                                            onChange={(e, newValue) => setEducationalAttainment(newValue)}
                                                            sx={{
                                                                "& .MuiOutlinedInput-root:hover": {
                                                                    "& > fieldset": {
                                                                        borderColor: "#7175F4"
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Occupation</h4>
                                                        <TextField
                                                            placeholder="Input Occupation"
                                                            value={occupation}
                                                            onChange={(e) => setOccupation(e.target.value)}
                                                            sx={{
                                                                "& .MuiOutlinedInput-root:hover": {
                                                                    "& > fieldset": {
                                                                        borderColor: "#7175F4"
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Monthly Income</h4>
                                                        <TextField
                                                            placeholder="Input monthly income"
                                                            value={monthlyIncome}
                                                            onChange={(e) => setMonthlyIncome(e.target.value)}
                                                            sx={{
                                                                "& .MuiOutlinedInput-root:hover": {
                                                                    "& > fieldset": {
                                                                        borderColor: "#7175F4"
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Member of  Social Security <br /> System (SSS)</h4>
                                                        <FormControl>
                                                            <RadioGroup
                                                                aria-labelledby="demo-radio-buttons-group-label"
                                                                name="radio-buttons-group"
                                                                value={sss}
                                                                onChange={(e) => setSSS(e.target.value)}
                                                            >
                                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Member of Government Service <br /> Insurance System (GSIS)</h4>
                                                        <FormControl>
                                                            <RadioGroup
                                                                aria-labelledby="demo-radio-buttons-group-label"
                                                                name="radio-buttons-group"
                                                                value={gsis}
                                                                onChange={(e) => setGSIS(e.target.value)}
                                                            >
                                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Member of Pagtutulungan sa <br /> Kinabukasan (Pag-IBIG)</h4>
                                                        <FormControl>
                                                            <RadioGroup
                                                                aria-labelledby="demo-radio-buttons-group-label"
                                                                name="radio-buttons-group"
                                                                value={pagibig}
                                                                onChange={(e) => setPagibig(e.target.value)}
                                                            >
                                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4> Member of PhilHealth?</h4>
                                                        <FormControl>
                                                            <RadioGroup
                                                                aria-labelledby="demo-radio-buttons-group-label"
                                                                name="radio-buttons-group"
                                                                value={philhealth}
                                                                onChange={(e) => setPhilhealth(e.target.value)}
                                                            >
                                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Box>
                                </Box>
                            </div>
                            <div className="rightAlign ModalButtons">
                                {(value === 1 && props.action !== "view") && (
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="solidButton buttonBlue">
                                        Update
                                    </button>
                                )}
                                {value !== 1 && props.action !== "view" && (
                                    <button
                                        type='button'
                                        className="solidButton buttonBlue"
                                        onClick={() => {
                                            setValue(value + 1)
                                        }}>
                                        Next
                                    </button>
                                )}
                                {value !== 0 && props.action !== "view" && (
                                    <button
                                        disabled={loading}
                                        type='button'
                                        className="borderedButton"
                                        onClick={() => {
                                            setValue(value - 1)
                                        }}>
                                        Back
                                    </button>
                                )}
                                {value === 0 && props.action !== "view" && (
                                    <button
                                        disabled={loading}
                                        type="reset"
                                        className="borderedButton"
                                        onClick={() => {
                                            props.setShown(false)
                                            document.getElementById("topBlur").className = "topbar flex-row";
                                            document.getElementById("sideBlur").className = "sidebar";
                                            document.getElementById("ResidentcontentBlur").className = "resident";
                                            document.getElementById("headerBlur").className = "header";
                                            setValue(0)
                                        }}>
                                        Cancel
                                    </button>
                                )}
                                {props.action === "view" && (
                                    <button
                                        disabled={loading}
                                        type="button"
                                        className="borderedButton"
                                        onClick={() => {
                                            props.setShown(false)
                                            document.getElementById("topBlur").className = "topbar flex-row";
                                            document.getElementById("sideBlur").className = "sidebar";
                                            document.getElementById("ResidentcontentBlur").className = "resident";
                                            document.getElementById("headerBlur").className = "header";
                                            setValue(0)
                                        }}>
                                        Exit
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            ) : null}
        </div>
    )
}

export default UpdateResident
