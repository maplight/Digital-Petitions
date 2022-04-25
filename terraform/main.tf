terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"

  backend "s3" {
    encrypt = true
    # cannot contain interpolations
    bucket         = "esignatures-terraform-state-storage" // REPLACE WITH UNIQUE BUCKET NAME THIS CAN NOT BE A VARIABLE
    dynamodb_table = "terraform-state-lock"
    key            = "terraform-state/terraform.tfstate"
  }
}

provider "aws" {
  profile = "default"
  region  = "us-west-2"
}

resource "aws_s3_bucket" "esignatures_s3_bucket" {
  bucket = var.site_bucket  // REPLACE WITH UNIQUE BUCKET NAME
  acl    = var.acl

  website {
    error_document = "error.html"
    index_document = "index.html"
  }
  tags = var.tags
}

resource "aws_s3_bucket_policy" "esignatures_bucket_policy" {
  bucket = aws_s3_bucket.esignatures_s3_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Id      = var.bucket_policy_id
    Statement = [
      {
        Sid       = "PublicRead"
        Effect    = "Allow"
        Principal = "*"
        Action = [
          "s3:GetObject"
        ],
        Resource = [
          aws_s3_bucket.esignatures_s3_bucket.arn,
          "${aws_s3_bucket.esignatures_s3_bucket.arn}/*",
        ]
      },
    ]
  })
}

resource "aws_iam_user" "esignatures_application_user" {
  name = var.application_user_name

  tags = var.tags
}

resource "aws_iam_access_key" "esignatures_application_user_key" {
  user = aws_iam_user.esignatures_application_user.name
}
resource "aws_iam_user_policy" "esignatures_application_user_policy" {
  name = var.application_user_policy_name
  user = aws_iam_user.esignatures_application_user.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:ListBucket",
          "s3:GetBucketLocation"
        ],
        Effect   = "Allow"
        Resource = aws_s3_bucket.esignatures_s3_bucket.arn
      },
      {
        Action = ["s3:PutObject", "s3:PutObjectACL"]
        Effect = "Allow"
        Resource = [
          "${aws_s3_bucket.esignatures_s3_bucket.arn}/*",
        ]
      },
    ]
  })
}

resource "aws_cloudfront_distribution" "esignatures_cloudfront_dist" {
  origin {
    domain_name = aws_s3_bucket.esignatures_s3_bucket.bucket_regional_domain_name
    origin_id   = var.cloudfront_origin_id
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = var.cloudfront_comment
  default_root_object = "index.html"

  aliases = var.cloudfront_aliases # update once DNS and cert created
  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = var.cloudfront_target_origin_id
    viewer_protocol_policy = "redirect-to-https"
    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }


  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  tags = var.tags
  viewer_certificate { // for use with CloudFront certs have to be in us-east-1 NOTE --- move cert creation to module
    cloudfront_default_certificate = false
    acm_certificate_arn            = "arn:aws:acm:us-east-1:478471386447:certificate/1f6065dc-50e6-449e-b721-130a221e61e4"
    ssl_support_method             = "sni-only"
  }
  #NOTE -- make DNS part of this / own module eventually.
}
