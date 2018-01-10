---
id: 51
title: CCNA Home LAB
date: 2015-07-12T22:22:06+00:00
author: Brett Johnson
layout: post
permalink: /BrettsITBlog/2015/07/ccna-home-lab/
categories:
  - CCNA
---
During my study for my VCP5-DCV certification I found that having a home lab was a huge asset in terms of being able to get a better understanding of the subject matter. Now that I am working towards my CCNA Routing and Switch I feel this will be the case once again.

My goal is use the home lab to work on labs as per the study guides I am using and also to have something productive to work on when I don&#8217;t feel like reading through a study guide. Let&#8217;s face it all study guides can get a bit dry.

The home lab PC was originally spec&#8217;d up for running a nested ESXi environment and is overkill for what I will be doing for my CCNA.

  * i5-4690
  * 32 GB Ram
  * 512 GB SSD drive
  * Windows 8.1

To the setup.

I will be using GNS3 and VirtualBox to setup the lab environment, which is a pretty standard setup for people undertaking the CCNA. VirtualBox is a requirement to be able to run IOU devices as well as being able to connect VMs into the network.

I have started my configuration a bit out of order from the study guide I am using so I can test connectivity. The only changes to the router from a blank config are the setup of DHCP server, IP configuration of FastEthernet 0/0 and 0/1 as well has no shutdown.

**Starting Topology**

The starting topology is very simple, a router R1 and Layer2 device through IOU and a Debian VM.

[<img class="alignnone size-medium wp-image-55" src="https://sdbrett.com/assets/images/2015/07/Network-topology-300x217.png" alt="Network topology" width="300" height="217" srcset="https://sdbrett.com/assets/images/2015/07/Network-topology-300x217.png 300w, https://sdbrett.com/assets/images/2015/07/Network-topology.png 389w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2015/07/Network-topology.png)

**The DHCP config**

`<br />
<em>no ip dhcp use vrf connected</em><br />
<em> ip dhcp excluded-address 192.168.10.1 192.168.10.20</em><br />
<em> !</em><br />
<em> ip dhcp pool Internal</em><br />
<em> network 192.168.10.0 255.255.255.0</em><br />
<em> dns-server 4.4.4.4</em><br />
<em> default-router 192.168.10.1</em><br />
` 

**Interface Setup**

`<em>interface FastEthernet0/0</em>`

`<em> ip address 192.168.10.1 255.255.255.0</em><br />
<em> duplex auto</em><br />
<em> speed auto</em><br />
<em> !</em>`

 _interface FastEthernet0/1_
  
 _ip address 192.168.20.1 255.255.255.0_
  
 _duplex auto_
  
 _speed auto_
  
 _!_

Getting communication between the Debian VM and the devices took a bit of effort, but wasn&#8217;t too bad.

Adding a VM to GNS3 is a very simple process. Go to Edit > Preferences > VirtualBox VMs > New. Then just select the VM you want to add and your done.

To get the VM to communicate with the devices go to Edit > Preferences > VirtualBox VMs > Edit > Network and tick Allow GNS3 to use any configured VirtualBox Adapter

[<img class="alignnone wp-image-57" src="https://sdbrett.com/assets/images/2015/07/debian-network-GNS3-300x92.png" alt="debian network GNS3" width="427" height="131" srcset="https://sdbrett.com/assets/images/2015/07/debian-network-GNS3-300x92.png 300w, https://sdbrett.com/assets/images/2015/07/debian-network-GNS3.png 573w" sizes="(max-width: 427px) 100vw, 427px" />](https://sdbrett.com/assets/images/2015/07/debian-network-GNS3.png)

When I powered on the project the network settings for the VM in VirtualBox had been updated.

[<img class="alignnone wp-image-58" src="https://sdbrett.com/assets/images/2015/07/debian-network-vb-300x207.png" alt="debian network vb" width="428" height="295" srcset="https://sdbrett.com/assets/images/2015/07/debian-network-vb-300x207.png 300w, https://sdbrett.com/assets/images/2015/07/debian-network-vb.png 501w" sizes="(max-width: 428px) 100vw, 428px" />](https://sdbrett.com/assets/images/2015/07/debian-network-vb.png)

&nbsp;

Everything booted fine and communication tested well.

<div id="attachment_54" style="width: 430px" class="wp-caption alignnone">
  <a href="https://sdbrett.com/assets/images/2015/07/ifconfig.png"><img class=" wp-image-54" src="https://sdbrett.com/assets/images/2015/07/ifconfig-300x65.png" alt="DHCP setup confirmed" width="420" height="91" srcset="https://sdbrett.com/assets/images/2015/07/ifconfig-300x65.png 300w, https://sdbrett.com/assets/images/2015/07/ifconfig.png 706w" sizes="(max-width: 420px) 100vw, 420px" /></a>
  
  <p class="wp-caption-text">
    DHCP setup confirmed
  </p>
</div>

<div id="attachment_53" style="width: 427px" class="wp-caption alignnone">
  <a href="https://sdbrett.com/assets/images/2015/07/host-to-router-ping.png"><img class=" wp-image-53" src="https://sdbrett.com/assets/images/2015/07/host-to-router-ping-300x90.png" alt="Ping VM to FastEthernet 0/0" width="417" height="125" srcset="https://sdbrett.com/assets/images/2015/07/host-to-router-ping-300x90.png 300w, https://sdbrett.com/assets/images/2015/07/host-to-router-ping.png 578w" sizes="(max-width: 417px) 100vw, 417px" /></a>
  
  <p class="wp-caption-text">
    Ping VM to FastEthernet 0/0
  </p>
</div>

<div id="attachment_60" style="width: 430px" class="wp-caption alignnone">
  <a href="https://sdbrett.com/assets/images/2015/07/host-to-router-fast-01.png"><img class=" wp-image-60" src="https://sdbrett.com/assets/images/2015/07/host-to-router-fast-01-300x80.png" alt="Ping VM to FastEthernet 0/1" width="420" height="112" srcset="https://sdbrett.com/assets/images/2015/07/host-to-router-fast-01-300x80.png 300w, https://sdbrett.com/assets/images/2015/07/host-to-router-fast-01.png 580w" sizes="(max-width: 420px) 100vw, 420px" /></a>
  
  <p class="wp-caption-text">
    Ping VM to FastEthernet 0/1
  </p>
</div>

Communication from VM to router has been confirmed and that the VM can communicate with FastEthernet 0/1 which is on another network.

&nbsp;

This is my starting configuration for my CCNA lab which I&#8217;m sure will get plenty of use as well has get broken many times during the course of my study.

&nbsp;

**Study material:**

[Sybex CCNA Routing and Switching](http://www.amazon.com.au/Routing-Switching-Deluxe-Study-Guide-ebook/dp/B00R04DDK8/ref=sr_1_1?ie=UTF8&qid=1436703124&sr=8-1&keywords=sybex+ccna "Sybex CCNA Routing and Switching")

[Chris Bryant&#8217;s CCNA Study Guide, Volume 1](http://www.amazon.com.au/Chris-Bryants-CCNA-Study-Guide-ebook/dp/B00GFYEZ1A/ref=sr_1_5?ie=UTF8&qid=1436703267&sr=8-5&keywords=ccna "Chris Bryant's CCNA Study Guide, Volume 1")

[Chris Bryant&#8217;s CCNA Study Guide, Volume 2](http://www.amazon.com.au/Chris-Bryants-Study-Guide-Volume-ebook/dp/B00H9ICMV6/ref=pd_sim_351_1?ie=UTF8&refRID=0JSBJ969VBMDVVEGR3FY "Chris Bryant's CCNA Study Guide, Volume 2")

[CBTNuggets](https://www.cbtnuggets.com/ "CBT Nuggets")