UUID plugin for Light Table
---------------------------

Insert a new [UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier) at the cursor or selection e.g. `9f4e9a51-a95f-4f62-afc7-60f1570d2255`.

The UUID's generated are Version4 (random). The random numbers are pulled from Webkit's [window.crypto.getRandomValues](https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues), which Light Table wraps.

Usage
-----

There is only one command:

* UUID: Insert UUID. `:uuid.insert`

By default the UUID format matches RFC 4122, which is to say: lower case, hyphenated and without brackets e.g. `9f4e9a51-a95f-4f62-afc7-60f1570d2255`. The inserted UUIDs format can be configured to be: uppercase, hyphenless, bracketed or some combination of all three.

To alter the format, add the following behavior to your user behavior file under the editor section, setting the options appropriately:

```clojure
{:+ {:editor [(:lt.plugins.uuid/set-uuid-options true true true)]}}
```

The above setup would produce UUIDs in the format:`{AAFB9219154E47839A40B9C8408A1347}`.

Installation
------------

Available in the central plugin repository as `UUID`. Refreshing the plugin list (`Refresh plugin list`) and a reload of the behaviours (`Reload behaviors`) may be needed before the command becomes available.

Todo
----

1. ~~Insert over a selection~~.
2. ~~Options for uppercasing and removing hyphens~~.

License
-------

Copyright (C) 2013 John Kane.

Distributed under the EPL, see license.md for the full text.
