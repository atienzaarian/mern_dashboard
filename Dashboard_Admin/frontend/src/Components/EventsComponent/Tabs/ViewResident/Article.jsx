import { useParams } from "react-router-dom";
import Select from 'react-select';

import TextField from "@mui/material/TextField";
import uploadEventBanner from "../../../NewImageFiles/Event/uploadEventBanner.svg"

function PersonalInformation() {
    const tag = [
        { value: 'Business', label: 'Business' },
        { value: 'Business', label: 'Business' },
        { value: 'Business', label: 'Business' }
    ];

    return (

        <div className="flex-column addArticle">
            <div className="flex-column addEvent tab">
                <div className="marginBottom">
                    <h4>Article Detail</h4>
                    <TextField
                        id="outlined-multiline-static"
                        placeholder="Input Article Detail"
                        multiline
                        rows={5}
                        fullWidth
                        inputProps={{
                            maxLength: 400
                        }}
                        disabled
                    />
                </div>
                <div>
                    <h4>Article Banner</h4>
                    <div className="uploadArticleBanner">
                        <label className="fileUpload">
                            <div className="flex-row fileUploadContent">
                                <div className="flex-row">
                                    <img src={uploadEventBanner} alt="" />
                                    <div className="flex-column">
                                        <h4>Upload an image or drag and drop here</h4>
                                        <p>JPG or PNG, smaller than 10MB</p>
                                    </div>
                                </div>

                                <div className="upload">Upload</div>
                            </div>
                            <input type="file" />
                        </label>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default PersonalInformation;
