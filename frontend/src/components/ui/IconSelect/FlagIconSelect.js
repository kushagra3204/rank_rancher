import React, { useState, useEffect, useRef } from 'react';
import './IconSelect.css';

const FlagIconSelect = ({ value, onChange }) => {
  const [countryList, setCountryList] = useState([]);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fetch('https://flagcdn.com/en/codes.json')
      .then(res => res.json())
      .then(data => {
        const formatted = Object.entries(data).map(([code, name]) => ({
          code,
          name,
          flag: `https://flagcdn.com/160x120/${code}.png`
        }));
        setCountryList(formatted);
      });
  }, []);

  const filteredCountries = countryList.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedCountry = countryList.find(c => c.code === value);

  const handleSelect = (code, name) => {
    onChange(name, code);
    setIsOpen(false);
    setSearch('');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

  return (
    <div className="flag-select" ref={containerRef}>
      <div className="flag-select-input" onClick={() => setIsOpen(prev => !prev)}>
        {selectedCountry ? (
          <>
            <img src={selectedCountry.flag} alt={selectedCountry.name} className="flag-icon" />
            <span>{selectedCountry.name}</span>
          </>
        ) : (
          <span>Select a country...</span>
        )}
        <span style={{ marginLeft: 'auto' }}>▾</span>
      </div>

      {isOpen && (
        <div className="flag-select-dropdown">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flag-search-input"
          />
          <div className="flag-list">
            {filteredCountries.map(({ code, name, flag }) => (
              <div
                key={code}
                className="flag-option"
                onClick={() => handleSelect(code, name)}
              >
                <img src={flag} alt={name} className="flag-icon" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlagIconSelect;