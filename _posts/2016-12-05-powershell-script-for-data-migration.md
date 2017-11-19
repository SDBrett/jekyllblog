---
id: 540
title: PowerShell Script for Data Migration
date: 2016-12-05T22:37:19+00:00
author: Brett Johnson
layout: post
permalink: /brettsitblog/2016/12/powershell-script-for-data-migration/
academia_post_display_home:
  - ""
categories:
  - Powershell
  - Windows
tags:
  - learning
  - microsoft
  - powershell
  - script
  - technology
  - windows
---
<img class="alignnone size-medium wp-image-545" src="https://sdbrett.com/BrettsITBlog/wp-content/uploads/2016/12/PowerShellIcon-300x196.png" alt="powershellicon" width="300" height="196" srcset="https://sdbrett.com/assets/images2016/12/PowerShellIcon-300x196.png 300w, https://sdbrett.com/assets/images2016/12/PowerShellIcon-260x170.png 260w, https://sdbrett.com/assets/images2016/12/PowerShellIcon.png 391w" sizes="(max-width: 300px) 100vw, 300px" />

I recently needed to create a script for the purpose of migrating data. Due to complexity, a number of scripts were used. This post covers the script I created to remove illegal characters from directory names. Also adjusting for new directory paths.

### Migration Overview

The migration had some quirks. Due to this, a simple A to B move wasn&#8217;t an option. There was some restructuring and many folders were not to coming across.

Due to these requirements, I ended up creating a list of folders which would migrate. From this list, I needed to remove the illegal characters and create new directory paths.

I used two CSV files. In one CSV file, I had the root directories and it&#8217;s destination. A second CSV contained the full source path of 14,000 directories.

### The Script

The logic of the script is straightforward. This is not to say that I found the task easy. The logic flow presented some new thinking. This script is what creates the new directory structure. It does not move the data.

At the start, we import the two CSV folders. $CopyDirs being the full list of directories which we will migrate. $SourceDest contains the source and destination root directories.

{% highlight powershell %}$imp = @("C:\Users\Administrator\Desktop\copydirs.csv", "C:\Users\Administrator\sourcedest.csv")
$copydirs = Import-Csv $imp[0]
$SourceDest = Import-Csv $imp[1]{% endhighlight %}

The first loop steps through each item in the $SourceDest variable. For each item it finds, another loop kicks off.

{% highlight powershell %}ForEach ($x in $SourceDest) #Loop through items in SourceDest. $X represents a root directory 
{
    #Write-Host $x.Source
    ForEach ($y in $copydirs){% endhighlight %}

### IF Statement

{% highlight powershell %}IF($y.Folders.StartsWith($x.Source)){% endhighlight %}

To make sure we do not look at directories are do not start with our current root directory. We use an IF statement. We say that IF our entry in $CopyDirs starts with the current root in $SourceDest, do something.

The omission of any other IF statements or an ELSE statement means if there is no match, do nothing.

### Removing the illegal characters

{% highlight powershell %}$CleanName = $y.Folders -replace '[+]',''
$CleanName = $CleanName -replace '[?]',''{% endhighlight %}

The two lines after the IF statement are where we clean the directory name. For this task, I only had to worry about the &#8220;+&#8221; and &#8220;?&#8221; characters.

IF the directory name contained these, it would remove them. By this I mean, it would replace with nothing.

We end up with $CleanName. This variable is the directory name without illegal characters.

### Constructing the new path

{% highlight powershell %}$dest = (($CleanName).Substring($x.source.Length))
$dest = $x.Destination + $dest{% endhighlight %}

After we have cleaned the directory name, we now need to remove the root path from the directory. We then attach the new root.

We get the number of characters in the original root directory using the length method. The &#8220;SubString&#8221; method then removes that number of characters from $CleanName.

This leaves us with a directory path without the root leading. This is $dest. We then combine $dest to the destination from our CSV file.

Finally, we have a full path without illegal characters. We can create the structure.

### Creating new directories

{% highlight powershell %}Try
            {
                if (!(Test-Path $dest))
                {
                    Write-Host "Creating " $dest -ForegroundColor Green
                    New-Item -Path $dest -ItemType Directory -ErrorAction stop
                }
            }
            Catch
            { 
                $ErrMSG = "Error Copying Directory: " + $CleanName
                $ErrMSG | Out-File C:\users\Administrator\errors.txt -Append
                $_.Exception.Message | out-file C:\users\Administrator\errors.txt -Append
{% endhighlight %}

Try and Catch allows errors to be captured. This is important for logging our script. The script will attempt to do something. If there is an exception raised. The catch will handle the exception.

Due to the per directory evaluation, there were some issues with repetition. This is to say, the attempts to create the directory more than once.

An IF statement combined with Test-Path helps resolve this. We only want to create a directory if it doesn&#8217;t exist.

With Test-Path returning false, our new directory gets created.

### Out-File and Write-Host

I made use of Out-File to record logs. A log called &#8220;Full.txt&#8221; provide information of the process on paths.

Errors.txt allowed for viewing of any exceptions. This was especially useful to find that I needed test-path.

There are some &#8216;write-host&#8217; lines in the script. Some commented out, some not. These are for live debugging and making sure that the script was still processing.

### Summary

This is a script I have now added to my snippets. It helped with learning string manipulation. Something that is handy to know. I have uploaded the script in full and sample CSV to GitHub.

<https://github.com/oversizedspoon/DataMigration>

&nbsp;