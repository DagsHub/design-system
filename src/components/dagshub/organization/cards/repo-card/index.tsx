import React from 'react';
import { Icon } from "../../../../icons";
;
import '../../../../styles/root.scss';
import "./repo.scss";

export interface Topic {
  id: number;
  name: string;
  categoryShowExplore: boolean;
  categoryColorClass: string;
  categoryHref:string;
}

export interface Team {
  id: number;
  name: string;
}

export interface RepoCardProps {
  isMini?: boolean;
  teams?: Team[]; 
  topics?: Topic[];
  isMirror: boolean;
  IsGithubIntegrated?: boolean;
  numStars: number;
  githubStarCount?: number;
  isFork: boolean;
  isStaring?: boolean; 
  name: string;
  isPrivate: boolean;
  description?: string;
  numForks?: number;
  numOpenPulls: number;
  numOpenIssues: number;
  updatedAt: string;
}

const getUpdatedDaysAgo = (date: string): number =>
    Math.round((Date.now() - new Date(date).getTime()) / 1000/60/60/24);

export function RepoCard({
  isMini = false,
  teams = [], 
  topics = [],
  isMirror,
  IsGithubIntegrated = false,
  numStars,
  githubStarCount,
  isFork,
  isStaring = false,
  name,
  isPrivate,
  description = '',
  numForks,
  numOpenPulls,
  numOpenIssues,
  updatedAt
}: RepoCardProps) {
  const stars = githubStarCount ? (numStars + githubStarCount) : numStars;
  return (
    <>
      <div className="desktop-repo card">
        <div className="repo-card-content">
          {!isMini && (
            <div className="repo-header">
              <div className="repo-info">
                <Icon width={10.67} height={14} fill="#475569" icon="outline-repository-github" />
                <span className="repo-type">
                {isFork ? 'Forked repo' : (isMirror ? 'Mirrored repo' : 'Repo')}
              </span>
                <Icon width={1} height={12} fill="#E2E8F0" icon="pipe"/>
                <span className="days-ago">
                  Updated {getUpdatedDaysAgo(updatedAt)} days ago
                </span>
              </div>
              <div className="star-section">
                <a className="star-number" href="{{.Repo.Link}}/stars">
                  {stars}
                </a>
                <a
                    className="star-action"
                    href="{{.Repo.HTMLURL}}/action/{{if $isStaring}}un{{end}}star?redirect_to={{.General.Link}}{{QueryParam .General.QueryParameters}}"
                >
                  <i className={!isStaring ? 'star' : 'star-outline'} />
                  {isStaring ? (
                      <Icon width={18} height={17.21} fill="#94A3B8" icon="solid-star" />
                  ) : (
                      <Icon width={18} height={17.21} fill="#94A3B8" icon="outline-star" />
                  )}
                </a>
              </div>
            </div>
          )}
          <div className={"repo-tags"}>
            {isMini && (
              <Icon width={13.66} height={18.99} fill="#475569" icon="outline-repository-github" />
            )}
            <div className="repo-name">
              <a
                className="title1 cut-text"
                href="{{AppSubURL}}/{{if .Repo.Owner}}{{.Repo.Owner.Name}}{{else if .General.Org}}{{.General.Org.Name}}{{else}}{{.General.Owner.Name}}{{end}}/{{.Repo.Name}}"
              >
                {name}
              </a>
              <div className="tag public-private">{isPrivate ? 'private' : 'public'}</div>
            </div>
            {topics?.map((topic: Topic) =>
              topic.categoryShowExplore&& (
                <a
                  className={'tag repo-new-topic category-' + topic.categoryColorClass}
                  rel="nofollow"
                  href={topic.categoryHref}
                >
                  {topic.name}
                </a>
              )
            )}
          </div>
          <div className="repo-main">
            <div className="repo-desc-block">
              <p className="repo-description">
                {description ? description : 'No description'}
              </p>
            </div>
            <div className="repo-information">
              {!isMini && (
                <Icon width={564} height={1} fill="#E2E8F0" icon="divider" />
              )}
              <div className="repo-info-text">
                <div className="stats">
                  <a
                    className="stat-block"
                    href="{{AppSubURL}}/{{if .Repo.Owner}}{{.Repo.Owner.Name}}{{else if .General.Org}}{{.General.Org.Name}}{{else}}{{.General.Owner.Name}}{{end}}/{{.Repo.Name}}/forks"
                  >
                    <Icon width={10.29} height={12} fill="#475569" icon="outline-fork"/>
                    <p>{numForks}</p>
                  </a>
                  {!isMirror && (
                    <a
                      className="stat-block"
                      href="{{AppSubURL}}/{{if .Repo.Owner}}{{.Repo.Owner.Name}}{{else if .General.Org}}{{.General.Org.Name}}{{else}}{{.General.Owner.Name}}{{end}}/{{.Repo.Name}}/pulls"
                    >
                      <Icon width={15} height={14.5} fill="#475569" icon="outline-pull-request-github" />
                      <p>{numOpenPulls}</p>
                    </a>
                  )}
                  <a
                    className="stat-block"
                    href="{{AppSubURL}}/{{if .Repo.Owner}}{{.Repo.Owner.Name}}{{else if .General.Org}}{{.General.Org.Name}}{{else}}{{.General.Owner.Name}}{{end}}/{{.Repo.Name}}/issues"
                  >
                    <Icon width={14.67} height={14.67} fill="#475569" icon="outline-issue"/>
                    <p>{numOpenIssues}</p>
                  </a>
                  {isMini && (
                    <div className="star-section">
                      <a
                          className="star-action"
                          href="{{.Repo.HTMLURL}}/action/{{if $isStaring}}un{{end}}star?redirect_to={{.General.Link}}{{QueryParam .General.QueryParameters}}"
                      >
                        <i className={!isStaring ? 'star' : 'start-outline'}></i>
                        {isStaring ? (
                            <Icon width={12} height={11.47} fill="#475569" icon="solid-star"/>
                        ) : (
                            <Icon width={12} height={11.47} fill="#475569" icon="outline-star"/>
                        )}
                      </a>
                      <a className="star-number" href="{{.Repo.Link}}/stars">
                        {stars}
                      </a>
                    </div>
                  )}
                </div>
                {!isMini && (
                  <div className="belongs-to">
                    {teams?.length && 'Belongs to: '}
                    {teams?.map((team: { name: string }, index: number) => (
                      <span>
                        <span>{index ? ', ' : ''}</span>
                        <a className="repo-team" href="">
                          {team.name}
                        </a>
                      </span>
                    ))}
                  </div>
                )}
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
