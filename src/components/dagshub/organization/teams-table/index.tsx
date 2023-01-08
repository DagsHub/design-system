import React from 'react';
import { Icon } from '../../../icons';

import '../../../styles/root.scss';
import '../shared-styles/table.scss';

export default function TeamsTable() {
  return (
    <div className="table">
      <div className="table__header header">
        <span className="left-side">
          <span className="header__team-name">DS TEAM</span>
          <span className="header__team-description">Deploying models to production</span>
        </span>
        <span className="right-side">
          <span className="add-member-button">
            <img src="./assets/plus-icon.svg"></img>
            Add new team member
          </span>
          <span className="dots-vertical-icon">
            <img src="./assets/dots-vertical.svg"></img>
          </span>
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
        <span className="remove-from-team-button">
          <img src="./assets/trash-icon.svg"></img>
          Remove from team
        </span>
      </div>
      <div className="table__row">
        <div className="user-info">
          <span className="user-image">
            <img src="./assets/user-image.svg"></img>
          </span>
          <span className="name-info">
            <span className="full-name">Kirill Bolashev</span>
            <span className="user-name">@KBolashev</span>
          </span>
        </div>
        <span className="remove-from-team-button">
          <Icon icon="users" />
          Remove from team
        </span>
      </div>
      <div className="table__row">
        <div className="user-info">
          <span className="user-image">
            <img src="./assets/jinen.png"></img>
          </span>
          <span className="name-info">
            <span className="full-name">Kirill Bolashev</span>
            <span className="user-name">@KBolashev</span>
          </span>
        </div>
        <span className="remove-from-team-button">
          <img src="./assets/trash-icon.svg"></img>
          Remove from team
        </span>
      </div>
      <div className="table__row">
        <div className="user-info">
          <span className="user-image">
            <img src="./assets/user-image.svg"></img>
          </span>
          <span className="name-info">
            <span className="full-name">Kirill Bolashev</span>
            <span className="user-name">@KBolashev</span>
          </span>
        </div>
        <span className="remove-from-team-button">
          <img src="./assets/trash-icon.svg"></img>
          Remove from team
        </span>
      </div>
      <div className="table__collapse">
        See all team members
        <img src="./assets/cheveron-down-icon.svg"></img>
      </div>
      <div className="table__footer">
        <span className="footer-right-section">
          <span className="permission">
            Team has
            <span className="permission-label">
              Write Access
              <img src="./assets/cheveron-down-icon.svg"></img>
            </span>
            to following repositories:
          </span>
          <span className="team-repos">
            <span className="repo">
              <img className="repo-icon" src="./assets/repo-icon.svg" />
              repo-name-01
            </span>
            <span className="repo">
              <img className="repo-icon" src="./assets/repo-icon.svg" />
              repo-name-02
            </span>
            <span className="repo">
              <img className="repo-icon" src="./assets/repo-icon.svg" />
              repo-name-03
            </span>
          </span>
        </span>
        <span className="all-team-projects">
          See all teams projects
          <img src="./assets/arrow-sm-right.svg" />
        </span>
      </div>
    </div>
  );
}

//make it more generic structure
//use props and render rows in a loop
//add functionality, tooltip, expand
//change its css to BEM
//add (you) annotation to relevant user
//repo icon should be black
