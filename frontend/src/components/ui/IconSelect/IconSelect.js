import React, { useState, useRef, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import './IconSelect.css';

const iconOptions = Object.entries(FaIcons)
  .filter(([name]) => name.startsWith(''))
  .map(([name, IconComponent]) => ({
    label: name,
    value: name,
    Icon: IconComponent
  }));

const IconSelect = ({ value, onChange }) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedIcon = iconOptions.find(opt => opt.value === value);

  const filteredIcons = iconOptions.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (iconValue) => {
    onChange(iconValue);
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

  return (
    <div className="icon-select" ref={containerRef}>
      <div className="icon-select-input" onClick={() => setIsOpen(prev => !prev)}>
        {selectedIcon ? (
          <>
            <selectedIcon.Icon />
            <span>{selectedIcon.label}</span>
          </>
        ) : (
          <span>Select an icon...</span>
        )}
        <span style={{ marginLeft: 'auto' }}>▾</span>
      </div>

      {isOpen && (
        <div className="icon-select-dropdown">
          <input
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="icon-search-input"
          />
          <div className="icon-list">
            {filteredIcons.map(({ value, label, Icon }) => (
              <div
                key={value}
                className="icon-option"
                onClick={() => handleSelect(value)}
              >
                <Icon />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconSelect;