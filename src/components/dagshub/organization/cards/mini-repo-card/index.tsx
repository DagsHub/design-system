import React from 'react';
import { Icon } from '../../../../icons';

import '../../../../styles/root.scss';
import './repo-mini.scss';

interface Topic {
  id: number;
  name: string;
  categoryShowExplore: boolean;
  categoryColorClass: string;
  categoryHref: string;
}

interface Team {
  teamName: string;
  teamLink: string;
}

export interface MiniRepoCardProps {
  isMini?: boolean;
  teams: Team[];
  topics: Topic[];
  isMirror: boolean;
  IsGithubIntegrated: boolean;
  numStars: number;
  githubStarCount: number;
  isFork: boolean;
  isStaring?: boolean;
  name: string;
  isPrivate: boolean;
  description?: string;
  numForks?: number;
  numOpenPulls: number;
  numOpenIssues: number;
  updatedAt: string;
  repoNameHref: string;
  starActionLink: string;
  starNumberLink: string;
  forksHref: string;
  issuesHref: string;
  pullsHref: string;
  onStarActionClick: (args?: any) => void;
  isLogged: boolean;
}

const getUpdatedDaysAgo = (date: string): number =>
  Math.round((Date.now() - new Date(date).getTime()) / 1000 / 60 / 60 / 24);

export function MiniRepoCard({
  isMini = true,
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
  updatedAt,
  repoNameHref,
  starActionLink,
  starNumberLink,
  forksHref,
  issuesHref,
  pullsHref,
  onStarActionClick,
  isLogged
}: MiniRepoCardProps) {
  const stars = IsGithubIntegrated ? githubStarCount + numStars : numStars;
  return (
    <>
      <div className="mini-desktop-repo mini-card">
        <div className="mini-repo-card-content">
          {!isMini && (
            <div className="mini-repo-header">
              <div className="mini-repo-info">
                <Icon width={10.67} height={14} fill="#475569" icon="outline-repository-github" />
                <span className="mini-repo-type">
                  {isFork ? 'Forked repo' : isMirror ? 'Mirrored repo' : 'Repo'}
                </span>
                <Icon width={1} height={12} fill="#E2E8F0" icon="pipe" />
                <span className="mini-days-ago">
                  Updated {getUpdatedDaysAgo(updatedAt)} days ago
                </span>
              </div>
              <div className="mini-star-section">
                <a className="mini-star-number" href={starNumberLink}>
                  {stars}
                </a>
                <a
                  className="mini-star-action"
                  href={starActionLink}
                  onClick={(event: any) => {
                    event.preventDefault();
                    onStarActionClick(starActionLink);
                  }}
                >
                  <i className={!isStaring ? 'mini-star' : 'mini-star-outline'} />
                  {isStaring ? (
                    <Icon width={18} height={17.21} fill="#94A3B8" icon="solid-star" />
                  ) : (
                    <Icon width={18} height={17.21} fill="#94A3B8" icon="outline-star" />
                  )}
                </a>
              </div>
            </div>
          )}
          <div className={'mini-repo-tags'}>
            {isMini && (
              <Icon width={13.66} height={18.99} fill="#475569" icon="outline-repository-github" />
            )}
            <div className="mini-repo-name">
              <a className="mini-title1 mini-cut-text" href={repoNameHref}>
                {name}
              </a>
              <div className="mini-tag mini-public-private">{isPrivate ? 'private' : 'public'}</div>
            </div>
            {topics?.map(
              (topic: Topic) =>
                topic.categoryShowExplore && (
                  <a
                    className={
                      'mini-tag mini-repo-new-topic mini-category-' + topic.categoryColorClass
                    }
                    rel="nofollow"
                    href={topic.categoryHref}
                  >
                    {topic.name}
                  </a>
                )
            )}
          </div>
          <div className="mini-repo-main">
            <div className="mini-repo-desc-block">
              <p className="mini-repo-description">
                {description ? description : 'No description'}
              </p>
            </div>
            <div className="mini-repo-information">
              {!isMini && <Icon width={564} height={1} fill="#E2E8F0" icon="divider" />}
              <div className="mini-repo-info-text">
                <div className="mini-stats">
                  <a className="mini-stat-block" href={forksHref}>
                    <Icon width={10.29} height={12} fill="#475569" icon="outline-fork" />
                    <p>{numForks}</p>
                  </a>
                  {!isMirror && (
                    <a className="mini-stat-block" href={pullsHref}>
                      <Icon
                        width={15}
                        height={14.5}
                        fill="#475569"
                        icon="outline-pull-request-github"
                      />
                      <p>{numOpenPulls}</p>
                    </a>
                  )}
                  <a className="mini-stat-block" href={issuesHref}>
                    <Icon width={14.67} height={14.67} fill="#475569" icon="outline-issue" />
                    <p>{numOpenIssues}</p>
                  </a>
                  {isMini && isLogged && (
                    <div className="mini-star-section">
                      <a
                        className="mini-star-action"
                        href={starActionLink}
                        onClick={(event: any) => {
                          event.preventDefault();
                          onStarActionClick(starActionLink);
                        }}
                      >
                        <i className={!isStaring ? 'mini-star' : 'mini-start-outline'}></i>
                        {isStaring ? (
                          <Icon width={12} height={11.47} fill="#475569" icon="solid-star" />
                        ) : (
                          <Icon width={12} height={11.47} fill="#475569" icon="outline-star" />
                        )}
                      </a>
                      <a className="mini-star-number" href={starNumberLink}>
                        {stars}
                      </a>
                    </div>
                  )}
                </div>
                {!isMini && (
                  <div className="mini-belongs-to">
                    {teams?.length > 0 ? 'Belongs to: ' : ''}
                    {teams?.map((team, index: number) => (
                      <span>
                        <span>{index ? ', ' : ''}</span>
                        <a className="mini-repo-team" href={team.teamLink}>
                          {team.teamName}
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
