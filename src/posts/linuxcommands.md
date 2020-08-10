---
title: "Starter Linux Commands"
date: "2019-12-31"
tags: ["Bash", "Linux"]
---

Linux is a great operating system with many useful distributions, but many of us are used to the Windows and Mac type of GUI (Graphical User Interface) and may feel lost in a different environment and discard it all together. Even though Linux has a graphical interface for many of its distributions, the real efficiency and productivity spikes when using the terminal (console). So to get you up and running on Linux, I prepared this *Linux Commands starter kit*.

### pwd (print working directory)
```console
root@b3tinsky:~# pwd 
```
It is used to locate where you are currently in the file directory system. In this case the user is located in the root directory.
```output
/root
```
### whoami
```console
root@b3tinsky:~# whoami 
```
 Spits out who you are currently logged on as. It may seem pointless, but sometimes things get tricky. In my case it outputs root because i'm using *Kali Linux*, where the default user is root for simplicity of the tools used (so it does'nt have to constantly ask permission to do everything). But in your case it would probably say your username. Root is an all powerful/superuser that has all privileges (adding users, changing passwords/privileges, etc.)
```output
root
```

### ls (list)
```console
root@b3tinsky:~# ls 
```

```output
Desktop   Documents    Downloads    Music    Pictures
Public    Templates    Videos
```
You can't search a cave without a flashlight, and *ls* is basically that. It outputs the contents of the directory you are currently in, so that you can know what you can work with. It has two crucial flags: 


-l \[Long\]
To show the contents in the directory with greater detail (permissions, owner, timestamp, etc.).

```console
root@b3tinsky:~# ls -l 
```

```output
total 48
drwxr-xr-x 2 root root  4096 Jan  1 13:18 Desktop
drwxr-xr-x 2 root root  4096 Jan  1 13:18 Documents
drwxr-xr-x 2 root root  4096 Jan  1 13:18 Downloads
drwx------ 2 root root 16384 Nov 23 15:13 lost+found
drwxr-xr-x 2 root root  4096 Jan  1 13:18 Music
drwxr-xr-x 2 root root  4096 Jan  1 13:18 Pictures
drwxr-xr-x 2 root root  4096 Jan  1 13:18 Public
drwxr-xr-x 2 root root  4096 Jan  1 13:18 Templates
drwxr-xr-x 2 root root  4096 Jan  1 13:18 Videos
```

-a \[All\]

Shows hidden files in directory.


```console
root@b3tinsky:~# ls -a 
```

```output
.config     Downloads    .local         Music       Templates   
Desktop     .gnupg       lost+found     Pictures    Videos
.cache      Documents    .ICEauthority  .mozilla    Public
```

### cd (change directory)
This command is __fundamental__. It allows you to move around between directories doing whatever you need.

```console
root@b3tinsky:~# cd Desktop  
root@b3tinsky:~/Desktop# 
```
By using __..__ you go back once. 
```console
root@b3tinsky:~/Desktop/Folder# cd ..  
root@b3tinsky:~/Desktop# 
```
If you know the exact location you can go there, as long as you are in the upper part of the directory tree. 
```console
root@b3tinsky:~# cd Desktop/Folder/HistoryHomework  
root@b3tinsky:~/Desktop/Folder/HistoryHomework# 
```

### help
At first, many tools may be hard to understand with so many flags and variables, and that's when --help comes in handy. It displays a brief guide to how a tool is used, what flags it takes and how they work. The key word here is __brief__, since there is also a *manual* command, that goes in more detail for each tool. Sometimes -h or -? work, but not always.
```console
root@b3tinsky:~# ls --help 
```
```output
Usage: ls [OPTION]... [FILE]...
    List information about the FILEs (the current directory by default).
    Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.

    Mandatory arguments to long options are mandatory for short options too.
      -a, --all                  do not ignore entries starting with .
      -A, --almost-all           do not list implied . and ..
          --author               with -l, print the author of each file
      -b, --escape               print C-style escapes for nongraphic characters
          --block-size=SIZE      with -l, scale sizes by SIZE when printing them;
                                   e.g., '--block-size=M'; see SIZE format below
      -B, --ignore-backups       do not list implied entries ending with ~
      -c                         with -lt: sort by, and show, ctime (time of last
                                   modification of file status information);
                                   with -l: show ctime and sort by name;
                                   otherwise: sort by ctime, newest first
      -C                         list entries by columns
          --color[=WHEN]         colorize the output; WHEN can be 'always' (default
    ...
    ...
    ... 
```
### man (manual)
For a more thorough understanding of a tool, use manuals. Same as with --help, but in this case, scroll through the manuel with the 'arrow keys' or with 'ENTER', and to quit press 'q'.
```console
root@b3tinsky:~# man aircrack-ng  
```
```output
NAME
       aircrack-ng - a 802.11 WEP / WPA-PSK key cracker

    SYNOPSIS
           aircrack-ng [options] <input file(s)>

    DESCRIPTION
           aircrack-ng  is  an  802.11 WEP, 802.11i WPA/WPA2, and 802.11w
           WPA2 key cracking program.

           It can recover the WEP key once enough encrypted packets  have
           been  captured  with airodump-ng. This part of the aircrack-ng
           suite determines the WEP key using  two  fundamental  methods.
           The first method is via the PTW approach (Pyshkin, Tews, Wein‐
           mann). The main advantage of the PTW approach is that very few
           data  packets  are  required  to crack the WEP key. The second
           method is the FMS/KoreK method. The FMS/KoreK method  incorpo‐
           rates  various statistical attacks to discover the WEP key and
           uses these in combination with brute forcing.

           Additionally, the program offers a dictionary method  for  de‐
           termining  the WEP key. For cracking WPA/WPA2 pre-shared keys,
           a wordlist (file or stdin) or an airolib-ng has to be used.

    INPUT FILES
           Capture files (.cap, .pcap), IVS (.ivs) or Hascat HCCAPX files
           (.hccapx)

    OPTIONS
           Common options:

           -a <amode>
                  Force  the attack mode: 1 or wep for WEP (802.11) and 2
                  or wpa for WPA/WPA2 PSK (802.11i and 802.11w).
    ...
    ...
    ...                 
```
### locate
It goes through the entire file system and returns all instances found. It can be overwhelming when it gives a lot of results. The system has a database that updates on a daily basis, on which __locate__ searches for your query and and outputs what it found. The downside to the database approach, is that it may not find recently created/moved files, since the database has not been updated. It is possible to update on when you want it to, but it is more efficient to use other commands for finding things.
```console
root@b3tinsky:~# locate crack 
```
```output
/etc/cracklib
/etc/cracklib/cracklib.conf
/etc/cron.daily/cracklib-runtime
/etc/logcheck/ignore.d.paranoid/cracklib-runtime
/usr/bin/aircrack-ng
/usr/bin/fern-wifi-cracker
/usr/bin/msf-hmac_sha1_crack
/usr/bin/ncrack
/usr/bin/ophcrack
/usr/bin/ophcrack-cli
/usr/bin/psk-crack
/usr/lib/python2.7/dist-packages/numpy/f2py/crackfortran.py
/usr/lib/python2.7/dist-packages/wifite/tools/aircrack.py
/usr/lib/python2.7/dist-packages/wifite/util/crack.py
/usr/lib/python3/dist-packages/numpy/f2py/crackfortran.py
/usr/lib/x86_64-linux-gnu/libaircrack-crypto-1.3.0.so
/usr/lib/x86_64-linux-gnu/libaircrack-crypto-x86-avx-1.3.0.so
/usr/lib/x86_64-linux-gnu/libaircrack-crypto-x86-avx.la
/usr/lib/x86_64-linux-gnu/libaircrack-crypto-x86-avx.so
/usr/lib/x86_64-linux-gnu/libaircrack-crypto-x86-avx2-1.3.0.so
/usr/lib/x86_64-linux-gnu/libaircrack-crypto-x86-avx2.la
...
...
...         
```
### whereis
It finds the binaries for the tools in the file system. It returns the location for the binary, source and manual if available
```console
root@b3tinsky:~# whereis aircrack-ng 
```
```output
aircrack-ng: /usr/bin/aircrack-ng /usr/share/man/man1/aircrack-ng.1.gz         
```
### find
Better than __locate__, since it more powerful and flexible. It works from any directory to any other directory, it can search for different parameters (name, date, type, etc.). The downside is that it can be slow looking for everything and only returns exact matches. apache2 is not the same as apache2.conf
```console
root@b3tinsky:~# find / -type f -name apache2 
```
```output
find: ‘/run/user/132/gvfs’: Permission denied
/usr/sbin/apache2
/usr/share/lintian/overrides/apache2
/usr/lib/php/7.3/sapi/apache2
/etc/init.d/apache2
/etc/logrotate.d/apache2
/etc/cron.daily/apache2    
```
It has several wildcards that will make things easy while searching.
- *: It will match any character and any amount of characters
- ?: It will match a single character (whichever it may be)
- \[ \]: It will match the characters specified inside. It can be a range of characters or individually picked
```console
root@b3tinsky:~# find / -type f -name apache2.*
```
```output
find: ‘/run/user/132/gvfs’: Permission denied
/usr/share/man/man8/apache2.8.gz
/usr/share/doc/apache2/examples/apache2.monit
/usr/lib/systemd/system/apache2.service
/etc/apache2/apache2.conf
/var/lib/dpkg/info/apache2.conffiles
/var/lib/dpkg/info/apache2.postinst
/var/lib/dpkg/info/apache2.postrm
/var/lib/dpkg/info/apache2.list
/var/lib/dpkg/info/apache2.preinst
/var/lib/dpkg/info/apache2.md5sums
/var/lib/dpkg/info/apache2.prerm
/var/lib/systemd/deb-systemd-helper-enabled/apache2.service.dsh-also
/var/lib/systemd/deb-systemd-helper-enabled/multi-user.target.wants/apache2.service 
```
### pipe
More of a command its a character. It's extremely useful because it pipes the output from one command, as an input to another command.
```console
root@b3tinsky:~# ls -la | head -3
```
```output
total 80
drwxr-xr-x 16 root root  4096 Jan  1 14:33 .
drwxr-xr-x 19 root root  4096 Dec 10 18:26 ..
```
### cat (concatenate)
Even though it stands for concatenate, it can also be used to view the contents of a text file.
```console
root@b3tinsky:~# cat alphabetFile.txt
```
```output
A b c d e f g h i j k l m n o p q r s t u v w x y z
```
It can also be used to create a new file by using the redirect symbol (>). This will make the terminal go into an editor mode for the file. To quit press 'CTRL + D'. If the file name already exists and you use cat with redirect, it will overwrite it.
```console
root@b3tinsky:~# cat > file.txt  
Hello
World!                
root@b3tinsky:~# cat file.txt  
```
```output
Hello
World!
```
It can also append new text to an already existing file by using '>>'.
```console
root@b3tinsky:~# cat >> alphabetFile.txt  
1 2 3        
root@b3tinsky:~# cat alphabetFile.txt  
```
```output
A b c d e f g h i j k l m n o p q r s t u v w x y z 1 2 3
```
### mkdir (make directory)
Creates a new directory/folder in the location you are at.
```console
root@b3tinsky:~# mkdir newFolder  
root@b3tinsky:~# ls 
```
```output
Desktop    Documents    Downloads    Music    newFolder
Pictures   Public       Templates    Videos
```
### cp (copy)
Much more quick and efficient way of copying things without the ol' drag n' drop. It makes a new copy of the file you want in the selected directory. To give the new copy a new name, change it at the end of the selected path.
```console
root@b3tinsky:~/Desktop# cp oldfile.txt /root/newDirectory/newFile.txt
root@b3tinsky:~/Desktop# cd /root/newDirectory
root@b3tinsky:~/root/newDirectory# ls
```
```output
newFile.txt
```
### mv (move)
Move things around & move them all around. Simply type the name of the file you want to move, and the directory you want to put it in. It can also rename files.
```console
root@b3tinsky:~/newDirectory# mv newFile.txt ~/Desktop  
root@b3tinsky:~/newDirectory# cd ~/Desktop  
root@b3tinsky:~/Desktop# ls
```
```output
newFile.txt
```
```console
root@b3tinsky:~/Desktop# mv newFile.txt newFile2.txt
root@b3tinsky:~/Desktop# ls
```
```output
newFile2.txt
```
### rm (remove)
Removes files, and can be used to remove directories that are not empty (beware).
```console
root@b3tinsky:~/Desktop# ls
```
```output
file.txt
```
```console
root@b3tinsky:~/Desktop# rm file.txt
```
```output
```
[Removing a directory that's not empty]
```console
root@b3tinsky:~/Desktop/folder# ls
```
```output
file.txt
```
```console
root@b3tinsky:~/Desktop/folder# cd ..  
root@b3tinsky:~/Desktop# rm -r folder  
```
### rmdir (remove directory)
Deletes a directory that is empty.
```console
root@b3tinsky:~/Desktop/folder# ls 
```
```output
```
```console
root@b3tinsky:~/Desktop/folder# cd ..  
root@b3tinsky:~/Desktop# rmdir folder  
root@b3tinsky:~/Desktop# ls
```
```output
```