# How to intervene (optional)

The desk is designed to run without you. Use these only when you want to.

## Stop everything

Create an empty file and **commit it** (the cloud agent only sees git):

```
newsroom/KILL
```

The next daily run exits immediately. Delete the file, commit, to resume.

## Investigate but do not publish

Create:

```
newsroom/HOLD
```

Drafts, evidence, and the journal still accumulate. Nothing is copied to `newsroom/published/`.

Silence on the site is already the default (at most one piece per week). Use HOLD only when you want a hard freeze on publication.

## Steer without stopping

Write a note in `newsroom/overrides/`. Or add a line to `newsroom/killfile.md`.

## Unpublish

Delete or move the markdown file out of `newsroom/published/`. Rebuild the site.

## Turn off the clock

Disable the Cursor Automation. The repo stays intact; nothing wakes the agent.

## Change the publisher identity

Edit `newsroom/masthead.yml`. Fill `contact_email` before the desk sends any FOIA or source email (not enabled on day one).
