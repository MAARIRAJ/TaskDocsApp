import { useState } from "react";
import PropTypes from "prop-types";

const Content = ({
  applications,
  currentIndex,
  updateDocuments,
  selectedDocumentIndex,
  setSelectedDocumentIndex,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  if (currentIndex === -1) return <p>No Application Selected</p>;

  const currentApp = applications[currentIndex];
  const documents = currentApp?.documents || [];

  const handleAddDocument = () => {
    const docName = prompt("Enter the document name: ");
    if (docName) {
      const updatedDocuments = [...documents, docName];
      updateDocuments(currentIndex, updatedDocuments);
    } else {
      alert("Please enter document name: ");
    }
  };

  const handleDeleteDocument = (index) => {
    const updatedDocuments = documents.filter((_, i) => i !== index);

    updateDocuments(currentIndex, updatedDocuments);
    setSelectedDocumentIndex(null);
  };

  const handleSelectDocument = (index) => {
    setSelectedDocumentIndex(index);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "200px",
          padding: "15px",
          borderRight: "1px solid #ccc",
          overflowY: "auto",
        }}
      >
        <h3>Documents</h3>
        <button
          onClick={handleAddDocument}
          style={{
            padding: "5px 10px",
            fontSize: "14px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "15px",
            width: "100%",
          }}
        >
          Add Document
        </button>

        <div>
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <div
                key={index}
                onClick={() => handleSelectDocument(index)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "5px 10px",
                  border: "1px solid #bbb",
                  borderRadius: "4px",
                  fontSize: "14px",
                  backgroundColor:
                    selectedDocumentIndex === index ? "#fbbcff" : "#f8f9fa",
                  color: "#007bff",
                  cursor: "pointer",
                  marginBottom: "8px",
                }}
              >
                {doc}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteDocument(index);
                  }}
                  style={{
                    marginLeft: "5px",
                    padding: "3px",
                    fontSize: "12px",
                    backgroundColor: "gray",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "3px",
                  }}
                >
                  ❌
                </button>
              </div>
            ))
          ) : (
            <p>No documents added yet.</p>
          )}
        </div>
      </div>

      <div style={{ flex: 1, padding: "15px" }}>
        {currentApp ? (
          <h2>{currentApp.name}</h2>
        ) : (
          <p>No application selected </p>
        )}

        {selectedDocumentIndex !== null ? (
          <>
            <h3>Selected Document: {documents[selectedDocumentIndex]}</h3>
            <div>
              <label htmlFor="file-upload" style={{ marginBottom: "10px" }}>
                Upload File:
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                style={{ marginBottom: "15px" }}
              />
              {selectedFile && (
                <div>
                  <p>Selected File: {selectedFile.name}</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <p>Select a document from the left sidebar.</p>
        )}
      </div>
    </div>
  );
};

Content.propTypes = {
  applications: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
  updateDocuments: PropTypes.func.isRequired,
  selectedDocumentIndex: PropTypes.number,
  setSelectedDocumentIndex: PropTypes.func.isRequired,
};

export default Content;
