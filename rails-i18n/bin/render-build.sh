#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
bundle exec rake db:migrate