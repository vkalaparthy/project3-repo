import React from "react";
import './SearchBox.css';

function SearchForm(props) {
  return (
    <form className="search">
      <div className="form-group">
        <input
          style={{borderRadius: "20px"}}
          value={props.search}
          onChange={props.handleInputChange}
          className="track-search"
          placeholder="Song Name"
        />
        <datalist id="tracks">
          {props.tracks.map(track => (
            <option value={track} key={track} />
          ))}
        </datalist>
        <button type="submit" style={{marginTop: "15px", marginLeft: "15px", borderColor: "#9497A7"}} onClick={props.handleFormSubmit} className="btn btn-success">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;