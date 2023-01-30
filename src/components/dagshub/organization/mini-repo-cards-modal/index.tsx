import React from 'react';
import '../../../styles/root.scss';
import GenericModal from "../generic-modal";
import RepoCard, {RepoCardProps} from "../repo-card"
import {Button, ButtonVariant} from "../../../elements";
import "./mini-repo-cards-modal.scss";

export interface MiniRepoCardsModalProps{
    teamName: string
    repos:RepoCardProps[]
}

export default function MiniRepoCardsModal(props:MiniRepoCardsModalProps){
    let elements:JSX.Element[]=[];
    elements.push(
        <div className={"cards-block"}>
            {props.repos?.map((repo)=>(
                <RepoCard isMini={repo.isMini}
                                        isMirror= {repo.isMirror}
                                        IsGithubIntegrated= {repo.IsGithubIntegrated}
                                        numStars= {repo.numStars}
                                        githubStarCount= {repo.githubStarCount}
                                        isFork= {repo.isFork}
                                        updatedDaysAgo= {repo.updatedDaysAgo}
                                        isStaring= {repo.isStaring}
                                        repoName= {repo.repoName}
                                        isPrivate= {repo.isPrivate}
                                        hasDescription= {repo.hasDescription}
                                        repoDescription= {repo.repoDescription}
                                        numForks= {repo.numForks}
                                        numOpenPulls= {repo.numOpenPulls}
                                        numOpenIssues= {repo.numOpenIssues}
                                        topics={repo.topics}
                                        repoTeams= {repo.repoTeams}/>)
            )}
        </div>
    )
    elements.push(<div className={"close-button"}>
                        <Button variant={ButtonVariant.Secondary} label={"Close"} width={63}/>
                </div>
    )
    return <GenericModal title={props.teamName.charAt(0).toUpperCase() + props.teamName.slice(1)+"'s repos"} elements={elements}/>
}
