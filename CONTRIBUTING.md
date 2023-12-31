# Contributing

This document outlines the contribution guidelines for the Pledgecamp frontend. See the README for instructions on setting up a dev environment.

- [Style](#style)
  * [Code](#code)
    + [Vue component organization](#vue-component-organization)
    + [CSS media queries](#css-media-queries)
  * [Commits](#commits)
  * [Commit Message](#commit-message)
- [Pull Requests](#pull-requests)
  * [Merging](#merging)
- [Release](#release)
- [Licenses and Attribution](#licenses-and-attribution)

## Pull Requests
Pull requests (PRs) represent a feature branch that is currently in progress, or ready to merge to `master`
There may be multiple PRs per issue, but each PR should only cover a single issue.

Please follow these steps to ensure a smooth process:
- Link to the corresponding issue in the description (e.g. `#117`)
  - If the PR is for a hotfix, mention it in the description
- Use applicable labels
- Follow the below style guide
- Verify that status checks are passing
- Remove trivial commits and poorly worded messages where possible with [interactive rebase](https://thoughtbot.com/blog/git-interactive-rebase-squash-amend-rewriting-history#interactive-rebase)

### Merging
There should never be any merge commits in `master`. All PRs must be rebased on `master` if they cannot be fast-forwarded (e.g. if there are conflicts).

## Style
Follow the eslint rules specified in `.eslintrc.js` and `.stylelintrc.js`. Set up your IDE to show lint errors and warnings.
Before every commit, check for issues with `npm run lint` and `npm run lint:style`. Check with the team before adding or removing lint rules.

### Code
Below are some stylistic choices not covered by the linter. In general, try to follow style examples from existing code.

#### Javascript

Avoid overcomplicated logic, and casting to a Boolean in contexts where the variable is automatically coerced (e.g. `if`, `while`, `for` statements). Below are several examples of incorrect and correct usage:

```
// Incorrect
if(!!thing) {}
// Correct
if(thing) {}

// Incorrect
if(thing === true) {} // There are some exceptions to this, but avoid where possible
// Correct
if(thing) {}
```

#### CSS media queries
Media queries should be placed at the end, within the scope of the top level class.

Good:
```
.top-level-content {
  .stuff {
    width: 50%;
  }
  @media (max-width: $mobile-width) {
    .stuff {
      width: 100%;
    }
}
```
Bad:
```
.top-level-content {
  .stuff {
    width: 50%;
    @media (max-width: $mobile-width) {
      width: 100%;
    }
  }
}
```

#### CSS vendor prefixes
Vue CLI compiles with an autoprefixer, so vendor extension for style rules should never be necessary.

### Commits

- Follow the commit message guidelines below
  - Use present tense ("Fix bug", not "Fixed bug")
  - Use the imperative mood ("Update packages", not "Updates packages")
- No merge commits, PRs must be rebased on master before merging
  - If there are conflicts, this must be done locally. A force push is necessary (`git push -f`)
- One task/subtask per commit
- Push feature branches at least once per day
  - Delete after PR is merged
- Push as often as possible, but avoid pushing broken code
- `master` branch deploys to a staging server
- `production` branch deploys to production

### Commit Message
Header line: explain the commit in one line

Body is a few lines of text explaining things in more detail,
possibly giving some background about the issue or feature.

The body of the commit message can be several paragraphs, with
manual word-wrap and columns limited to roughly 70 characters.
That way "git log" will show things nicely even when it's indented.

Explain your solution and why you're doing what you're doing,
as opposed to describing what you're doing. Reviewers and your
future self can read the patch, but might not understand why a
particular solution was implemented.

GH-1

The header line must be limited to 70 characters, preferably 60. If the commit is related to a Github issue or pull request, reference it using the GH-X method at the end of the message, where X is the issue/PR number. If there is no commit message body, place it at the beginning of the header line.


## Release

## Licenses and Attribution