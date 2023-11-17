import React, { useEffect, useState } from 'react';

function FilterButton({ name, icon, enabled, onClick }) {
  const [classes, setClasses] = useState('');

  useEffect(() => {
    setClasses(`filter_button ${enabled ? 'filter_enabled' : 'filter_disabled'}`);
  }, [enabled]);

  return (
    <div className={classes} onClick={onClick}>
      {icon} {name}
    </div>
  );
}

export default FilterButton;