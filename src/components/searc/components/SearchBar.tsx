import React from 'react';
const SearchBar = ({ handleOnClick, title, setTitle, clearData }: any) => {
  return (
    <div>
      <input
        style={{
          color: '#ffffff',
          borderBottom: '1px solid #c7a35d',
          boxShadow: 'none',
        }}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="btn"
        onClick={() => {
          clearData();
          handleOnClick();
        }}
        style={{
          position: 'relative',
          color: '#c7a35d',
          backgroundColor: '#4b3200',
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
