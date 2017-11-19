---
id: 405
title: 'NSX: IPsec VPN'
date: 2016-11-03T23:33:05+00:00
author: Brett Johnson
layout: post
permalink: /brettsitblog/2016/11/nsx-ipsec-vpn/
academia_post_display_home:
  - ""
categories:
  - NSX
  - Vmware
---
The NSX Edge can be configured to provide site-to-site VPN connectivity using IPsec. If you&#8217;re not familiar with IPsec, I suggest having a read up on that first. As IPsec is a standard, information already published will be transferable.

An NSX Edge can connect to any other device that supports IPsec. If a peer is not an NSX Edge, you need to verify that it will be compatible. The NSX Edge supports the following.

  * Phase 1 mode: Main Mode
  * Phase 2 mode: Quick Mode
  * Diffie-Helman Group 2 and 3
  * Digital cert and PSK
  * Static routing only
  * Encryption: AES, AES-256, AES-GCM and 3DES

While on the topic of support, each NSX Edge supports 10 remote sites and up to 6000 VPN tunnels. The number of tunnels you can actually use depends on the size of the NSX edge.

  * Compact: 512
  * Large: 1600
  * Quad Large: 4096
  * Xtra Large: 6000

The number of tunnels needed is local subnets x peer subnets. If Site A peer has 3 subnets and site B peer has 10, then 30 tunnels are used.

If one or both of the NSX Edges are behind NAT, then the peer IP address used will be the public IP address, the NAT will perform the translation for the traffic to get to the other peer Edge.

For an example of configuring an inter-site IPsec VPN I have done a mock configuration using VMwares HOL based on the topology below. The left network is Site A and the right is Site B

[<img class=" wp-image-438 alignnone" src="https://sdbrett.com/assets/images/2016/11/VPN-Topology-300x174.png" alt="vpn-topology" width="490" height="284" srcset="https://sdbrett.com/assets/images2016/11/VPN-Topology-300x174.png 300w, https://sdbrett.com/assets/images2016/11/VPN-Topology-260x151.png 260w, https://sdbrett.com/assets/images2016/11/VPN-Topology.png 754w" sizes="(max-width: 490px) 100vw, 490px" />](https://sdbrett.com/assets/images/2016/11/VPN-Topology.png)

The link between the DLR and the ESG is called a transit network and uplink LIFs are used.

For this example, I will assume that the interfaces have already been configured for the ESG and DLR.

On the DLR we need to configure a static route to get to 172.31.21.0/24 using the ESG. This could also be configured as the default route.

[<img class="alignnone size-medium wp-image-426" src="https://sdbrett.com/assets/images/2016/11/Site-A-DLR-Static-Route-300x265.png" alt="site-a-dlr-static-route" width="300" height="265" srcset="https://sdbrett.com/assets/images2016/11/Site-A-DLR-Static-Route-300x265.png 300w, https://sdbrett.com/assets/images2016/11/Site-A-DLR-Static-Route-260x230.png 260w, https://sdbrett.com/assets/images2016/11/Site-A-DLR-Static-Route.png 444w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2016/11/Site-A-DLR-Static-Route.png)

We now need to configure a route on the ESG so it knows how to send traffic to the 192.168.1.0/24 network.

[<img class="alignnone size-medium wp-image-428" src="https://sdbrett.com/assets/images/2016/11/Site-A-ESG-Route-300x263.png" alt="site-a-esg-route" width="300" height="263" srcset="https://sdbrett.com/assets/images2016/11/Site-A-ESG-Route-300x263.png 300w, https://sdbrett.com/assets/images2016/11/Site-A-ESG-Route-260x228.png 260w, https://sdbrett.com/assets/images2016/11/Site-A-ESG-Route.png 443w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2016/11/Site-A-ESG-Route.png)

We repeat the steps at Site B

DLR

[<img class="alignnone size-medium wp-image-432" src="https://sdbrett.com/assets/images/2016/11/Site-B-DLR-Static-Route-300x264.png" alt="site-b-dlr-static-route" width="300" height="264" srcset="https://sdbrett.com/assets/images2016/11/Site-B-DLR-Static-Route-300x264.png 300w, https://sdbrett.com/assets/images2016/11/Site-B-DLR-Static-Route-260x229.png 260w, https://sdbrett.com/assets/images2016/11/Site-B-DLR-Static-Route.png 444w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2016/11/Site-B-DLR-Static-Route.png)

ESG

[<img class="alignnone size-medium wp-image-434" src="https://sdbrett.com/assets/images/2016/11/Site-B-ESG-Route-300x263.png" alt="site-b-esg-route" width="300" height="263" srcset="https://sdbrett.com/assets/images2016/11/Site-B-ESG-Route-300x263.png 300w, https://sdbrett.com/assets/images2016/11/Site-B-ESG-Route-260x228.png 260w, https://sdbrett.com/assets/images2016/11/Site-B-ESG-Route.png 443w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2016/11/Site-B-ESG-Route.png)

Now it&#8217;s just a matter of configuring the IPSec VPN connections on both ESG&#8217;s

  * If using a PSK, the Locale ID can be anything you like, if using digital certificates then it must match the common name on the cert.
  * Local end point is the Uplink LIF IP
  * Peer ID is the ID of the peer that the ESG connects to. Just like Locale ID, it can be anything if using PSK but must match common name if used digital cert.
  * Peer endpoint is the IP address of the peer.
  * Peer subnets are the subnets that can be reached at the peer. The ESG will add static routes for these subnets on completion.
  * Configure Algorithm and Authentication. These must be the same at both sites.

[<img class="alignnone wp-image-427" src="https://sdbrett.com/assets/images/2016/11/Site-A-ESG-IPsec-VPN-Settings-183x300.png" alt="site-a-esg-ipsec-vpn-settings" width="308" height="505" srcset="https://sdbrett.com/assets/images2016/11/Site-A-ESG-IPsec-VPN-Settings-183x300.png 183w, https://sdbrett.com/assets/images2016/11/Site-A-ESG-IPsec-VPN-Settings-260x426.png 260w, https://sdbrett.com/assets/images2016/11/Site-A-ESG-IPsec-VPN-Settings.png 545w" sizes="(max-width: 308px) 100vw, 308px" />](https://sdbrett.com/assets/images/2016/11/Site-A-ESG-IPsec-VPN-Settings.png)

[<img class="alignnone wp-image-433" src="https://sdbrett.com/assets/images/2016/11/Site-B-ESG-IPsec-VPN-Settings-182x300.png" alt="site-b-esg-ipsec-vpn-settings" width="305" height="503" srcset="https://sdbrett.com/assets/images2016/11/Site-B-ESG-IPsec-VPN-Settings-182x300.png 182w, https://sdbrett.com/assets/images2016/11/Site-B-ESG-IPsec-VPN-Settings-260x429.png 260w, https://sdbrett.com/assets/images2016/11/Site-B-ESG-IPsec-VPN-Settings.png 542w" sizes="(max-width: 305px) 100vw, 305px" />](https://sdbrett.com/assets/images/2016/11/Site-B-ESG-IPsec-VPN-Settings.png)

Firewall rules are automatically created for the VPN at each site.

IPsec tunnel status can be confirmed by clicking &#8220;Show IPsec Statistics&#8221;

[<img class="alignnone wp-image-439" src="https://sdbrett.com/assets/images/2016/11/Show-IP-300x94.png" alt="show-ip" width="491" height="154" srcset="https://sdbrett.com/assets/images2016/11/Show-IP-300x94.png 300w, https://sdbrett.com/assets/images2016/11/Show-IP-768x241.png 768w, https://sdbrett.com/assets/images2016/11/Show-IP-260x82.png 260w, https://sdbrett.com/assets/images2016/11/Show-IP.png 958w" sizes="(max-width: 491px) 100vw, 491px" />](https://sdbrett.com/assets/images/2016/11/Show-IP.png)

[<img class="alignnone wp-image-440" src="https://sdbrett.com/assets/images/2016/11/VPN-Tunnel-Up-300x101.png" alt="vpn-tunnel-up" width="481" height="162" srcset="https://sdbrett.com/assets/images2016/11/VPN-Tunnel-Up-300x101.png 300w, https://sdbrett.com/assets/images2016/11/VPN-Tunnel-Up-260x88.png 260w, https://sdbrett.com/assets/images2016/11/VPN-Tunnel-Up.png 705w" sizes="(max-width: 481px) 100vw, 481px" />](https://sdbrett.com/assets/images/2016/11/VPN-Tunnel-Up.png)

If you notice that the local IP is not 21.21.21.21 for Site B, instead it&#8217;s 11.11.11.12. That was changes in order to get the two ESGs to connect in the HOL with putting more configuration into this.