import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../style/AdminCityPage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function CityManagementPage() {
  const [mode, setMode] = useState("add");
  const [searchName, setSearchName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState([""]);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleModeToggle = (newMode) => {
    setMode(newMode);
    setStatusMessage("");
    setErrorMessage("");
    setSearchName("");
    setName("");
    setDescription("");
    setPictures([""]);
  };

  const handleFetchCity = async () => {
    setStatusMessage("");
    setErrorMessage("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Unauthorized: no token found.");
        return;
      }

      const response = await axios.get(`/api/cities/${encodeURIComponent(searchName)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Server response:", response.data);

      const { city } = response.data;
      if (!city) {
        setErrorMessage("City not found.");
        return;
      }

      setName(city.name);
      setDescription(city.description);
      setPictures(city.pictures && city.pictures.length ? city.pictures : [""]);
      setStatusMessage(`City “${searchName}” loaded successfully!`);
      clearStatusAfterDelay();
    } catch (error) {
      console.error("Error fetching city:", error);
      setErrorMessage("Failed to load city. Check spelling or city name.");
      clearErrorAfterDelay();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Unauthorized: no token found.");
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (mode === "add") {
        const response = await axios.post("/api/cities", { name, description, pictures }, config);
        if (response.status === 201) {
          setStatusMessage("City created successfully!");
          setName("");
          setDescription("");
          setPictures([""]);
          clearStatusAfterDelay();
        }
      } else {
        const response = await axios.put(`/api/cities/${encodeURIComponent(name)}`, { description, pictures }, config);
        if (response.status === 200) {
          setStatusMessage(`City “${name}” updated successfully!`);
          setName("");
          setDescription("");
          setPictures([""]);
          clearStatusAfterDelay();
        }
      }
    } catch (error) {
      console.error("Error saving city:", error);
      setErrorMessage("An error occurred while saving the city.");
      clearErrorAfterDelay();
    }
  };

  const handleDelete = async () => {
    setStatusMessage("");
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Unauthorized: no token found.");
        return;
      }

      const response = await axios.delete(`/api/cities/${encodeURIComponent(name)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setStatusMessage(`City “${name}” deleted successfully!`);
        setName("");
        setDescription("");
        setPictures([""]);
        clearStatusAfterDelay();
      }
    } catch (error) {
      console.error("Error deleting city:", error);
      setErrorMessage("An error occurred while deleting the city.");
      clearErrorAfterDelay();
    }
  };

  const handlePictureChange = (index, value) => {
    const updated = [...pictures];
    updated[index] = value;
    setPictures(updated);
  };

  const addPictureField = () => {
    setPictures([...pictures, ""]);
  };

  const removePictureField = (index) => {
    const updated = [...pictures];
    updated.splice(index, 1);
    if (!updated.length) {
      updated.push("");
    }
    setPictures(updated);
  };

  const clearStatusAfterDelay = () => {
    setTimeout(() => {
      setStatusMessage("");
    }, 10000);
  };

  const clearErrorAfterDelay = () => {
    setTimeout(() => {
      setErrorMessage("");
    }, 10000);
  };

  return (
    <>
      <Header />
      <div className="city-management-container container">
        <h2 className="my-4 text-center">City Management</h2>

        <div className="d-flex justify-content-center mb-3">
          <button
            className={`btn btn-secondary me-2 ${mode === "add" ? "active-mode" : ""}`}
            onClick={() => handleModeToggle("add")}
          >
            Add Mode
          </button>
          <button
            className={`btn btn-secondary ${mode === "edit" ? "active-mode" : ""}`}
            onClick={() => handleModeToggle("edit")}
          >
            Edit Mode
          </button>
        </div>

        {statusMessage && (
          <div className="alert alert-success text-center" role="alert">
            {statusMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
          </div>
        )}

        {mode === "edit" && (
          <div className="mb-4">
            <label className="form-label">Search City by Name:</label>
            <div className="input-group">
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="form-control"
                placeholder="Enter city name to edit..."
              />
              <button className="btn btn-primary" onClick={handleFetchCity}>
                Load City
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === "add" && (
            <div className="mb-3">
              <label htmlFor="cityName" className="form-label">
                City Name:
              </label>
              <input
                id="cityName"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter new city name"
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="cityDescription" className="form-label">
              Description:
            </label>
            <textarea
              id="cityDescription"
              className="form-control"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter city description"
              required
            />
          </div>

          <label className="form-label">Pictures (URLs):</label>
          {pictures.map((pic, idx) => (
            <div key={idx} className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={pic}
                onChange={(e) => handlePictureChange(idx, e.target.value)}
                placeholder="Enter picture URL"
              />
              {pictures.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removePictureField(idx)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-secondary mb-3" onClick={addPictureField}>
            + Add Another Picture
          </button>

          <button type="submit" className="btn btn-success me-3">
            {mode === "add" ? "Create City" : "Save Changes"}
          </button>

          {mode === "edit" && name && (
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Delete City
            </button>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CityManagementPage;