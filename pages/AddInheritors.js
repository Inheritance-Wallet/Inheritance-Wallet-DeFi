import React, { useState } from "react";

const AddInheritors = () => {
  const [inheritors, setInheritors] = useState([{ address: "", coin: "", percentage: 0 }]);
  const [warningMessage, setWarningMessage] = useState("");

  const addInheritor = () => {
    const hasEmptyFields = inheritors.some(
      (inheritor) => inheritor.address === "" || inheritor.coin === ""
    );
    if (hasEmptyFields) {
      setWarningMessage("Please fill in all the required fields.");
    } else {
      const isDuplicateAddress = inheritors.some(
        (inheritor, index) => index !== inheritors.length - 1 && inheritor.address === inheritors[inheritors.length - 1].address
      );
      if (isDuplicateAddress) {
        setWarningMessage("Duplicate wallet address. Please enter a unique address.");
      } else {
        const isValidAddresses = inheritors.every(
          (inheritor) => inheritor.address.length === 42 && inheritor.address.startsWith("0x")
        );
        if (!isValidAddresses) {
          setWarningMessage("Please enter valid wallet addresses.");
        } else {
          const totalPercentage = inheritors.reduce((total, inheritor) => total + inheritor.percentage, 0);
          if (totalPercentage + 0 <= 100) { // Change 0 to the default percentage value for new inheritors
            setInheritors([...inheritors, { address: "", coin: "", percentage: 0 }]);
            setWarningMessage("");
          } else {
            setWarningMessage("The total percentage is already 100.");
          }
        }
      }
    }
  };

  const handleAddressChange = (index, value) => {
    const updatedInheritors = [...inheritors];
    updatedInheritors[index].address = value;
    setInheritors(updatedInheritors);

    // Check for duplicate address
    const isDuplicateAddress = updatedInheritors.some(
      (inheritor, i) => i !== index && inheritor.address === value
    );
    if (isDuplicateAddress) {
      setWarningMessage("Duplicate wallet address. Please enter a unique address.");
    } else {
      setWarningMessage("");
    }
  };

  const handleCoinChange = (index, value) => {
    const updatedInheritors = [...inheritors];
    updatedInheritors[index].coin = value;
    setInheritors(updatedInheritors);
  };

  const handlePercentageChange = (index, value) => {
    const updatedInheritors = [...inheritors];
    updatedInheritors[index].percentage = parseInt(value); // Convert to integer
    setInheritors(updatedInheritors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalPercentage = inheritors.reduce((total, inheritor) => total + inheritor.percentage, 0);

    if (totalPercentage !== 100) {
      setWarningMessage("The total percentage must be 100.");
    } else {
      // TODO: Handle form submission
      setWarningMessage("");
    }
  };

  const renderInheritors = () => {
    return inheritors.map((inheritor, index) => (
      <div className="Test" key={index} style={{ display: "flex", marginBottom: "10px" }}>
        <div className="enterAddress" style={{ marginRight: "10px" }}>
          <input
            type="text"
            value={inheritor.address}
            onChange={(e) => handleAddressChange(index, e.target.value)}
            placeholder="Enter address"
            style={{ width: "380px", height: "0px", padding:"40px", borderRadius:"30px" }}
          />
        </div>
        <div className="percent" style={{ marginRight: "10px", display: "flex", alignItems: "center" }}>
          <input
            type="range"
            min="0"
            max="100"
            value={inheritor.percentage}
            onChange={(e) => handlePercentageChange(index, e.target.value)}
            style={{ width: "100px" }}
          />
          <span style={{ marginLeft: "5px" }}>{inheritor.percentage}%</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <select
            value={inheritor.coin}
            className="selectButton"
            onChange={(e) => handleCoinChange(index, e.target.value)}
            style={{ width: "150px", height: "40px" }}
          >
            <option value="">Select coin</option>
            <option value="eth">ETH</option>
          </select>
        </div>
      </div>
    ));
  };
  
  return (
    <div>
      <h1 className="addTitle">Add Inheritors</h1>
      <hr />
      <br>
      </br>
      <br>
      </br>
      <p className="selectText">Select Your Guardians Now</p>

      <br>
      </br>
      <br>
      </br>
      <br>
      </br>

      <div className="clearfix">
      <form onSubmit={handleSubmit}>
        {renderInheritors()}
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <button
          type="button"
          onClick={addInheritor}
          className="addInheritors"
          style={{ padding: "10px", minWidth: "30px", fontSize: "14px" }}
          disabled={inheritors.reduce((total, inheritor) => total + inheritor.percentage, 0) === 100}
        >
          +
        </button>
        <button
          type="submit"
          className="submitButton"
          style={{  padding: "10px", minWidth: "30px", fontSize: "14px" }}
        >
          Submit
        </button>
        {warningMessage && <p style={{ color: "red", textAlign: "center", marginTop:"80px" }}>{warningMessage}</p>}
      </form>
      </div>
    </div>
  );
}

export default AddInheritors;
