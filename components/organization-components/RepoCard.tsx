import '../../styles/repo.scss'

import React from "react";
import { ClassAttributes, AnchorHTMLAttributes, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, HTMLAttributes } from "react";

export default function RepoCard(props: {
    repoTeams: any;
    topics: any; isMirror: any; IsGithubIntegrated: any; numStars: any; githubStarCount: any; isFork: any; updatedDaysAgo: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; isStaring: any; repoName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; isPrivate: any; hasDescription: any; repoDescription: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; numForks: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; numOpenPulls: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; numOpenIssues: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined 
}) {
    
    const stars= props.isMirror && props.IsGithubIntegrated ? props.numStars + props.githubStarCount : props.numStars

    return (
        <>
            <div className="desktop-repo card">
                <div className="repo-card-content">
                    <div className="repo-header">
                        <div className="repo-info">
                            <img className="repo-icon" src="./assets/repo-icon.svg"/>
                            <span className="repo-type">
                                {props.isFork ? (
                                    "Forked repo"
                                ) : props.isMirror ?(
                                    "Mirrored repo"
                                ) : (
                                    "Repo"
                                )}
                            </span>
                            <img className="repo-pipe" src="./assets/pipe.svg"/>
                            <span className="days-ago">
                                Updated {props.updatedDaysAgo} days ago
                            </span>
                        </div>
                        {/* check if its ok  */}
                        <div className="star-section">
                            <a className="star-number" href="{{.Repo.Link}}/stars">
                                {stars}
                            </a>
                            <a className="star-action" href="{{.Repo.HTMLURL}}/action/{{if $isStaring}}un{{end}}star?redirect_to={{.General.Link}}{{QueryParam .General.QueryParameters}}">
                                <i className={ !props.isStaring ? "star" : "start-outline"}></i>
                                { props.isStaring ? <img className="star" src="./assets/solid-star.svg"></img> : <img className="star" src="./assets/star-outline.svg"></img> }
                            </a>
                        </div>
                    </div>

                    <div className="repo-tags">
                        <div className="repo-name">
                            <a className="title1 cut-text" href="{{AppSubURL}}/{{if .Repo.Owner}}{{.Repo.Owner.Name}}{{else if .General.Org}}{{.General.Org.Name}}{{else}}{{.General.Owner.Name}}{{end}}/{{.Repo.Name}}">
                                {props.repoName}
                            </a>
                            <div className="tag public-private">
                                {props.isPrivate ? "private" : "public"}
                            </div>
                        </div>                        
                        {props.topics?.map((topic: { categoryId: { showExplore: any; colorClassName: string; }; name: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined; }) => 
                            topic.categoryId.showExplore ? 
                            <a className={"tag repo-new-topic category-" + topic.categoryId.colorClassName} 
                                rel="nofollow">
                                {/* href="{{if $.PageIsExplore}}{{$.Link}}{{else}}/explore/repos{{end}}?topics={{if $isSelected}}{{RemoveItemFromList (print $category ":" $topic.Topic.Name) $.General.TopicsSelected}}{{else}}{{if $.General.TopicsSelected}}{{$.General.TopicsSelected}},{{end}}{{$category}}:{{$topic.Topic.Name}}{{end}}"> */}
                                {topic.name}
                            </a>  
                            : <></>        
                        )}
                    </div>

                    <div className="repo-main">
                        <div className="repo-desc-block">
                            <p className="repo-description">
                                {props.hasDescription? props.repoDescription : "No description"}
                            </p>  
                        </div>                      
                        <div className="repo-information">
                            <img className="divider-icon" src="./assets/divider.svg"/>
                            <div className="repo-info-text">
                                <div className="stats">
                                    <a className="stat-block" href="{{AppSubURL}}/{{if .Repo.Owner}}{{.Repo.Owner.Name}}{{else if .General.Org}}{{.General.Org.Name}}{{else}}{{.General.Owner.Name}}{{end}}/{{.Repo.Name}}/forks">
                                    <img className="fork-icon" src="./assets/fork-icon.svg"/>
                                    <p>
                                        {props.numForks}
                                    </p>
                                    </a>
                                    {!props.isMirror ? 
                                        <a className="stat-block" href="{{AppSubURL}}/{{if .Repo.Owner}}{{.Repo.Owner.Name}}{{else if .General.Org}}{{.General.Org.Name}}{{else}}{{.General.Owner.Name}}{{end}}/{{.Repo.Name}}/pulls">
                                        <img className="pull-request-icon" src="./assets/pull-requests-icon.svg"/>
                                        <p>
                                            {props.numOpenPulls}
                                        </p>
                                        </a>
                                    : <></>}
                                    <a className="stat-block" href="{{AppSubURL}}/{{if .Repo.Owner}}{{.Repo.Owner.Name}}{{else if .General.Org}}{{.General.Org.Name}}{{else}}{{.General.Owner.Name}}{{end}}/{{.Repo.Name}}/issues">
                                    <img className="issue-icon" src="./assets/issue.svg"/>
                                    <p>
                                        {props.numOpenIssues}
                                    </p>
                                    </a>
                                </div>
                                <div className="belongs-to">
                                    {props.repoTeams&&props.repoTeams.length?"Belongs to: ":<></>}
                                    {props.repoTeams?.map((team:{id:number, name:string}, index:any) => 
                                        <span>
                                            <span>{(index ? ', ': '' )}</span>
                                            <a  className="repo-team" href="">{team.name}</a> 
                                        </span>                                        
                                    )}
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </>        
    )
}

//should fix hrefs
//handle case when there are too many topics
//handle case when there are too many teams- should be numbers instead of dots 
//is it possible that no teams connected to repo? if yes, how should it looks like in the card

//add props to modal component
