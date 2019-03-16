// The page number to get search results for. This is mutated as we navigate through results.
// Pages in the search API start from zero.
// Is there a better way to do this instead of maintaining a global mutable variable?
var currentPageNumber = 0;

function setup() {
    // All search result navigation buttons are disabled by default.
    $(".navigationButton").prop("disabled", true);
    $("#pageMessage").text("");

    // Register a handler for changes in the search text to call the search Api.
    // Note - this will only trigger after the search box loses focus...
    $("#searchTextBox").change(function(e) {
        currentPageNumber = 0;
        searchAndDisplay(currentPageNumber);
        $("#pageMessage").text("");
    });

    $("#previous").click(function() {
            currentPageNumber--;
            searchAndDisplay(currentPageNumber);
        });

    $("#next").click(function() {
        currentPageNumber++;
        searchAndDisplay(currentPageNumber);
    });

    // Searches and displays the results for page number.
    function searchAndDisplay(pageNumber) {
        let query = $("#searchTextBox").val();
        if (query === "") {
            $("#searchResultsDiv").text("");
            $(".navigationButton").prop("disabled", true);
            return;
        }

        $.getJSON({url: constructSearchUrl(query, pageNumber)})
            .then(function(data){
                let results = $.map(data.hits, function(hit) {return hit.title;});
                populateSearchResults(results);

                if (data.page == 0) {
                    $("#previous").prop("disabled", true);
                } else {
                    $("#previous").prop("disabled", false);
                }
                if (data.page == data.nbPages -1) {
                    $("#next").prop("disabled", true);
                } else {
                    $("#next").prop("disabled", false);
                }
                $("#pageMessage").text("Page " + (pageNumber + 1) + " of " + data.nbPages);
                $("#pageMessage").show();
            });
    }

    function populateSearchResults(results) {
        // Clear the existing search results first.
        $("#searchResultsDiv").text("");

        // Add each search result as an independent paragraph within the search results box.
        $.each(results, function(i, res) {
            $("#searchResultsDiv").append('<span class="resultItem">' + res + '</span><br>');
        });
    }

    function constructSearchUrl(query, pageNumber) {
        return `https://hn.algolia.com/api/v1/search?query=${query}&tags=story&page=${pageNumber}`;
    }
}



