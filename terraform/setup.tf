resource "aws_s3_bucket" "terraform_state_storage" {
  bucket = "esignatures-terraform-state-storage" //REPLACE WITH UNIQUE BUCKET NAME

  versioning {
    enabled = true
  }

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Application    = "esignatures" // REPLACE WITH ORGANIZATION SPECIFIC TAGGIN POLICIES
    Initiative     = "Maplight"
    Environment    = "PreProduction"
    PointOfContact = "NancieMcCraw"
    Sensitivity    = "NonSensitive"
  }

}

# create a DynamoDB table for locking the state file
resource "aws_dynamodb_table" "dynamodb-terraform_state_lock" {
  name         = "terraform-state-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Application    = "esignatures"
    Environment    = "PreProduction"
    Initiative     = "Maplight"
    PointOfContact = "NancieMcCraw"
    Sensitivity    = "NonSensitive"
  }
}
