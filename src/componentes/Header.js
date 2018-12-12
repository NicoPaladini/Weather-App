import React from 'react';


const Header = (props) => {
    return (
        <div>
            <header>
                <div className="nav-wrapper light-blue darken-2">
                    <p className="brand-logo">{props.titulo}</p>
                </div>
            </header>
        </div>
    );
};

export default Header;
