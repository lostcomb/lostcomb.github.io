---
category: programming
small_image: processor_simulator/main.png
---
Made as part of an advanced computer architecture course. The simulator is written in Haskell. The simulated processor architecture is intended to be similar to the Intel Nehalem architecture. The features implemented include:

* A 7-stage superscalar pipeline. The stages are as follows:
    * fetch
    * decode
    * rob allocate
    * issue
    * execute
    * rob commit
    * writeback
* Out of order execution, using Tomasulo's algorithm and a reorder buffer.
* Out of order issue using reservation stations.
* Aligned and unaligned issue windows.
* Multi-cycle instructions. The number of cycles for each instruction is configurable at compile-time and at run-time.
* Sub-pipelined execution units.
* Execution unit result bypassing.
* Register renaming via Tomasulo's algorithm.
* Fixed branch prediction (always not taken) and dynamic branch prediction (2-bit saturating counter, two-level adaptive).

![Processor architecture diagram]({{ '/assets/images/processor_simulator/main.png' | relative_url }})
