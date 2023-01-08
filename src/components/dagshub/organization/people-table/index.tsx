import React from 'react';

import '../../../styles/root.css';
import '../shared-styles/table.css';

export default function PeopleTable() {
  return (
    <div className="table">
      <div className="table__header header-style">
        <span className="left">Username</span>
        <span className="center">Teams they belong to</span>
        <span className="right">Membership visibility</span>
      </div>
      <div className="table__row">
        <div className="user-info">
          <span className="user-image">
            <img src="./assets/nir.png"></img>
          </span>
          <span className="name-info">
            <span className="full-name">Kirill Bolashev</span>
            <span className="user-name">@KBolashev</span>
          </span>
        </div>
        <span className="teams-list">DevOps team (read access), DS team (write access), +6</span>
        <span className="membership-column">
          <span className="public-private">
            Public
            <img src="./assets/cheveron-down-icon.svg"></img>
          </span>
          <img src="./assets/trash-icon.svg"></img>
        </span>
      </div>
      <div className="table__row">
        <div className="user-info">
          <span className="user-image">
            <img src="./assets/nir.png"></img>
          </span>
          <span className="name-info">
            <span className="full-name">Kirill Bolashev</span>
            <span className="user-name">@KBolashev</span>
          </span>
        </div>
        <span className="teams-list">DevOps team (read access), DS team (write access), +6</span>
        <span className="membership-column">
          <span className="public-private">
            Public
            <img src="./assets/cheveron-down-icon.svg"></img>
          </span>
          <img src="./assets/trash-icon.svg"></img>
        </span>
      </div>
      <div className="table__row">
        <div className="user-info">
          <span className="user-image">
            <img src="./assets/nir.png"></img>
          </span>
          <span className="name-info">
            <span className="full-name">Kirill Bolashev</span>
            <span className="user-name">@KBolashev</span>
          </span>
        </div>
        <span className="teams-list">DevOps team (read access), DS team (write access), +6</span>
        <span className="membership-column">
          <span className="public-private">
            Public
            <img src="./assets/cheveron-down-icon.svg"></img>
          </span>
          <img src="./assets/trash-icon.svg"></img>
        </span>
      </div>
      <div className="table__row footer">
        <div className="user-info">
          <span className="user-image">
            <img src="./assets/nir.png"></img>
          </span>
          <span className="name-info">
            <span className="full-name">Kirill Bolashev</span>
            <span className="user-name">@KBolashev</span>
          </span>
        </div>
        <span className="teams-list">DevOps team (read access), DS team (write access), +6</span>
        <span className="membership-column">
          <span className="public-private">
            Public
            <img src="./assets/cheveron-down-icon.svg"></img>
          </span>
          <img src="./assets/trash-icon.svg"></img>
        </span>
      </div>
    </div>
  );
}

//make it more generic structure
//use props and render rows in a loop
//add functionality, tooltip
//change its css to BEM
//add te hover design for the private-public
//add (you) annotation to relevant user
