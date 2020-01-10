git checkout -b "bump-version-to-test"
git add test.sh
git commit -n -F - <<EOF
Bump version to ${BUMPED_VERSION}
[skip cd]
EOF
  git push -u origin HEAD
  git checkout master
  hub pull-request -a "$(git config --global user.name | cut -d "(" -f 2 | cut -d ")" -f 1)" -F - <<EOF
Bump version to test
EOF