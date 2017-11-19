---
id: 48
title: Default to Powershell in Windows Core
date: 2015-02-11T04:46:37+00:00
author: Brett Johnson
layout: post
permalink: /brettsitblog/2015/02/default-to-powershell-in-windows-core/
categories:
  - Powershell
  - Server 2012
---
One of the big pushes in Server 2012 is the use a Server Core installation instead of the full GUI install. Microsoft have put a lot of effort into encouraging administrators to use Powershell as a core tool for day to day administration of servers, which is why is seems a bit strange that a Server Core installation boots to a traditional command prompt instead of a Powershell prompt.

To change your Server Core installation to launch Powershell instead of the normal Command Prompt is a simple registry change.

From the Command Prompt run _Regedit_

Navigate to _HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon_

[<img class="alignnone size-medium wp-image-46" src="https://sdbrett.com/assets/images2015/02/Powershell-reg-default-300x218.png" alt="Powershell reg default" width="300" height="218" srcset="https://sdbrett.com/assets/images2015/02/Powershell-reg-default-300x218.png 300w, https://sdbrett.com/assets/images2015/02/Powershell-reg-default-1024x745.png 1024w, https://sdbrett.com/assets/images2015/02/Powershell-reg-default.png 1025w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images2015/02/Powershell-reg-default.png)

The highlighted _Shell_ dword is what we need to change, so double click on that and type in _powershell.exe_

[<img class="alignnone size-medium wp-image-47" src="https://sdbrett.com/assets/images2015/02/updated-300x138.png" alt="updated" width="300" height="138" srcset="https://sdbrett.com/assets/images2015/02/updated-300x138.png 300w, https://sdbrett.com/assets/images2015/02/updated.png 397w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images2015/02/updated.png)

Click _Ok_ and close the Registry Editior.

When you reboot the server you will now have a Powershell prompt.