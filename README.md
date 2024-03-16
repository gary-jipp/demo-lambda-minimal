# Demo AWS Lambda

Minimal single Lambda function delpoyment using GitHub Actions

- Create "lamda deploy" user in AWS IAM and add to a group with `AWSLambda_FullAccess` permissions
- Generate IAM Access Key for deployment user. Add to GitHub Secrets (see `main.yml`)
- Create lambda function `hello1` in AWS Lambda
- Create AWS API Gateway API `GET`Method to consume Lambda `hello1` function on request
