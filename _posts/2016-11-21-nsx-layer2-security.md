---
id: 503
title: NSX Layer2 Security
date: 2016-11-21T22:08:58+00:00
author: Brett Johnson
layout: post
permalink: /BrettsITBlog/2016/11/nsx-layer2-security/
academia_post_display_home:
  - ""
categories:
  - NSX
tags:
  - NSX
  - VMware
---
<img class="alignnone size-medium wp-image-486" src="https://sdbrett.com/assets/images/2016/11/VMW-NSX-Logo1-300x154.jpg" alt="VMware NSX" width="300" height="154" srcset="https://sdbrett.com/assets/images2016/11/VMW-NSX-Logo1-300x154.jpg 300w, https://sdbrett.com/assets/images2016/11/VMW-NSX-Logo1-260x133.jpg 260w, https://sdbrett.com/assets/images2016/11/VMW-NSX-Logo1.jpg 359w" sizes="(max-width: 300px) 100vw, 300px" />

#### Layer2 Invisibility

L2 traffic is a major blind spot for many companies. Most security filtering only happens when traffic traverses a Layer3 boundary. If traffic does not cross this boundary, it is not scanned and not seen. Attackers can move unseen within a L2 network, due to this lack of visibility.

Physical firewalls work well for North-South traffic. They do not perform as well for east-west. Creating a shell, that offers no internal protection.

#### Hairpinning Traffic

In virtualized data centres, hosts are likely to contain VM&#8217;s on different subnets. In order for these VM&#8217;s to talk to each other. Traffic will leave the host and traverse the physical network. It would then arrive at the firewall for inspection. Before finally arriving at the same physical host it left.

This hairpin traffic path creates unneeded traffic on the physical network. If we reduce the excess traffic on the physical network, we can reduce the cost of the network.

#### NSX Distributed Firewall

NSX provides a Distributed Firewall (DFW). Installed in the ESXi kernel during host preparation. The DFW brings security filtering right to the source. Unless excluded, every vNIC on every VM has a firewall.

The DFW filters traffic at the first slot in the IO chain. This means that firewall policy and traffic inspection is performed before the vSwitch. Every packet that leaves a VMs vNIC passes through a firewall.

The DFW provides two sections for rule creation. Ethernet, which is for the scanning of L2 traffic. The second is General, this is for L3 and L4 rules. Traffic gets matched against Ethernet rules before General.

As traffic filtering happens at the hypervisor kernel, we remove the hairpin effect. Due to the distributed nature, our firewalls capacity grows as more nodes are added.

By using a DFW all traffic can pass through a firewall. This means that even L2 traffic becomes visible. Lateral movement is much harder and altering is easier.