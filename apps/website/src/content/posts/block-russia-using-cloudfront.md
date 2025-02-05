---
title: "Block traffic to your website from Russia and Belarus using CloudFront"
description: "We want to invite you all to block your website traffic from Russia and Belarus to show support for the Ukranian people. the following tutorial will help you to enable CloudFront Geographic Restrictions and block traffic."
createdAt: 1645837875000
updatedAt: 1645837875000
authors: ["david"]
category: "AWS"
editors: ["velimir"]
draft: false
abstract: "Russia invaded Ukraine on the 24th of February 2022. Belarus offers logistic support to the Russian army. This website won't be available in Russia and Belarus until the invasion stops. We don't intend to punish our readers from Russia and Belarus but to show dissatisfaction and disapproval of the political and philosophical stance of the Russian government. Our company and I are strong supporters and believers in individual liberty, free trade, and free association. In addition to being against war, we strongly oppose evil and destructive ideas that support autocracies. Make no mistake, this is not the doing of one man, but a joint effort of individuals who believe it is not you who should be deciding how to live your life. We want to invite you all to block your website traffic from Russia and Belarus to show support for the Ukranian people. the following tutorial will help you to enable CloudFront Geographic Restrictions and block traffic."
image: "/images/block-russia-using-cloudfront.jpg"
---

Russia invaded Ukraine on the 24th of February 2022. Belarus offers logistic support to the Russian army.

This website **won't be available in Russia and Belarus** until the invasion stops. We don't intend to punish our readers from Russia and Belarus but to show dissatisfaction and disapproval of the political and philosophical stance of the Russian government.

Our company and I are **strong supporters and believers** in **individual liberty, free trade, and free association**. In addition to being against war, we strongly oppose evil and destructive ideas that support autocracies. Make no mistake, **this is not the doing of one man**, but a joint effort of individuals who believe it is not you who should be deciding how to live your life.

We will continue doing as much as possible to show our support for the Ukrainian people and invite you all to do the same. If you use CloudFront as your CDN, the following tutorial will help you to **enable CloudFront Geographic Restrictions** and block traffic from Russia and Belarus.

If you are using any other CDN or a different provider, send us an email at [hello@crocoder.dev](mailto:hello@crocoder.dev). I will personally assist you in blocking traffic.

***

I will show you three ways to block traffic depending on how your CloudFront distribution is provisioned.

## Manually / AWS Console

Open [CloudFront Distributions](https://console.aws.amazon.com/cloudfront/v3/home) and choose the distribution.

![Cloudfront distributions page](/images/block-russia-using-cloudfront/step1.png)

Click on the `Geographic restrictions` tab. Click on edit button.

![Geographic restrictions tab opened](/images/block-russia-using-cloudfront/step2.png)

Check `Restriction type` - `Block list` and select from the dropdown Russia and Belarus. Click Save changes.

![Restriction type block list opened](/images/block-russia-using-cloudfront/step3.png)

You have just blocked all traffic from Russia and Belarus. All visitors from those locations will get 403 (Forrbidden) status code.

![Geographic restrictions page shows Russia and Belarus being blocked](/images/block-russia-using-cloudfront/step4.png)

## CloudFormation

If you are deploying the CloudFront via CloudFormation add this code to `Restrictions` in `CloudFrontDistribution` `Properties`. Use the following code snippet:

```bash
CloudFrontDistribution:
  Type: 'AWS::CloudFront::Distribution'
  Properties:
    DistributionConfig:
      ...
      Restrictions:
        GeoRestriction:
          Locations:
          - RU
          - BY
          RestrictionType: blacklist
```

## Terraform

You can easily add restrictions object to your `aws_cloudfront_distributions`. Use the following code snippet:

```bash
resource "aws_cloudfront_distribution" "website_distribution" {
  ...
  restrictions {
    geo_restriction {
      restriction_type = "blacklist"
      locations        = ["RU", "BY"]
    }
  }
}
```

Thank you for reading. ❤️🇺🇦
