---
id: 582
title: Palo Alto Networks Traps Forensic Folder Anon Upload
date: 2017-01-06T12:35:22+00:00
author: Brett Johnson
layout: post
permalink: /BrettsITBlog/2017/01/palo-alto-networks-traps-forensic-folder-anon-upload/
academia_post_display_home:
  - ""
image: /wp-content/uploads/2017/01/Traps-by-Palo-Alto-Networks-Advanced-Endpoint-Protection.jpg
categories:
  - Security
tags:
  - EndPoint
  - Palo Alto
  - Security
  - Traps
---
#### <img class="alignnone wp-image-587" src="https://sdbrett.com/assets/images/2017/01/Traps-by-Palo-Alto-Networks-Advanced-Endpoint-Protection-300x130.jpg" alt="" width="372" height="161" srcset="https://sdbrett.com/assets/images2017/01/Traps-by-Palo-Alto-Networks-Advanced-Endpoint-Protection-300x130.jpg 300w, https://sdbrett.com/assets/images2017/01/Traps-by-Palo-Alto-Networks-Advanced-Endpoint-Protection-768x334.jpg 768w, https://sdbrett.com/assets/images2017/01/Traps-by-Palo-Alto-Networks-Advanced-Endpoint-Protection-260x113.jpg 260w, https://sdbrett.com/assets/images2017/01/Traps-by-Palo-Alto-Networks-Advanced-Endpoint-Protection.jpg 920w" sizes="(max-width: 372px) 100vw, 372px" />

#### Into

During my time deploying Palo Alto Traps. I noticed something a bit concerning with the Forensics Folder security. After verifying the discovery, I raised a ticket with PA. Which confirmed my findings.

The PA Traps Forensics Folder, cannot support any authentication.

To visit the offical Traps site, click [here](https://www.paloaltonetworks.com/products/secure-the-endpoint/traps)

#### Traps Terms Overview

ESM &#8211; Windows Servers which provide services to run PA Traps

Endpoints &#8211; Windows devices (Laptop, Desktop, Server)

Agent &#8211; PA Traps agent installed on Endpoint

#### Forensics Folder

When a process triggers a prevention event, the endpoint agent can capture forensic information. This is then uploaded to the Forensics Folder.

The location of the Forensics Folder is a URL. https://FF.company.com/BitsUpload. ESM servers provide agents with that URL.

The BITS protocol is used for uploads to the Forensics Folder. Thus, we configure IIS to provide the service.

During installation of the ESM Console, you are able to install a Forensics Folder. ESM will configure IIS for you. ESM console is not supported in the DMZ. Thus, you must configure IIS by hand. This is simple and documented.

#### Anonymous Upload to Forensics Folder

If you choose to do a manual configuration of the Forensics Folder. You should note authentication must be anonymous.

Through my testing, enabling 401 Windows auth, generates an error in the agent log.

Enabling client certificate verification does not error in the agent logs. but, the upload status in ESM will show as &#8216;failed&#8217;.

In short. To use this capability, you cannot use IIS to control who uploads to the Forensics Folder. As the agent does not support authentication.

On an internal network, this might be ok. Unless, you subscribe to the &#8216;Zero Trust&#8217; approach.

It is desirable to have agents upload forensic data. Without a public-facing folder, external endpoints must connect to the internal network to upload. Remember, these endpoints have detected local malware. A public facing folder is open to anyone who wishes to upload.

The client uploading must trust the SSL certificate provided by IIS. Or, have a flag to ignore.

#### Support for Forensics Folder in the DMZ

We have established that to work, the Forensics Folder must allow anonymous access. If public facing, this could be quite the issue. Yet according to the Admin guide, this is a supported configuration.

[<img class="alignnone wp-image-583 size-medium" src="https://sdbrett.com/assets/images/2017/01/WithoutVPN-300x156.png" alt="Traps Forensics Folder without VPN" width="300" height="156" srcset="https://sdbrett.com/assets/images2017/01/WithoutVPN-300x156.png 300w, https://sdbrett.com/assets/images2017/01/WithoutVPN-768x400.png 768w, https://sdbrett.com/assets/images2017/01/WithoutVPN-260x136.png 260w, https://sdbrett.com/assets/images2017/01/WithoutVPN.png 802w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2017/01/WithoutVPN.png)

[<img class="alignnone wp-image-584 size-medium" src="https://sdbrett.com/assets/images/2017/01/WithVPN-300x254.png" alt="Traps Forensics Folder with VPN" width="300" height="254" srcset="https://sdbrett.com/assets/images2017/01/WithVPN-300x254.png 300w, https://sdbrett.com/assets/images2017/01/WithVPN-260x220.png 260w, https://sdbrett.com/assets/images2017/01/WithVPN.png 762w" sizes="(max-width: 300px) 100vw, 300px" />](https://sdbrett.com/assets/images/2017/01/WithVPN.png)

Securing uploads to the Forensics Folder will require non-IIS authentication methods. These will depend on the capabilities of your environment. This may increase deployment complexity.

Placing the Forensics Folder in AWS could be an option. This is not something I have tested, but am planning on doing.

#### Raising with PA

In light of this, I raised a ticket with PA. After some back and forth, the fine response was.

&#8220;The upload to forensic folder with BITS is working as designed. The authentication option will be a feature request. &#8221;

Let&#8217;s hope that it leads to something.

#### Final Thoughts

While I have been trying to keep this post to the facts. Limiting personal influence. I would like to share a final thought.

Not providing a method to authenticate uploads feels like a big oversight. Anyone can upload to this folder.

I&#8217;m hoping that PA will provide agents the capability to authenticate against IIS. Securing the Forensics Folder, especially public facing.