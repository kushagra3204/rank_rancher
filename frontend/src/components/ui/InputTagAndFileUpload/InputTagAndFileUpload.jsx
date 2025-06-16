import React, { useState, useRef } from 'react';
import './InputTagAndFileUpload.css';
import { Upload } from 'lucide-react';

const InputTagAndFileUpload = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) { 
      setSelectedFile(file);
      setInputValue(file.name);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (event.target.value) {
      setSelectedFile(null);
    }
  };

  const handleUploadClick = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) {
      fileInputRef.current?.click();
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      console.log('File selected:', selectedFile);
      // Handle file upload logic here
    } else if (inputValue.trim()) {
      console.log('Link submitted:', inputValue);
      // Handle link submission logic here
    }
  };

  return (
    <div className="file-upload-container">
      <div className="input-container">
        <input 
          type="text" 
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter Image URL or Upload"
          className="main-input"
        />
        
        <button 
          className={`upload-icon-btn ${inputValue.trim() ? 'disabled' : ''}`}
          onClick={(e) => handleUploadClick(e)}
          disabled={inputValue.trim()}
          title={inputValue.trim() ? 'Clear input to upload file' : 'Upload file'}
        >
            <Upload width={20} height={20}/>
        </button>

        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>

      {/* {(selectedFile || inputValue.trim()) && (
        <button className="submit-button" onClick={handleSubmit}>
          {selectedFile ? 'Upload File' : 'Submit Link'}
        </button>
      )} */}
    </div>
  );
};

export default InputTagAndFileUpload;