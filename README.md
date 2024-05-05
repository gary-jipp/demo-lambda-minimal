# Demo AWS Lambda

Minimal single Lambda function delpoyment using GitHub Actions

- Create "lamda deploy" user in AWS IAM and add to a group with `AWSLambda_FullAccess` permissions
- Generate IAM Access Key for deployment user. Add to GitHub Secrets (see `main.yml`)
- Create lambda function `lambda-hello` in AWS Lambda
- Create AWS API Gateway API `GET`Method to consume Lambda `lambda-hello` function on request


# To run the Lambda function from CLI
```bash
aws lambda invoke \
  --function-name lambda-hello \
  --payload file://_test/event.json \
  --cli-binary-format raw-in-base64-out  \
  --output json  out.json ; \
  sed -e '1i -- Output --' -e '$a ------------' out.json ## show output to stdout
```