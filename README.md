UUID plugin for Light Table
---------------------------

Insert a new [UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier) at the cursor or selection e.g. `9f4e9a51-a95f-4f62-afc7-60f1570d2255`.

The UUID's generated are Version4 (random). The random numbers are pulled from Webkit's [window.crypto.getRandomValues](https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues), which Light Table wraps.

Usage
-----

Only one command is currently available:

* UUID: Insert UUID. `:uuid.insert`

Installation
------------

Available in the central plugin repository as `UUID`. Refreshing the plugin list (`Refresh plugin list`) and a reload of the behaviours (`Reload behaviors`) may be needed before the command becomes available.

Todo
----

1. ~~Insert over a selection~~.
2. Options for uppercasing and removing hyphens.
3. Support for Guids.

License
-------

Copyright (C) 2013 John Kane.

Distributed under the EPL, see license.md for the full text.
