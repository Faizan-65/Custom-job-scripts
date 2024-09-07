// ==UserScript==
// @name        LinkedIn-Remove Applied
// @namespace   Violentmonkey Scripts
// @match       https://www.linkedin.com/jobs/search/*
// @run-at      document-body
// @grant       none
// @version     1.0
// @author      -
// @description 9/20/2022, 10:43:06 PM
// ==/UserScript==


const waitForContent = (job) => new Promise((resolve, reject) => {
    let retries = 0;
    (function loop() {
      if (retries < 50) {
        retries++;
        setTimeout(() => {
          if (job.innerText) {
            resolve()
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
        }
        catch(e) {
          console.error("too may retries", e, mutation);
        }
        const label = job.querySelector(".job-card-container__footer-item");
        label && label.innerText.includes("Applied") && job.remove();
      }
    }
  }).observe(document.querySelector("body"), { childList: true, subtree: true, attributes: false });