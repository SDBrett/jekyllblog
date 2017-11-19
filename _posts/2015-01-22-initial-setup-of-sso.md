---
id: 26
title: Initial Setup of SSO
date: 2015-01-22T21:49:20+00:00
author: Brett Johnson
layout: post
permalink: /brettsitblog/2015/01/initial-setup-of-sso/
categories:
  - Vmware
---
SSO is an integral part of providing access rights to your Vcentre server. You can assign permissions to people based on their user account, group memberships and link it with various authentication methods.

After installing Vcentre for the first time log onto the Web Client with the username administrator@vsphere.local and the password you used during the install. The address for the Web Client will be
  
https://_Server Name_:9443/web-client
  
Though if you selected a different port to 9443 during the installation then use that.

[<img class="alignnone wp-image-28" src="https://sdbrett.com/assets/images2015/01/1-Initial-logon-300x76.png" alt="1 - Initial logon" width="721" height="183" srcset="https://sdbrett.com/assets/images2015/01/1-Initial-logon-300x76.png 300w, https://sdbrett.com/assets/images2015/01/1-Initial-logon.png 733w" sizes="(max-width: 721px) 100vw, 721px" />](https://sdbrett.com/assets/images2015/01/1-Initial-logon.png)

On the Left hand side go to Administration

[<img class="alignnone size-medium wp-image-29" src="https://sdbrett.com/assets/images2015/01/2-Vcentre-home-191x300.png" alt="2 - Vcentre home" width="191" height="300" srcset="https://sdbrett.com/assets/images2015/01/2-Vcentre-home-191x300.png 191w, https://sdbrett.com/assets/images2015/01/2-Vcentre-home.png 215w" sizes="(max-width: 191px) 100vw, 191px" />](https://sdbrett.com/assets/images2015/01/2-Vcentre-home.png)

Click Configuration > Identity Sources > Plus symbol

[<img class="alignnone wp-image-30" src="https://sdbrett.com/assets/images2015/01/3-Administration-300x65.png" alt="3 - Administration" width="512" height="111" srcset="https://sdbrett.com/assets/images2015/01/3-Administration-300x65.png 300w, https://sdbrett.com/assets/images2015/01/3-Administration-1024x222.png 1024w, https://sdbrett.com/assets/images2015/01/3-Administration.png 1188w" sizes="(max-width: 512px) 100vw, 512px" />](https://sdbrett.com/assets/images2015/01/3-Administration.png)

There are a number of authentication options. As my Vcentre server is part of a Windows domain, I will be using AD (Integrated Windows Authentication) in this example.
  
Enter the domain name if needed and if your Vcentre server is part of the Windows domain, select Use machine account.
  
If you want to use SPN please refer to http://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=2058298

[<img class="alignnone wp-image-38" src="https://sdbrett.com/assets/images2015/01/8-Add-Identity-Source1-276x300.png" alt="8 - Add Identity Source" width="308" height="335" srcset="https://sdbrett.com/assets/images2015/01/8-Add-Identity-Source1-276x300.png 276w, https://sdbrett.com/assets/images2015/01/8-Add-Identity-Source1.png 644w" sizes="(max-width: 308px) 100vw, 308px" />](https://sdbrett.com/assets/images2015/01/8-Add-Identity-Source1.png)

&nbsp;

From the left hand menu go to Users and Groups, then select the group you would like to change. In the lower box select the Add member button.

[<img class="alignnone wp-image-31" src="https://sdbrett.com/assets/images2015/01/4-Users-and-groups-300x209.png" alt="4 - Users and groups" width="400" height="279" srcset="https://sdbrett.com/assets/images2015/01/4-Users-and-groups-300x209.png 300w, https://sdbrett.com/assets/images2015/01/4-Users-and-groups.png 921w" sizes="(max-width: 400px) 100vw, 400px" />](https://sdbrett.com/assets/images2015/01/4-Users-and-groups.png)

Select your domain from the drop down menu and select the user / group you would like to add, then OK.

[<img class="alignnone wp-image-32" src="https://sdbrett.com/assets/images2015/01/5-Adding-user-284x300.png" alt="5 - Adding user" width="378" height="399" srcset="https://sdbrett.com/assets/images2015/01/5-Adding-user-284x300.png 284w, https://sdbrett.com/assets/images2015/01/5-Adding-user.png 526w" sizes="(max-width: 378px) 100vw, 378px" />](https://sdbrett.com/assets/images2015/01/5-Adding-user.png)

We are close to finished with adding the new users to the Vcentre server. We now need to add the newly assigned users and groups to specific Vcentre servers.

From the Left hand menu go

Home > Vcentre > Vcentre > Vcentre Servers > _Server Name_ > Manage > Permissions

[<img class="alignnone wp-image-33" src="https://sdbrett.com/assets/images2015/01/6-Permissions-300x61.png" alt="6 - Permissions" width="473" height="96" srcset="https://sdbrett.com/assets/images2015/01/6-Permissions-300x61.png 300w, https://sdbrett.com/assets/images2015/01/6-Permissions-1024x210.png 1024w, https://sdbrett.com/assets/images2015/01/6-Permissions.png 1113w" sizes="(max-width: 473px) 100vw, 473px" />](https://sdbrett.com/assets/images2015/01/6-Permissions.png)

Click on the Plus symbol

Select the role you would like to assign and then click Add
  
Select your user / group and OK and OK again.

[<img class="alignnone wp-image-34" src="https://sdbrett.com/assets/images2015/01/7-adding-permissions-269x300.png" alt="7 - adding permissions" width="352" height="393" srcset="https://sdbrett.com/assets/images2015/01/7-adding-permissions-269x300.png 269w, https://sdbrett.com/assets/images2015/01/7-adding-permissions.png 627w" sizes="(max-width: 352px) 100vw, 352px" />](https://sdbrett.com/assets/images2015/01/7-adding-permissions.png)

You have now given a domain member permissions to use the Vcentre server.