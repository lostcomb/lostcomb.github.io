/**
 * This file defines an object which contains the command prompt history.
 */

/**
 * This constructs a new History object.
 * @constructor
 */
var History = function () {
  this.command_queue = [""];
  this.index = 0;
};

/**
 * This method adds a command to the history.
 *
 * @param command the command to add to the history.
 */
History.prototype.rememberCommand = function (command) {
  this.command_queue[this.command_queue.length - 1] = command;
  this.command_queue.push("");
  this.index = this.command_queue.length - 1;
};

/**
 * This method cycles the queue one position forwards or backwards in time,
 * and returns the new head of the queue.
 *
 * @param direction the direction in which to cycle the queue.
 * @return          the command at the head of the queue after cycling.
 */
History.prototype.timeTravel = function (direction) {
  switch (direction) {
    case "forward":
      this.index = Math.min(this.command_queue.length - 1, this.index + 1);
      break;
    case "backward":
      this.index = Math.max(0, this.index - 1);
      break;
    default:
      throw new Error("Invalid direction for time travel in the history.");
  }
  return this.command_queue[this.index];
};
