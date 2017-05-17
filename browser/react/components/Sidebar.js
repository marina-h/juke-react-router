import React from 'react';
import { Link } from 'react-router';

const Sidebar = (props) => {
  return (
    <sidebar>
      <img src="/juke.svg" className="logo" />
      <section>
        <h4 className="menu-item">
          <Link to="/albums" activeClassName="active">ALBUMS</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/artists" activeClassName="active">ARTISTS</Link>
        </h4>
      </section>
    </sidebar>
  );
}

export default Sidebar;
