import React from 'react';

import '../../../styles/root.scss';
import './repo.scss';

export interface Topic {
  id: number;
  name: string;
  categoryId: {
    showExplore: boolean;
    colorClassName: string;
  };
}

export interface Team {
  id: number;
  name: string;
}

export interface RepoCardProps {
  repoTeams: Team[];
  topics: Topic[];
  isMirror: boolean;
  IsGithubIntegrated?: boolean; //should appear only if mirrored
  numStars: number;
  githubStarCount?: number; //should appear only if mirrored
  isFork: boolean;
  updatedDaysAgo: number;
  isStaring: boolean;
  repoName: string;
  isPrivate: boolean;
  hasDescription: boolean;
  repoDescription?: string; //should appear only if has description is true
  numForks?: number;
  numOpenPulls: number; //should appear only if mirrored
  numOpenIssues: number;
}

export default function RepoCard(props: RepoCardProps) {
  const stars = props.githubStarCount ? props.numStars + props.githubStarCount : props.numStars;
  return (
    <>
      <div className="desktop-repo card">
        <div className="repo-card-content">
          <div className="repo-header">
            <div className="repo-info">
              <img className="repo-icon" src="./assets/repo-icon.svg" />
              <span className="repo-type">
                {props.isFork ? 'Forked repo' : props.isMirror ? 'Mirrored repo' : 'Repo'}
              </span>
              <img className="repo-pipe" src="./assets/pipe.svg" />
              <span className="days-ago">Updated {props.updatedDaysAgo} days ago</span>
            </div>
            {/* check if its ok  */}
            <div className="star-section">
              <a className="star-number" href="{{.Repo.Link}}/stars">
                {stars}
              </a>
              <a
                className="star-action"
                href="{{.Repo.HTMLURL}}/action/{{if $isStaring}}un{{end}}star?redirect_to={{.General.Link}}{{QueryParam .General.QueryParameters}}"
              >
                <i className={!props.isStaring ? 'star' : 'start-outline'}></i>
                {props.isStaring ? (
                  <img className="star" src="./assets/solid-star.svg"></img>
                ) : (
                  <img className="star" src="./assets/star-outline.svg"></img>
                )}
              </a>
            </div>
          </div>
          <div className="repo-tags">
            <div className="repo-name">
              <a
                className="title1 cut-text"
                href="{{AppSubURL}}/{{if .Repo.Owner}}{{.Repo.Owner.Name}}{{else if .General.Org}}{{.General.Org.Name}}{{else}}{{.General.Owner.Name}}{{end}}/{{.Repo.Name}}"
              >
                {props.repoName}
              </a>
              <div className="tag public-private">{props.isPrivate ? 'private' : 'public'}</div>
            </div>
            {props.topics?.map((topic: Topic) =>
              topic.categoryId.showExplore ? (
                <a
                  className={'tag repo-new-topic category-' + topic.categoryId.colorClassName}
                  rel="nofollow"
                >
                  {/* href="{{if $.PageIsExplore}}{{$.Link}}{{else}}/explore/repos{{end}}?topics={{if $isSelected}}{{RemoveItemFromList (print $category ":" $topic.Topic.Name) $.General.TopicsSelected}}{{else}}{{if $.General.TopicsSelected}}{{$.General.TopicsSelected}},{{end}}{{$category}}:{{$topic.Topic.Name}}{{end}}"> */}
                  {topic.name}
                </a>
              ) : (
                <></>
              )
            )}
          </div>
          <div className="repo-main">
            <div className="repo-desc-block">
              <p className="repo-description">
                {props.hasDescription ? props.repoDescription : 'No description'}
              </p>
            </div>
            <div className="repo-information">
              <img className="divider-icon" src="./assets/divider.svg" />
              <div className="repo-info-text">
                <div className="stats">
                  <a
                    className="stat-block"
                    href="{{AppSubURL}}/{{if .Repo.Owner}}{{.Repo.Owner.Name}}{{else if .General.Org}}{{.General.Org.Name}}{{else}}{{.General.Owner.Name}}{{end}}/{{.Repo.Name}}/forks"
                  >
                    <img className="fork-icon" src="./assets/fork-icon.svg" />
                    <p>{props.numForks}</p>
                  </a>
                  {!props.isMirror ? (
                    <a
                      className="stat-block"
                      href="{{AppSubURL}}/{{if .Repo.Owner}}{{.Repo.Owner.Name}}{{else if .General.Org}}{{.General.Org.Name}}{{else}}{{.General.Owner.Name}}{{end}}/{{.Repo.Name}}/pulls"
                    >
                      <img className="pull-request-icon" src="./assets/pull-requests-icon.svg" />
                      <p>{props.numOpenPulls}</p>
                    </a>
                  ) : (
                    <></>
                  )}
                  <a
                    className="stat-block"
                    href="{{AppSubURL}}/{{if .Repo.Owner}}{{.Repo.Owner.Name}}{{else if .General.Org}}{{.General.Org.Name}}{{else}}{{.General.Owner.Name}}{{end}}/{{.Repo.Name}}/issues"
                  >
                    <img className="issue-icon" src="./assets/issue.svg" />
                    <p>{props.numOpenIssues}</p>
                  </a>
                </div>
                <div className="belongs-to">
                  {props.repoTeams && props.repoTeams.length ? 'Belongs to: ' : <></>}
                  {props.repoTeams?.map((team: { name: string }, index: any) => (
                    <span>
                      <span>{index ? ', ' : ''}</span>
                      <a className="repo-team" href="">
                        {team.name}
                      </a>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//should fix hrefs
//handle case when there are too many topics - should have "+3" for example
//handle case when there are too many teams- should have "+3" for example, instead of dots
