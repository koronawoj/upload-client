import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({isAuth, onLogout}) => {
    return (
        <div className="nav">
            <div className="left">
                <Link to="/">Home</Link>
                {isAuth ? (
                    <div>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/upload">Upload</Link>
                    </div>
                ) : null}
            </div>
            <div className="right">
                {isAuth ? (
                    <div>
                        <Link onClick={() => {onLogout()}} to="/">Logout</Link>
                    </div>
                ) : (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navigation