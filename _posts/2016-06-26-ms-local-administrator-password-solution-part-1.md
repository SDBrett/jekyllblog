---
id: 287
title: MS Local Administrator Password Solution. Part 1
date: 2016-06-26T18:39:13+00:00
author: Brett Johnson
layout: post
permalink: /brettsitblog/2016/06/ms-local-administrator-password-solution-part-1/
categories:
  - Server 2012
  - Windows
---
In May 2015 Microsoft released Local Administrator Password Solution (LAPS) to help address the issue of keeping local administrator accounts secure. Setting the account password by GPO generally means a large number of computers will have the same password.

LAPS provides the ability for workstations to have randomly generated passwords, that are constantly refreshed and easy to retrieve. Managed workstations will set a random password which is stored in an AD attribute called ms-Mcs-AdmPwd. Passwords are automatically changed according to GPO settings. Using additional AD attributes means for LAPS to work, a schema extension is required.

LAPS can be downloaded from https://www.microsoft.com/en-us/download/details.aspx?id=46899. There are two MSI installers for LAPS, one for 64 bit and one for 32. Download both, as the MSI files will be used for client deployments and supplying the management tools.

**On to the installation.**

The first step for installation is to make sure you AD environment is healthy and replication is working. MS have also released a tool to help determine the health of AD replication. https://www.microsoft.com/en-au/download/details.aspx?id=30005

The installer has two component sections. The Client Side Extension (CSE), this is to be installed on the workstations to be &#8216;controlled&#8217; or &#8216;managed&#8217;. The management tools, these are used to view set passwords, extend schema, set permissions and GPO templates to apply settings.

Install management tools on the computer you are going to use for the setup / management of LAPS. Management tools will also need to be installed on computers of people who will be checking the passwords.

[<img class="size-medium wp-image-291 alignnone" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2016/06/MGMT-Selection-300x238.png" alt="MGMT Selection" width="300" height="238" srcset="https://sdbrett.com/assets/images2016/06/MGMT-Selection-300x238.png 300w, https://sdbrett.com/assets/images2016/06/MGMT-Selection.png 507w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/BrettsITBlog/wp-content/uploads/2016/06/MGMT-Selection.png)

&nbsp;

**Setting up AD**

Providing AD health is good, we can be on to setting up AD. This is going to be done in PowerShell. The first test is to import the new modules.

{% highlight powershell %}Import-Module AdmPwd.PS{% endhighlight %}

Now update the Schema, you have had change control approval, right??

{% highlight powershell %}Update-AdmPwdADSchema{% endhighlight %}

All going well you should get similar output

[<img class="wp-image-294 alignnone" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2016/06/Update-AdmSchema-Output-300x36.png" alt="Update-AdmSchema-Output" width="758" height="91" srcset="https://sdbrett.com/assets/images2016/06/Update-AdmSchema-Output-300x36.png 300w, https://sdbrett.com/assets/images2016/06/Update-AdmSchema-Output.png 684w" sizes="(max-width: 758px) 100vw, 758px" />](https://sdbrett.com/BrettsITBlog/wp-content/uploads/2016/06/Update-AdmSchema-Output.png)

The next stage of configuration is to set up correct permissions to the new attributes. We want computers to be able to update the attributes, but we don&#8217;t want unintended users to be able to see the values in those attributes. This requires making modifications in ADSIedit, while the process is straight forward this is one of those times where if you think you need to ask, ask.

First, we are going to remove the ability to see extended attributes for security principals that shouldn&#8217;t see them

Launch ADSIedit.msc and connect to the Default Naming Context

[<img class="alignnone wp-image-289 size-medium" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2016/06/ADSIedit-Connecto-300x300.png" alt="ADSIedit-Connecto" width="300" height="300" srcset="https://sdbrett.com/assets/images2016/06/ADSIedit-Connecto-300x300.png 300w, https://sdbrett.com/assets/images2016/06/ADSIedit-Connecto-150x150.png 150w, https://sdbrett.com/assets/images2016/06/ADSIedit-Connecto.png 395w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/BrettsITBlog/wp-content/uploads/2016/06/ADSIedit-Connecto.png)

Find the OU which contains computers that are going to have their passwords set using LAPS. Right click > Properties > Security > Advanced. For each non-administrative group, edit the permissions and make sure &#8220;All Extended Rights&#8221; is unchecked.

[<img class="alignnone size-medium wp-image-290" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2016/06/GroupRights-260x300.png" alt="GroupRights" width="260" height="300" srcset="https://sdbrett.com/assets/images2016/06/GroupRights-260x300.png 260w, https://sdbrett.com/assets/images2016/06/GroupRights.png 431w" sizes="(max-width: 260px) 100vw, 260px" />](https://sdbrett.com/BrettsITBlog/wp-content/uploads/2016/06/GroupRights.png)

Depending on the OU structure, you may need to repeat this step for the relevant OU&#8217;s.

It&#8217;s now time to set permissions allowing computers to set their password.

The permission change is recursive. Looking at the OU structure below, if I had computers in all OU&#8217;s and want to make the permissions change for all of them. I only need to run the command against OriginalOUName and the rest will be granted the permissions.

[<img class="alignnone wp-image-292" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2016/06/OU-structure.png" alt="OU structure" width="413" height="179" />](https://sdbrett.com/BrettsITBlog/wp-content/uploads/2016/06/OU-structure.png)

The command is

{% highlight powershell %}Set-AdmPwdComputerSelfPermission -OrgUnit "OriginalOUName"{% endhighlight %}

We can verify the command worked, show that the recursive nature of the command and principals with rights to view the passwords by running

{% highlight powershell %}Find-AdmPwdExtendedRights -Identity "OrgininalOUName" | FL{% endhighlight %}

[<img class="alignnone wp-image-295" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2016/06/AdmPwd-Extended-rights-300x67.png" alt="AdmPwd Extended rights" width="542" height="121" srcset="https://sdbrett.com/assets/images2016/06/AdmPwd-Extended-rights-300x67.png 300w, https://sdbrett.com/assets/images2016/06/AdmPwd-Extended-rights-768x172.png 768w, https://sdbrett.com/assets/images2016/06/AdmPwd-Extended-rights.png 840w" sizes="(max-width: 542px) 100vw, 542px" />](https://sdbrett.com/BrettsITBlog/wp-content/uploads/2016/06/AdmPwd-Extended-rights.png)

To allow more people, such as non-domain admins, to view the passwords run

{% highlight powershell %}Set-AdmPwdReadPasswordPermission -Identity "OriginalOUName" -Allowed Principals "Ticket Ninjas"{% endhighlight %}

That&#8217;s all for this section of setting up LAPS. In the next part, I&#8217;ll cover off deploying to client computers via GPO, GPO settings and how to view the passwords.

[Part2: Client deployment](https://sdbrett.com/BrettsITBlog/2016/08/ms-local-administrator-password-solution-part-2/)