import PropTypes from "prop-types";

const Footer = ({
  applications,
  currentIndex,
  setCurrentIndex,
  selectedDocumentIndex,
  setSelectedDocumentIndex,
}) => {
  if (currentIndex === -1 || !applications[currentIndex]) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          padding: "10px",
          backgroundColor: "#e9ecef",
          borderTop: "1px solid #ccc",
        }}
      >
        <p>No application selected</p>
      </div>
    );
  }

  const handleBack = () => {
    if (selectedDocumentIndex > 0) {
      setSelectedDocumentIndex(selectedDocumentIndex - 1);
    } else if (currentIndex > 0) {
      const prevAppDocs = applications[currentIndex - 1]?.documents || [];
      if (prevAppDocs.length > 0) {
        setCurrentIndex(currentIndex - 1);
        setSelectedDocumentIndex(prevAppDocs.length - 1);
      }
    }
  };

  const handleNext = () => {
    const currentApp = applications[currentIndex];
    const documents = currentApp?.documents || [];

    if (selectedDocumentIndex < documents.length - 1) {
      setSelectedDocumentIndex(selectedDocumentIndex + 1);
    } else if (currentIndex < applications.length - 1) {
      const nextAppDocs = applications[currentIndex + 1]?.documents || [];
      if (nextAppDocs.length > 0) {
        setCurrentIndex(currentIndex + 1);
        setSelectedDocumentIndex(0);
      }
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        padding: "10px",
        backgroundColor: "#e9ecef",
        borderTop: "1px solid #ccc",
      }}
    >
      <button
        onClick={handleBack}
        disabled={currentIndex === 0 && selectedDocumentIndex === 0}
        style={{ padding: "5px 10px", fontSize: "14px" }}
      >
        Back
      </button>
      <button
        onClick={handleNext}
        disabled={
          currentIndex === applications.length - 1 &&
          selectedDocumentIndex ===
            (applications[currentIndex]?.documents || []).length - 1
        }
        style={{ padding: "5px 10px", fontSize: "14px" }}
      >
        Next
      </button>
    </div>
  );
};

Footer.propTypes = {
  applications: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
  setCurrentIndex: PropTypes.func.isRequired,
  selectedDocumentIndex: PropTypes.number,
  setSelectedDocumentIndex: PropTypes.func.isRequired,
};

export default Footer;
