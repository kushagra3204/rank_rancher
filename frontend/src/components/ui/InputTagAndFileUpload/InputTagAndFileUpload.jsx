// import React, { useState, useRef } from 'react';
// import './InputTagAndFileUpload.css';
// import { Upload } from 'lucide-react';

// const InputTagAndFileUpload = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const fileInputRef = useRef(null);

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file) { 
//       console.log(file)
//       setSelectedFile(file);
//       setInputValue(file.name);
//     }
//   };

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//     if (event.target.value) {
//       setSelectedFile(null);
//     }
//   };

//   const handleUploadClick = (e) => {
//     e.preventDefault()
//     if (!inputValue.trim()) {
//       fileInputRef.current?.click();
//     }
//   };

//   const handleSubmit = () => {
//     if (selectedFile) {
//       console.log('File selected:', selectedFile);
//     } else if (inputValue.trim()) {
//       console.log('Link submitted:', inputValue);
//     }
//   };

//   return (
//     <div className="file-upload-container">
//       <div className="input-container">
//         <input 
//           type="text" 
//           value={inputValue}
//           onChange={handleInputChange}
//           placeholder="Enter Image URL or Upload"
//           className="main-input"
//         />
        
//         <button 
//           className={`upload-icon-btn ${inputValue.trim() ? 'disabled' : ''}`}
//           onClick={(e) => handleUploadClick(e)}
//           disabled={inputValue.trim()}
//           title={inputValue.trim() ? 'Clear input to upload file' : 'Upload file'}
//         >
//             <Upload width={20} height={20}/>
//         </button>

//         <input 
//           type="file" 
//           ref={fileInputRef}
//           onChange={handleFileSelect}
//           style={{ display: 'none' }}
//         />
//       </div>

//       {(selectedFile || inputValue.trim()) && (
//         <button className="submit-button" onClick={handleSubmit}>
//           {selectedFile ? 'Upload File' : 'Submit Link'}
//         </button>
//       )}
//     </div>
//   );
// };

// export default InputTagAndFileUpload;


// import React, { useState, useRef } from 'react';
// import './InputTagAndFileUpload.css';
// import { Upload } from 'lucide-react';

// const InputTagAndFileUpload = ({ name, label, value, onChange }) => {
//   const [preview, setPreview] = useState(value)
//   const fileInputRef = useRef(null);

//   const handleFileChange = async (e) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         const base64 = reader.result
//         setPreview(base64)
//         onChange(base64)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleUploadClick = (e) => {
//     e.preventDefault()
//     if (!preview.trim()) {
//       fileInputRef.current?.click();
//     }
//   };

//   const handleUrlChange = (e) => {
//     const url = e.target.value
//     setPreview(url)
//     onChange(url)
//   }

//   return (
//     <div className="file-upload-container">
//       <div className="input-container">
//         <input 
//           type="text" 
//           value={preview.startsWith("data:") ? "" : preview}
//           onChange={handleUrlChange}
//           placeholder="Enter Image URL or Upload"
//           className="main-input"
//         />
        
//         <button 
//           className={`upload-icon-btn ${preview.trim() ? 'disabled' : ''}`}
//           onClick={(e) => handleUploadClick(e)}
//           disabled={preview.trim()}
//           title={preview.trim() ? 'Clear input to upload file' : 'Upload file'}
//         >
//             <Upload width={20} height={20}/>
//         </button>

//         <input 
//           type="file" 
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           style={{ display: 'none' }}
//         />
//       </div>
//     </div>
//   )
// }

// export default InputTagAndFileUpload


import { useState, useRef } from 'react';
import './InputTagAndFileUpload.css';
import { Upload } from 'lucide-react';

const InputTagAndFileUpload = ({ name, label, value, onChange }) => {
  const [preview, setPreview] = useState(value || '');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setPreview(base64);
        onChange({ target: { name, value: base64 } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    if (!preview.trim()) {
      fileInputRef.current?.click();
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPreview(url);
    onChange({ target: { name, value: url } });
  };

  return (
    <div className="file-upload-container">
      <div className="input-container">
        <input
          type="text"
          value={preview.startsWith('data:') ? '' : preview}
          onChange={handleUrlChange}
          placeholder={label}
          className="main-input"
        />

        <button
          className={`upload-icon-btn ${preview.trim() ? 'disabled' : ''}`}
          onClick={(e) => handleUploadClick(e)}
          disabled={preview.trim()}
          title={preview.trim() ? 'Clear input to upload file' : 'Upload file'}
        >
          <Upload width={20} height={20} />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
      </div>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{
            marginTop: '0.5rem',
            maxHeight: '12rem',
            borderRadius: '0.5rem',
            border: '1px solid #ccc',
          }}
        />
      )}
    </div>
  );
};

export default InputTagAndFileUpload;