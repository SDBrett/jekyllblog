---
id: 831
title: 'CHEF: Integration with vRA, installing the vRO plugin'
date: 2017-09-07T09:08:05+00:00
author: Brett Johnson
layout: post
permalink: /brettsitblog/2017/09/chef-integration-vra-installing-vro-plugin/
academia_post_display_home:
  - ""
image: /wp-content/uploads/2017/07/chef-logo.png
categories:
  - Automation
  - Chef
  - Vmware
  - vRA
  - vRO
tags:
  - Automation
  - chef
  - VMware
  - vRA
  - vRO
---

The Chef agent is installed on a VM after the VM has been deployed and completed the ‘Machine Building’ stage of deployment. This is achieved by creating an event subscription through vRAs Event Broker Service (EBS).

When an event triggers an EBS subscription, vRA communicates with vRO causing a workflow to run. This means the first step of configuring Chef integration with vRA is to configure the Chef vRO plugin.

This post assumes some familiarity with vRO, vRA and Chef. To perform these tasks, your Chef server should be configured and running.

Steps detailed have been performed on vRA 7.3 with the embedded vRO appliance.

#### Integration with vRO

The Chef vRO plugin provides a number of prebuilt workflows for interacting with a Chef server and the object types for Chef components. Installation and configuration of the plugin in quite straight forward and required to use Chef with vRA.

Download the plugin from the VMware Solution Exchange or this [link.](https://marketplace.vmware.com/vsx/solutions/chef-plugin-for-vrealize-orchestrator)

To install the plugin to vRO, you need to navigate to the vRO control center. If you’re using the embedded vRO appliance, the control center is disabled by default. Follow the steps detailed in this [link](https://docs.vmware.com/en/vRealize-Automation/7.3/com.vmware.vra.prepare.use.doc/GUID-727FBB27-C440-4C95-B6B5-2B86C9E7D4F6.html) to activate.

##### Import Certs

The first step is to import the certificate for your Chef server. Follow the steps below from the vRO Control Center.

Click on Certificates

[<img class="alignnone wp-image-830 size-medium" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Contol-Center-Certs-300x120.png" alt="" width="300" height="120" srcset="https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Certs-300x120.png 300w, https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Certs-768x306.png 768w, https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Certs-1024x408.png 1024w, https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Certs-260x104.png 260w, https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Certs.png 1300w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Contol-Center-Certs.png)

Enter the URL of your Chef server and click Import

[<img class="alignnone wp-image-829 size-medium" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Contol-Center-Input-URL-300x146.png" alt="" width="300" height="146" srcset="https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Input-URL-300x146.png 300w, https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Input-URL-768x375.png 768w, https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Input-URL-1024x500.png 1024w, https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Input-URL-260x127.png 260w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Contol-Center-Input-URL.png)

##### Installing the Plugin

From the main page of the Control Center scroll down the page and click on Manage Plugins

[<img class="alignnone wp-image-828 size-medium" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Contol-Center-Plugins-257x300.png" alt="" width="257" height="300" srcset="https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Plugins-257x300.png 257w, https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Plugins-260x303.png 260w, https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Plugins.png 312w" sizes="(max-width: 257px) 100vw, 257px" />](https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Contol-Center-Plugins.png)

Upload the Plugin

[<img class="alignnone wp-image-827 size-medium" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Contol-Center-Install-plugin-300x103.png" alt="" width="300" height="103" srcset="https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Install-plugin-300x103.png 300w, https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Install-plugin-768x263.png 768w, https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Install-plugin-1024x350.png 1024w, https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Install-plugin-260x89.png 260w, https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Install-plugin.png 1310w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Contol-Center-Install-plugin.png)

Accept the EULA and click Install

[<img class="alignnone wp-image-826 size-medium" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Contol-Center-Accept-EULA-300x293.png" alt="" width="300" height="293" srcset="https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Accept-EULA-300x293.png 300w, https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Accept-EULA-768x750.png 768w, https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Accept-EULA-1024x1000.png 1024w, https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Accept-EULA-260x254.png 260w, https://sdbrett.com/assets/images2017/09/vRO-Contol-Center-Accept-EULA.png 1178w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Contol-Center-Accept-EULA.png)

If you’re running a vRO cluster, you need to restart the vRO services to synchronize the change.

#### **Connecting the Chef Server as an Endpoint**

For vRO to communicate with the Chef server, you will need to configure an endpoint.

Launch the vRO client and go to Workflows > Library > Chef > Configuration

Select Add Chef Host

[<img class="alignnone wp-image-825 size-medium" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Client-Add-Chef-Host-300x241.png" alt="" width="300" height="241" srcset="https://sdbrett.com/assets/images2017/09/vRO-Client-Add-Chef-Host-300x241.png 300w, https://sdbrett.com/assets/images2017/09/vRO-Client-Add-Chef-Host-260x208.png 260w, https://sdbrett.com/assets/images2017/09/vRO-Client-Add-Chef-Host.png 666w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Client-Add-Chef-Host.png)

Enter the required data and click Submit

[<img class="alignnone wp-image-824 size-medium" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Client-Chef-Add-Host-Data-300x284.png" alt="" width="300" height="284" srcset="https://sdbrett.com/assets/images2017/09/vRO-Client-Chef-Add-Host-Data-300x284.png 300w, https://sdbrett.com/assets/images2017/09/vRO-Client-Chef-Add-Host-Data-768x727.png 768w, https://sdbrett.com/assets/images2017/09/vRO-Client-Chef-Add-Host-Data-1024x970.png 1024w, https://sdbrett.com/assets/images2017/09/vRO-Client-Chef-Add-Host-Data-260x246.png 260w, https://sdbrett.com/assets/images2017/09/vRO-Client-Chef-Add-Host-Data.png 1476w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Client-Chef-Add-Host-Data.png)

After the workflow completed, your Chef server has been added as an endpoint. If the work fails, validate your input and correct where required.

You can verify the connection to the Chef server using the workflow “Chef Server

[<img class="alignnone wp-image-823 size-medium" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Client-Check-Chef-Status-300x241.png" alt="" width="300" height="241" srcset="https://sdbrett.com/assets/images2017/09/vRO-Client-Check-Chef-Status-300x241.png 300w, https://sdbrett.com/assets/images2017/09/vRO-Client-Check-Chef-Status-768x618.png 768w, https://sdbrett.com/assets/images2017/09/vRO-Client-Check-Chef-Status-1024x824.png 1024w, https://sdbrett.com/assets/images2017/09/vRO-Client-Check-Chef-Status-260x209.png 260w, https://sdbrett.com/assets/images2017/09/vRO-Client-Check-Chef-Status.png 1474w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Client-Check-Chef-Status.png)

The output of the workflow should be similar to the image below

[<img class="alignnone wp-image-822 size-medium" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Client-Check-Chef-Status-Output-300x135.png" alt="" width="300" height="135" srcset="https://sdbrett.com/assets/images2017/09/vRO-Client-Check-Chef-Status-Output-300x135.png 300w, https://sdbrett.com/assets/images2017/09/vRO-Client-Check-Chef-Status-Output-768x347.png 768w, https://sdbrett.com/assets/images2017/09/vRO-Client-Check-Chef-Status-Output-1024x462.png 1024w, https://sdbrett.com/assets/images2017/09/vRO-Client-Check-Chef-Status-Output-260x117.png 260w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/BrettsITBlog/wp-content/uploads/2017/09/vRO-Client-Check-Chef-Status-Output.png)

#### Summary

This completes the vRO stage of integrating Chef with vRA. In the upcoming posts, we will look at the EBS and property groups to make everything work.