---
id: 567
title: Discover and Clear Admin Count Attribute with PowerShell
date: 2016-12-17T06:12:12+00:00
author: Brett Johnson
layout: post
permalink: /BrettsITBlog/2016/12/discover-clear-admincount-powershell/
academia_post_display_home:
  - ""
image: /wp-content/uploads/2016/12/PowerShellIcon.png
categories:
  - Powershell
  - Server 2012
  - Windows
tags:
  - Guide
  - microsoft
  - powershell
  - script
  - windows
---
<img class="alignnone size-medium wp-image-545" src="https://sdbrett.com/assets/images/2016/12/PowerShellIcon-300x196.png" alt="" width="300" height="196" srcset="https://sdbrett.com/assets/images2016/12/PowerShellIcon-300x196.png 300w, https://sdbrett.com/assets/images2016/12/PowerShellIcon-260x170.png 260w, https://sdbrett.com/assets/images2016/12/PowerShellIcon.png 391w" sizes="(max-width: 300px) 100vw, 300px" />

#### What is Admin Count?

Before we discuss Admin Count, a little background is needed. AD contains an object called AdminSDHolder. Its purpose is to protect objects. Specifically, objects which are members of administrative groups.

AD objects have an attribute called &#8220;Admin Count&#8221;. The default value is <not set> for most objects. Changing the value to &#8220;1&#8221;, flags the account as protected by AdminSDHolder.

By adding a user to an administrative AD group. You change the value to &#8220;1&#8221;. As a result, the user object is subject to stricter ACLs. Such as, disabled permission inheritance. Furthermore, many admins are not aware of this.

Prevention is the best medicine, or so they say. If you are unaware of these conditions and attributes. Please read this [article](https://technet.microsoft.com/en-us/library/2009.09.sdadminholder.aspx).

#### Finding Affected Accounts

We have noticed that accounts cannot be managed by the Help Desk. We discover that Admin Count is &#8220;1&#8221;. As a result, we need to find all affected accounts.

Below is a script which will change for user objects affected. First of all, this script will not make changes. This is has been separated by design.

{% highlight powershell %}#Set Variable users to get all User objects within OU specified in searchbase
$users = Get-ADUser -ldapfilter “(objectclass=user)” -searchbase “SEARCH”
$CSVPath = "ENTER CSV OUTPATH"
$list = @()

ForEach($user in $users)
{
    # Binding the users to DS
    $ou = [ADSI](“LDAP://” + $user)
    $sec = $ou.psbase.objectSecurity

    if ($sec.get_AreAccessRulesProtected()) #If the account is protected. The statement returns true and runs the script block.
    {
	    $list += get-aduser $user.DistinguishedName -Properties "admincount" | select Name,
        @{N="AdminCount"; E={$_.AdminCount}}        
    }
}
$list | Export-Csv $CSVPath -NoTypeInformation{% endhighlight %}

#### Correcting the Problem

In order to correct the problem, we run another script. This script is very close to the first. The reason for two scripts is change control. Our first script doesn&#8217;t contain functionality to make changes. As a result, we lower the chance of mistake.

As you will see, the second script is similar to the first in a number of ways. You run this from a computer joined to the affected domain. Therefore, if you&#8217;re an external party this is to be run on a client side system.

{% highlight powershell %}$users = Get-ADUser -ldapfilter “(objectclass=user)” -searchbase “SEARCH BASE”

#Get domain values
$domain = Get-ADDomain 
$domainPdc = $domain.PDCEmulator
$domainDn = $domain.DistinguishedName

#HashTable to be used for the reset
$replaceAttributeHashTable = New-Object HashTable 
$replaceAttributeHashTable.Add("AdminCount",0)

$isProtected = $false ## allows inheritance
$preserveInheritance = $true ## preserve inheritance rules


ForEach($user in $users)
{
    # Binding the users to DS
    $ou = [ADSI](“LDAP://” + $user)
    $sec = $ou.psbase.objectSecurity

    if ($sec.get_AreAccessRulesProtected())
    {
		#Changes AdminCount back to &lt;not set&gt;
        Get-ADuser $user.DistinguishedName -Properties "admincount" | Set-ADUser -Remove $replaceAttributeHashTable  -Server $domainPdc
        #Change security and commit
		$sec.SetAccessRuleProtection($isProtected, $preserveInheritance)
        $ou.psbase.commitchanges()
    }
}{% endhighlight %}

#### Final Notes

If you do not correct the root cause, Admin Count and security permissions will revert within the hour. You must remove accounts from the administrative group.

&nbsp;