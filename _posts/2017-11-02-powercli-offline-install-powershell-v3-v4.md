---
id: 885
title: 'PowerCLI: Offline install Powershell v3 and v4'
date: 2017-11-02T11:25:25+00:00
author: Brett Johnson
layout: post
permalink: /BrettsITBlog/2017/11/powercli-offline-install-powershell-v3-v4/
academia_post_display_home:
  - ""
categories:
  - PowerCLI
  - Powershell
  - Vmware
tags:
  - PowerCLI
  - powershell
  - VMware
---


Today I came across the need to use PowerCLI on a computer without internet access. Thankfully I found this [blog post](https://blogs.vmware.com/PowerCLI/2017/04/powercli-install-process-powershell-gallery.html) detailing the steps that I needed to perform, however not all was rainbows and unicorns. I quickly ran aground when attempting to import the modules. After a bit of research, I learnt that Microsoft had changed the module directory structure in PowerShell v5. This new structure is not compatible with previous versions.

#### **The Problem**

When using `Install-Module` to install a module, the module files as located in a subdirectory which is the version number. This is not a supported directory structure for PowerShell version 3 and 4. This caused an error when attempting to import, PowerShell could not find the modules.

[<img class="alignnone size-medium wp-image-887" src="https://sdbrett.com/assets/images/2017/11/PowerShell-v5-Module-Structure-224x300.png" alt="PowerShell v5 Module Structure" width="224" height="300" srcset="https://sdbrett.com/assets/images/2017/11/PowerShell-v5-Module-Structure-224x300.png 224w, https://sdbrett.com/assets/images/2017/11/PowerShell-v5-Module-Structure-768x1030.png 768w, https://sdbrett.com/assets/images/2017/11/PowerShell-v5-Module-Structure-763x1024.png 763w, https://sdbrett.com/assets/images/2017/11/PowerShell-v5-Module-Structure-260x349.png 260w, https://sdbrett.com/assets/images/2017/11/PowerShell-v5-Module-Structure.png 972w" sizes="(max-width: 224px) 100vw, 224px" />](https://sdbrett.com/assets/images/2017/11/PowerShell-v5-Module-Structure.png)

[<img class="alignnone size-medium wp-image-886" src="https://sdbrett.com/assets/images/2017/11/PowerShell-v3v4-Module-Structure-221x300.png" alt="PowerShell v3v4 Module Structure" width="221" height="300" srcset="https://sdbrett.com/assets/images/2017/11/PowerShell-v3v4-Module-Structure-221x300.png 221w, https://sdbrett.com/assets/images/2017/11/PowerShell-v3v4-Module-Structure-768x1040.png 768w, https://sdbrett.com/assets/images/2017/11/PowerShell-v3v4-Module-Structure-756x1024.png 756w, https://sdbrett.com/assets/images/2017/11/PowerShell-v3v4-Module-Structure-260x352.png 260w, https://sdbrett.com/assets/images/2017/11/PowerShell-v3v4-Module-Structure.png 908w" sizes="(max-width: 221px) 100vw, 221px" />](https://sdbrett.com/assets/images/2017/11/PowerShell-v3v4-Module-Structure.png)

#### The Solution

The solution to the problem is simple enough, move the module files up one directory. As there are a number of modules this can be tedious. So here&#8217;s a script to do that for you

{% highlight powershell %}
$ModuleFolders = Get-ChildItem VMware*

Foreach($ModuleFolder in $ModuleFolders){
    $VersionFolder = $ModuleFolder | Get-ChildItem -Directory
    $CopySourceString = $VersionFolder.FullName + "\*"
    Copy-Item $CopySourceString $ModuleFolder.FullName -Verbose
}
{% endhighlight %}

Further details on the script are available on [GitHub](https://github.com/SDBrett/powershellScripts/tree/master/powerCLIOfflineInstallFix).

After running the script, I was able to user PowerCLI for super-secret spy business.

&nbsp;