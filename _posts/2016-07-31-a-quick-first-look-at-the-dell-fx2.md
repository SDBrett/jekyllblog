---
id: 310
title: A quick first look at the Dell FX2
date: 2016-07-31T09:43:45+00:00
author: Brett Johnson
layout: post
permalink: /brettsitblog/2016/07/a-quick-first-look-at-the-dell-fx2/
categories:
  - Uncategorized
---
Recently, I had the chance to look at a Dell FX2 and from the time I got to spend on it, I was quite impressed. Time spend on this bit of kit wasn&#8217;t as long as I would have liked. It turned out the storage options didn&#8217;t suit the client needs.

The configuration I was tasked with implementing involved 1 FX2 chassis with 2 x FC630 compute sleds and 1 x FD332 storage sled. We will get to the storage configuration shortly and why it was not able to fulfil the clients needs.

The back of the chassis has two RJ45 ports for CMC management. If you haven&#8217;t read the deployment guide there is a slight gotcha in that the second management port has two configuration modes. The first and default is CMC stacking. The second is CMC redundancy.

CMC stacking is used to connect multiple FX2 CMC ports for cable consolidation.

[<img class="alignnone size-medium wp-image-314" src="https://sdbrett.com/assets/images/2016/07/CMC-Stacking-259x300.png" alt="CMC Stacking" width="259" height="300" srcset="https://sdbrett.com/assets/images2016/07/CMC-Stacking-259x300.png 259w, https://sdbrett.com/assets/images2016/07/CMC-Stacking.png 712w" sizes="(max-width: 259px) 100vw, 259px" />](https://sdbrett.com/assets/images/2016/07/CMC-Stacking.png)

In the default configuration, connecting both management ports will create a network loop and cause a bit of havoc. To connect both CMC ports, the second ports configuration needs to be changed to redundant. This change can be made through the CMC web UI or serial console.

The CMC interface is quite easy to use, and simple enough to follow your nose and suss out where you need to go. If you have worked with blade / converged systems before, you will find the usual options, from sled power control to DRAC access.

The storage sled chosen was an FD332 which can hold up to 16 x 2.5-inch drives (8 each side) and had two controllers. Each controller can access the disks on its own side and not disks from the other controllers side. The storage modes available do support a single controller been presented to multiple compute sleds. This means storage is not shared between compute sleds.

In the configuration I was presented with, meant features such as VMware&#8217;s HA were not an option. This was the sticking point for the deployment.

For more information on the storage configuration options have a look at the [FD332 owners manual](http://www.dell.com/support/manuals/us/en/19/poweredge-fx2/FD332OwnersManual-v1/Single-PERC-and-joined-mode-mapping-configurations?guid=GUID-2213E915-D90D-4323-B3DF-C1E6B20CEECD&lang=en-us).

During my confirmation of this a large amount of the storage information I found related back to VSAN. This product has been designed to present storage as DAS to a compute sled and for sharing to be done by a different method, such as VSAN. An example configuration of this would be for 1 FX2 chassis to contain, 4 x FC430 compute sleds and 2 x FD332 compute sleds. Each FC430 is presented 1 controller from the FD332&#8217;s and VSAN does the sharing. Anthony Spiteri has a good write up [here.](http://anthonyspiteri.net/dell-poweredge-fx2-vsan-disk-configuration-steps/)

Even though I did not get to spend more than half a day on the FX. I was impressed with the kit and am hoping to get another opportunity to spend more time working on them.

[<img class="alignnone  wp-image-312" src="https://sdbrett.com/assets/images/2016/07/peFX2s_2x_fc430_1_8_2x_fc43-300x59.jpg" alt="FX2 Front" width="590" height="116" srcset="https://sdbrett.com/assets/images2016/07/peFX2s_2x_fc430_1_8_2x_fc43-300x59.jpg 300w, https://sdbrett.com/assets/images2016/07/peFX2s_2x_fc430_1_8_2x_fc43-768x150.jpg 768w, https://sdbrett.com/assets/images2016/07/peFX2s_2x_fc430_1_8_2x_fc43.jpg 870w" sizes="(max-width: 590px) 100vw, 590px" />](https://sdbrett.com/assets/images/2016/07/peFX2s_2x_fc430_1_8_2x_fc43.jpg)