// ==UserScript==
// @name         Sales Engine Autofill
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Prefill some entries in the sales engine
// @author       You
// @match        https://bd.devsinc.com/job_portal/jobs
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    // Function to handle the appearance of the specific element for location autofill
    async function handleLocationAppearance() {
        var selectElement = document.getElementById('job_job_location');
        var optionValueToSelect = 'remote'; // The value of the job role option you want to select
        selectElement.value = optionValueToSelect; // Set the value of the <select> element to the desired option value
        console.log("Job Role Selected");
    }


    // Function to handle the appearance of the specific element for job type autofill
    /*async function handleJobTypeAppearance() {
        var JTcomboboxInput = document.getElementById('job_job_type_ids-ts-control');
        var JTdropdownContent = document.getElementById('job_job_type_ids-ts-dropdown');

        JTcomboboxInput.click(); // Simulate a click event to open the dropdown

        function selectJobTypeAndClose() {

            return new Promise(resolve => {
                var jobTypeToSelect = '6'; // The value of the job type you want to select
                var jobTypeElement = JTdropdownContent.querySelector(`[data-value="${jobTypeToSelect}"]`);
                // console.log("Verified" + jobTypeElement);
                if (jobTypeElement) {
                    jobTypeElement.click();
                    console.log("Job Type Filled");
                    resolve();
                } else {
                    setTimeout(() => resolve(selectJobTypeAndClose()), 200);
                }
            });
        }

        await selectJobTypeAndClose();
    }*/


    //    Code for counted attempts
    async function handleJobTypeAppearance() {
    var JTcomboboxInput = document.getElementById('job_job_type_ids-ts-control');
    var JTdropdownContent = document.getElementById('job_job_type_ids-ts-dropdown');

    JTcomboboxInput.click(); // Simulate a click event to open the dropdown

    function selectJobTypeAndClose(attempt = 1, maxAttempts = 5) {
        console.log("Attempt: ", attempt);

        return new Promise(resolve => {
            var jobTypeToSelect = '6'; // The value of the job type you want to select
            var jobTypeElement = JTdropdownContent.querySelector(`[data-value="${jobTypeToSelect}"]`);

            if (jobTypeElement) {
                jobTypeElement.click();
                console.log("Job Type Filled");
                resolve();
            } else {
                if (attempt < maxAttempts) {
                    setTimeout(() => resolve(selectJobTypeAndClose(attempt + 1)), 100);
                } else {
                    console.log("Max attempts reached. Element not found.");
                    resolve(); // Resolve to stop further attempts
                }
            }
        });
    }

        await selectJobTypeAndClose();
    }    
    

    // 1253-.NET | 61=Java | 2-Ruby on Rails | 211-Node | 147-React | 10-Angular | 3-Python | 57-PHP | 31-DevOps
    async function handleTechStackAppearance() {
        var comboBoxInput = document.getElementById('job_tech_stack_ids-ts-control');
        var dropDownContent = document.getElementById('job_tech_stack_ids-ts-dropdown');

        comboBoxInput.click(); // Simulate a click event to open the dropdown

        function selectAndClose(value) {
            return new Promise(resolve => {
                var element = dropDownContent.querySelector(`[data-value="${value}"]`);
                if (element) {
                    element.click();
                    console.log(`Tech stack with ID ${value} selected.`);
                    resolve();
                } else {
                    setTimeout(() => resolve(selectAndClose(value)), 100);
                }
            });
        }

        var toSelect = ['1253', '61', '2', '211', '147', '10', '3', '57', '31'];

        for (const value of toSelect) {
            await selectAndClose(value);
        }

    }
    // Function to handle the appearance of the specific element for job source autofill
    async function handleJobSourceAppearance() {
        var JSInput = document.getElementById('job_job_source_id-ts-control');
        
        var JSDropContent = document.getElementById('job_job_source_id-ts-dropdown');

        JSInput.click(); // Simulate a click event to open the dropdown

        function selectJobSource() {
            return new Promise(resolve => {
                var JSItemtoSel='';
                if (jobLink.includes("linkedin")) { JSItemtoSel = '7'; }
                else if (jobLink.includes("indeed")) { JSItemtoSel = '6' }
                else if (jobLink.includes("glassdoor")) { JSItemtoSel = '24'; }
                else if (jobLink.includes("simplyhired")) { JSItemtoSel = '22'; }
                else if (jobLink.includes('startup')) { JSItemtoSel = '20' }
                else if (jobLink.includes('builtin')) { JSItemtoSel = '137' }
                else if (jobLink.includes('ruby')) { JSItemtoSel = '92' }
                else if (jobLink.includes('weworkremotely')) { JSItemtoSel = '33' }
                else if (jobLink.includes('workable')) { JSItemtoSel = '8' }
                else if (jobLink.includes('jobtogether')) { JSItemtoSel = '19' }
                else if (jobLink.includes('monster')) { JSItemtoSel = '30' }
                else if (jobLink.includes('talent')) { JSItemtoSel = '117' }
                else if (jobLink.includes('otta')) { JSItemtoSel = '141' }
                else { JSItemtoSel = '7'; }
                var JSItemElem = JSDropContent.querySelector(`[data-value="${JSItemtoSel}"]`);

                if (JSItemElem) {
                    JSItemElem.click();
                    resolve();
                } else {
                    setTimeout(() => resolve(selectJobSource()), 100);
                }
            });
        }

        await selectJobSource();
    }

    // Function to handle the appearance of the specific element for job role autofill
    async function handleJobRoleAppearance() {
        var selectElement = document.getElementById('job_job_role_id');
        var optionValueToSelect = '2'; // The value of the job role option you want to select
        selectElement.value = optionValueToSelect; // Set the value of the <select> element to the desired option value
        console.log("Job Role Selected");
    }
    async function handleRegionSelection() {
        var selectElement = document.getElementById('job_region');
        var optionValueToSelect = 'us'; // The value of the job role option you want to select
        selectElement.value = optionValueToSelect; // Set the value of the <select> element to the desired option value
        console.log("Job Role Selected");
    }
    // Tick Estimated Sallary
    async function handleEstimatedSallaryTick() {
        var selectElement = document.getElementsByClassName('peer-checked:hidden')[0];
        selectElement.click();
        console.log("Sallary Ticked Filled");
    }
    var clipboardText = " ";//structure=companyName + " ^ " + title + " ^ " + link + " ^ " + description;
    var companyName = "";
    var jobTitle = "";
    var jobLink = "";
    var jobDescription = "";
    async function readClipboardText() {
        try {
            clipboardText = await navigator.clipboard.readText();
            companyName = clipboardText.split("^")[0].trim();
            jobTitle = clipboardText.split("^")[1].trim();
            jobLink = clipboardText.split("^")[2].trim();
            jobDescription = clipboardText.split("^")[3];
        } catch (err) {
            alert("Failed to read clipboard text:", err);
        }
    }


    async function handleCompanyName() {
        var selectElement = document.getElementById('job_company_attributes_name-ts-control');
        selectElement.value = companyName; // The value of the job role option you want to select
        console.log("Company Name Filled");
    }

    async function handleJobTitle() {
        var selectElement = document.querySelector('input[placeholder="Add job title"]');
        selectElement.value = jobTitle+" ";
        console.log("Job Title Filled");
    }

    async function handleJobLink() {
        var selectElement = document.querySelector('input[placeholder="Add job link"]');
        selectElement.value = jobLink;
        console.log("Job Title Filled");
    }

    async function handleJobDescription() {
        var selectElement = document.getElementById('job_description');
        selectElement.value = jobDescription;
        console.log("Job Title Filled");
    }
    // Call the function to read clipboard text


    document.onkeydown = async function (e) {
        e = e || window.event; // for IE compatibility
        var key = e.key; // get the key name
        if (key === "`") {
            setTimeout(async () => {
                await readClipboardText();
                await handleJobDescription();
                await handleJobTitle();
                await handleJobLink();
                await handleJobSourceAppearance();
                await handleJobRoleAppearance();
                await handleJobTypeAppearance();
                await handleLocationAppearance();
                await handleRegionSelection();
                await handleEstimatedSallaryTick();

                //await handleCompanyName();
                console.log("All Fields Filled");
            }, 100);

        }
    };
})();