import { useEffect, useState } from "react";
import "./ImageFormComponent.css";
import { Plus } from "lucide-react";

const ImageFormComponent = ({ formData, setFormData }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploadMode, setIsUploadMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDroppedFiles = (files) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newFile = {
            file,
            preview: e.target.result,
            id: Math.random().toString(36).substr(2, 9),
          };
          setUploadedFiles((prev) => [...prev, newFile]);
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, e.target.result],
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (!files) return;
    handleDroppedFiles(files);
    event.target.value = "";
  };

  const removeUploadedFile = (id) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const FileTextIcon = () => (
    <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  const UploadIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      />
    </svg>
  );

  const TrashIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );

  const XIcon = () => (
    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  useEffect(() => {
    setFormData({ ...formData, images: [] });
    setUploadedFiles([]);
  }, [isUploadMode]);

  return (
    <div className="image-form-container">
      <div className="form-content">
        <div className="toggle-container">
          <label className="toggle-label">URL</label>
          <button
            className={`toggle-switch ${isUploadMode ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setIsUploadMode(!isUploadMode);
            }}
          >
            <div className="toggle-slider"></div>
          </button>
          <label className="toggle-label">Upload</label>
        </div>

        {/* URL Mode */}
        {!isUploadMode && (
          <div className="url-section">
            {formData?.images?.map((image, index) => (
              <div key={index} className="form-group">
                {index === 0 && (
                  <label className="form-label">
                    <FileTextIcon />
                    Image URLs
                  </label>
                )}
                <div className="input-row">
                  <input
                    type="text"
                    className="text-input"
                    value={image}
                    onChange={(e) => {
                      const updated = [...formData.images];
                      updated[index] = e.target.value;
                      setFormData({ ...formData, images: updated });
                    }}
                    placeholder="Enter image URL"
                  />
                  <button
                    type="button"
                    className="delete-button-form"
                    onClick={() => {
                      const updated = formData.images.filter((_, i) => i !== index);
                      setFormData({ ...formData, images: updated });
                    }}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="icon-button primary"
              style={{ width: "fit-content" }}
              onClick={() => setFormData({ ...formData, images: [...formData.images, ""] })}
            >
              <Plus size={16} />
              Add Image
            </button>
          </div>
        )}

        {/* Upload Mode */}
        {isUploadMode && (
          <div className="upload-section">
            <label className="form-label">
              <UploadIcon className="label-icon" />
              Upload Images
            </label>

            <div
              className={`upload-area ${isDragging ? "drag-over" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleDroppedFiles(e.dataTransfer.files);
              }}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="file-input"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="upload-content">
                <UploadIcon className="upload-icon" />
                <span className="upload-text">Click to upload images or drag and drop</span>
                <span className="upload-subtext">PNG, JPG, GIF up to 10MB each</span>
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="preview-section">
                <label className="form-label">Uploaded Files</label>
                <div className="preview-container">
                  {uploadedFiles.map((fileData) => (
                    <div key={fileData.id} className="file-preview">
                      <button
                        type="button"
                        className="file-delete"
                        onClick={() => removeUploadedFile(fileData.id)}
                      >
                        <XIcon />
                      </button>

                      <div className="file-content">
                        <div className="file-thumbnail">
                          <img src={fileData.preview || "/placeholder.svg"} alt={fileData.file.name} />
                        </div>

                        <div className="file-info">
                          <p className="file-name">{fileData.file.name}</p>
                          <p className="file-details">
                            {fileData.file.type} • {formatFileSize(fileData.file.size)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageFormComponent;