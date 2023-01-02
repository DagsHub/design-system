import Head from "next/head"
import Modal from "../components/organization-components/Modal"
import RepoCard from "../components/organization-components/RepoCard"

let props1 = {
  isMirror:false,
  IsGithubIntegrated:false,
  numStars:5,
  githubStarCount:0,
  isFork:false,
  updatedDaysAgo: 8,
  isStaring:true,
  repoName:"Tal's Repository",
  isPrivate:true,
  hasDescription:true,
  repoDescription:"RPPP – Reddit Post Popularity Predictor\n A project with two goals: 1. Given a Reddit post, predict how popular it’s going to be (what it’s score will be) 2. Showcasing a remote working file system with DV…",
  numForks:0,
  numOpenPulls:2,
  numOpenIssues:3,
  topics: [{id:1, name:"general", categoryId:{colorClassName:"general", showExplore:false}},
          {id:2, name:"type", categoryId:{colorClassName:"type", showExplore:true}},
          {id:3, name:"task", categoryId:{colorClassName:"task", showExplore:true}},
          {id:4, name:"data domain", categoryId:{colorClassName:"data_domain", showExplore:true}},
          {id:5, name:"integration", categoryId:{colorClassName:"integration", showExplore:true}},
          {id:6, name:"framework", categoryId:{colorClassName:"framework", showExplore:true}},          
          {id:7, name:"type", categoryId:{colorClassName:"type", showExplore:true}},
          {id:8, name:"task", categoryId:{colorClassName:"task", showExplore:true}},
          {id:9, name:"data domain", categoryId:{colorClassName:"data_domain", showExplore:true}},
          {id:10, name:"integration", categoryId:{colorClassName:"integration", showExplore:true}},
          {id:11, name:"framework", categoryId:{colorClassName:"framework", showExplore:true}}],
  repoTeams: [{id:1, name:"team1"},{id:2, name:"team2"}, {id:3, name:"team3"}, {id:4, name:"team4"}, {id:5, name:"team5"}, {id:6, name:"team6"}, {id:7, name:"team7"}, {id:8, name:"team8"}, {id:9, name:"team9"}, {id:10, name:"team10"}]        
}

let props2 = {
  isMirror:true,
  IsGithubIntegrated:true,
  numStars:5,
  githubStarCount:3,
  isFork:false,
  updatedDaysAgo: 6,
  isStaring:false,
  repoName:"Tal's Repository",
  isPrivate:false,
  hasDescription:true,
  repoDescription:"RPPP – Reddit Post Popularity Predictor\n A project with two goals: 1. Given a Reddit post, predict how popular it’s going to be (what it’s score will be) 2. Showcasing a remote working file system with DV…",
  numForks:0,
  numOpenPulls:2,
  numOpenIssues:3,
  topics: [{id:1, name:"general", categoryId:{colorClassName:"general", showExplore:false}},
          {id:2, name:"type", categoryId:{colorClassName:"type", showExplore:true}},
          {id:3, name:"task", categoryId:{colorClassName:"task", showExplore:true}},
          {id:4, name:"data domain", categoryId:{colorClassName:"data_domain", showExplore:true}},
          {id:5, name:"integration", categoryId:{colorClassName:"integration", showExplore:true}}],
  repoTeams: [{id:1, name:"team1"},{id:2, name:"team2"}, {id:3, name:"team3"}, {id:4, name:"team4"}]  
}

let props3 = {
  isMirror:false,
  IsGithubIntegrated:false,
  numStars:0,
  githubStarCount:0,
  isFork:true,
  updatedDaysAgo: 6,
  isStaring:false,
  repoName:"Tal's Repository",
  isPrivate:false,
  hasDescription:false,
  repoDescription:"RPPP – Reddit Post Popularity Predictor\n A project with two goals: 1. Given a Reddit post, predict how popular it’s going to be (what it’s score will be) 2. Showcasing a remote working file system with DV…",
  numForks:3,
  numOpenPulls:2,
  numOpenIssues:3,
  topics: [{id:1, name:"general", categoryId:{colorClassName:"general", showExplore:false}},
          {id:4, name:"data domain", categoryId:{colorClassName:"data_domain", showExplore:true}},
          {id:5, name:"integration", categoryId:{colorClassName:"integration", showExplore:true}}],
  repoTeams: []          
}

export default function Home({}) {
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      </Head>
      <h1>hello you</h1>
      {/* <Modal/> */}
      <RepoCard {...props1}/>
      <RepoCard {...props2}/>
      <RepoCard {...props3}/>
    </div>
  )
}