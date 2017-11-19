---
id: 642
title: 'Python: Getting Started with HTTP Requests'
date: 2017-02-08T22:39:23+00:00
author: Brett Johnson
layout: post
permalink: /brettsitblog/2017/02/python-http-requests/
academia_post_display_home:
  - ""
image: /wp-content/uploads/2017/02/HTTP-Requests-Logo.png
categories:
  - Cloud
  - Python
tags:
  - API
  - Python
---
#### [<img class="alignnone size-medium wp-image-651" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/02/HTTP-Requests-Logo-234x300.png" alt="" width="234" height="300" srcset="https://sdbrett.com/assets/images2017/02/HTTP-Requests-Logo-234x300.png 234w, https://sdbrett.com/assets/images2017/02/HTTP-Requests-Logo-768x985.png 768w, https://sdbrett.com/assets/images2017/02/HTTP-Requests-Logo-799x1024.png 799w, https://sdbrett.com/assets/images2017/02/HTTP-Requests-Logo-260x333.png 260w, https://sdbrett.com/assets/images2017/02/HTTP-Requests-Logo.png 1020w" sizes="(max-width: 234px) 100vw, 234px" />](https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/02/HTTP-Requests-Logo.png)

If you&#8217;re looking at Python to interact with API&#8217;s, it&#8217;s likely that you&#8217;ll use the Requests module. Many platforms also offer SDK&#8217;s to help. Such as, Boto3 which is the AWS Python SDK.

Requests is very well documented, both official and community documentation.

The official site for Requests is <http://docs.python-requests.org/en/master/>

In this post, we are going to cover the basics of performing a HTTP GET and working with the data.

#### Installing Requests

Requests can be installed in a couple of ways. The first is using pip. For Linux and Mac this can be installed using the command

{% highlight text %}pip install requests{% endhighlight %}

For Windows

{% highlight text %}Python -m pip install requests
{% endhighlight %}

Another option is to download requests from GitHub and run the setup.py file

{% highlight text %}git clone git://github.com/kennethreitz/requests.git
cd requests
python setup.py install{% endhighlight %}

Note: Installation may require elevated privileges.

#### Performing a HTTP GET

Performing a HTTP GET is one of the first things you&#8217;re likely to do. A GET will attempt to retrieve (GET) data from a resource. The operation is simple enough. To help with learning, there are a number of sites which you can test basic operations. For this post we are going to use [JSON Placeholder](https://jsonplaceholder.typicode.com/).

The resource that you intend to retrieve data from could require authentication. This is out of the planned scope for this post.

To get started you will need to import the module.

{% highlight python %}&gt;&gt;&gt; import requests{% endhighlight %}

Use the following command to make a GET request. This retrieves the data and saves it to a variable.

{% highlight python %}&gt;&gt;&gt; response = requests.get('https://jsonplaceholder.typicode.com/users'){% endhighlight %}

In order to verify the request was successful run the following

{% highlight python %}&gt;&gt;&gt; response.ok{% endhighlight %}

This is a boolean value, returning True for a valid response. Otherwise False. It provides a simple method for controlling the scripts behavior. Response also contains the status code.

To see the status code run

{% highlight python %}&gt;&gt;&gt; response.status_code{% endhighlight %}

Response will contain a number of attributes. Such as, header, content and as we have seen ok. For this post we will focus on the content. Which is the actual data retrieved.

#### Parsing Content

The content of a request can be accessed through a number of attributes. Each attribute return the content with a specific class.

{% highlight python %}&gt;&gt;&gt; type(response.text)
    &lt;class 'str'&gt;{% endhighlight %}

{% highlight python %}&gt;&gt;&gt; type(response.content)
    &lt;class 'byte'&gt;{% endhighlight %}

Requests includes a built in JSON encoder, which makes list much easier for parsing data. As a side note: This is something I should have read up on before using requests. I would have saved a lot of time for myself.

{% highlight python %}&gt;&gt;&gt; type(response.json())
    &lt;class 'list'&gt;{% endhighlight %}

Each item in the list is a dict. Which means to parse, we iterate through the list and look for a key value.

{% highlight python %}&gt;&gt;&gt; for x in response.json():
        print(x){% endhighlight %}

Using the same data, lets look for the phone name and contact name for kale.biz.

We will iterate the content and look for an entry where the key &#8220;website&#8221; matches &#8220;kale.biz. If it does match we will print the phone number and contact name.

{% highlight python %}&gt;&gt;&gt; for x in response.json():
    if x['website'] == 'kale.biz':
        print(x['name'])
        print(x['phone'])
{% endhighlight %}

#### Summary

The requests module is a key part of interacting with API using Python. Take your time to understand how it works and what scenarios you can apply it to.

For practicing there a number of sites which allow you to make HTTP requests, have a look and experiment.