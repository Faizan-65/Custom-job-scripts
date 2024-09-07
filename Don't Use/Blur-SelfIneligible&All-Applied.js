// ==UserScript==
// @name         Blur Ineligible
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Updates the style of elements with data-controller="hazy-view" on attribute change
// @author       You
// @match        https://bd.devsinc.com/job_portal/*
// @grant        none
// ==/UserScript==

function removeApplied(){
    const elements = document.querySelectorAll('.flex.flex-wrap.flex-col.gap-4');
    // Iterate over the selected elements
    elements.forEach((element) => {
        element.remove();
    });
}

function findClosestTR(element) {
   while (element && element.tagName !== "TR") {
      element = element.parentNode;
   }
   return element;
}
function removeIneligible() {
   let parentsList = [];
   let redElements = [];
   const targetElements = document.getElementsByClassName("direct-children:bg-global-error-600");
   for (const element of targetElements) {
      redElements.push(element);
      if (element.textContent.includes("Murtza")) {
         const parentTR = findClosestTR(element);
         parentsList.push(parentTR);
      }

   }
   redElements.forEach((element) => {
      element.remove();
   });
   parentsList.forEach((element) => {
      element.parentNode.removeChild(element);
   });
}
function removeBlur() {
   const targetElements = document.querySelectorAll("div[data-controller='hazy-view']");
   console.log(targetElements.length);
   for (const element of targetElements) {
      element.style.filter = "blur(0px)";
      element.removeAttribute("data-action");
   }
}
function addButton() {
   //make copyButton
   var copyBtn = document.createElement("button");
   copyBtn.style.position = "fixed";
   copyBtn.style.top = "10px";
   copyBtn.style.right = "500px";
   copyBtn.style.zIndex = "9999";
   var placement = document.getElementById("jobs_filters");
   copyBtn.innerHTML = "Blur";
   document.body.insertBefore(copyBtn, document.body.childNodes[0]);
   copyBtn.onclick = () => {
      removeBlur();
      removeIneligible();
      removeApplied()
   };
}

(function () {
   "use strict";
   addButton();
})();
