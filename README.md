# BestCommunityService
[Web Application](http://bcs.kirangautam.com) for Best Community Service (Non-Profit Organization)

## Stack
* React + Redux
* Docker
* AWS Lambda Function
* AWS ECS
* AWS SES

## How to run locally
npm install

npm start

## How to Run using Docker
docker-compose up -d 

http://localhost:3000/

## How to Deploy on ECS
$(aws ecr get-login --no-include-email --region us-east-1)

npm run docker-build

npm run docker-deploy



