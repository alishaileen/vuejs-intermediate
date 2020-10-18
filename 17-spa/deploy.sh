set -e

yarn build

cd dist

git init
git add -A
git commit -m "deploy"
git branch -M main

git push -f git@github.com:alishaileen/alishaileen.github.io.git main:gh-pages

cd -