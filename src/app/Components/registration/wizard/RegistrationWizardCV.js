import React, {useState} from 'react';
import {formErrorMessage} from "../../../pages/errors/FormErrorMessage";
import RegistrationWizardContent from "./RegistrationWizardContent";
import Dropzone from "react-dropzone";

const RegistrationWizardCv = ({errors, setFieldValue, values}) => {
  const [error, setError] = useState({show: false, message: ''})
  const onDrop = acceptedFiles => {
    setFieldValue('cv', acceptedFiles[0])
  }
  const onDropReject = files => {
    setError({show: true, message: 'Could not accept this file'})
    setTimeout(() => {
      setError({show: false, message: ''})
    }, 2000)
  }
  const handleClickRemoveCV = () => {
    setFieldValue('cv', null)
  }
  return (
    <RegistrationWizardContent title="Upload Your CV">
      {error.show && (
        <div role="alert" className="alert alert-danger">
          <div className="alert-text">{error.message}</div>
        </div>
      )}
      {formErrorMessage(errors.cv)}
      <div>
        <Dropzone
          onDrop={onDrop}
          accept="application/pdf"
          onDropRejected={onDropReject}
          multiple={false}
        >
          {({getRootProps, getInputProps, isDragActive}) => (
            getRootProps && getInputProps && <section>
              <div {...getRootProps({
                className: `base-style ${isDragActive ? 'active-style' : ''}`
              })}>
                <input {...getInputProps()} />
                {
                  isDragActive
                    ? <span>Drop the file here ...</span>
                    : <span>Drag 'n' drop file in pdf here, or click to select file</span>
                }
              </div>
            </section>
          )}
        </Dropzone>
      </div>
      {
        values.cv &&
        <div className='pdf-uploaded'>
          <div className='fa fa-file-pdf'/>
          <div className='fa fa-minus-circle' onClick={handleClickRemoveCV}/>
        </div>
      }
    </RegistrationWizardContent>
  );
};

export default RegistrationWizardCv;