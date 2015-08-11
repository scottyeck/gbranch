# grit

A "greppy" git-CLI plugin.

## Why build this?

I like long branch names. They're descriptive, ensure a higher probability of uniqueness, and allow for integration with Workflow tools like *Jira*, *Trello*, etc.

However, this is not without its faults. Consider a list of local branches, from which I want to checkout the last one.

- ```feature-YRT-523-add-new-app-config-file```
- ```feature-URT-388-new-client-info-flow-mvp```
- ```hotfix-YRT-4881-fix-dumb-typo-on-homepage```

To checkout that last branch, I could do this...

	$ git branch -l
	# ... (Find correct branch name.)
	# ... (Move hand to mouse.)
	# ... (Highlight correct branch name.)
	# ... (Move hand back to keyboard.)
	# ... (Paste result at end of git checkout command)
	$ git checkout [cmd+v]

OR I could do this.

	$ git branch -l | grep 4881 | xargs git checkout

This works really well, but **as commands get longer, this strategy becomes more tedious and no longer saves time**. Say, for example, I wanted to checkout a local copy of ```remote/feature-YRT-523-add-new-app-config-file```. Then my command becomes...

	$ git branch -r | grep 'mvp' | sed 's/remote\///' | xargs -I {} git checkout -b {} origin/{}

No fun. I know the ticket number for this branch, so I'd just prefer to type

	$ grit checkout -r 523

## How do I use it?

*FYI: Actual manual to follow soon.*

	# BRANCH NAMES														#
	#####################################################################

	$ grit branch [grep-string | -c --current]
		- Outputs name of local branch with grep-match or current

	# PUSH																#
	#####################################################################

	$ grit push [grep-string | -c --current]
		- Push local branch with grep-match	or current branch

	# CHECKOUTS															#
	#####################################################################

	$ grit checkout [grep-string]
		- Checks out local branch with grep-match

	# MERGES															#
	#####################################################################

	$ grit merge [grep-string]
		- Merges local branch with grep-match
