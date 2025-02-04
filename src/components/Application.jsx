import { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Content from "./Content";

const Application = () => {
  const [applications, setApplications] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(0);

  const handleAddApplication = () => {
    const appName = prompt("Enter the application name:");
    if (appName) {
      setApplications([...applications, { name: appName, documents: [] }]);
      setCurrentIndex(applications.length); 
    } else {
      alert("Please Enter application name");
    }
  };

  const handleDeleteApplication = (index) => {
    const updatedApps = applications.filter((_, i) => i !== index);
    setApplications(updatedApps);

    if (index === currentIndex) {
      setCurrentIndex(updatedApps.length - 1);
    } else if (index < currentIndex) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleApplicationClick = (index) => {
    setCurrentIndex(index);
  };

  const updateDocuments = (index, newDocuments) => {
    const updatedApps = [...applications];
    updatedApps[index].documents = newDocuments;
    setApplications(updatedApps);
  };

  return (
    <div>
      <NavBar
        applications={applications}
        handleAddApplication={handleAddApplication}
        handleDeleteApplication={handleDeleteApplication}
        currentIndex={currentIndex}
        handleApplicationClick={handleApplicationClick}
      />
      <Content
        applications={applications}
        currentIndex={currentIndex}
        updateDocuments={updateDocuments}
        selectedDocumentIndex={selectedDocumentIndex}
        setSelectedDocumentIndex={setSelectedDocumentIndex}
      />
      <Footer
        applications={applications}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        selectedDocumentIndex={selectedDocumentIndex}
        setSelectedDocumentIndex={setSelectedDocumentIndex}
      />
    </div>
  );
};

export default Application;
