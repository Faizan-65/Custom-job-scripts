// ==UserScript==
// @name         Keyword Identifier
// @namespace    highlight-keyword
// @version      1.0
// @description  A simple script that highlights a keyword on a webpage
// @match        https://www.indeed.com/*
// @match        https://www.glassdoor.com/job-listing/*
// @match        https://www.simplyhired.com/job/*
// @match        https://www.linkedin.com/jobs/view/*
// @match        https://startup.jobs/*
// @match        https://builtin.com/job/*
// @match        https://rubyonremote.com/jobs/*
// @grant        none
// ==/UserScript==


const haramTermsFound = new Map();
const contractTermsFound = new Map();
const techTermsFound = new Map();
const remoteTermsFound = new Map();
const indianNameFound = new Map();
const indianContactFound = new Map();


function displayReport() {
    var haramDiv = document.createElement('div');
    haramDiv.innerHTML = `<mark style="background-color: red; color: black;">Haram</mark> Terms Found => ${printTermsInMap(haramTermsFound)}`;
    document.body.insertBefore(haramDiv, document.body.firstChild);

    // document.body.insertBefore(document.createElement("br"), document.body.firstChild);

    var contractDiv = document.createElement('div');
    contractDiv.innerHTML = `<mark style="background-color: Aqua; color: black;">Contract</mark> Terms Found => ${printTermsInMap(contractTermsFound)} `;
    document.body.insertBefore(contractDiv, document.body.firstChild);

    // document.body.insertBefore(document.createElement("br"), document.body.firstChild);

    var techDiv = document.createElement('div');
    techDiv.innerHTML = `<mark style="background-color: yellow; color: black;">Tech</mark> Terms Found => ${printTermsInMap(techTermsFound)}`;
    document.body.insertBefore(techDiv, document.body.firstChild);

    // document.body.insertBefore(document.createElement("br"), document.body.firstChild);

    var remotediv = document.createElement('div');
    remotediv.innerHTML = `<mark style="background-color: wheat; color: black;">Remote</mark> Terms Found => ${printTermsInMap(remoteTermsFound)}`;
    document.body.insertBefore(remotediv, document.body.firstChild);

    // document.body.insertBefore(document.createElement("br"), document.body.firstChild);


    var inContactDiv = document.createElement('div');
    inContactDiv.innerHTML = `<mark style="background-color: black; color: white;">Indian Contact</mark> Found => ${printTermsInMap(indianContactFound)}`;
    document.body.insertBefore(inContactDiv, document.body.firstChild);

    // document.body.insertBefore(document.createElement("br"), document.body.firstChild);


    var inNameDiv = document.createElement('div');
    inNameDiv.innerHTML = `<mark style="background-color: purple; color: black;">Indian Name</mark> Found => ${printTermsInMap(indianNameFound)}`;
    document.body.insertBefore(inNameDiv, document.body.firstChild);
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function searchTechWords(searchTerms) {
    const regexTerms = searchTerms.map(term => `\\b${escapeRegExp(term.trim())}\\b`).join('|');
    const regex = new RegExp(`(${regexTerms})`, 'gi');

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

    const textNodes = [];
    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }

    textNodes.forEach(node => {
        let ancestor = node.parentNode;
        while (ancestor !== document.body) {
            if (ancestor.nodeName === 'SCRIPT' || ancestor.nodeName === 'NOSCRIPT') {
                return; // Skip processing this node
            }
            ancestor = ancestor.parentNode;
        }
        const matches = node.textContent.match(regex);
        if (matches) {
            const newNode = document.createElement('span');
            newNode.innerHTML = node.textContent.replace(regex, (match) => {
                addTermInMap(techTermsFound, match);
                return `<mark style="background-color: yellow; color: black;">${match}</mark>`;
            });
            node.parentNode.replaceChild(newNode, node);
        }
    });

}
function searchHaramWords(searchTerms) {
    const regexTerms = searchTerms.map(term => `\\b${escapeRegExp(term.trim())}\\b`).join('|');
    const regex = new RegExp(`(${regexTerms})`, 'gi');

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

    const textNodes = [];
    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }

    textNodes.forEach(node => {
        let ancestor = node.parentNode;
        while (ancestor !== document.body) {
            if (ancestor.nodeName === 'SCRIPT' || ancestor.nodeName === 'NOSCRIPT') {
                return; // Skip processing this node
            }
            ancestor = ancestor.parentNode;
        }
        const matches = node.textContent.match(regex);

        if (matches) {
            const newNode = document.createElement('span');
            newNode.innerHTML = node.textContent.replace(regex, (match) => {
                addTermInMap(haramTermsFound, match);
                return `<mark style="background-color: red; color: black;">${match}</mark>`;
            });
            node.parentNode.replaceChild(newNode, node);
        }
    });
}
function searchContractWords(searchTerms) {
    const regexTerms = searchTerms.map(term => `\\b${escapeRegExp(term.trim())}\\b`).join('|');
    const regex = new RegExp(`(${regexTerms})`, 'gi');
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }
    textNodes.forEach(node => {
        let ancestor = node.parentNode;
        while (ancestor !== document.body) {
            if (ancestor.nodeName === 'SCRIPT' || ancestor.nodeName === 'NOSCRIPT') {
                return; // Skip processing this node
            }
            ancestor = ancestor.parentNode;
        }
        const matches = node.textContent.match(regex);
        if (matches) {
            const newNode = document.createElement('span');
            newNode.innerHTML = node.textContent.replace(regex, (match) => {
                addTermInMap(contractTermsFound, match);
                return `<mark style="background-color: Aqua; color: black;">${match}</mark>`;
            });
            node.parentNode.replaceChild(newNode, node);
        }
    });
}
function searchRemoteWords(searchTerms) {
    const regexTerms = searchTerms.map(term => `\\b${escapeRegExp(term.trim())}\\b`).join('|');
    const regex = new RegExp(`(${regexTerms})`, 'gi');
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }
    textNodes.forEach(node => {
        let ancestor = node.parentNode;
        while (ancestor !== document.body) {
            if (ancestor.nodeName === 'SCRIPT' || ancestor.nodeName === 'NOSCRIPT') {
                return; // Skip processing this node
            }
            ancestor = ancestor.parentNode;
        }
        const matches = node.textContent.match(regex);
        if (matches) {
            const newNode = document.createElement('span');
            newNode.innerHTML = node.textContent.replace(regex, (match) => {
                addTermInMap(remoteTermsFound, match);
                return `<mark style="background-color: Wheat; color: black;">${match}</mark>`;
            });
            node.parentNode.replaceChild(newNode, node);
        }
    });
}
function searchIndianContact(searchTerms) {
    const regexTerms = searchTerms.map(term => `\\b${escapeRegExp(term.trim())}\\b`).join('|');
    const regex = new RegExp(`(${regexTerms})`, 'gi');
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }
    textNodes.forEach(node => {
        let ancestor = node.parentNode;
        while (ancestor !== document.body) {
            if (ancestor.nodeName === 'SCRIPT' || ancestor.nodeName === 'NOSCRIPT') {
                return; // Skip processing this node
            }
            ancestor = ancestor.parentNode;
        }
        const matches = node.textContent.match(regex);
        if (matches) {
            const newNode = document.createElement('span');
            newNode.innerHTML = node.textContent.replace(regex, (match) => {
                addTermInMap(indianContactFound, match);
                return `<mark style="background-color: black; color: white;">${match}</mark>`;
            });
            node.parentNode.replaceChild(newNode, node);
        }
    });
}
function searchIndianName(searchTerms) {
    const regexTerms = searchTerms.map(term => `\\b${escapeRegExp(term.trim())}\\b`).join('|');
    const regex = new RegExp(`(${regexTerms})`, 'gi');
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }
    textNodes.forEach(node => {
        let ancestor = node.parentNode;
        while (ancestor !== document.body) {
            if (ancestor.nodeName === 'SCRIPT' || ancestor.nodeName === 'NOSCRIPT') {
                return; // Skip processing this node
            }
            ancestor = ancestor.parentNode;
        }
        const matches = node.textContent.match(regex);
        if (matches) {
            const newNode = document.createElement('span');
            newNode.innerHTML = node.textContent.replace(regex, (match) => {
                addTermInMap(indianNameFound, match);
                return `<mark style="background-color: Purple; color: black;">${match}</mark>`;
            });
            node.parentNode.replaceChild(newNode, node);
        }
    });
}
function addTermInMap(map, key) {
    key = key.toLowerCase();

    if (map.has(key)) {
        map.set(key, map.get(key) + 1);
    }
    else {
        map.set(key, 1);
    }
}
function printTermsInMap(map) {
    console.log(map);
    var str = '';
    for (const [key, value] of map) {
        str = str.concat(key + " : " + value + " | ");
    }
    console.log(str);
    return str;
}
// Define the search terms here or use Tampermonkey's @grant metadata
const techTerms = ['net', 'react', 'angular', 'angularjs', 'python', 'java', 'springboot', 'django', 'ruby', 'nodejs',
    'node', 'laravel', 'vue', 'php', 'C#', 'Javascript', 'SQL', 'pandas', 'spark', 'ETL', 'Devops'];
const haramTerms = ['gambling', 'crypto', 'federal', 'casino', 'fantasy', 'banking', 'betting', 'porn',
    'my secure advantage','secure', 'alembic 200','alembic', 'beta breakers','breakers', 
    'rj young company','young', 'cloudwall', 'adaptec solutions','adaptec',
    'redflag ai, inc.','redflag', 'predictview technologies','predictview', 'fund that flip','fund', 
    'engineering.com','engineering', 'creative realities','creative',
    'coworks', 'pwv', 'opentechstrategies', 'nucleos', 'strategies', 'authorea',
    'sprintfwd', 'opentechstrategies', 'nucleos', 'parse ai', 'nextlink', 'activeprime',
    'china mountain trading','mountain', 'sprintfwd', 'nerd', 'gnar', 'notcommon',
    'window search, incorporated','incorporated', 'notcommon'];
const contractTerms = ['1099', 'contract', 'c2h', 'c2c', 'Full-time']

let remoteTerms = ['remote', 'wfh', 'work from home'];
let indianNames = ['india', 'indian', 'harshit', 'Aakriti', 'Anuja', 'Aradhana', 'Aaruni', 'Akshata', 'Anupriya', 'Anuradha', 'Bhavani', 'Chhaya',
    'Damini', 'Eesha', 'Falguni', 'Gauri', 'Hamsini', 'Indira', 'Jyoti', 'Kavya', 'Laxmi', 'Madhavi', 'Nandini',
    'Ojasvi', 'Pooja', 'Radhika', 'Saanvi', 'Tanvi', 'Urvashi', 'Vaishnavi', 'Yamini', 'Zara', 'Aarav', 'Advik',
    'Arjun', 'Aryan', 'Bhavin', 'Chirag', 'Darsh', 'Eshan', 'Farhan', 'Gaurav', 'Harsh', 'Ishan', 'Jatin', 'Kunal',
    'Lakshya', 'Manan', 'Naman', 'Omkar', 'Pranav', 'Rishi', 'Sahil', 'Tanishq', 'Udit', 'Vansh', 'Yash',
    'Reyansh', 'Vihaan', 'Vivaan', 'Shaurya', 'Atharv', 'Dhruv', 'Aditya', 'Rudra', 'Ayush', 'Kabir', 'Krish', 'Ishaan', 'Vedant',
    'Ayaan', 'Arnav', 'Priyanka', 'Neha', 'Pooja', 'Kajal', 'Ritu', 'Sonam', 'Shreya', 'Divya', 'Riya', 'Ankita', 'Rahul',
    'Rohit', 'Amit', 'Rajesh', 'Akash', 'Vijay', 'Ajay', 'Ravi', 'Ankit', 'Sunil'];
let indianContactTerms = ['+91'];

setTimeout(() => {
    searchTechWords(techTerms);
    searchHaramWords(haramTerms);
    searchContractWords(contractTerms);
    searchRemoteWords(remoteTerms);
    searchIndianName(indianNames);
    searchIndianContact(indianContactTerms);
    //displayReport();
}, 1600)
