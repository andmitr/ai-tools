---
name: changelog-updater
description: "Use when the user says 'update changelog', 'refresh changelog', 'create changelog', 'update CHANGELOG.md', 'write changelog', 'release notes', 'new release', 'release changelog', 'prepare release' or mentions updating CHANGELOG.md, changelog, or the CHANGELOG file. Use ONLY when the task is to update the CHANGELOG.md file for a new release - not for general project documentation or README changes."
---

# Changelog Updater

Update the contents of the `CHANGELOG.md` file in the project root based on changes made to the project. The user writes in this file only the changes that will go into the current release. You must clear the old CHANGELOG.md and compose a new one using the template below.

## Workflow

### Step 1: Determine the release version

The release version is specified by the user in their command. If you do not see a version in the user's message (e.g., `v2.0.0`), ask what the release version will be before proceeding.

Version format: SemVer — e.g., `v2.0.0`, `v1.5.3`.

### Step 2: Determine the project name

The project name corresponds to the name of the root folder of the project. You can also determine it via:

```bash
git remote -v
```

Example output: `origin	git@github.com:andmitr/obsidian.git` — here `obsidian` is the project name. The username is always **andmitr**.

### Step 3: Determine the release date

Run the following command to get today's date:

```bash
date
```

Format the date as `YYYY-MM-DD` (e.g., `2026-02-26`).

### Step 4: Identify changes

Run `git diff` to see the diff between the last commit and the current state of the project:

```bash
git diff HEAD
```

Also check untracked files:

```bash
git status
```

All changes you see (modified, added, deleted files) must be documented in CHANGELOG.md.

### Step 5: Generate the CHANGELOG.md

Write the file to `CHANGELOG.md` in the project root using the exact template below.

## Template

```markdown
# Changelog

## [$current_version] - $release_date

... changelog text ...

[$current_version]: https://github.com/andmitr/$project_name/releases/tag/$current_version
```

Where:
- `$current_version` — the version of the upcoming release (e.g., `v2.0.0`)
- `$release_date` — today's date in `YYYY-MM-DD` format
- `$project_name` — the project name from `git remote -v` or the root folder name
- `... changelog text ...` — the changes found via `git diff`, formatted using the rules below

## Changelog Formatting Rules

### Guiding Principles
- Changelogs are for humans, not machines.
- There should be an entry for every single version.
- The same types of changes should be grouped.
- Versions and sections should be linkable.
- The latest version comes first.
- The release date of each version is displayed.
- Mention whether you follow Semantic Versioning.

### Types of Changes
- **Added** — for new features.
- **Changed** — for changes in existing functionality.
- **Deprecated** — for soon-to-be removed features.
- **Removed** — for now removed features.
- **Fixed** — for any bug fixes.
- **Security** — in case of vulnerabilities.

### Entry Format
Each entry should reference the specific file(s) that were changed and a brief description of what was done, matching the style from the example below.

## Example

Input: `git diff HEAD` shows new aliases and functions added to `.zshrc` and `.zfunc`, plus README restructuring.

Output:

```markdown
# Changelog

## [2.1.0] - 2026-02-26

### Added

- **configs/.zshrc**: `glp` alias - pretty git log with colored graph output
- **.zfunc**: `fn_release` - automate git release workflow (commit, tag, push)

### Changed

- **README.md**: Reorganized documentation structure

[2.1.0]: https://github.com/andmitr/ArchLinux-utility-belt/releases/tag/v2.1.0
```
