---
id: 872
title: 'Chef: vRA – Assigning Node Environment Using Custom Properties'
date: 2017-10-09T09:29:48+00:00
author: Brett Johnson
layout: post
permalink: /BrettsITBlog/2017/10/chef-vra-assigning-node-environment-using-custom-properties/
academia_post_display_home:
  - ""
image: /wp-content/uploads/2017/07/chef-logo.png
categories:
  - Chef
tags:
  - Automation
  - Chef
  - Cloud
  - VMware
  - vRA
---

vRA uses Custom properties to help define parameters and the behaviour of requests. In the previous post [CHEF: vRA Integration, Property Groups and Blueprints ](https://sdbrett.com/BrettsITBlog/2017/09/chef-vra-integration-property-groups-and-blueprints/)we used custom properties to define the properties of our Chef deployment.

In this post, we look at using custom properties to assign the node environment. The Chef default client deployment workflows form the basis of the examples.

#### A brief on custom properties

We use custom properties to manipulate many aspects of workflow execution. They can control if an approval policy is required, where a VM is deployed to or credentials for a post-deployment task. How you use them really depends on the requirements for that task.

vRA allows customer property assignment in 7 different locations. Using an order of precedence used to handle conflicts, for more information on locations and precedence check out [this post](http://www.virtualizationteam.com/cloud/vrealize-automation-order-of-precedence-for-custom-properties.html).

Custom properties can be present a learning curve, but get easier with experience.

The Event Broker Service (EBS) sends custom properties to vRO. I have found [this post](https://www.definit.co.uk/2016/03/whats-in-my-vra7-ebs-payloads/) very helpful for troubleshooting EBS workflow functionality.

#### Assign a Node to an Environment

The workflow ‘EBS – Machine Provisioned &#8211; Chef’ assigned the node to an environment using the property chef.environment. We will use this to align our nodes environment to the vRA reservation our VM is deployment.

In my vRA environment, I have configured two reservations policies and two reservations.

[<img class="alignnone wp-image-875 size-medium" title="vRA Reservations" src="https://sdbrett.com/assets/images/2017/10/vRA-reservations-300x79.png" alt="" width="300" height="79" srcset="https://sdbrett.com/assets/images2017/10/vRA-reservations-300x79.png 300w, https://sdbrett.com/assets/images2017/10/vRA-reservations-768x203.png 768w, https://sdbrett.com/assets/images2017/10/vRA-reservations-1024x271.png 1024w, https://sdbrett.com/assets/images2017/10/vRA-reservations-260x69.png 260w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2017/10/vRA-reservations.png)

Edit a reservation and click &#8216;New&#8217; on the custom properties section. Type the name &#8216;chef.environment&#8217; and a value. The value you assign needs to match the name of an environment on the Chef server. The property name and value are case sensitive.

The property chef.environment is assigned to both reservations, with values matching Chef environments.

[<img class="alignnone wp-image-874 size-medium" title="vRA Reservation Properties" src="https://sdbrett.com/assets/images/2017/10/Dev-reservation-custom-properties-300x65.png" alt="" width="300" height="65" srcset="https://sdbrett.com/assets/images2017/10/Dev-reservation-custom-properties-300x65.png 300w, https://sdbrett.com/assets/images2017/10/Dev-reservation-custom-properties-768x167.png 768w, https://sdbrett.com/assets/images2017/10/Dev-reservation-custom-properties-1024x223.png 1024w, https://sdbrett.com/assets/images2017/10/Dev-reservation-custom-properties-260x57.png 260w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2017/10/Dev-reservation-custom-properties.png)

[<img class="alignnone wp-image-873 size-medium" title="Chef environments" src="https://sdbrett.com/assets/images/2017/10/Chef-server-environments-300x56.png" alt="" width="300" height="56" srcset="https://sdbrett.com/assets/images2017/10/Chef-server-environments-300x56.png 300w, https://sdbrett.com/assets/images2017/10/Chef-server-environments-768x143.png 768w, https://sdbrett.com/assets/images2017/10/Chef-server-environments-1024x191.png 1024w, https://sdbrett.com/assets/images2017/10/Chef-server-environments-260x48.png 260w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2017/10/Chef-server-environments.png)

The EBS passes the custom property to vRO as a machine property. Which the deployment workflow uses to select the environment. In the example configuration, this provides a link between physical deployment clusters and Chef environments.

The property assigned to the reservation takes precedence over the value set within the property group created in the previous post. Therefore the EBS uses that assignment when sending to vRO.

#### Summary

Custom properties are a key part of working with vRA and something that you will find yourself relying on for a range of tasks. As we cover more integration scenarios, their importance will increase.