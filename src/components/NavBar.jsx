import PropTypes from "prop-types";

const NavBar = ({
  applications,
  handleAddApplication,
  handleDeleteApplication,
  currentIndex,
  handleApplicationClick,
}) => {
  return (
    <div
      className="navbar"
      style={{
        padding: "8px",
        backgroundColor: "#e9ecef",
        borderBottom: "1px solid #ccc",
      }}
    >
      <button
        onClick={handleAddApplication}
        style={{ padding: "5px 10px", fontSize: "14px" }}
      >
        Add
      </button>
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {applications.map((app, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 10px",
              border: "1px solid #bbb",
              borderRadius: "4px",
              fontSize: "14px",
              backgroundColor: index === currentIndex ? "#007bff" : "#fff",
              color: index === currentIndex ? "#fff" : "#000",
              cursor: "pointer",
            }}
            onClick={() => handleApplicationClick(index)}
          >
            {app.name}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteApplication(index);
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
        ))}
      </div>
    </div>
  );
};

NavBar.propTypes = {
  applications: PropTypes.array.isRequired,
  handleAddApplication: PropTypes.func.isRequired,
  handleDeleteApplication: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  handleApplicationClick: PropTypes.func.isRequired,
};

export default NavBar;
