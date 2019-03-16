---
---
{% include_relative History.js %}
{% include_relative Caret.js %}
{% include_relative CMD.js %}
{% include_relative cmd_apps/date.js %}
{% include_relative cmd_apps/grep.js %}
{% include_relative cmd_apps/linkedin.js %}
{% include_relative cmd_apps/time.js %}

/**
 * This file adds the articles, starts the animations and initialises the
 * command prompt.
 */

window.addEventListener("load", function () {
  var cmd = new CMD();
  var event = new CustomEvent("register_app", { "detail": cmd });
  window.dispatchEvent(event);
});
