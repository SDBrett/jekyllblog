---
id: 890
title: VMware Workstation 14 Linux Not Enough Memory
date: 2017-11-03T07:42:49+00:00
author: Brett Johnson
layout: post
permalink: /BrettsITBlog/2017/11/vmware-workstation-14-linux-not-enough-memory/
academia_post_display_home:
  - ""
image: /wp-content/uploads/2017/11/vmware-workstation-logo.jpg
categories:
  - Vmware
tags:
  - HowTo
  - Linux
  - VMware
---

[<img class="alignnone size-medium wp-image-891" src="https://sdbrett.com/assets/images/2017/11/vmware-workstation-logo-300x300.jpg" alt="vmware-workstation-logo" width="300" height="300" srcset="https://sdbrett.com/assets/images2017/11/vmware-workstation-logo-300x300.jpg 300w, https://sdbrett.com/assets/images2017/11/vmware-workstation-logo-150x150.jpg 150w, https://sdbrett.com/assets/images2017/11/vmware-workstation-logo-260x260.jpg 260w, https://sdbrett.com/assets/images2017/11/vmware-workstation-logo.jpg 400w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2017/11/vmware-workstation-logo.jpg)

I recently updated my Ubuntu install from 17.04 to 17.10, which meant the kernel was updated to 4.13. As a result, I was no longer able to run VMs with VMware Workstation.

I found some posts regarding the error and that it was due to a change in the way the Linux kernel handles paging. To resolve the issue I needed to replace the vmmon modules.

I didn&#8217;t take down the entire error message, but [this post](https://superuser.com/questions/1255099/vmware-workstation-not-enough-physical-memory-since-last-update) references the same error. There are a number of other posts on the VMware community forums for the same error.

#### The Fix

First of all, please go to the [GitHub repo](https://github.com/mkubecek/vmware-host-modules/tree/workstation-14.0.0) and read the disclaimers in the README.MD.

The repo has a number of branches, covering different versions of Workstation and VMware player. Adjust the `git clone` command to suit your version by replacing `workstation-14.0.0` with a version relevant to you.

Run the below commands and the memory issue should be resolved

{% highlight bash %}
#Clone workstation 14 branch
git clone -b workstation-14.0.0 https://github.com/mkubecek/vmware-host-modules.git
cd vmware-host-modules
#Overwrite existing vmmon archive
sudo tar cfv /usr/lib/vmware/modules/source/vmmon.tar vmmon-only/
#Install new modules
sudo vmware-modconfig --console --install-all
{% endhighlight %}