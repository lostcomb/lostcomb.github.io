/**
 * This file defines the grep command line app.
 */

window.addEventListener("register_app", function (e) {
  var grep = function (output, args) {
    if (args.length > 0) {
      switch (args[0]) {
        case "clear":
          var count = clearMatches();
          output.addLine("Cleared " + count + " match" + (count == 1 ? "" : "es") + ".");
          break;
        case "-i":
          clearMatches();
          var count = findMatches(new RegExp(args[1], "ig"));
          output.addLine("Found " + count + " match" + (count == 1 ? "" : "es") + ".");
          break;
        default:
          clearMatches();
          var count = findMatches(new RegExp(args[0], "g"));
          output.addLine("Found " + count + " match" + (count == 1 ? "" : "es") + ".");
          break;
      }
    } else {
      output.addLine("Usage: grep/find [-i] PATTERN");
      output.addLine("Usage: grep/find clear");
    }
  };
  e.detail.registerApplication("grep", grep, "Searches for a text string in the page.");
  e.detail.registerApplication("find", grep, "Searches for a text string in the page.");
});

/**
 * This function uses the specified regex to find matches on the page and
 * highlight them. The <mark></mark> tag is used to highlight the text. This
 * function also returns the number of matches.
 *
 * @param regex the regex to use to find matches.
 * @return      the number of matches.
 */
var findMatches = function (regex) {
  var elements = document.getElementsByClassName("page-content")[0].querySelectorAll("h1,h2,h3,h4,h5,h6,p");
  var count = 0;

  for (var i = 0; i < elements.length; i++) {
    count += (elements[i].innerHTML.match(regex) || []).length;
    elements[i].innerHTML = elements[i].innerHTML.replace(regex, "<mark>$&</mark>");
  }
  return count;
};

/**
 * This function clears all of the previously found matches on the page. This
 * function therefore removes all <mark></mark> tags from matches.
 *
 * @return the number of matches cleared.
 */
var clearMatches = function () {
  var elements = document.getElementsByClassName("page-content")[0].querySelectorAll("h1,h2,h3,h4,h5,h6,p");
  var count = 0;

  for (var i = 0; i < elements.length; i++) {
    count += (elements[i].innerHTML.match(/<mark>/g) || []).length;
    elements[i].innerHTML = elements[i].innerHTML.replace(/(<mark>)|(<\/mark>)/g, "");
  }
  return count;
};
