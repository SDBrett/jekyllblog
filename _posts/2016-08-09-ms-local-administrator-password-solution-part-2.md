---
id: 320
title: MS Local Administrator Password Solution. Part 2
date: 2016-08-09T21:36:34+00:00
author: Brett Johnson
layout: post
permalink: /brettsitblog/2016/08/ms-local-administrator-password-solution-part-2/
categories:
  - Server 2012
  - Windows
---
In [part 1](https://sdbrett.com/brettsitblog/2016/06/ms-local-administrator-password-solution-part-1/), we looked at making the necessary changes to AD for LAPS, from extended the schema to modifying the object attribute security.

In this part, we will go through deploying the LAPS agent on a workstation. This process is very straight forward, we will use GPO to deploy the agent to our workstation and confirm that the password is now random and stored in AD.

During the configuration of the workstation, I set the admin password as &#8220;Password1&#8221;, secure I know.

MS provide two separate installers, one for 32Bit and one for 64Bit. I suggest you download both.

On my DC I have created a share called &#8220;LapsDeploy&#8221;. Share permissions are &#8216;bypassed&#8217; by using Everyone Full Access and the NTFS permissions have been configured to allow Authenticated Users Read and Execute permissions.

On the DC, in GPMC I have created a policy called &#8220;LapsDeploy&#8221; and linked it to the LapsComputers OU, which is where my test workstation sits.

[<img class="alignnone size-full wp-image-335" src="https://sdbrett.com/assets/images/2016/08/Laps-GPO-Link.png" alt="Laps GPO Link" width="251" height="212" />](https://sdbrett.com/assets/images/2016/08/Laps-GPO-Link.png)

I&#8217;m not going to cover the individual steps for software deployment via GPO.

In GPO there are two sections that need to be configured. There is software deployment and the second is to allow password management, as well as some complexity settings.

As there are separate installers for 32 and 64 bit operating systems, it&#8217;s important to open the 32-bit installer properties, go to Deployment and Advanced. Make sure that &#8220;Make this 32-bit x86 application available to Win64 machines&#8221; is unticked.

[<img class="alignnone size-medium wp-image-340" src="https://sdbrett.com/assets/images/2016/08/Laps-GPO-x86-296x300.png" alt="Laps GPO x86" width="296" height="300" srcset="https://sdbrett.com/assets/images2016/08/Laps-GPO-x86-296x300.png 296w, https://sdbrett.com/assets/images2016/08/Laps-GPO-x86.png 401w" sizes="(max-width: 296px) 100vw, 296px" />](https://sdbrett.com/assets/images/2016/08/Laps-GPO-x86.png)

After the software installation part is done, navigate to Policies > Administrative Templates > LAPS. At a bare minimum the setting &#8220;Enable local admin password management&#8221; needs to be enabled. The rest are optional.

[<img class="alignnone size-medium wp-image-339" src="https://sdbrett.com/assets/images/2016/08/Laps-Setting-Management-300x46.png" alt="Laps Setting Management" width="300" height="46" srcset="https://sdbrett.com/assets/images2016/08/Laps-Setting-Management-300x46.png 300w, https://sdbrett.com/assets/images2016/08/Laps-Setting-Management-768x118.png 768w, https://sdbrett.com/assets/images2016/08/Laps-Setting-Management.png 835w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2016/08/Laps-Setting-Management.png)

Computers affected by the OU need to be restarted for the software to be installed. Sometimes two restarts are required.

Checking Programs and Features shows that LAPs is now installed.

[<img class="alignnone size-medium wp-image-337" src="https://sdbrett.com/assets/images/2016/08/Laps-installed-300x26.png" alt="Laps installed" width="300" height="26" srcset="https://sdbrett.com/assets/images2016/08/Laps-installed-300x26.png 300w, https://sdbrett.com/assets/images2016/08/Laps-installed.png 737w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2016/08/Laps-installed.png)

The System event logs also show that installation was successful.

[<img class="alignnone size-medium wp-image-332" src="https://sdbrett.com/assets/images/2016/08/Laps-Eventviewer-300x98.png" alt="Laps Eventviewer" width="300" height="98" srcset="https://sdbrett.com/assets/images2016/08/Laps-Eventviewer-300x98.png 300w, https://sdbrett.com/assets/images2016/08/Laps-Eventviewer.png 607w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2016/08/Laps-Eventviewer.png)

Back on the DC we can check that the password has been set using the fat client &#8220;LAPS UI&#8221; or through Powershell.

[<img class="alignnone size-medium wp-image-333" src="https://sdbrett.com/assets/images/2016/08/Laps-fat-client-300x219.png" alt="Laps fat client" width="300" height="219" srcset="https://sdbrett.com/assets/images2016/08/Laps-fat-client-300x219.png 300w, https://sdbrett.com/assets/images2016/08/Laps-fat-client.png 387w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2016/08/Laps-fat-client.png)

[<img class="alignnone size-medium wp-image-338" src="https://sdbrett.com/assets/images/2016/08/Laps-Password-300x32.png" alt="Laps Password" width="300" height="32" srcset="https://sdbrett.com/assets/images2016/08/Laps-Password-300x32.png 300w, https://sdbrett.com/assets/images2016/08/Laps-Password-768x81.png 768w, https://sdbrett.com/assets/images2016/08/Laps-Password.png 778w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2016/08/Laps-Password.png)

That&#8217;s it, LAPs is deployed and working.

Personally, I have found LAPS to be a great tool and easy to deploy and thinks it&#8217;s under-utilized in the real world.