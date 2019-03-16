# ang-test-frontend
Contains code for the ANG front end test.

## Running the frontend locally
1. Clone the `ang-test-frontend` repository from https://github.com/diveshpremdeep/ang-test-frontend.
2. Open the `ang-test-frontend/html/search.html` file in a browser and test.

## Gotchas 
1. The Algol search API behaves weirdly for some search inputs where it returns page numbers incorrectly. This can 
result in, say, one page of search results displaying `Page 2 of 50` and the next page displaying `Page 3 of 45`. I 
have chosen to not handle such weird cases for now.

## What could have been done better
1. The styling could definitely be improved.
2. Currently, a search is triggered immediately for every change in the search text box. This can be improved to, 
say, wait for a minimum number of characters to be typed in before performing a search. We could also add a delay 
before searching to avoid repeatedly calling the search API with incomplete input.

## Lessons learnt
1. Designing the front end for an application is an art form; it takes good judgement to decide what looks 
aesthetically pleasing on a page.

