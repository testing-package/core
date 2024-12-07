<a href="https://www.typescriptlang.org/">
  <img
    src="https://avatars.githubusercontent.com/u/189591238"
    width="20%"
    title="@testing-package/core"
  />
</a>

## testing-package/core

A unit testing wrapper to integrate custom tests.

<!-- npm badge -->
[![npm version][testing-package-npm-badge-svg]][testing-package-npm-badge]
[![GitHub issues][testing-package-badge-issues]][testing-package-issues]
[![GitHub license][testing-package-badge-license]][testing-package-license]

<br>

## Table of contents

* [Installation](#installation)
* [Api](#api)
* [Benefits](#benefits)
* [Git](#git)
  * [Commit](#commit)
  * [Versioning](#versioning)
* [License](#license)

## Installation

```bash
npm install @testing-package/core
```

## Api

```typescript
import {
} from '@testing-package/core';
```

## GIT

### Commit

* [AngularJS Git Commit Message Conventions][git-commit-angular]
* [Karma Git Commit Msg][git-commit-karma]
* [Conventional Commits][git-commit-conventional]

### Versioning

[Semantic Versioning 2.0.0][git-semver]

**Given a version number MAJOR.MINOR.PATCH, increment the:**

* MAJOR version when you make incompatible API changes,
* MINOR version when you add functionality in a backwards-compatible manner, and
* PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

**FAQ**
How should I deal with revisions in the 0.y.z initial development phase?

> The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

> If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

## License

MIT © testing-package ([license][testing-package-license])

<!-- This package: testing-package  -->
  <!-- GitHub: badges -->
  [testing-package-badge-issues]: https://img.shields.io/github/issues/testing-package/core
  [isscript-package-badge-forks]: https://img.shields.io/github/forks/testing-package/core
  [testing-package-badge-stars]: https://img.shields.io/github/stars/testing-package/core
  [testing-package-badge-license]: https://img.shields.io/github/license/testing-package/core
  <!-- GitHub: badges links -->
  [testing-package-issues]: https://github.com/testing-package/core/issues
  [testing-package-forks]: https://github.com/testing-package/core/network
  [testing-package-license]: https://github.com/testing-package/core/blob/master/LICENSE
  [testing-package-stars]: https://github.com/testing-package/core/stargazers
<!-- This package -->

<!-- Package: testing-package -->
  <!-- npm -->
  [testing-package-npm-badge-svg]: https://badge.fury.io/js/@testing-package%2Fcore.svg
  [testing-package-npm-badge]: https://badge.fury.io/js/@testing-package%2Fcore

<!-- GIT -->
[git-semver]: http://semver.org/

<!-- GIT: commit -->
[git-commit-angular]: https://gist.github.com/stephenparish/9941e89d80e2bc58a153
[git-commit-karma]: http://karma-runner.github.io/0.10/dev/git-commit-msg.html
[git-commit-conventional]: https://www.conventionalcommits.org/en/v1.0.0/
