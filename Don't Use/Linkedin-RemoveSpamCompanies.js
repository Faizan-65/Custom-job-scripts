// ==UserScript==
// @name        LinkedIn Remove Spam Companies
// @namespace   Violentmonkey Scripts
// @match       https://www.linkedin.com/jobs/search/*
// @run-at      document-body
// @grant       none
// @version     1.0
// @author      -
// @description 9/20/2022, 10:43:06 PM
// ==/UserScript==

var BLACK_LISTED_COMPANIES = [
   "FullStack Labs",
   "Oowlish",
   "Jobot",
   "Dice",
   "crossover",
   "Get It Recruit - Information Technology",
   "Braintrust",
   "Deloitte",
   "Motion Recruitment",
   "wipro",
   "HDR",
   "Synapse",
   "Insight Global",
   "Storm4",
   "Robert Half",
   "Vaco",
   "LHH",
   "Deloitte Digital",
   "Elastic",
   "Angi",
   "Intuit",
   "Robinhood",
   "M.C. Dean, Inc.",
   "World Wide Technology",
   "Aditi Consulting",
   "Hopper",
   "CyberCoders",
   "Fingerprint for Success (F4S)",
   "TEKsystems",
   "Aha!",
   "Storm3",
   "Ad Hoc LLC",
   "Optomi",
   "Hexaware Technologies",
   "Guidehouse",
   "Charlie Health",
   "Oracle",
   "Crossover",
   "SGS Technologies",
   "RemoteWorker US",
   "nVent",
   "Verdant Infotech Solutions",
   "NLB Services",
   "Strategic Staffing Solutions",
   "Platform Recruitment",
   "Talent Group",
   "upGrad",
   "Mindlance",
   "Akkodis",
   "One IT Corp",
   "Radiant Systems Inc",
   "Zodiac Solutions, Inc",
   "ProKatchers LLC",
   "Hall of Fame Bets",
   "Anvik Technologies",
   "V-Soft Consulting Group, Inc.",
   "HireBrick",
   "Proxify AB",
   "Proxify",
];

const waitForContent = (job) =>
   new Promise((resolve, reject) => {
      let retries = 0;
      (function loop() {
         if (retries < 50) {
            retries++;
            setTimeout(() => {
               if (job.innerText) {
                  resolve();
               } else {
                  waitForContent();
               }
            }, retries);
         } else {
            reject();
         }
      })();
   });

new MutationObserver(async (mutationList, self) => {
   for (const mutation of mutationList) {
      if (mutation.target.classList.contains("jobs-search-results__list-item")) {
         const job = mutation.target;
         job.scrollIntoView();
         try {
            await waitForContent(job);
         } catch (e) {
            console.error("too may retries", e, mutation);
         }
         const companyName = job.querySelector(".job-card-container__primary-description ");

         companyName && isSpamCompany(companyName.innerText) && job.remove();
      }
   }
}).observe(document.querySelector("body"), { childList: true, subtree: true, attributes: false });

// Function to check if 'innerText' of any element in the array is "Promoted"
function isSpamCompany(name) {
   for (const element of BLACK_LISTED_COMPANIES) {
      if (name === element) {
         return true;
      }
   }
   return false;
}
