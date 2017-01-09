variable "apex_function_alexa-test" {}

resource "aws_lambda_permission" "allow_alexa_skill" {
    statement_id = "1234"
    action = "lambda:InvokeFunction"
    function_name = "${var.apex_function_alexa-test}"
    principal = "alexa-appkit.amazon.com"
}