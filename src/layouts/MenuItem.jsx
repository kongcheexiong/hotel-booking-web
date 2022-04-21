import React, { useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import './sidebar.css'

/**
 * @author
 * @function MenuItem
 **/

const MenuItem = (props) => {
  const { name, subMenus, icon, onClick, to, exact,num } = props;
  const [expand, setExpand] = useState(false);

  return (
    <li onClick={props.onClick}>
      <Link
        exact
        to={to}
        className={`menu-item`}
      >
        <div className="menu-icon">
          {icon}
        </div>
      
        <span>{name}</span>
        
        <span className="num">{num}</span>
      </Link>
      {subMenus && subMenus.length > 0 ? (
      
          <ul className={`sub-menu`}>
          {subMenus.map((menu, index) => (
            <li key={index}>
              <NavLink to={menu.to}>{menu.name}</NavLink>
             
            </li>
          ))}
        </ul>

     
        
      ) : null}
    </li>
  );
};

export default MenuItem;
