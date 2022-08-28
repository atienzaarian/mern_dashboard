import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function BackgroundInformation() {
    const civilStatus = [
        { value: 'Married', label: 'Married' },
        { value: 'Single', label: 'Single' },
        { value: 'Divorced', label: 'Divorced' },
        { value: 'Widowed', label: 'Widowed' }
    ];
    const educationAttainment = [
        { value: 'No Formal Education', label: 'No Formal Education' },
        { value: 'Elementary', label: 'Elementary' },
        { value: 'High School', label: 'High School' },
        { value: 'General Education Development', label: 'General Education Development' },
        { value: 'Vocational Qualificiation', label: 'Vocational Qualificiation' },
        { value: 'Bachelor’s Degree', label: 'Bachelor’s Degree' },
        { value: 'Master’s Degree', label: 'Master’s Degree' },
        { value: 'Doctorate or Higher', label: 'Doctorate or Higher' }
    ];

    return (
        <div className="flex-column tab">
            <div className="flex-row space-between">
                <div className="flex-column inputs">
                    <h4>Civil Status</h4>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={civilStatus}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} placeholder="Choose Civil Status" />}
                    />
                </div>
                <div className="flex-column inputs">
                    <h4>Educational Attainment</h4>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={educationAttainment}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} placeholder="Choose Educational Background" />}
                    />
                </div>
            </div>
            <div className="flex-row space-between">
                <div className="flex-column inputs">
                    <h4>Occupation</h4>
                    <input type="text" placeholder="Input Last Name" />
                </div>
                <div className="flex-column inputs">
                    <h4>Monthly Income</h4>
                    <input type="text" placeholder="Input First Name" />
                </div>
            </div>
            <div className="flex-row space-between">
                <div className="flex-column inputs">
                    <h4>Member of  Social Security <br /> System (SSS)</h4>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="flex-column inputs">
                    <h4>Member of Government Service <br /> Insurance System (GSIS)</h4>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
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
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="flex-column inputs">
                    <h4> Member of PhilHealth?</h4>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </div>
    );
}

export default BackgroundInformation;
