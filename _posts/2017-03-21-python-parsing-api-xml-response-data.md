---
id: 689
title: 'Python: Parsing API XML Response Data'
date: 2017-03-21T21:46:32+00:00
author: Brett Johnson
layout: post
permalink: /BrettsITBlog/2017/03/python-parsing-api-xml-response-data/
academia_post_display_home:
  - ""
image: /wp-content/uploads/2017/03/Python.png
categories:
  - Python
tags:
  - Python
  - Scripting
  - XML
---
#### <img class="alignnone size-medium wp-image-696" src="https://sdbrett.com/assets/images/2017/03/Python-300x101.png" alt="" width="300" height="101" srcset="https://sdbrett.com/assets/images2017/03/Python-300x101.png 300w, https://sdbrett.com/assets/images2017/03/Python-260x88.png 260w, https://sdbrett.com/assets/images2017/03/Python.png 601w" sizes="(max-width: 300px) 100vw, 300px" />

Recently I have started to look at the Turbonomic API. Due to my current skill level in Python, I quickly hit a roadblock. The response from an API is in in XML format. Parsing the response in XML slowed things down a little. Which is the focus of the post. How to parse the XML response with Python.

After some time I put the pieces together can work with this product through the API.

You will need two modules. Requests and ElementTree. Links to the documentation is below.

  * Requests: <http://docs.python-requests.org/en/master/>
  * ElementTree: <https://docs.python.org/3.6/library/xml.etree.elementtree.html#module-xml.etree.ElementTree>
  * If you&#8217;re unfamilar with XML terminology, I&#8217;d recommend having a quick look [here](https://www.w3schools.com/xml/xml_tree.asp).

#### Getting Started

To practice with this, we need XML formatted text. Below is a copy of the response I have been testing against. I performed a GET to retrieve the users.

{% highlight xml %}&lt;TopologyElements&gt;
	&lt;TopologyElement creationClassName="User" displayName="testuser" isScoped="false" loginProvider="Local" name="testuser" userType="DedicatedCustomer" uuid="_iXQoYAaeEeeT5YCo6TtTyA"&gt;
		&lt;TopologyRelationship childrenUuids="_4T_7lQY-Ed-WUKbEYSVIDw" name="role"/&gt;
	&lt;/TopologyElement&gt;
	&lt;TopologyElement creationClassName="User" displayName="Administrator User" isScoped="false" loginProvider="Local" name="administrator" userType="DedicatedCustomer" uuid="_4T_7kwY-Ed-WUKbEYSVIDw"&gt;
		&lt;TopologyRelationship childrenUuids="_4UAioQY-Ed-WUKbEYSVIDw" name="role"/&gt;
	&lt;/TopologyElement&gt;
&lt;/TopologyElements&gt;{% endhighlight %}

For these examples, the content isn&#8217;t a concern. We will be looking at process.

#### The API Call and Data Parsing

The specifics of the API call will change depending on the system you&#8217;re accessing. Due to that, lets keep it generic.

{% highlight python %}r = requests.get('https://sdbrett.com/api/users')
{% endhighlight %}

We have some data in a variable. It&#8217;s in XML format. Which means looking at the content object isn&#8217;t that helpful.

{% highlight python %}r.content
b'&lt;?xml version="1.0" encoding="ISO-8859-1"?&gt;&lt;TopologyElements&gt;\n&lt;TopologyElement creationClassName="User" displayName="testuser" isScoped="false" loginProvider="Local" name="testuser" userType="DedicatedCustomer" uuid="_iXQoYAaeEeeT5YCo6TtTyA"&gt;\n&lt;TopologyRelationship childrenUuids="_4T_7lQY-Ed-WUKbEYSVIDw" name="role"/&gt;\n&lt;/TopologyElement&gt;\n&lt;TopologyElement creationClassName="User" displayName="Administrator User" isScoped="false" loginProvider="Local" name="administrator" userType="DedicatedCustomer" uuid="_4T_7kwY-Ed-WUKbEYSVIDw"&gt;\n&lt;TopologyRelationship childrenUuids="_4UAioQY-Ed-WUKbEYSVIDw" name="role"/&gt;\n&lt;/TopologyElement&gt;\n&lt;/TopologyElements&gt;\n'
{% endhighlight %}

These is were the module ElementTree comes in. Using ElementTree, we parse the data into a variable. This will use the root of the structure. Essentially, we create a dictionary.

{% highlight python %}root = ElementTree.fromstring(r.content){% endhighlight %}

Now our data is in the root variable, we can work with it.

We will use the method &#8216;iter&#8217; to access data within the variable.

To view all elements (tags) we can use a wildcard.

{% highlight python %}for child in root.iter('*'):
    print(child.tag)

TopologyElements
TopologyElement
TopologyRelationship
TopologyElement
TopologyRelationship{% endhighlight %}

The output lists the elements.

Each element contains attributes. These attributes can be used to access the returned data in a structured format.

{% highlight text %}for child in root.iter('TopologyElement'):
    print(child.tag, child.attrib)

TopologyElement {'creationClassName': 'User', 'displayName': 'testuser', 'isScoped': 'false', 'loginProvider': 'Local', 'name': 'testuser', 'userType': 'DedicatedCustomer', 'uuid': '_iXQoYAaeEeeT5YCo6TtTyA'}
TopologyElement {'creationClassName': 'User', 'displayName': 'Administrator User', 'isScoped': 'false', 'loginProvider': 'Local', 'name': 'administrator', 'userType': 'DedicatedCustomer', 'uuid': '_4T_7kwY-Ed-WUKbEYSVIDw'}
{% endhighlight %}

Looking at this from a Key:Value pairing POV. The key is an attribute and the value is a value. With this in mind, we can use a similar method to access data.

{% highlight python %}for child in root.iter('TopologyElement'):
    print(child.attrib['displayName'], child.attrib['loginProvider'])
{% endhighlight %}

This provides us with usernames and where they are located.

##### Putting it Together

With knowing everything above, we can make practical use of the data.

Lets say, we want to minimize the use of local accounts. Rely on AD for authentication. A first step would be to verify how many local accounts.

{% highlight python %}root = ElementTree(r.content)

local_users = []

for user in root.iter('TopologyElement'):
    if user.attrib['loginProvider'] == 'Local':
        local_users.append(user.attrib['displayName']){% endhighlight %}

And there we go. Local user accounts are stored in a list. Ready to be exported as required.