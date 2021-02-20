// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
  "aws_user_pools_web_client_id": "15q1pfp38ghji40l432psu7i1t",     // CognitoClientID
  "api_base_url": "https://uz66xeico1.execute-api.us-east-1.amazonaws.com/prod",                                     // TodoFunctionApi
  "cognito_hosted_domain": "mytodoappdemo-vr-sam.auth.us-east-1.amazoncognito.com",                   // CognitoDomainName
  "redirect_url": "https://master.d2xr3shu0skllf.amplifyapp.com"                                      // AmplifyURL
};

export default config;
