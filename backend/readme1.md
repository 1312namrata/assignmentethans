### type script

## init a type script
mkdir ts-playground && cd ts-playground
npm init -y
npm install typescript --save-dev
npx tsc --init  # creates tsconfig.json

## to run 
npx tsc
node index.js

## to generate code snippets in nest app
nest g module user
nest g service user
nest g controller user
