---
id: 596
title: 'AWS Boto3: Using Boto3 to Describe VPC'
date: 2017-01-07T22:48:43+00:00
author: Brett Johnson
layout: post
permalink: /BrettsITBlog/2017/01/aws-boto3-describe-vpc/
academia_post_display_home:
  - ""
image: /wp-content/uploads/2017/01/AWSLOGO.png
categories:
  - AWS
  - Python
tags:
  - AWS
  - Boto3
  - Cloud
  - Python
  - Script
---
#### <img class="alignnone size-medium wp-image-602" src="https://sdbrett.com/assets/images/2017/01/AWSLOGO-300x111.png" alt="" width="300" height="111" srcset="https://sdbrett.com/assets/images2017/01/AWSLOGO-300x111.png 300w, https://sdbrett.com/assets/images2017/01/AWSLOGO-768x283.png 768w, https://sdbrett.com/assets/images2017/01/AWSLOGO-260x96.png 260w, https://sdbrett.com/assets/images2017/01/AWSLOGO.png 800w" sizes="(max-width: 300px) 100vw, 300px" />

To describe a VPC is to retrieve the values of it attributes. A task we might perform to validate configuration.

This article will demonstrate the following:

  * Find VPC ID using filters
  * Retrieve VPC configuration values

Information on Boto3 can be found [here](http://boto3.readthedocs.io/en/latest/index.html).

This post assumes that you already have a working Boto3 installation. Including IAM configuration to perform the task. If you have not, click [here](https://boto3.readthedocs.io/en/latest/guide/quickstart.html) for the install document.

#### Modules and EC2 connection

We require the JSON and Boto3 modules. Thus, they will be imported at the start of the script. The reason for Boto3 should be fairly straight forward. To make the responses readable, JSON is required.

The third line connects to EC2 for our region. Adjust the region name as required.

{% highlight python %}import json
import boto3
ec2 = boto3.resource('ec2', region_name='ap-southeast-2')
client = boto3.client('ec2')
{% endhighlight %}

#### Retrieving VPCs

Filters are used to scope our results. These filters are based on tags. Such as, Name, VPCID etc. You can use multiple entries for the value or a wildcard &#8220;*&#8221;.

{% highlight python %}
filters = [{'Name':'tag:Name', 'Values':['VPN*']}]
{% endhighlight %}

<{% highlight python %}
filters = [{'Name':'tag:Name', 'Values':['VPN01', 'VPN02']}]
{% endhighlight %}

Now to perform the query using the ec2.vpcs resource.

<{% highlight python %}vpcs = list(ec2.vpcs.filter(Filters=filters)){% endhighlight %}

The variable vpcs now contains a list of VPCIDs for the VPCs which matched our filter.

<{% highlight python %}[ec2.Vpc(id='vpc-1b7e'), ec2.Vpc(id='vpc-dcb7')]{% endhighlight %}

#### Describing the VPCs

We have searched for VPCs and their IDs are now in the list vpcs. It&#8217;s now time to see some information on them.

We will utilise a for loop to achieve this.

{% highlight python %}for vpc in vpcs:
    response = client.describe_vpcs(
        VpcIds=[
            vpc.id,
        ]
    )
    print(json.dumps(response, sort_keys=True, indent=4)){% endhighlight %}

vpc.id provides the ID number for each entry.

I have ended this with a print. You can of course change that to store the output for further use.

The formatted response should be similar to this:

{% highlight json %}
{
    "ResponseMetadata": {
        "HTTPStatusCode": 200,
        "RequestId": "5bed6fab-fc86"
    },
    "Vpcs": [
        {
            "CidrBlock": "192.168.0.0/25",
            "DhcpOptionsId": "dopt-8",
            "InstanceTenancy": "default",
            "IsDefault": false,
            "State": "available",
            "Tags": [
                {
                    "Key": "Name",
                    "Value": "VPN1"
                }
            ],
            "VpcId": "vpc-1b7e"
        }
    ]
}{% endhighlight %}

#### Summary

The script provides a framework to audit VPCs and their configurations. I hope that you found it helpful.

The script in full can be found at https://github.com/oversizedspoon/DescribeVPC-BOTO3