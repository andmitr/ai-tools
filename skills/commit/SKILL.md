---
name: commit
description: Generate descriptive commit messages by analyzing git diffs. Use when the user asks for help writing commit messages or reviewing staged changes.
---

Your task is to create commit message text for current project changes. You must provide the user with the commit message text in your response. Do not create the commit itself - you only need to generate the message text and give it to the user.

## Algorithm for creating commit message

1. Execute the shell command `git diff` to find out what changes were made to the project since the last commit. You must compose the commit message based on the difference between the current project state and the state at the time of the last commit, meaning compose the commit message based on changes obtained from `git diff`.
2. Compose the commit message according to the rules and template specified below.
3. Check whether all changes in the project are reflected in your commit message text, whether the commit type is chosen correctly, and whether the formatting/styling of your text is correct. If something is wrong - fix it immediately.
4. Give the user the final commit message text in the response, in the chat. DO NOT execute the commit yourself - you are prohibited from running the `git commit` command. You must only provide the text to the user.

## General rules 
- Commit messages must be **in English**.
- Header must be **lowercase**, **without a period (.)**.
- Header length ≤ 100 characters (preferably ≤ 50).
- Description starts with a **present-tense verb**: add, update, improve, remove (not added, updates).

## Format
```text
<type>(<scope>): <description>

<body>

<footer>
```
Use <scope> only when necessary, for example for projects consisting of multiple parts, repositories consisting of several separate modules, libraries, etc. The scope should indicate the specific part of the project to which the changes relate. It is prohibited to specify concrete files or functions there - it should be exactly a scope, meaning a part of the project, folder, module, package, etc.

Use <body> only if an explanation of what is written in the commit header is required. If everything is already clear from the header, this section is not needed. For simple changes like "update documentation" or "add function", no explanation is required. Explanations are only needed when something is not clear from the commit header and requires clarification. Format entries in this section using the same rules as for BREAKING CHANGE - use the same Types of changes and group changes by type.

Use <footer> only when there is a BREAKING CHANGE. This section is only for BREAKING CHANGE.

### Commit types 
- **feat** – a new feature
- **fix** – bug fixes
- **refactor** – code changes that neither fix bugs nor add features
- **test** – anything related to testing
- **style** – formatting or typo fixes without changing logic
- **docs** – documentation-only changes
- **perf** – performance improvements
- **build** – build system or dependency-related changes
- **ci** – CI configuration changes

If you are NOT 100% certain which type applies to the changes being committed, do NOT guess, omit the type and scope entirely (write without the `type(scope):` prefix in this case).

**BREAKING CHANGE (major changes)** 
- Must be in the **footer**, starting with `BREAKING CHANGE:`
- Indicates backward-incompatible changes.
- Can appear in any commit type.
- Format:
```text
BREAKING CHANGE: short summary

Detailed explanation here.
```

### Rules for detailed BREAKING CHANGE description

When there is a BREAKING CHANGE section, the detailed explanation should be created according to the rules specified below.

### Guiding Principles
- Changelogs are for humans, not machines.
- There should be an entry for every single version.
- The same types of changes should be grouped.
- Versions and sections should be linkable.
- The latest version comes first.
- The release date of each version is displayed.
- Mention whether you follow Semantic Versioning.

### Types of changes
- Added for new features.
- Changed for changes in existing functionality.
- Deprecated for soon-to-be removed features.
- Removed for now removed features.
- Fixed for any bug fixes.
- Security in case of vulnerabilities.

### Example BREAKING CHANGE section
```text
BREAKING CHANGE: short summary

Added

- **configs/.zshrc**: `glp` alias - pretty git log with colored graph output
- **.zfunc**: `fn_release` - automate git release workflow (commit, tag, push)

Changed

- **README.md**: Reorganized documentation structure
```

### Examples

**Feature commit:**
```
feat(auth): add JWT authentication

Implement JWT-based authentication system with:
- Login endpoint with token generation
- Token validation middleware
- Refresh token support
```

**Bug fix:**
```
fix(api): handle null values in user profile

Prevent crashes when user profile fields are null.
Add null checks before accessing nested properties.
```

**Refactor:**
```
refactor(database): simplify query builder

Extract common query patterns into reusable functions.
Reduce code duplication in database layer.
```

## Analyzing changes

Review what's being committed:

```bash
# Show files changed
git status

# Show detailed changes
git diff --staged

# Show statistics
git diff --staged --stat

# Show changes for specific file
git diff --staged path/to/file
```

## Commit message guidelines

**DO:**
- Use imperative mood ("add feature" not "added feature")
- Keep first line under 50 characters
- Capitalize first letter
- No period at end of summary
- Explain WHY not just WHAT in body

**DON'T:**
- Use vague messages like "update" or "fix stuff"
- Include technical implementation details in summary
- Write paragraphs in summary line
- Use past tense

## Multi-file commits

When committing multiple related changes:

```
refactor(core): restructure authentication module

- Move auth logic from controllers to service layer
- Extract validation into separate validators
- Update tests to use new structure
- Add integration tests for auth flow

Breaking change: Auth service now requires config object
```

## Scope examples

**Frontend:**
- `feat(ui): add loading spinner to dashboard`
- `fix(form): validate email format`

**Backend:**
- `feat(api): add user profile endpoint`
- `fix(db): resolve connection pool leak`

**Infrastructure:**
- `chore(ci): update Node version to 20`
- `feat(docker): add multi-stage build`

## Breaking changes

Indicate breaking changes clearly:

```
feat(api)!: restructure API response format

BREAKING CHANGE: All API responses now follow JSON:API spec

Previous format:
{ "data": {...}, "status": "ok" }

New format:
{ "data": {...}, "meta": {...} }

Migration guide: Update client code to handle new response structure
```

## Template workflow

1. **Review changes**: `git diff --staged`
2. **Identify type**: Is it feat, fix, refactor, etc.?
3. **Determine scope**: What part of the codebase?
4. **Write summary**: Brief, imperative description
5. **Add body**: Explain why and what impact
6. **Note breaking changes**: If applicable

## Interactive commit helper

Use `git add -p` for selective staging:

```bash
# Stage changes interactively
git add -p

# Review what's staged
git diff --staged

# Commit with message
git commit -m "type(scope): description"
```

## Amending commits

Fix the last commit message:

```bash
# Amend commit message only
git commit --amend

# Amend and add more changes
git add forgotten-file.js
git commit --amend --no-edit
```

## Best practices

1. **Atomic commits** - One logical change per commit
2. **Test before commit** - Ensure code works
3. **Reference issues** - Include issue numbers if applicable
4. **Keep it focused** - Don't mix unrelated changes
5. **Write for humans** - Future you will read this

## Commit message checklist

- [ ] Type is appropriate (feat/fix/docs/etc.)
- [ ] Scope is specific and clear
- [ ] Summary is under 50 characters
- [ ] Summary uses imperative mood
- [ ] Body explains WHY not just WHAT
- [ ] Breaking changes are clearly marked
- [ ] Related issue numbers are included
