---
id: 624
title: 'Python: Parsing values from API Response'
date: 2017-01-26T13:09:04+00:00
author: Brett Johnson
layout: post
permalink: /BrettsITBlog/2017/01/python-parsing-values-from-api-response/
academia_post_display_home:
  - ""
image: /wp-content/uploads/2017/01/python-logo-master-v3-TM.png
categories:
  - Python
tags:
  - API
  - Automation
  - Python
  - Scripting
---
#### <img class="alignnone" title="Python Logo" src="https://www.python.org/static/img/python-logo.png" width="290" height="82" />

Boto3 was my first real attempt to work with an API interface. At the start, I had difficulty using the API response. This was partly due to only light exposure to Python. Also, an incorrect understanding of what the response was.

When people talk about APIs, it&#8217;s hard to go a minute without hearing &#8220;JSON format&#8217;. I had seen JSON formatted text before. Combining this, with documentation displaying API call response in JSON formation, lead to a 2+2=5 scenario. I thought that was the object type returned.

JSON is a text formatting standard. That&#8217;s it. It does not describe the object type which is returned. For a high level &#8220;What is JSON&#8221; visit this [page](http://developers.squarespace.com/what-is-json/).

#### API Response Object Types

When you make an API call, whether it is a GET, PUSH or PUT, you will get a response. The response is in a structured format, using Keys and Values. In Python, that&#8217;s a dictionary (dict).

The dict structure is what provides the flexibility and searchability. The response could be a standard dict. However, if a key contains multiple values, you are likely to see a list in the dict.

This distinction matters, because it helps get more accurate search results when you&#8217;re stuck. You&#8217;re not looking how to parse JSON. Instead, how to parse a dict. This is also true for how you might store values from the response.

#### Example: Retrieve data from response

The below code snippet is an example of a response from Boto3 documentation. This response is a dict and contains lists.

{% highlight python %}
response={
    'InternetGateway': {
        'InternetGatewayId': 'string',
        'Attachments': [
            {
                'VpcId': 'string',
                'State': 'attaching'
            },
        ],
        'Tags': [
            {
                'Key': 'string',
                'Value': 'string'
            },
        ]
    }
}{% endhighlight %}

Dicts are contained within a pair of curly braces. From that, we can see &#8220;InternetGateway&#8221; is a dict. It contains key values. In order to retrieve the internet gateway ID, we would use the following:

{% highlight python %}response['InternetGateway']['InternetGatewayId']{% endhighlight %}

Retrieving data stored in &#8220;Attachments&#8221; is a bit different. The square brace after &#8220;Attachments&#8221; tells us that we need to parse a list as well. For added fun, the list contains a dict. As the list only contains the one dict, we know our data is in position 0.

To get the state of this internet gateway, we would run:

{% highlight python %}response['InternetGateway']['Attachments'][0]['State']{% endhighlight %}

This will go to the value of the key &#8220;State&#8221; from index 0 of the key &#8220;Attachments&#8221;

As a side note on lists, the index starts at 0, not 1. The first entry will be index 0. Below example image is courtesy of [Carl Niger](https://twitter.com/carl_niger).

<div id="attachment_627" style="width: 160px" class="wp-caption alignnone">
  <a href="https://sdbrett.com/assets/images/2017/01/list-index.png"><img class="size-thumbnail wp-image-627" src="https://sdbrett.com/assets/images/2017/01/list-index-150x150.png" alt="" width="150" height="150" /></a>
  
  <p class="wp-caption-text">
    List Index
  </p>
</div>

#### Summary

If you&#8217;re going to be working with API calls, understanding how to parse lists and dictionaries will be a foundation skill. Take the time to understand different methods and where to use them.

JSON is great for reading, but it&#8217;s not the object type that you will be actually working with.