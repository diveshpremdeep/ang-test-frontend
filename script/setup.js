// The page number to get search results for. This is mutated as we navigate through results.
// Pages in the search API start from zero.
// Is there a better way to do this instead of maintaining a global mutable variable?
var currentPageNumber = 0;

function setup() {
    // All search result navigation buttons are disabled by default.
    $(".navigationButton").prop("disabled", true);
    $("#pageMessage").text("");

    // Register a handler for changes in the search text to call the search Api.
    $("#searchTextBox").on('input propertychange paste', function(e) {
        currentPageNumber = 0;
        searchAndDisplay(currentPageNumber);
    });

    $("#previous").click(function() {
            currentPageNumber--;
            searchAndDisplay(currentPageNumber);
        });

    $("#next").click(function() {
        currentPageNumber++;
        searchAndDisplay(currentPageNumber);
    });

    $("#searchTextBox").focus();

    // Searches and displays the results for page number.
    function searchAndDisplay(pageNumber) {
        let query = $("#searchTextBox").val();
        if (query === "") {
            $("#searchResultsDiv").text("");
            $(".navigationButton").prop("disabled", true);
            $("#pageMessage").text("");
            return;
        }

        $.getJSON({url: constructSearchUrl(query, pageNumber)})
            .then(function(data){
                let results = $.map(data.hits, function(hit) {return {title: hit.title, url: hit.url};});
                populateSearchResults(results);

                if (data.page == 0) {
                    $("#previous").prop("disabled", true);
                } else {
                    $("#previous").prop("disabled", false);
                }
                if (data.page >= data.nbPages -1) {
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
            let url = res.url || "";
            let title = res.title;
            $("#searchResultsDiv").append(`
                <div class="resultItem">
                    <div class="resultTitle">
                        <a href="${url}" target="_blank">${title}</a>
                    </div>
                    <div class="resultLink">
                        <span>${url}</span>
                    </div>
                </div>
            `);
        });
    }

    function constructSearchUrl(query, pageNumber) {
        let encodedQuery = encodeURIComponent(query)
        return `https://hn.algolia.com/api/v1/search?query=${encodedQuery}&tags=story&page=${pageNumber}`;
    }
}



