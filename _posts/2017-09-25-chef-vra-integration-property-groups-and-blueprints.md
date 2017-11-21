---
id: 862
title: 'CHEF: vRA Integration, Property Groups and Blueprints'
date: 2017-09-25T15:59:20+00:00
author: Brett Johnson
layout: post
permalink: /BrettsITBlog/2017/09/chef-vra-integration-property-groups-and-blueprints/
academia_post_display_home:
  - ""
image: /wp-content/uploads/2017/07/chef-logo.png
categories:
  - Automation
  - Chef
  - Cloud
  - Vmware
  - vRA
  - vRO
  - vSphere
tags:
  - Automation
  - Chef
  - VMware
  - Cloud
  - vRA
  - vRO
  - vSphere
---

The Chef plugin provides some workflows to help with getting the vRA integration up and running with minimal effort. I would suggest treating them as samples to build functionality on top of. There are some limitations from the default state which might not provide sufficient flexibility for production usage.

#### Setting up the Property Groups:

Launch the vRO Client and navigate to the Chef workflow ‘_Create Property Group for Chef_ EBS _Workflows_’.

[<img class="alignnone size-medium wp-image-849" src="https://sdbrett.com/assets/images/2017/09/vCO-Chef-client-tree-248x300.png" alt="" width="248" height="300" srcset="https://sdbrett.com/assets/images2017/09/vCO-Chef-client-tree-248x300.png 248w, https://sdbrett.com/assets/images2017/09/vCO-Chef-client-tree-768x930.png 768w, https://sdbrett.com/assets/images2017/09/vCO-Chef-client-tree-260x315.png 260w, https://sdbrett.com/assets/images2017/09/vCO-Chef-client-tree.png 834w" sizes="(max-width: 248px) 100vw, 248px" />](https://sdbrett.com/assets/images/2017/09/vCO-Chef-client-tree.png)

Run the workflow and enter the required information

[<img class="alignnone size-medium wp-image-861" src="https://sdbrett.com/assets/images/2017/09/vRO-Chef-Client-Add-Prop-Groups-300x280.png" alt="" width="300" height="280" srcset="https://sdbrett.com/assets/images2017/09/vRO-Chef-Client-Add-Prop-Groups-300x280.png 300w, https://sdbrett.com/assets/images2017/09/vRO-Chef-Client-Add-Prop-Groups-768x717.png 768w, https://sdbrett.com/assets/images2017/09/vRO-Chef-Client-Add-Prop-Groups-1024x956.png 1024w, https://sdbrett.com/assets/images2017/09/vRO-Chef-Client-Add-Prop-Groups-260x243.png 260w, https://sdbrett.com/assets/images2017/09/vRO-Chef-Client-Add-Prop-Groups.png 1470w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2017/09/vRO-Chef-Client-Add-Prop-Groups.png)

  * Property Group Name 
      * Unique name to identify the property group in vRA
  * Chef Runlist 
      * Array of run lists to be run as part of the first run
  * Install Chef Client on VM’s 
      * This Boolean option determines if the Chef client is to be installed
  * Windows MSI Installer URL 
      * While this entry doesn’t have isn’t relevant to Linux VMs, the field is mandatory.
  * Install As service 
      * Again, only relevant to Windows, but is optional
  * Guest Username and Password 
      * Enter credentials that will be available at the time of deployment
      * If you’re using guest customization scripts to create accounts, these will be created before the POST Machine Provisioning event which installs the Chef client.

Click Submit and wait for the workflow to complete.

#### Checking Property Group in vRA

Login into your vRA tenant and go to **Administration** > **Property Dictionary** > **Property** **Groups**.

Here you will see the new group that you just created. If you like, you can remove options where are not required, such as the MSI path if it’s not required.

[<img class="alignnone size-medium wp-image-852" src="https://sdbrett.com/assets/images/2017/09/vRA-Chef-client-property-groups-300x50.png" alt="" width="300" height="50" srcset="https://sdbrett.com/assets/images2017/09/vRA-Chef-client-property-groups-300x50.png 300w, https://sdbrett.com/assets/images2017/09/vRA-Chef-client-property-groups-768x128.png 768w, https://sdbrett.com/assets/images2017/09/vRA-Chef-client-property-groups-1024x171.png 1024w, https://sdbrett.com/assets/images2017/09/vRA-Chef-client-property-groups-260x43.png 260w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2017/09/vRA-Chef-client-property-groups.png)

[<img class="alignnone size-medium wp-image-851" src="https://sdbrett.com/assets/images/2017/09/vRA-Chef-client-property-Group-300x147.png" alt="" width="300" height="147" srcset="https://sdbrett.com/assets/images2017/09/vRA-Chef-client-property-Group-300x147.png 300w, https://sdbrett.com/assets/images2017/09/vRA-Chef-client-property-Group-768x376.png 768w, https://sdbrett.com/assets/images2017/09/vRA-Chef-client-property-Group-1024x502.png 1024w, https://sdbrett.com/assets/images2017/09/vRA-Chef-client-property-Group-260x127.png 260w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2017/09/vRA-Chef-client-property-Group.png)

#### Adding Property Group to a Blueprint

In vRA navigate to **Design** > **Blueprints** and select an existing IaaS blueprint or create a new one. The blueprint should deploy a Virtual Machine, I have only tested this with a vSphere VM, no other deployments yet.

[<img class="alignnone size-medium wp-image-857" src="https://sdbrett.com/assets/images/2017/09/vRA-IaaS-Blueprint-VM-300x92.png" alt="" width="300" height="92" srcset="https://sdbrett.com/assets/images2017/09/vRA-IaaS-Blueprint-VM-300x92.png 300w, https://sdbrett.com/assets/images2017/09/vRA-IaaS-Blueprint-VM-768x237.png 768w, https://sdbrett.com/assets/images2017/09/vRA-IaaS-Blueprint-VM-1024x315.png 1024w, https://sdbrett.com/assets/images2017/09/vRA-IaaS-Blueprint-VM-260x80.png 260w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2017/09/vRA-IaaS-Blueprint-VM.png)

From the blueprint, select the virtual machine and go to properties and Click **Add** then select your Property Group. You can view the properties that have been imported through the button ‘_View Merged Properties_’ at the bottom left.

[<img class="alignnone size-medium wp-image-850" src="https://sdbrett.com/assets/images/2017/09/vRA-Blueprint-merged-properties-300x149.png" alt="" width="300" height="149" srcset="https://sdbrett.com/assets/images2017/09/vRA-Blueprint-merged-properties-300x149.png 300w, https://sdbrett.com/assets/images2017/09/vRA-Blueprint-merged-properties-768x383.png 768w, https://sdbrett.com/assets/images2017/09/vRA-Blueprint-merged-properties-1024x510.png 1024w, https://sdbrett.com/assets/images2017/09/vRA-Blueprint-merged-properties-260x130.png 260w, https://sdbrett.com/assets/images2017/09/vRA-Blueprint-merged-properties.png 1594w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2017/09/vRA-Blueprint-merged-properties.png)

**Save** and Close the blueprint. At this point, I will assume that you have gone through the catalog deployment steps.

#### Configuring EBS

To make the Install Chef Client workflow fire when a Virtual Machine is deployed, we need to configure an EBS subscription. The subscription will run when an event matching the specified conditions occurs.

Navigate to **Administration** > **Events** > **Subscriptions**.

[<img class="alignnone size-medium wp-image-853" src="https://sdbrett.com/assets/images/2017/09/vRA-event-subs-300x62.png" alt="" width="300" height="62" srcset="https://sdbrett.com/assets/images2017/09/vRA-event-subs-300x62.png 300w, https://sdbrett.com/assets/images2017/09/vRA-event-subs-768x159.png 768w, https://sdbrett.com/assets/images2017/09/vRA-event-subs-1024x212.png 1024w, https://sdbrett.com/assets/images2017/09/vRA-event-subs-260x54.png 260w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2017/09/vRA-event-subs.png)

Select **New** and from the list of Event Topics select ‘_Machine Provisioning_’. Click **Next**

[<img class="alignnone size-medium wp-image-858" src="https://sdbrett.com/assets/images/2017/09/vRA-New-subscription-1-300x155.png" alt="" width="300" height="155" srcset="https://sdbrett.com/assets/images2017/09/vRA-New-subscription-1-300x155.png 300w, https://sdbrett.com/assets/images2017/09/vRA-New-subscription-1-768x396.png 768w, https://sdbrett.com/assets/images2017/09/vRA-New-subscription-1-1024x529.png 1024w, https://sdbrett.com/assets/images2017/09/vRA-New-subscription-1-260x134.png 260w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2017/09/vRA-New-subscription-1.png)

Set up the conditions as below

  * Data > Lifecycle State > State Name, Equals, VMPSMasterWorkflow32.MachineProvisioned
  * Data > Lifecycle State > State Phase, Equals, Post
  * Data > Machine, Machine Type, Equals Virtual Machine
  * [<img class="alignnone size-medium wp-image-859" src="https://sdbrett.com/assets/images/2017/09/vRA-new-subscription-conditions-300x142.png" alt="" width="300" height="142" srcset="https://sdbrett.com/assets/images2017/09/vRA-new-subscription-conditions-300x142.png 300w, https://sdbrett.com/assets/images2017/09/vRA-new-subscription-conditions-768x363.png 768w, https://sdbrett.com/assets/images2017/09/vRA-new-subscription-conditions-1024x485.png 1024w, https://sdbrett.com/assets/images2017/09/vRA-new-subscription-conditions-260x123.png 260w, https://sdbrett.com/assets/images2017/09/vRA-new-subscription-conditions.png 1344w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2017/09/vRA-new-subscription-conditions.png)

Under the Workflow Tab, navigate through the vRO menu tree to ‘_EBS – Machine Provisioned – Chef_’. Click Next

[<img class="alignnone size-medium wp-image-855" src="https://sdbrett.com/assets/images/2017/09/vRA-Event-subscription-WF-Tree-300x139.png" alt="" width="300" height="139" srcset="https://sdbrett.com/assets/images2017/09/vRA-Event-subscription-WF-Tree-300x139.png 300w, https://sdbrett.com/assets/images2017/09/vRA-Event-subscription-WF-Tree-768x356.png 768w, https://sdbrett.com/assets/images2017/09/vRA-Event-subscription-WF-Tree-1024x474.png 1024w, https://sdbrett.com/assets/images2017/09/vRA-Event-subscription-WF-Tree-260x120.png 260w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2017/09/vRA-Event-subscription-WF-Tree.png)

On the final tab, you can choose if the event will be blocking or not. A blocking event will run before any non-blocking event. If there are multiple blocking events, they will run in the priority order set.

[<img class="alignnone size-medium wp-image-854" src="https://sdbrett.com/assets/images/2017/09/vRA-Event-Subscription-Details-300x161.png" alt="" width="300" height="161" srcset="https://sdbrett.com/assets/images2017/09/vRA-Event-Subscription-Details-300x161.png 300w, https://sdbrett.com/assets/images2017/09/vRA-Event-Subscription-Details-768x412.png 768w, https://sdbrett.com/assets/images2017/09/vRA-Event-Subscription-Details-1024x549.png 1024w, https://sdbrett.com/assets/images2017/09/vRA-Event-Subscription-Details-260x139.png 260w, https://sdbrett.com/assets/images2017/09/vRA-Event-Subscription-Details.png 1238w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2017/09/vRA-Event-Subscription-Details.png)

The choice of using blocking here depends on your requirements for other post provision workflows.

After clicking **Finish** make sure to publish the new event subscription.

#### Starting a Workflow

Under the Catalog Tab, request the blueprint that you added the Chef property group too. If you select the VM and select Properties, you can view and edit the values for the properties in the property group. Additional configuration can prevent these values from being changed.

[<img class="alignnone size-medium wp-image-860" src="https://sdbrett.com/assets/images/2017/09/vRA-Request-properties-300x107.png" alt="" width="300" height="107" srcset="https://sdbrett.com/assets/images2017/09/vRA-Request-properties-300x107.png 300w, https://sdbrett.com/assets/images2017/09/vRA-Request-properties-768x274.png 768w, https://sdbrett.com/assets/images2017/09/vRA-Request-properties-1024x365.png 1024w, https://sdbrett.com/assets/images2017/09/vRA-Request-properties-260x93.png 260w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2017/09/vRA-Request-properties.png)

After submitting the workflow, the Chef client will install on the new VM and perform normal bootstrap operations.

With some more work, you can populate these items from user input selections. For example, the value of ‘_runlist_’ can be set based on the application a user would like installed.

#### Summary

The Chef plugin has provided some easy options to get started with deploying the Chef client to provisioned VMs using vRA. Consider the properties as a getting started point, to get real value think of ways to expand how the age is deployed.

For example, the Chef server might be selected based on the vRA Business Group a User is a part of. Or the Chef environment could be selected based on the cluster a VM is deployed to.