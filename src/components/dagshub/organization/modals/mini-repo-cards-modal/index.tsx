import React from 'react';
import { GenericModal } from '../generic-modal';
import { RepoCardProps } from '../../cards/repo-card';
import { MiniRepoCard } from '../../cards/mini-repo-card';
import { Button, ButtonVariant } from '../../../../elements';

import '../../../../styles/root.scss';
import './mini-repo-cards-modal.scss';

export interface MiniRepoCardsModalProps {
  teamName: string;
  repos: RepoCardProps[];
  onClick: () => void;
  isLogged: boolean;
  onStarActionClick:(args?: any) =>()=> Promise<void>;
}

export function MiniRepoCardsModal(props: MiniRepoCardsModalProps) {
  let elements: JSX.Element[] = [];
  elements.push(
    <div className={'mini-repo-cards-modal__cards-block'}>
      {props.repos?.map((repo) => (
        <MiniRepoCard
          isMini={true}
          isMirror={repo.isMirror}
          IsGithubIntegrated={repo.IsGithubIntegrated}
          numStars={repo.numStars}
          githubStarCount={repo.githubStarCount}
          isFork={repo.isFork}
          updatedAt={repo.updatedAt}
          isStaring={repo.isStaring}
          name={repo.name}
          isPrivate={repo.isPrivate}
          description={repo.description}
          numForks={repo.numForks}
          numOpenPulls={repo.numOpenPulls}
          numOpenIssues={repo.numOpenIssues}
          topics={repo.topics}
          teams={repo.teams}
          forksHref={repo.forksHref}
          issuesHref={repo.issuesHref}
          pullsHref={repo.pullsHref}
          repoNameHref={repo.repoNameHref}
          starActionLink={repo.starActionLink}
          starNumberLink={repo.starNumberLink}
          isLogged={props.isLogged}
          onStarActionClick={props.onStarActionClick(repo.starActionLink)}
        />
      ))}
    </div>
  );
  elements.push(
    <div className={'mini-repo-cards-modal__close-button'}>
      <Button
        variant={ButtonVariant.Secondary}
        label={'Close'}
        width={63}
        onClick={props.onClick}
      />
    </div>
  );
  return (
    <GenericModal
      title={props.teamName.charAt(0).toUpperCase() + props.teamName.slice(1) + "'s repos"}
      elements={elements}
      onClose={props.onClick}
    />
  );
}
