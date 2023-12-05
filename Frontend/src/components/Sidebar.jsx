import React from 'react';

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`bg-gray-200 p-4 ${isOpen ? 'w-64' : 'w-0'} overflow-x-hidden transition-all`}>
    <input type='text'/>
    <h3>hello side bar</h3>
    </aside>
  );
};

export default Sidebar;
