---
title: Gitlab NPM CI/CD Integration
date: 2023-07-28
image: "./mj-1.png"
imageAlt: Cozy image that i've created with MJ.
---

<figure style="margin: 0; margin-bottom: 32px;">
  <img src="./mj-5.png" alt="A cozy image from Midjourney" title="A cozy image from Midjourney" >
    <figcaption>
      <i style="display: flex; justify-content: flex-end; font-size: 12px; color: var(--theme-ui-colors-muted);">An image from Midjourney.</i>
    </figcaption>
</figure>

This post documents two auto npm package publishing mechanisms. The first one creates a version for each commit, which is primarily for testing purposes. The second mechanism creates a version with each merge.

- **Per Commit Version:** When a new commit is made to any branch, it creates a new npm version using the short form of the commit ID, e.g., `0.0.0-experimental-2ff846d10`. This version can be easily accessed and consumed by other projects.
- **Merge Version:** When a merge happens to the protected branches (`main` and `release/vX.Y`):
  - The script in pipeline checks the version in `package.json`. If there's a new version, it creates the build and publishes it.
  - If no version update occurred in `package.json`, the `npm publish` command will not be triggered and the pipeline will not break. (By default, if you try to create an existing version, the npm command fails with exit code 1, which breaks the CI pipeline.)

## Creating a NPM Release for Each Commit

There are two scripts defined in below `yml`. 1st one is just creating build for storybook which is really part of this post. A new version is created with commit ID in the 2nd script after the build. This process triggered for every commit on every branch.

```yml
build:
  stage: build
  image: node:14
  script:
    # Install packages, ci option ensures that install will be loyal
    # to package-lock.json
    - npm ci
    # Runs storybook build (defined in package.json)
    - npm run build-storybook -o ./build
    # Lists the files in the current directory with details
    - ls -la
    # Lists the files in the build directory with details
    - ls -la build
  script:
    # Change to package folder
    - cd package
    # Install packages again, this is for package folder,
    # previous one for storybook
    - npm ci
    # If you have any post-install process, leave it here
    # (defined in package.json)
    - npm run prepare
    # our build script triggered (defined in package.json)
    - npm run build:lib
    # Create version with commit id
    # Use 0.0.0 to not break semantic versioning
    - npm version "0.0.0-experimental-${CI_COMMIT_SHORT_SHA}"
    # Public npm registry used, it can be your company's registry
    # server as well. If you're using internal registry server,
    # you may wanna below setting:
    #     - npm config get registry
    - echo "registry=https://registry.npmjs.org" > .npmrc
    # Define the NPM_TOKEN as a secret environment variable in
    # your GitLab project CI/CD settings.
    - echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> .npmrc
    - npm publish
  artifacts:
    paths:
      - build/
      - package/dist
    expire_in: 7 day
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/
```

## Creating NPM release with merge (to main or release/vX.Y branches)

If new version defined in `package.json`, the version created in npm after merge (`main` or `release/vX.Y`).

```yml
npm-publish:
  stage: npm-publish
  image: node:14
  script:
    - cd package
    # Install packages, ci option ensures that install will be loyal
    # to package-lock.json
    - npm ci
    # If you have any post-install process, leave it here
    # (defined in package.json)
    - npm run prepare
    # our build script triggered (defined in package.json)
    - npm run build:lib
    # Public npm registry used, it can be your company's registry
    # server as well. If you're using internal registry server,
    # you may wanna below setting:
    #     - npm config get registry
    - echo "registry=https://registry.npmjs.org" > .npmrc
    # Define the NPM_TOKEN as a secret environment variable in
    # your GitLab project CI/CD settings.
    - echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> .npmrc
    # If no version update, no need to create (script is shared below)
    - npm run publish:if-version-not-exists
  artifacts:
    # leave anything you wanna investigate or download later here
    paths:
      - package/dist/
    expire_in: 7 day
  only:
    # Process will be triggered when merge happens
    # to main or release/vX.Y branch.
    # You may arrenge this according to your Git flow.
    - /^release\/v.*$/
    - main
```

### Script for publish

Below script checks if new version defined in `package.json`, if so it attemps to publish. Script call is defined in `package/package.son` and triggered by pipeline with `npm run publish:if-version-not-exists`.

```js
import { exec } from "child_process"
import fs from "fs"

// Read package.json and get current version
const packageJson = JSON.parse(
  fs.readFileSync("./package.json", "utf-8")
)
const packageName = packageJson.name
const currentVersion = packageJson.version

// Use npm view command to fetch the versions
exec(
  `npm view ${packageName} versions --json`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing npm view: ${error}`)
      process.exit(1)
    }

    if (stderr) {
      console.error(`Error in npm view: ${stderr}`)
      // INFO: not necesarily exit status 1
      // process.exit(1);
    }

    // Parse versions from output
    const publishedVersions = JSON.parse(stdout)
    const isAlreadyPublished =
      publishedVersions.includes(currentVersion)
    if (isAlreadyPublished) {
      console.log(
        `Version ${currentVersion}`,
        `of package ${packageName} is already published.`
      )
      process.exit(0)
    } else {
      console.log(
        `Version ${currentVersion}`,
        `of package ${packageName} is not published yet.`,
        `Attempting to publish...`
      )
      exec(`npm publish`, (error, stdout, stderr) => {
        if (error) {
          console.error(
            `Error executing npm publish: ${error}`
          )
          process.exit(1)
        }

        if (stderr) {
          console.error(`Error in npm publish: ${stderr}`)
          // INFO: not necesarily exit status 1
          // process.exit(1);
        }

        console.log(
          "Successfully published the package",
          stdout
        )
      })
    }
  }
)
```
