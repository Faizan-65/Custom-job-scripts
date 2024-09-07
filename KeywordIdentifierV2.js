// ==UserScript==
// @name         Keyword Identifier
// @namespace    highlight-keyword
// @version      1.0
// @description  A simple script that highlights a keyword on a webpage
// @match        https://www.indeed.com/*
// @match        https://www.glassdoor.com/*
// @match        https://www.simplyhired.com/*
// @match        https://www.linkedin.com/*
// @match        https://startup.jobs/*
// @match        https://builtin.com/*
// @match        https://rubyonremote.com/*
// @match        https://weworkremotely.com/*
// @match        https://jobs.workable.com/*
// @match        https://jobgether.com/*
// @match        https://www.monster.com/*
// @match        https://www.talent.com/*
// @match        https://boards.greenhouse.io/*
// @match        https://app.otta.com/*
// @match        https://jobs.lever.co/*
// @match        https://jobs.ashbyhq.com/*
// @grant        none
// ==/UserScript==

function escapeRegExp(string) {
   return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function searchTechWords(searchTerms) {
   const regexTerms = searchTerms.map((term) => `\\b${escapeRegExp(term.trim())}\\b`).join("|");
   const regex = new RegExp(`(${regexTerms})`, "gi");

   const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

   const textNodes = [];
   while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
   }

   textNodes.forEach((node) => {
      let ancestor = node.parentNode;
      while (ancestor !== document.body) {
         if (ancestor.nodeName === "SCRIPT" || ancestor.nodeName === "NOSCRIPT") {
            return; // Skip processing this node
         }
         ancestor = ancestor.parentNode;
      }
      const matches = node.textContent.match(regex);
      if (matches) {
         const newNode = document.createElement("span");
         newNode.innerHTML = node.textContent.replace(regex, (match) => {
            return `<mark style="background-color: yellow; color: black;">${match}</mark>`;
         });
         node.parentNode.replaceChild(newNode, node);
      }
   });
}
function searchHaramWords(searchTerms) {
   const regexTerms = searchTerms.map((term) => `\\b${escapeRegExp(term.trim())}\\b`).join("|");
   const regex = new RegExp(`(${regexTerms})`, "gi");

   const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

   const textNodes = [];
   while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
   }

   textNodes.forEach((node) => {
      let ancestor = node.parentNode;
      while (ancestor !== document.body) {
         if (ancestor.nodeName === "SCRIPT" || ancestor.nodeName === "NOSCRIPT") {
            return; // Skip processing this node
         }
         ancestor = ancestor.parentNode;
      }
      const matches = node.textContent.match(regex);

      if (matches) {
         const newNode = document.createElement("span");
         newNode.innerHTML = node.textContent.replace(regex, (match) => {
            return `<mark style="background-color: red; color: yellow; font-size: 24px;">${match}</mark>`;
         });
         node.parentNode.replaceChild(newNode, node);
      }
   });
}
function searchProhibitedCompanies(searchTerms) {
   const regexTerms = searchTerms.map((term) => `\\b${escapeRegExp(term.trim())}\\b`).join("|");
   const regex = new RegExp(`(${regexTerms})`, "gi");
   const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
   const textNodes = [];
   while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
   }
   textNodes.forEach((node) => {
      let ancestor = node.parentNode;
      while (ancestor !== document.body) {
         if (ancestor.nodeName === "SCRIPT" || ancestor.nodeName === "NOSCRIPT") {
            return; // Skip processing this node
         }
         ancestor = ancestor.parentNode;
      }
      const matches = node.textContent.match(regex);
      if (matches) {
         const newNode = document.createElement("span");
         newNode.innerHTML = node.textContent.replace(regex, (match) => {
            return `<mark style="background-color: red; color: yellow; font-size: 24px;">${match}</mark>`;
         });
         node.parentNode.replaceChild(newNode, node);
      }
   });
}
function searchRemoteWords(searchTerms) {
   const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
   const regexTerms = searchTerms.map((term) => `\\b${escapeRegExp(term.trim())}\\b`).join("|");
   const regex = new RegExp(`(${regexTerms})`, "gi");
   const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
   const textNodes = [];
   
   while (walker.nextNode()) {
       textNodes.push(walker.currentNode);
   }
   
   textNodes.forEach((node) => {
       let ancestor = node.parentNode;
       while (ancestor !== document.body) {
           if (ancestor.nodeName === "SCRIPT" || ancestor.nodeName === "NOSCRIPT") {
               return; // Skip processing this node
           }
           ancestor = ancestor.parentNode;
       }
       
       const matches = node.textContent.match(regex);
       if (matches) {
           const fragments = node.textContent.split(regex);
           const parent = node.parentNode;
           
           fragments.forEach((fragment, index) => {
               if (index > 0) {
                   const mark = document.createElement('mark');
                   mark.style.backgroundColor = 'Wheat';
                   mark.style.color = 'black';
                   mark.textContent = matches[index - 1];
                   parent.insertBefore(mark, node);
               }
               parent.insertBefore(document.createTextNode(fragment), node);
           });
           parent.removeChild(node);
       }
   });
}


// Define the search terms here or use Tampermonkey's @grant metadata
const techTerms = [
   "Ruby", "Node", "TypeScript", "JavaScript", "Python", "Solidity", "PHP" , "C#", ".Net", "Java", "Springboot", 

   "React", "Vue", "Angular", "Ember", "GraphQL", "Apollo", "Redux", "jQuery" ,

   "Rails", "Express", "Django", "Flask", "Laravel", "MERN", "MEAN", "Nest" , "Java", ".Net", "PHP", "C#",

   "Bootstrap", "Tailwind", "MaterialUI" ,

   "SQLite", "Oracle", "Microsoft SQL Server", "MySQL", "Postgre" ,

   "Mongo", "Dynamo", "Redis", "Cassandra" ,

   "Clickup", "Asana", "JIRA", "Trello", "RedShift", "PivotalTracker", "BaseCamp" ,

   "Visual Studio", "VS Code", "Postman" ,

   "Github", "Gitlab", "BitBucket", "Git", "GitKraken" ,

   "Jenkins", "Maven", "Gradle", "Github Actions", "CircleCI" ,

   "Selenium", "JUnit", "Jest", "Chai", "Mocha", "Rspec", "RTL" ,

   "Docker", "Ansible", "Terraform", "Kubernetes" ,

   "Prometheus", "ELK", "Nagios" ,

   "Netlify", "Heroku", "Firebase", "Azure Cloud", "GCP", "Google Cloud Platform", "AWS", "Amazon Web Services" ,

   "Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Decision Trees", "Random Forests", "Support Vector Machines", "SVM", "Natural Language Processing", "NLP", "Computer Vision" ,

   "Data Preprocessing", "Data Visualization", "Feature Engineering", "Data Analysis", "Data Cleaning" , "ETL",

   "TensorFlow", "PyTorch", "Scikit", "Keras", "Pandas", "NumPy", "OpenCV", "NLTK", "spaCy" ,

   "Hadoop", "Spark", "MapReduce", "Apache Airflow", "Apache Kafka", "AWS Glue", "EMR", "RedShift" ,

   "Smart Contracts", "DeFi", "Dapps", "Exchanges", "Token Development", "Security Audits", "NFT", "wallets", "Aggregators", "Signature verifications" ,

   "Shopify", "Wordpress"
];
var haramTerms = [
   "gambling",
   "dating",
   "porn",
   "insurance",
   "banking",
   "bank",
   "casino",
   "drugs",
   "alcohal",
   "wine",
   "cannabis",
   "Cocaine",
   "betting ",
   "crypto",
   "NFT",
   "fantasy",
   "department of defence",
   "DOD",
   "security clearance",
   "adult",
   "gay",
   "equity",
];
var prohibitedCompanies = [
   "activeprime",
   "adaptec solutions",
   "alembic 200",
   "authorea",
   "beta breakers",
   "big nerd ranch(running on usman)",
   "china mountain trading",
   "cloudwall",
   "coworks",
   "creative realities",
   "engineering.com",
   "fund that flip",
   "my secure advantage",
   "nextlink labs",
   "notcommon",
   "notcommon",
   "nucleos",
   "nucleos",
   "open tech strategies",
   "opentechstrategies",
   "opentechstrategies",
   "parse ai",
   "predictview technologies",
   "pwv consultants",
   "redflag ai, inc.",
   "rj young company",
   "sprintfwd",
   "sprintfwd",
   "the gnar company",
   "Upright",
   "window search, incorporated",
   "Global Regulatory Writing & Consulting",
   "Littlelines",
   "redflag ai",
];

let remoteTerms = ["remote", "wfh", "work from home"];
let indianNames = ["india", "indian", "Ankita", "Rahul", "Rohit", "Amit", "Rajesh", "Akash", "Vijay", "Ajay", "Ravi", "Ankit", "Sunil"];
let indianContactTerms = ["+91"];

function executeSearchFunctions() {
   searchTechWords(techTerms);
   searchHaramWords(haramTerms);
   // searchProhibitedCompanies(prohibitedCompanies);
   // searchRemoteWords(remoteTerms);
}

const highlightButton = document.createElement("button");
highlightButton.textContent = "Highlight Text";
highlightButton.style.position = "fixed";
highlightButton.style.top = "10px";
highlightButton.style.right = "10px";
highlightButton.style.zIndex = "9999";
document.body.appendChild(highlightButton);
highlightButton.addEventListener("click", function () {
   executeSearchFunctions();
});
