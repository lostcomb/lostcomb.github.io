/**
 * This file defines an object which represents the caret of an input, this
 * caret replace the default caret of an input element.
 */

/**
 * This constructs a new Caret object for the specified input element.
 *
 * @param input the input element whose caret to replace.
 * @constructor
 */
var Caret = function (input) {
  var self = this;
  this.input = input;
  this.caret = this.create();
  document.body.appendChild(this.caret);

  input.addEventListener("focus", function () {
    self.setPosition();
    self.show();
  });
  input.addEventListener("blur", function () {
    self.hide();
  });
  input.addEventListener("keydown", function () {
    self.pause();
    self.setPosition();
  });
  input.addEventListener("keyup", function () {
    self.setPosition();
    self.play();
  });
  input.addEventListener("mousedown", function () {
    self.pause();
    self.setPosition();
  })
  input.addEventListener("mouseup", function () {
    self.setPosition();
    self.play();
  });
  input.addEventListener("mousemove", function () {
    self.setPosition();
  });
  input.addEventListener("select", function () {
    self.setPosition();
  });
  window.addEventListener("resize", function () {
    self.setPosition();
  });
};

/**
 * This method creates a hidden caret.
 *
 * @return the newly created caret.
 */
Caret.prototype.create = function () {
  var caret = document.createElement("pre");
  caret.classList.add("caret");

  var computed_style = window.getComputedStyle(this.input, null);

  caret.style["font-size"] = computed_style.getPropertyValue("font-size");
  caret.style["font-family"] = computed_style.getPropertyValue("font-family");
  return caret;
};

/**
 * This method makes the caret visible.
 */
Caret.prototype.show = function () {
  this.caret.classList.add("visible");
};

/**
 * This method makes the caret invisible.
 */
Caret.prototype.hide = function () {
  this.caret.classList.remove("visible");
};

/**
 * This method continues the caret animation.
 */
Caret.prototype.play = function () {
  this.caret.classList.remove("paused");
};

/**
 * This method pauses the caret animation.
 */
Caret.prototype.pause = function () {
  this.caret.classList.add("paused");
};

/**
 * This method sets the position of the caret on the page.
 */
Caret.prototype.setPosition = function () {
  var string = this.input.value;
  var selection = string.substring(
    this.input.selectionStart,
    this.input.selectionEnd
  );
  var inputRect = this.input.getBoundingClientRect();

  var width = Math.min(
    this.input.offsetWidth,
    Math.max(
      this.measureText(" "),
      this.measureText(selection)
    )
  );
  var height = window.getComputedStyle(this.input, null)
                     .getPropertyValue("font-size").slice(0, -2);

  var top = inputRect.top + window.pageYOffset + (inputRect.height - height) / 2;
  var left = inputRect.left + window.pageXOffset;

  var offset = this.measureText(string.substring(0, this.input.selectionStart));

  if (selection.length > 0) {
    this.caret.innerHTML = selection;
    this.pause();
  } else {
    var char = string[this.input.selectionStart];
    this.caret.innerHTML = char ? char : "";
    this.play();
  }

  this.caret.style.top = top + "px";
  this.caret.style.left = (left + offset - this.input.scrollLeft) + "px";
  this.caret.style.width = width + "px";
  this.caret.style.height = height + "px";
  this.caret.style.lineHeight = height + "px";
};

/**
 * This method returns the width of the specified text.
 *
 * @param text the string of text whose width to measure.
 * @return     the width of the specified text.
 */
Caret.prototype.measureText = function (text) {
  if (!this.text_canvas) {
    this.text_canvas = document.createElement("canvas");
    this.text_context = this.text_canvas.getContext("2d");
    var computed_style = window.getComputedStyle(this.input, null);
    this.text_context.font = computed_style.getPropertyValue("font-size") + " "
                           + computed_style.getPropertyValue("font-family");
  }
  return this.text_context.measureText(text).width;
};
