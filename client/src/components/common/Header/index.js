/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, headerLogo, MenuLogo } from '../../assets';
import menuData from './menuData';
import './style.css';

class Header extends Component {
  state = {
    isClosed: true,
  };

  onclick = () => {
    const { isClosed } = this.state;
    this.setState({ isClosed: !isClosed });
  };

  onclickForModel = e => {
    if (e.target.id === 'model') {
      this.setState({ isClosed: true });
    }
  };

  render() {
    const { isClosed } = this.state;

    return (
      <div className="header">
        <div className="header__bar">
          <button type="button" className="menu-icon" onClick={this.onclick}>
            <MenuIcon onClick={this.onclick} />
          </button>
          <Link to="home">
            <img src={headerLogo} alt="header logo" />
          </Link>
        </div>
        {/* side bar */}

        <div
          className={!isClosed ? 'menu__model' : ''}
          onClick={this.onclickForModel}
          id="model"
        >
          <nav className={isClosed ? 'hide' : 'menu__nav'}>
            <div className="menu__head" onClick={this.onclick}>
              <h2 className="menu__title">Menu</h2>
            </div>
            <ul className="menu__list">
              <div className="menu_img">
                <img src={MenuLogo} alt="shrinc" />
              </div>
              {menuData.map(item => (
                <li key={item.label} className="menu__item">
                  {item.icon ? item.icon : ''}
                  <Link to={item.url} className="menu__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
