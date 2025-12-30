# Full Stack open CI/CD

This repository is used for the CI/CD module of the Full stack open course.

## CI/CD Pipeline

### Workflow Jobs

1. **`build_and_test`** - Runs on PRs and pushes:
   - Linting, building, unit tests, e2e tests (Playwright)

2. **`version_and_deploy`** - Runs only on pushes to `main`:
   - Calculates version from commit messages (using [github-tag-action](https://github.com/anothrNick/github-tag-action))
   - Updates `package.json` and creates release commit
   - Creates git tag pointing to release commit
   - Deploys to production ([Render](https://render.com/))

### Automated Versioning

When a PR is merged to `main`, the version is automatically bumped based on the **merge commit message**:

- `#major` - `1.0.0` → `2.0.0`
- `#minor` - `1.0.0` → `1.1.0`
- `#patch` - `1.0.0` → `1.0.1` (default)
- `#skip` - Skip version bump

**Example:** `Merge pull request #123 from feature-branch\n\nAdd new feature #minor`

Git tags are the source of truth; `package.json` is synced automatically. The `/version` endpoint of the production application returns the current version from `package.json`.

```json
{
  "version": "1.0.0"
}
```

Only semantic versioning bumps are supported. Arbitrary version setting through the workflow is not supported, but manually created git tags will be respected and `package.json` will sync to match them.
