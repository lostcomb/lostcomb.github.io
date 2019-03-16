---
category: programming
---
Made as part of a concurrent computing course. The features implemented include:

* Simplified `fprintf`, `printf` and `sprintf` functions.
* `exit`, `fork`, `exec`, `read`, `write`, `yield`, `wait`, `kill`, `pause`, `signal`, `getpid`, `getppid`, `pipe`, `close` and `dup2` system calls.
* The process lifecycle, i.e. a process can be orphaned or a zombie once exited.
* Simplified pipes and stdio redirection.
* Select signals.
* Priority scheduling, i.e.give priority to processes available to execute, never schedule processes waiting for I/O until they are ready.
* Sleeping the processor when there aren't any processes available to execute.
* Small graphics library and very simple window manager.
