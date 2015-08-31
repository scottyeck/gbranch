# EXAMPLES

Here are some of the things I want this tool to be able to do.

## ```branch```

List current

> grit branch -c
> git branch -l | grep \* | sed 's/\*//'

Get via grep

> grit branch development
> git branch -l | grep development | sed 's/\*//'

Delete via grep

> grit branch -D development
> git branch -l | grep development | sed 's\*//' | xargs git branch -D

## ```checkout```

Checkout via grep

> grit checkout development
> git branch -l | grep development | sed 's\*//' | xargs git checkout

Checkout remote via grep (and set up tracking manually)

> grit checkout -r development
> git branch -r | grep development | sed 's/origin\///' | xargs -I {} git checkout -b {} origin/{}

Checkout file via grep

> grit checkout -f filename
> git status | grep 'modified:\|deleted:\|' | grep filename | sed 's/modified://' | sed 's/deleted://' | xargs git checkout

## ```push```

Explicit push current

> grit push -c
> grit branch -c | xargs git push origin

Explicit push current (with force)

> grit push -cf
> grit branch -c | xargs git push origin -f

## ```add```

Stage file via grep

> grit add filename
> git status | grep 'modified:\|deleted:\|' | grep filename | sed 's/modified://' | sed 's/deleted://' | xargs git add

## ```reset```

Unstage file via grep

> grit reset filename
> git status | grep 'modified:\|deleted:\|' | grep filename | sed 's/modified://' | sed 's/deleted://' | xargs git reset