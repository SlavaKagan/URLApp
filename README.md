# URLApp

## Contact
**Email:** slava.kagan.ht@gmail.com

## General info about the task
**GitHub repository:** https://github.com/SlavaKagan/URLApp <br />
**Programming Language:** Javascript https://www.javascript.com/ <br />
**Framework:** Node.js version v20.10.0 https://nodejs.org/en/ <br />
**Testing Framework:** Jest- https://jestjs.io/ <br />
**Compiler:** "babel" https://babeljs.io/docs/config-files/ <br/>

## Abstract
Application allow users to input a list of URLs,fetch metadata(title,description,and an image)
foreachURL,and display the results.
Implemented error handling for cases where metadata cannot be retrieved.

## How to Run?
1. Prerequisites
Node.js and npm (Ensure you have them installed).
2. Setup Instructions
Clone the Repository
git clone https://github.com/SlavaKagan/URLApp
cd URLApp
**Install Dependencies:** npm install
3. Running the Application
**Start the Back-End Server:** npm run server
4. Testing the Application
** Run Unit Tests:** npm test

## Test Cases
**MetadataService Tests:**
1. Fetch metadata successfully.
2. Handle missing metadata.
3. Handle errors during metadata fetch.

**MetadataController Tests:**
1. Return metadata for valid URLs.
2. Handle errors when fetching metadata.
