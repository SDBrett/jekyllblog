---
id: 387
title: NSX Logical Router
date: 2016-10-25T22:00:22+00:00
author: Brett Johnson
layout: post
permalink: /BrettsITBlog/2016/10/nsx-logical-router/
academia_post_display_home:
  - ""
categories:
  - NSX
tags:
  - SDN
  - Vmware
---
The Logical Router (Distributed Logical Router) is installed on ESXi hosts as a VIB by the NSX manager during host preparation. The installation does not require any interruption to ESXi hosts. Removal of the VIB does require a host restart though.

The DLR runs in kernel space and sits on the data plane. A Logical Router is defined as an instance. Each DLR created is an instance and participating hosts receive a copy of the instance. Each ESXi host can have up to 100 instances, each instance can connect to 1000 Logical Interfaces (LIF) and 8 Uplink LIFs and an NSX Domain can have a total of 1200 DLRs. When an instance is on multiple hosts, it is seen as one router.

A LIF that connects to a Logical Switch is called a VXLAN LIF and a LIF that connects to a normal vDS Port Group is a VLAN LIF. Normally the VLAN LIF will be used as an uplink to the physical network.

Just like traditional routers, each LIF will have an IP address assigned. As the instance on all the hosts is the same router, each LIF will have the same IP address for that network segment. Just like traditional networking the VM’s need to be configured to use that IP address as their gateway.

To help put some context to the text, I have done up a quick diagram of a DLR on two hosts with four VM’s, two per host.

<a href="https://sdbrett.com/assets/images/2016/10/Logical-Router.png" target="_blank"><img class="alignnone wp-image-388" src="https://sdbrett.com/assets/images/2016/10/Logical-Router-280x300.png" alt="logical-router" width="364" height="390" srcset="https://sdbrett.com/assets/images2016/10/Logical-Router-280x300.png 280w, https://sdbrett.com/assets/images2016/10/Logical-Router-260x279.png 260w, https://sdbrett.com/assets/images2016/10/Logical-Router.png 726w" sizes="(max-width: 364px) 100vw, 364px" /></a>

Despite there being two router icons in the image, what we see is one instance / one router. This one router has two VXLAN LIFS connecting it to two Logical Switches. These VXLAN LIFS are referred to as internal LIFS as they connect to an internal network. A DLR instance cannot have two Internal LIFS connected to the same logical switch.
  
At the top of the image, we can see that there are connections from the DLR to an NSX Edge. The green lines used to demonstrate this connection are referred to as Uplink LIFS. An Uplink LIF is to route traffic to another router, such as an NSX Edge or maybe to a physical router connected to the VLAN-backed port group. The Uplink LIF will generally be the default route of the DLR.

The DLR can participate in dynamic routing. During the deployment of a DLR you have the option to deploy the Logical Router Control VM, after deployment this option cannot be changed. The Control VM is not needed for static routing, however it is required for dynamic routing such as OSPF. Communication between the Control VM and the DLR occurs across the Uplink LIF. The Control VM can be deployed in a HA pair. Each DLR can have up to two Control VMs. In a later post, I will provide more detail on the Control VM and its purpose. 

DLR’s have at least 2 MAC addresses, the first being the vMAC which is the same on all DLRs and there LIF’s, the vMAC is always 02:50:56:56:56:44:52. The Second MAC address is the pMAC, this is always different and assigned per Uplink LIF. Referring back to the image, the DLR copies on both hosts would have different pMAC addresses. The pMAC starts with VMwares OUI 00:50:56. 

I will cover more about the Logical Routers in later posts, there is a lot to cover, but I&#8217;ll get there