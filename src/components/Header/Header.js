import React, { Component } from 'react';
import { MdFilterHdr, MdPersonOutline } from 'react-icons/md';

import './Header.css';

import Search from './Search/Search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *APP* COMPONENT

export default class Header extends Component {
  render() {
    return (
      <section className="Header__parent">
        <section className="Header__content">
          {/* Displays the mountain icon in the header */}
          <div className="Header__company-info">
            <MdFilterHdr id="Header__company-icon" />
            <span>Social Mountain</span>
          </div>

          {/* Displays the search bar */}
          <div className="Header__right">
            <Search searchContent={this.props.searchContent} />

            {/* Displays the profile icon */}
            <div className="Header__profile">
              <MdPersonOutline />
            </div>
          </div>
        </section>
      </section>
    );
  }
}
