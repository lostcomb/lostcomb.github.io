/**
 * This file defines the linkedin command line app.
 */

window.addEventListener("register_app", function (e) {
  e.detail.registerApplication("linkedin", function (output) {
    output.parentNode.removeChild(output);
    window.location = "https://uk.linkedin.com/in/julian-loscombe-ab4385a8";
  }, "Re-directs to my Linkedin page.");
});
