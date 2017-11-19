---
id: 484
title: Quality of Service with NSX
date: 2016-11-13T16:14:53+00:00
author: Brett Johnson
layout: post
permalink: /brettsitblog/2016/11/qos-configuration-for-nsx/
academia_post_display_home:
  - ""
categories:
  - NSX
  - Vmware
tags:
  - CoS
  - NSX
  - QoS
  - vDS
  - VMware
---
<img class="alignnone size-medium wp-image-486" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2016/11/VMW-NSX-Logo1-300x154.jpg" alt="VMware NSX" width="300" height="154" srcset="https://sdbrett.com/assets/images2016/11/VMW-NSX-Logo1-300x154.jpg 300w, https://sdbrett.com/assets/images2016/11/VMW-NSX-Logo1-260x133.jpg 260w, https://sdbrett.com/assets/images2016/11/VMW-NSX-Logo1.jpg 359w" sizes="(max-width: 300px) 100vw, 300px" />

QoS is a method of providing a minimal Quality of Service to network traffic. This is done through adding values to the Ethernet or packet headers. By adding these values, priority can be assigned to network traffic types. Some services do not a significant amount of bandwidth but are sensitive to latency. These services can benefit from QoS.

Networks use QoS as a way to give priority where needed. A service provider often provides a level of service for their clients. QoS provides a method to meet the agreed service level.

VOIP is a service which provides an excellent use case of Quality of Service. Latency plays a large role in the quality of VOIP communication. Increases in latency negativity impact VOIP quality.

#### L2 and L3 Quality of Service

Layer2 and Layer3 Quality of Service are quite different. Layer2 called Class of Service (CoS) allows tagging using the values 0 &#8211; 7. Layer3 called Differentiated Services Code Point (_DSCP_) allows tagging using the values 0 &#8211; 63. DCSP is able to provide more flexibility, due to the larger range of values. Due to being Layer3, DSCP values remain end to end.

#### Trust Domains

The hypervisor presents a trust boundary, which means that it sets the QoS value for different traffic types. The expectation is for physical switching to trust these values. No reclassification is necessary at the server-facing port of a leaf switch.

#### Configuration Overview

When configuring QoS for logical switch, you need to do so on the vDS port group for that logical switch. The process of configuring QoS for a logical switch is the same as a normal vDS port group. There is currently no option to configure QoS through the logical switch interface.

During the configuration, you have three filtering actions; Allow, Drop, and Tag. The tag option, you are able to assign a Cos or DSCP value to ingress or egress traffic. The final step is to set qualifiers for filtering the source or destination traffic.

The available filtering options are; IP Address, MAC, and System Type.