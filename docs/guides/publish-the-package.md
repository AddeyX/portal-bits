# Publish the package

`.github/workflows/publish.yml` stages a release. These are the steps only a maintainer can do, and why each one exists.

The package name is `portal-bits`. The first public version prepared in this repository is `0.4.0`. `svelte` and `bits-ui` stay peers.

## 1. Push `main`

```sh
git push -u origin HEAD
```

GitHub reads the workflow file from the default branch. The release job cannot stage a package until this push includes `.github/workflows/publish.yml`.

## 2. Log in to npm

```sh
npm login
npm whoami
```

Approve the login with two-factor authentication. This session is how you create the package and later approve staged versions. Keep the token on your machine. This repository has no `NPM_TOKEN` secret. A long-lived publish token is the credential the [8 July 2026 npm changelog](https://github.blog/changelog/2026-07-08-npm-install-time-security-and-gat-bypass2fa-deprecation/) is retiring, and trusted-publisher setup already requires an interactive two-factor prompt.

## 3. Publish `0.4.0` yourself

From a checkout of the `0.4.0` commit:

```sh
npm run package
npm publish
```

npm asks for two-factor authentication and then prints `+ portal-bits@0.4.0`.

[Staged publishing](https://docs.npmjs.com/staged-publishing) can submit a version only after the package already exists. Trusted publishing can be attached only after that too. This direct publish is the one-time way to create `portal-bits`.

Confirm it from outside this repository:

```sh
cd /tmp && npm view portal-bits version --registry https://registry.npmjs.org
```

The command prints `0.4.0`.

## 4. Authorize the GitHub workflow

Open the trusted publisher settings at `https://www.npmjs.com/package/portal-bits/access` while logged in with two-factor authentication.

Enter:

- Organization or user: `AddeyX`
- Repository: `portal-bits`
- Workflow filename: `publish.yml`
- Allowed action: `npm stage publish`

Leave the environment name empty. Leave direct `npm publish` unselected. The workflow's job is to submit a tarball. You approve it before anyone can install that version. npm checks these fields only when the workflow runs, and they are case-sensitive. This is the setup in [trusted publishing](https://docs.npmjs.com/trusted-publishers).

## 5. Publish the `v0.4.0` GitHub Release

The tag must point at the same commit as `main`.

```sh
git tag v0.4.0
git push origin v0.4.0
gh release create v0.4.0 --title "v0.4.0" --notes "See CHANGELOG.md."
```

A published release, including this one, starts the workflow. A draft does not. The job sees that `0.4.0` is already on npm and skips staging, so the release record exists and the version is not submitted twice.

## 6. Approve later releases

For the next version, bump `package.json` and the root `package-lock.json` version, move the Unreleased changelog notes under that version, commit, and push `main`. Tag that same commit and publish the GitHub Release.

The workflow checks out that tag, builds `dist/`, and runs `npm stage publish` with OpenID Connect. `id-token: write` lets GitHub mint a short-lived token for that run. The version is still private.

Then approve it:

```sh
npm stage list portal-bits
npm stage view STAGE_ID
npm stage approve STAGE_ID
```

Replace `STAGE_ID` with the id from `npm stage list`. Approval prompts for two-factor authentication. The Approve button on the Staged Packages tab at npmjs.com does the same thing.

`npm stage publish` needs no two-factor prompt. Approval does, because that is the moment the version becomes public. After approval, `npm view portal-bits@X.Y.Z` prints the new version.

If staging fails with `ENEEDAUTH`, compare the trusted publisher fields with `AddeyX`, `portal-bits`, and `publish.yml`.
