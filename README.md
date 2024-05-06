# Demo AWS Lambda

Minimal single Lambda function delpoyment using GitHub Actions

- Create "lamda deploy" user in AWS IAM and add to a group with `AWSLambda_FullAccess` permissions
- Generate IAM Access Key for deployment user. Add to GitHub Secrets (see `main.yml`)
- Create lambda function `lambda-hello` in AWS Lambda
- Create AWS API Gateway API `GET`Method to consume Lambda `lambda-hello` function on request

## Deploy API & Function Manually

### Create a role that can manage and execute Lambda Functions
```bash
aws iam create-role \
--role-name <role-name> \
--assume-role-policy-document file://lambda-role.json
```
### Attach the AWSLambdaRole managed policy to the role
```bash
aws iam attach-role-policy  \
--role-name <role-name>  \
--policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaRole
```
or

### Add Invoke policy to the role (from file)
```bash
aws iam put-role-policy \
--role-name <role-name> \
--policy-name LambdaInvokePolicy \
--policy-document file://invoke-policy.json
```

### Run the Lambda function from CLI
```bash
aws lambda invoke \
--function-name lambda-hello \
--payload file://_test/event.json \
--cli-binary-format raw-in-base64-out  \
--output json  out.json ; \
sed -e '1i -- Output --' -e '$a ------------' out.json ## show output to stdout
```

### Create an API Gateway
```bash
aws apigateway create-rest-api \
--name "" \
--region ca-central-1 \
--output json
```

### Create a Resource (New API Gateway will already have a "/" path by default)
```bash
aws apigateway create-resource \
--rest-api-id <api-id> \
--path-part "myresource" \
--region <your-region> \
--output json
```

### Add a Method for the Resource
```bash
aws apigateway put-method \
--rest-api-id  <api-id> \
--resource-id <resource-id> \
--http-method GET \
--authorization-type "NONE" \
--region <your-region>
```

### Set a Lambda Integration to this method (using proxy integration)
```bash
aws apigateway put-integration \
--rest-api-id <rest-api-id> \
--resource-id <resource-id> \
--http-method GET \
--type AWS_PROXY \
--integration-http-method POST \
--uri arn:aws:apigateway:<region>:lambda:path/2015-03-31/functions/<lambda-arn>/invocations \
--region <your-region> \
--output json
```

### Deploy API
```bash
aws apigateway create-deployment  \
--rest-api-id icim2g3a83  \
--stage-name <stage-name> \
--region <your-region>
```
