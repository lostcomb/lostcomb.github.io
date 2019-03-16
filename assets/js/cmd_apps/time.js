/**
 * This file defines the time command line app.
 */

window.addEventListener("register_app", function (e) {
  e.detail.registerApplication("time", function (output) {
    output.addLine(new Date().toTimeString());
  }, "Displays the time.")
});
