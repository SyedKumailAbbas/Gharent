import React, { useState } from 'react';

const sidebarStyle = {
  background: 'linear-gradient(to right, #4568dc, #b06ab3)', /* Gradient from left to right */
  color: 'white',
  padding: '20px',
  width: '250px',
  boxSizing: 'border-box',
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  overflowY: 'auto', // Added scroll
  transition: 'transform 0.3s ease-in-out',
  transform: 'translateX(-100%)',
};
const formElementStyle = {
  marginBottom: '15px', // Add some space below each form element
};

const labelStyle = {
  display: 'block', // Make the label take the full width
  margin: '10px 0 5px 0', // Space above and below the label
  fontWeight: 'bold', // Make the text a bit heavier
};

const selectStyle = {
  width: '20%', // Make the select box fill its container
  padding: '5px', // Add some padding inside the select box for better touch interaction
  margin: '5px 0 15px 0', // Space below the select box
  borderRadius: '6px', // Round the corners of the select box
  border: '1px solid #ddd', // Add a border to the select box
  backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background
  color: 'black', // Text color for the options
  cursor: 'pointer', // Cursor to pointer to indicate it's selectable
  outline: 'none', // Remove the default focus outline
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle shadow to lift the element
  appearance: 'none', // Remove default system appearance
  backgroundImage: 'url(data:image/svg+xml;charset=US-ASCII, %3Csvg width="14" height="12" viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M1 1l6 6 6-6" stroke="%23FFF" stroke-width="2" fill="none" fill-rule="evenodd"/%3E%3C/svg%3E)', // Add dropdown arrow icon
  backgroundRepeat: 'no-repeat', // No repeat for background image
  backgroundPosition: 'right 10px top 50%', // Position for the arrow icon
  backgroundSize: '14px 12px', // Size of the arrow icon
  transition: 'background-color 0.3s', // Transition for background-color change
};


const buttonStyle = {
  padding: '10px 20px', // Add padding to the button
  backgroundColor: '#fff', // Button color
  color: '#4568dc', // Text color
  border: '1px solid #4568dc', // Border color
  borderRadius: '4px', // Round the corners
  cursor: 'pointer', // Change cursor on hover
  fontSize: '16px', // Increase font size
  fontWeight: 'bold', // Make the text a bit heavier
  marginTop: '20px', // Space above the button
};
const sidebarOpenStyle = {
  transform: 'translateX(0)',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  display: 'block',
  margin: '10px 0',
  fontSize: '18px',
};

const Sidebar = ({ isOpen }) => {
  const [price, setPrice] = useState({ min: 500, max: 5000 });
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [categories, setCategories] = useState({
    penthouse: false,
    bungalow: false,
    House: false,
    Farmhouse:false,
    Room : false,
    Flat: false,
    UpperPortion: false,
    LowerPortion :false
    // Add more categories as needed
  });
  const [locations, setLocations] = useState({
    karachi: false,
    lahore: false,
    islamabad: false,
    peshawar: false,
    rawalpindi: false,
    
    // Add more locations as needed
  });
  const handleBedBathChange = (e) => {
    if (e.target.name === 'bedrooms') {
      setBedrooms(e.target.value);
    } else if (e.target.name === 'bathrooms') {
      setBathrooms(e.target.value);
    }
  };
  const handleCategoryChange = (e) => {
    const { name } = e.target;
    setCategories({ ...categories, [name]: !categories[name] });
  };

  const handleLocationChange = (e) => {
    const { name } = e.target;
    setLocations({ ...locations, [name]: !locations[name] });
  };

  const applyFilters = () => {
    // Implement the logic to apply filters
    console.log('Applying filters:', { price, bedrooms, bathrooms, categories, locations });
  };

  return (
    <div style={{ ...sidebarStyle, ...(isOpen ? sidebarOpenStyle : {}) }}>
      <h2>GHARENT</h2>
      <a href="/" style={linkStyle}>Home</a>
      <a href='/profile' style={linkStyle}>Profile</a>
      <a href="/createpost" style={linkStyle}>Create Post</a>
      <a href="/about" style={linkStyle}>About Us</a>
      <a href="/contact" style={linkStyle}>Contact</a>

      <div>
        <h3>Filters</h3>
          <div style={formElementStyle}>
          <label style={labelStyle}>
            Bedrooms:
            <select name="bedrooms" value={bedrooms} onChange={handleBedBathChange} style={selectStyle}>
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </label>
        </div>

        <div style={formElementStyle}>
          <label style={labelStyle}>
            Bathrooms:
            <select name="bathrooms" value={bathrooms} onChange={handleBedBathChange} style={selectStyle}>
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num} backgroundColor='rgba(255, 255, 255, 0.3)' >{num}</option>
              ))}
            </select>
          </label>
        </div>

        <div style={formElementStyle}>
          <h4>Category:</h4>
          {Object.keys(categories).map(category => (
            <label key={category} style={labelStyle}>
              <input
                type="checkbox"
                name={category}
                checked={categories[category]}
                onChange={handleCategoryChange}
              />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </label>
          ))}
        </div>

        <div style={formElementStyle}>
          <h4>Location:</h4>
          {Object.keys(locations).map(location => (
            <label key={location} style={labelStyle}>
              <input
                type="checkbox"
                name={location}
                checked={locations[location]}
                onChange={handleLocationChange}
              />
              {location.charAt(0).toUpperCase() + location.slice(1)}
            </label>
          ))}
        </div>

        <button onClick={applyFilters} style={buttonStyle}>Apply Filters</button>
      </div>
    </div>
  );
};

export default Sidebar;
