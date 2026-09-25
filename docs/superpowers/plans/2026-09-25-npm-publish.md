# npm publish implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish `portal-bits` `0.4.0` to the public npm registry, then stage later releases from GitHub Actions for a maintainer to approve.

**Architecture:** The package stays source-shipped. `npm run package` writes `dist/`, and npm ships only that directory. Svelte and Bits UI stay peers. The first publish is a maintainer session with interactive two-factor authentication, because a package must already exist before it can be staged and before a trusted publisher can be attached. Later GitHub Releases run `npm stage publish` with OpenID Connect. A maintainer reviews that staged tarball and approves it with two-factor authentication before the version is public. No long-lived npm publish token is stored in GitHub.

**Tech Stack:** npm registry `https://registry.npmjs.org`, Node 22.14.0 or newer, npm CLI 11.15.0 or newer and below 12, GitHub Actions hosted runners, `@sveltejs/package`.

## Global Constraints

- Package name is the unscoped `portal-bits`. Registry is `https://registry.npmjs.org`.
- `svelte` and `bits-ui` stay peer dependencies. [ADR 0004](../../decisions/0004-svelte-and-bits-ui-as-peers.md) records why.
- `files` stays `["dist"]`. The gallery, demo content, and deployment stay out of the tarball.
- `repository.url` stays `git+https://github.com/AddeyX/portal-bits.git`. Trusted publishing checks this value against `AddeyX/portal-bits`.
- The repository stays public. Provenance is generated only for a public package published from a public repository.
- The publish job uses npm 11 at or above 11.15.0, the [staged publishing](https://docs.npmjs.com/staged-publishing) CLI floor. It stays below npm 12. [npm v12](https://github.blog/changelog/2026-07-08-npm-install-time-security-and-gat-bypass2fa-deprecation/) turns `allowScripts` off, and this install needs dependency lifecycle scripts such as esbuild's.
- CI submits with `npm stage publish`. A maintainer approves with `npm stage approve <stage-id>` or the Staged Packages tab on npmjs.com. Approval requires two-factor authentication. `npm stage publish` itself does not.
- The trusted publisher for `publish.yml` is allowed to run `npm stage publish`. Direct `npm publish` from that workflow stays off.
- Create no `NPM_TOKEN` secret. Trusted-publisher setup uses an interactive two-factor session. See the [8 July 2026 changelog](https://github.blog/changelog/2026-07-08-npm-install-time-security-and-gat-bypass2fa-deprecation/).
- Trusted publisher setup follows [npm's trusted publishers docs](https://docs.npmjs.com/trusted-publishers). The workflow filename configured on npmjs.com is `publish.yml`.
- The release tag and `main` are the same commit. The workflow also checks out `github.event.release.tag_name`.

---

### Task 1: Commit the registry and name change already staged

**Files:**

- Modify: staged `package.json`, `package-lock.json`, `.github/workflows/publish.yml`, deleted `.npmrc`, and the docs already in the index
- Create: `docs/decisions/0003-publish-to-npm.md`, `docs/decisions/0004-svelte-and-bits-ui-as-peers.md`

**Interfaces:**

- Consumes: the staged working tree on `main`
- Produces: a commit on `main` whose `package.json` `name` is `portal-bits` and whose `publishConfig.registry` is `https://registry.npmjs.org`

- [x] **Step 1: Confirm the staged set**

Run:

```bash
git status -sb
```

Expected: `main` ahead of `origin/main`, with the npm registry edits staged and no unstaged edits.

- [x] **Step 2: Commit**

```bash
git commit -m "$(cat <<'EOF'
feat: publish portal-bits to the public npm registry

Consumers install the unscoped package from registry.npmjs.org. Svelte and Bits UI stay peers.
EOF
)"
```

Expected: the commit succeeds and `git status -sb` shows a clean tree, still ahead of `origin/main`.

### Task 2: Mark 0.4.0 and switch the workflow to staged publishing

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json` (root `version` only)
- Modify: `CHANGELOG.md`
- Modify: `.github/workflows/publish.yml`
- Modify: `docs/decisions/0003-publish-to-npm.md`

**Interfaces:**

- Consumes: Task 1 commit. `package.json` name `portal-bits`.
- Produces: version `0.4.0`, `"license": "MIT"`, and a workflow that runs `npm stage publish` with `id-token: write` and no `NODE_AUTH_TOKEN`.

- [x] **Step 1: Set the license and version**

In `package.json`, add the license beside the existing version and set the version:

```json
"version": "0.4.0",
"license": "MIT",
```

Run:

```bash
npm version 0.4.0 --no-git-tag-version --allow-same-version
```

Expected: `package.json` and the root `package-lock.json` entries say `0.4.0`. If `npm version` refuses a dirty tree, set both root `"version"` fields to `0.4.0` by hand and leave every dependency version untouched. Then confirm the license field is still present.

- [x] **Step 2: Move the changelog notes**

Replace the Unreleased heading with an empty Unreleased section and a dated 0.4.0 section. Keep the existing Added, Fixed, Removed, and Changed notes under 0.4.0. Use the release date if it is not 25 September 2026.

```markdown
## [Unreleased]

## [0.4.0] - 2026-09-25
```

- [x] **Step 3: Replace the workflow**

Write `.github/workflows/publish.yml`:

```yaml
name: Publish package

on:
  release:
    types: [published]

permissions:
  contents: read
  id-token: write

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.event.release.tag_name }}

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          registry-url: https://registry.npmjs.org

      - name: Use npm 11.15 or newer
        run: npm install -g npm@^11.15.0

      - name: Install dependencies
        run: npm ci

      - name: Build the library
        run: npm run package

      - name: Skip a version that is already on npm
        id: published
        run: |
          VERSION=$(node -p "require('./package.json').version")
          if npm view "portal-bits@${VERSION}" version >/dev/null 2>&1; then
            echo "portal-bits@${VERSION} is already on npm"
            echo "skip=true" >> "$GITHUB_OUTPUT"
          else
            echo "portal-bits@${VERSION} is not on npm"
            echo "skip=false" >> "$GITHUB_OUTPUT"
          fi

      - name: Stage the package
        if: steps.published.outputs.skip != 'true'
        run: npm stage publish
```

`id-token: write` is the OIDC permission from the [trusted publishers guide](https://docs.npmjs.com/trusted-publishers). `npm stage publish` is the submit step in [staged publishing](https://docs.npmjs.com/staged-publishing). npm `^11.15.0` meets that CLI floor and still runs install scripts. The skip step lets the 0.4.0 GitHub Release succeed after the manual first publish, because that version is already public and must not be staged again.

- [x] **Step 4: Record staged publishing in ADR 0003**

Replace the release sentence in `docs/decisions/0003-publish-to-npm.md`:

```markdown
Publish when a GitHub Release is published. The workflow stages the package with `npm stage publish` and npm trusted publishing. A maintainer approves that staged package with two-factor authentication before it is public. The first publish is a direct `npm publish`, because a package must already exist before it can be staged.
```

Replace the publishing consequence:

```markdown
Publishing needs an npm account. The maintainer publishes the first version with interactive two-factor authentication, then authorizes `.github/workflows/publish.yml` to run `npm stage publish`. Later releases become public only after `npm stage approve` or an approval on the Staged Packages tab.
```

- [x] **Step 5: Verify**

Run:

```bash
node -p "require('./package.json').version + ' ' + require('./package.json').license"
npm test
npm run check
npm run format:check
npm run package
```

Expected: `0.4.0 MIT`, tests pass, svelte-check reports 0 errors and 0 warnings, Prettier reports no issues, and `dist/index.js` exists.

- [x] **Step 6: Commit**

```bash
git add package.json package-lock.json CHANGELOG.md .github/workflows/publish.yml docs/decisions/0003-publish-to-npm.md
git commit -m "$(cat <<'EOF'
chore: prepare portal-bits 0.4.0 for staged publishing

The release workflow submits the tarball with GitHub OIDC. A maintainer approves it before the version is public.
EOF
)"
```

Maintainer steps from here on are in [the publish guide](../../guides/publish-the-package.md).

### Task 3: Push main

**Files:**

- None

**Interfaces:**

- Consumes: Task 2 commit on `main`
- Produces: `origin/main` containing `publish.yml` with `id-token: write`. GitHub reads the workflow from the default branch.

- [ ] **Step 1: Push**

```bash
git push -u origin HEAD
```

Expected: `origin/main` includes the Task 2 commit. `git status -sb` no longer says the branch is ahead.

### Task 4: Publish 0.4.0 once, with interactive two-factor authentication

**Files:**

- None

**Interfaces:**

- Consumes: Task 2 commit, checked out locally. `dist/` from `npm run package`.
- Produces: `portal-bits@0.4.0` on `https://registry.npmjs.org`. [Staged publishing](https://docs.npmjs.com/staged-publishing) cannot create this first version.

This task is a maintainer action. An agent cannot complete the two-factor prompt.

- [ ] **Step 1: Log in on the maintainer machine**

```bash
npm login
npm whoami
```

Expected: `npm whoami` prints the npm user who will own `portal-bits`. Approve the login with two-factor authentication. Do not copy a token into the repository or into a GitHub secret.

- [ ] **Step 2: Publish**

From a clean Task 2 checkout:

```bash
npm run package
npm publish
```

Expected: npm asks for two-factor authentication and then prints `+ portal-bits@0.4.0`.

Confirm against the public registry from outside this repository:

```bash
cd /tmp && npm view portal-bits version --registry https://registry.npmjs.org
```

Expected: `0.4.0`.

### Task 5: Authorize the GitHub workflow on npm

**Files:**

- None

**Interfaces:**

- Consumes: `portal-bits@0.4.0` from Task 4
- Produces: a trusted publisher on that package for GitHub Actions

Do this in the browser while logged in with two-factor authentication. The [8 July 2026 changelog](https://github.blog/changelog/2026-07-08-npm-install-time-security-and-gat-bypass2fa-deprecation/) requires an interactive session for trusted-publisher changes.

- [ ] **Step 1: Open the package settings**

Open `https://www.npmjs.com/package/portal-bits/access` and the Trusted Publisher section.

- [ ] **Step 2: Add the GitHub Actions publisher**

Enter these values exactly:

- Organization or user: `AddeyX`
- Repository: `portal-bits`
- Workflow filename: `publish.yml`
- Allowed action: `npm stage publish`

Leave the environment name empty. Leave direct `npm publish` unselected for this publisher. The workflow's job is to stage the tarball. Approval is the separate maintainer step in Task 6.

- [ ] **Step 3: Create the GitHub Release**

The tag must point at the Task 2 commit, which is the tip of `main`.

```bash
git tag v0.4.0
git push origin v0.4.0
gh release create v0.4.0 --title "v0.4.0" --notes "See CHANGELOG.md."
```

Expected: the Publish package workflow runs on a GitHub-hosted runner. The log says `portal-bits@0.4.0 is already on npm`, and the job succeeds without publishing again.

### Task 6: Stage the next version, then approve it

**Files:**

- Modify: `package.json`, `package-lock.json`, `CHANGELOG.md` when the next version exists

**Interfaces:**

- Consumes: the trusted publisher from Task 5, allowed to run `npm stage publish`
- Produces: a staged tarball for the new version, then a public version after two-factor approval. No local `npm publish`, and no `NPM_TOKEN`.

- [ ] **Step 1: Bump, push, and release**

Set the new version in `package.json` and the root `package-lock.json` entries. Move the Unreleased changelog notes under that version. Commit and push `main`. Tag that same commit and publish the release:

```bash
git push origin HEAD
git tag vX.Y.Z
git push origin vX.Y.Z
gh release create vX.Y.Z --title "vX.Y.Z" --notes "See CHANGELOG.md."
```

Replace `vX.Y.Z` with the version just committed, including in the tag name and the release title.

Expected: the workflow log says `portal-bits@X.Y.Z is not on npm`, and `npm stage publish` succeeds through OIDC. `npm view portal-bits@X.Y.Z` still fails, because a staged version is not public yet.

- [ ] **Step 2: Approve the staged package**

On the maintainer machine, after `npm login`:

```bash
npm stage list portal-bits
npm stage view STAGE_ID
npm stage approve STAGE_ID
```

Replace `STAGE_ID` with the id from `npm stage list`. Approval prompts for two-factor authentication. The same approval is the Approve button on the Staged Packages tab at npmjs.com.

Expected: `npm view portal-bits@X.Y.Z --registry https://registry.npmjs.org` prints that version.

If `npm stage publish` fails with `ENEEDAUTH`, compare the trusted publisher fields with `AddeyX`, `portal-bits`, and `publish.yml`. Those fields are case-sensitive, and npm checks them only when the workflow stages the package.
