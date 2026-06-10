#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install npm dependencies
npm install

# Install the Chromium browser for Puppeteer
npx puppeteer browsers install chrome
