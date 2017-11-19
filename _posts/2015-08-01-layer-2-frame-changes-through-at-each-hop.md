---
id: 69
title: Layer 2 Frame changes through at each hop
date: 2015-08-01T19:11:40+00:00
author: Brett Johnson
layout: post
permalink: /BrettsITBlog/2015/08/layer-2-frame-changes-through-at-each-hop/
categories:
  - CCNA
---
I enjoy building test environments to help cement the concepts I read about.

In this case it&#8217;s the changes to the source and destination MAC addresses of a frame at layer 2 while it passes through each hop on the way to the final destination. To watch this process I setup wireshark between each hop.

The topology was very simple, 2 hosts and 2 routers.

<div id="attachment_71" style="width: 310px" class="wp-caption alignnone">
  <a href="https://sdbrett.com/assets/images2015/08/Topology.png"><img class="wp-image-71 size-medium" src="https://sdbrett.com/assets/images2015/08/Topology-300x143.png" alt="Topology" width="300" height="143" srcset="https://sdbrett.com/assets/images2015/08/Topology-300x143.png 300w, https://sdbrett.com/assets/images2015/08/Topology.png 774w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  
  <p class="wp-caption-text">
    Topology
  </p>
</div>

The test was done by sending a ping from the host Debian to the other host Debian 2.

3 instances of wireshark were running at the time

<p style="text-indent: 5em;">
  1 between Debian and R1
</p>

<p style="text-indent: 5em;">
  1 between R1 and R2
</p>

<p style="text-indent: 5em;">
  1 between R2 and Debian 2
</p>

With that in place and routes confirmed I sent a few pings across the network and watched the output in wireshark.

In the first image we can see that the destination MAC address matches R1 FA0/0 and that the source MAC address matches Debian Eth0. The IP addresses match the two Debian hosts.

[<img class="alignnone size-medium wp-image-76" src="https://sdbrett.com/assets/images2015/08/Debian-to-R1-300x141.png" alt="Debian to R1" width="300" height="141" srcset="https://sdbrett.com/assets/images2015/08/Debian-to-R1-300x141.png 300w, https://sdbrett.com/assets/images2015/08/Debian-to-R1.png 869w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images2015/08/Debian-to-R1.png)

The next hop is from R1 to R2. The destination MAC address is that of FA0/1 on R2 and the source MAC is of FA0/1. Again the source and destination IP addresses have not changed.

[<img class="alignnone size-medium wp-image-77" src="https://sdbrett.com/assets/images2015/08/R1-to-R2-300x137.png" alt="R1 to R2" width="300" height="137" srcset="https://sdbrett.com/assets/images2015/08/R1-to-R2-300x137.png 300w, https://sdbrett.com/assets/images2015/08/R1-to-R2.png 872w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images2015/08/R1-to-R2.png)

&nbsp;

The final hop R2 to Debian 2. The destination MAC is now that of Debian2 Eth0 to and the source is R2 interface FA0/0

[<img class="alignnone size-medium wp-image-75" src="https://sdbrett.com/assets/images2015/08/R2-to-Debian-2-300x139.png" alt="R2 to Debian 2" width="300" height="139" srcset="https://sdbrett.com/assets/images2015/08/R2-to-Debian-2-300x139.png 300w, https://sdbrett.com/assets/images2015/08/R2-to-Debian-2.png 873w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images2015/08/R2-to-Debian-2.png)

As we can see the destination and source mac addresses update at each hop as per the incoming and outgoing interfaces that the frame traverses, while the destination and source IP addresses do not.

A few other interesting things that can be seen by comparing the frames.

At each hop the frame is stripped and the packet is read. When the router reads the destination IP and determines the packet is not for it the packet is encapsulated again and a new FSC is calculated. This can be seen by the change in the header checksum at each hop.

The packet was generated with a TTL of 64 and you can observe it decrease at each hop.

As this is an ICMP packet its protocol number is 1. This is important for a number of reasons and there a lot of different numbers for a lot of different protocols in IP. <a href="http://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml" target="_blank">IANA IP protocol numbers</a>. The reason I bring this up is because for a lot of people wireshark can be overwhelming due to the large amount of data that it captures. Knowing how to filter is essential to being able to make use of wireshark. To filter out the data not relevant to this task I used a filter to only see ICMP.

[<img class="alignnone size-medium wp-image-72" src="https://sdbrett.com/assets/images2015/08/Wireshark-overview-300x110.png" alt="Wireshark overview" width="300" height="110" srcset="https://sdbrett.com/assets/images2015/08/Wireshark-overview-300x110.png 300w, https://sdbrett.com/assets/images2015/08/Wireshark-overview-1024x374.png 1024w, https://sdbrett.com/assets/images2015/08/Wireshark-overview.png 1117w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images2015/08/Wireshark-overview.png)

As you can see in the image above I used the filter ip.proto == 1. Which means display only packets that have an IP protocol of 1, so show only ICMP.

If you want to learn to use wireshark there&#8217;s a lot of great books out there, but starting in a controlled lab is fantastic as there will be a lot less noise on your capture.