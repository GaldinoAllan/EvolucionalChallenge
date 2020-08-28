import './Nav.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> Home
            </Link>
            <Link to="/students">
                <i className="fa fa-user"></i> Students
            </Link>
        </nav>
    </aside>