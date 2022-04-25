variable "site_bucket" {
  type = string
}

variable "acl" {
  type = string
  default = "public-read"
}

variable "tags" {
  type = map()
  default = {}
}

variable "bucket_policy_id" {
  type = string
}

variable "application_user_name" {
  type = string
}

variable "application_user_policy_name" {
  type = string
}

variable "cloudfront_origin_id" {
  type = string
}

variable "cloudfront_comment" {
  type = string
  default = "CF distribution for the digital petitions front end."
}

variable "cloudfront_aliases" {
  type = list(string)
  default = none
}

variable "cloudfront_target_origin_id" {
  type = string
}
