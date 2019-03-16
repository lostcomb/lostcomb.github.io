/**
 * This file defines the date command line app.
 */

window.addEventListener("register_app", function (e) {
  e.detail.registerApplication("date", function (output) {
    output.addLine(new Date().toDateString());
  }, "Displays the date.")
});
