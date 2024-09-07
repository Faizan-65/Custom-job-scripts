// ==UserScript==
// @name         All-Copy Data
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://www.indeed.com/*
// @match        https://www.glassdoor.com/job-listing/*
// @match        https://www.simplyhired.com/job/*
// @match        https://www.linkedin.com/jobs/view/*
// @match        https://startup.jobs/*
// @match        https://builtin.com/job/*
// @match        https://rubyonremote.com/jobs/*
// @match        https://weworkremotely.com/remote-jobs/*
// @match        https://jobs.workable.com/view/*
// @match        https://jobgether.com/offer/*
// @match        https://www.monster.com/job-openings/*
// @match        https://www.talent.com/*
// @match        https://app.otta.com/jobs/*
// @match        https://www.ycombinator.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
   var indeedMatch = "https://www.indeed.com/*";
   var glassdoorMatch = "https://www.glassdoor.com/job-listing/*";
   var simplyMatch = "https://www.simplyhired.com/job/*";
   var linkedinMatch = "https://www.linkedin.com/jobs/view/*";
   var startupMatch = "https://startup.jobs/*";
   var builtinMatch = "https://builtin.com/job/*";
   var rubyMatch = "https://rubyonremote.com/jobs/*";
   var wwrMatch = "https://weworkremotely.com/remote-jobs/*";
   var workableMatch = "https://jobs.workable.com/view/*";
   var jobTogetherMatch = "https://jobgether.com/offer/*";
   var monsterMatch = "https://www.monster.com/job-openings/*";
   var talentMatch = "https://www.talent.com/*";
   var ottaMatch = "https://app.otta.com/jobs/*";
   var yCombinator = "https://www.ycombinator.com/*";

   function indeed_copyContent() {
      var link = window.location.href;
      var title = document.getElementsByClassName("jobsearch-JobInfoHeader-title")[0].textContent.slice(0, -1);
      var description = document.getElementsByClassName("jobsearch-JobComponent-description")[0].innerText;
      var companyName = "";
      var concatString = companyName + "^" + title + "^" + link + "^" + description;
      console.log(concatString);

      copy(concatString);
   }
   function glassdoor_copyContent() {
      var title = document.getElementsByClassName("heading_Level1__soLZs")[0].textContent.slice(0, -1);
      var link = document.URL.split("&")[0]; //https://www.glassdoor.com/job-listing/?jl=1008766267977 get jI from listing
      var description = document.getElementsByClassName("JobDetails_jobDescription__uW_fK")[0].innerText;
      var concatString = "^" + title + "^" + link + "^" + description;
      console.log(concatString);
      copy(concatString);
   }
   function linkedin_copyContent() {
      var title = document.getElementsByClassName("t-24 t-bold inline")[0].textContent.slice(0, -1);
      var link = window.location.href.split("?")[0];
      var description = document.getElementsByClassName("jobs-description-content__text")[0].innerText;
      var concatString = "^" + title + "^" + link + "^" + description;
      copy(concatString);
      console.log(concatString);
   }
   function simplyhired_copyContent() {
      var link = window.location.href;
      var title = document.getElementsByClassName("css-yvgnf2")[0].textContent.slice(0, -1);
      var description = document.getElementsByClassName("css-cxpe4v")[0].innerText;
      var companyName = document.querySelector('span[data-testid="detailText"]').textContent;
      var concatString = companyName + "^" + title + "^" + link + "^" + description;
      copy(concatString);
   }
   function startup_copyContent() {
      var link = window.location.href;
      var title = document.getElementsByClassName("visualHeader__title")[0].textContent.slice(0, -1);
      var description = document.getElementsByClassName("trix-content")[0].innerText;
      var companyName = "";
      var concatString = companyName + "^" + title + "^" + link + "^" + description;

      copy(concatString);
   }
   function builtin_copyContent() {
      var link = window.location.href;
      var title = document.getElementsByClassName("mb-0")[0].textContent.slice(0, -1);
      var description = document.getElementsByClassName("bg-white rounded-3 p-md mb-sm overflow-hidden position-relative small-size")[0].innerText;
      var companyName = "";
      var concatString = companyName + "^" + title + "^" + link + "^" + description;

      copy(concatString);
   }
   function ror_copyContent() {
      var link = window.location.href;
      var title = document.getElementsByClassName("schema-job-title")[0].textContent.slice(0, -2);
      var description = document.getElementsByClassName("trix-content")[0].innerText;
      var companyName = "";
      var concatString = companyName + "^" + title + "^" + link + "^" + description;

      copy(concatString);
   }
   function wwr_copyContent() {
      var link = window.location.href;
      var title = document.querySelector(".listing-header-container").children[2].textContent.slice(0, -1);
      var description = document.getElementsByClassName("listing-container")[0].innerText;
      var companyName = document.querySelector(".company-card").children[1].textContent;
      var concatString = companyName + "^" + title + "^" + link + "^" + description;

      copy(concatString);
   }
   function workable_copyContent() {
      var link = window.location.href;
      var title = document.getElementsByClassName("jobOverview__job-title--kuTAQ")[0].textContent.slice(0, -1);
      var description = document.getElementsByClassName("jobBreakdown__job-breakdown--31MGR")[0].innerText;
      var companyName = document.getElementsByClassName("companyName__link--2ntbf")[0].textContent;
      var concatString = companyName + "^" + title + "^" + link + "^" + description;

      copy(concatString);
   }
   function jobTogether_copyContent() {
      var link = window.location.href;
      var title = document.getElementsByClassName("opportunity_info_title")[0].textContent.slice(0, -1);
      var description = document.getElementsByClassName("description__container")[0].innerText;
      var companyName = document.getElementsByClassName("company-name")[0].textContent;
      var concatString = companyName + "^" + title + "^" + link + "^" + description;

      copy(concatString);
   }
   function monster_copyContent() {
      var link = window.location.href;
      var title = document.getElementsByClassName("headerstyle__JobViewHeaderTitle-sc-1ijq9nh-5")[0].textContent.slice(0, -1);
      var description = document.getElementsByClassName("descriptionstyles__DescriptionBody-sc-13ve12b-4")[0].innerText;
      var companyName = document.getElementsByClassName("headerstyle__JobViewHeaderCompany-sc-1ijq9nh-6")[0].textContent;
      var concatString = companyName + "^" + title + "^" + link + "^" + description;

      copy(concatString);
   }
   function talent_copyContent() {
      var link = window.location.href;
      var title = document.getElementsByClassName("jobPreview__header--title")[0].textContent.slice(0, -1);
      var description = document.getElementsByClassName("jobPreview__body--wrapper4")[0].innerText;
      var companyName = document.getElementsByClassName("jobPreview__header--company")[0].textContent;
      var concatString = companyName + "^" + title + "^" + link + "^" + description;

      copy(concatString);
   }
   function otta_copyContent() {
      var link = window.location.href;
      var title = document.getElementsByClassName("sc-7703ddff-0 FHIdA")[0].textContent.slice(0, -1);
      var description = document.getElementsByClassName("sc-8c5da51f-4 gxlGZH")[0].innerText;
      var companyName = " ";
      var concatString = companyName + "^" + title + "^" + link + "^" + description;

      copy(concatString);
   }
   function yCombinator_copyContent() {
      var link = window.location.href;
      var title = document.getElementsByClassName("ycdc-section-title")[0].textContent.slice(0, -1);
      var description = document.getElementsByClassName("prose")[1].innerText;
      var companyName = " ";
      var concatString = companyName + "^" + title + "^" + link + "^" + description;

      copy(concatString);
   }
   function copy(txt) {
      let temp = document.createElement("textarea");
      document.body.appendChild(temp);
      temp.value = txt;
      temp.select();
      navigator.clipboard.writeText(temp.value);
      temp.remove();
   }

   const copyButton = document.createElement("button");
   copyButton.textContent = "Copy Data";
   copyButton.style.position = "fixed";
   copyButton.style.top = "10px";
   copyButton.style.right = "100px";
   copyButton.style.zIndex = "9999";
   document.body.appendChild(copyButton);
   copyButton.addEventListener("click", function () {
      copyContent();
   });
   function copyContent() {
      const scriptInfo = GM_info.script;
      // Check the match patterns of the script
      let currentMatch = null;
      for (const match of scriptInfo.matches) {
         const matchPattern = new RegExp(match.replace("*", ".*"));
         if (matchPattern.test(window.location.href)) {
            currentMatch = match;
            break;
         }
      }

      copyButton.onclick = () => {
         switch (currentMatch) {
            case indeedMatch:
               indeed_copyContent();
               break;
            case glassdoorMatch:
               glassdoor_copyContent();
               break;
            case simplyMatch:
               simplyhired_copyContent();
               break;
            case linkedinMatch:
               linkedin_copyContent();
               break;
            case startupMatch:
               startup_copyContent();
               break;
            case builtinMatch:
               builtin_copyContent();
               break;
            case rubyMatch:
               ror_copyContent();
               break;
            case wwrMatch:
               wwr_copyContent();
               break;
            case workableMatch:
               workable_copyContent();
               break;
            case jobTogetherMatch:
               jobTogether_copyContent();
               break;
            case monsterMatch:
               monster_copyContent();
               break;
            case talentMatch:
               talent_copyContent();
               break;
            case ottaMatch:
               otta_copyContent();
               break;
            case yCombinator:
               yCombinator_copyContent();
               break;
            default:
               break;
               //Y Combinator
         }
      };
   }
})();
