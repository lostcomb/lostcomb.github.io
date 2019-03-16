// Key codes for certain keys.
var enterKeyCode = 13;
var upArrowKeyCode = 38;
var downArrowKeyCode = 40;

/**
 * This constructs a new CMD object which represents a command prompt.
 * @constructor
 */
var CMD = function () {
  var self = this;
  this.applications = {};
  this.input = document.getElementById("cmd-prompt");
  this.output = document.getElementById("cmd-output");
  // Create the custom caret.
  this.caret = new Caret(this.input);
  // Create the history.
  this.history = new History();

  // Listener to handle specific keypress events.
  this.input.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      case enterKeyCode:
        if (self.input.value == "") {
          self.createOutputArea().addLine("");
        } else {
          self.history.rememberCommand(self.input.value);
          self.parseCommand(self.input.value);
          self.setPrompt("");
        }
        break;
      case upArrowKeyCode:
        self.setPrompt(self.history.timeTravel("backward"));
        break;
      case downArrowKeyCode:
        self.setPrompt(self.history.timeTravel("forward"));
        break;
      default:
        break;
    }
  });

  // Give the cmd prompt focus immediately.
  this.input.focus();
  // Register default applications.
  this.registerApplication("cls", function (output) {
    self.hideOutput();
    self.output.removeChild(output);
  }, "Clears the output screen.");
  this.registerApplication("help", function (output) {
    for (var app in self.applications) {
      if (self.applications.hasOwnProperty(app)) {
        output.addLine(app + " - " + self.applications[app].help);
      }
    }
  }, "Provides Help information for the available commands.");
};

/**
 * This method registers the specified application with this command prompt.
 *
 * @param appStr  the string representing the specified application to
 *                register.
 * @param appFunc the specified application function.
 * @param helpStr the string to display when the user runs the help command.
 */
CMD.prototype.registerApplication = function (appStr, appFunc, helpStr) {
  if (this.applications[appStr.toUpperCase()])
    throw new Error("Application " + appStr + " already registered.");
  this.applications[appStr.toUpperCase()] = {
    func: appFunc,
    help: helpStr
  };
};

/**
 * This method parses the command direct from the prompt, it then tries to call
 * a registered application, it displays an error if this is not possible.
 *
 * @param input the string given to the prompt.
 */
CMD.prototype.parseCommand = function (input) {
  var words = input.split(/\s/);
  var args = [], pieces = [], inStr = false;

  for (var i = 0; i < words.length; i++) {
    if (words[i].startsWith('"') && !words[i].endsWith('"')) {
      inStr = true;
      args = args.concat(pieces);
      pieces = [words[i]];
    } else if (inStr && words[i].endsWith('"')) {
      inStr = false;
      pieces.push(words[i]);
      var arg = pieces.join(" ");
      args.push(arg.substring(1, arg.length - 1));
      pieces = [];
    } else if (inStr) {
      pieces.push(words[i]);
    } else {
      if (words[i].startsWith('"') && words[i].endsWith('"')) {
        args.push(words[i].substring(1, words[i].length - 1));
      } else {
        args.push(words[i]);
      }
    }
  }
  args = args.concat(pieces);

  var app = this.applications[args[0].toUpperCase()];
  var output = this.createOutputArea();
  if (app) {
    args.shift();
    app.func(output, args);
  } else {
    output.addLine("'" + args[0] + "' is not recognised as " +
                   "an internal or external command, " +
                   "operable program or batch file.");
  }
};

/**
 * This method sets the line of text in the prompt. It also sets the selection
 * indices so that the caret is always placed at the end of the line.
 *
 * @param line the line of text to set in the prompt.
 */
CMD.prototype.setPrompt = function (line) {
  var self = this;
  this.input.value = line;
  window.setTimeout(function () {
    self.input.selectionStart = line.length;
    self.input.selectionEnd = line.length;
  }, 0);
};

/**
 * This method creates a new output area to enter text into.
 */
CMD.prototype.createOutputArea = function () {
  var self = this;
  var addLine = function (line) {
    self.addOutputLine(div, line);
  };

  var div = document.createElement("div");
  div.addLine = addLine;
  if (this.output.firstChild) this.output.insertBefore(div, this.output.firstChild);
  else this.output.appendChild(div);
  this.output.classList.remove("hidden");
  return div;
};

/**
 * This method displays the specified text in the specified output area.
 *
 * @param output_area the output area to display the specified text in.
 * @param line        the line of text to display.
 */
CMD.prototype.addOutputLine = function (output_area, line) {
  var h5 = document.createElement("h5");
  h5.appendChild(document.createTextNode(line));
  output_area.appendChild(h5);
};

/**
 * This method hides the output area.
 */
CMD.prototype.hideOutput = function () {
  this.output.classList.add("hidden");
};
