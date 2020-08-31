import './styles.css';
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
            <Link to="/teachers">
                <i className="fa fa-user"></i> Teachers
            </Link>
            <Link to="/students-chart">
                <i className="far fa-chart-bar"></i> Students Chart
            </Link>
        </nav>
    </aside>