import React from 'react';

const LoginWrapper = (props) => {
    return (
        <div className="login-wrapper">
            <div className="login-container">
                <div className="login-signup">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default LoginWrapper