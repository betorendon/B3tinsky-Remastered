---
title: "ATBS - Reading And Writing Files"
date: "2020-01-18"
---
Knowing how to use and manipulate files is critical for any programmer or any person who wishes to do anything with code.
The sole reason of my last statement is that *__Whatever happens in the compiler, stays in the compiler__*, meaning that there is no magical save button for anything. You may save the CODE, but not its outputs. This means that you could play a game, but if you exit or turn the console off, you would have to start from the beginning. 
In this article we will learn how to create, read and save files. 

### Files & File Paths

The basic components of a file are its name and its path (basically like people in medieval times identified: Geralt of Rivia). A __Directory__ is basically just a folder, and if it has other folders inside, those would be its *subdirectories*.
A __Path__ is just the route you would have to follow navigating through directories to get to a file. 
The __Filename__ is the unique name that identifies a file, INCLUDING its filetype.

```output
Path
----------------------------------------------------------
C:\Users\B3TINSKY\Documents\Code\B3tinsky.com\Articles

This would mean that to read, edit or save any article
on my page, my computer begins its search from C:, or also
known as the root folder (all searches begin here), then
B3TINSKY -> Documents -> Code -> B3TINSKY.com -> Articles
and there it finds all my articles and chooses the correct
one by specifying the filename.

# On Windows paths are written with -> \
# On MacOS & Linux paths are written with -> /

Filename
----------------------------------------------------------
ATBS - Reading & Writing Files.html

Would be the correct file with the correct type, since 
another file could have the same name but end in .docx,
making it useless for my purpose
```

Python always makes things simple even if we dont want to >:D
In this case, instead of writing code to use the correct path character based on OS, all we have to do is import the Path module and it will do it for us.
The way it's used is first we import the module, then by using __Path()__ we give it the directory or file names as arguments in a string form, and then __Path()__ does the rest for us.

```python
>>> from pathlib import Path

# Windows
>>> Path('Documents', 'B3TINSKY.com', 'Articles')
WindowsPath('Documents/B3TINSKY.com/Articles')

>>> str(Path('Documents', 'B3TINSKY.com', 'Articles'))
'Documents\\B3TINSKY.com\\Articles'

# Linux
>>> Path('Documents', 'B3TINSKY.com', 'Articles')
PosixPath('Documents/B3TINSKY.com/Articles')

>>> str(Path('Documents', 'B3TINSKY.com', 'Articles'))
'Documents/B3TINSKY.com/Articles'
```

As we can see, when we pass it to __Path()__ it returns a __WindowsPath__ object. Which as you can see, is using forwardslashes when it shouldnt, and that's because thats not the actual path for Windows, it's almost like a placeholder. If you wish to see the actual path it created, view it as a string. 
(It uses double backslashes because remember that the backslashes themselves need to be *escaped*).
These *__Path Objects__* will be used frequently with all of the module's functions by passing them as arguments.
In the next example we will print a list of document names and adding a path.

```python
>>> from pathlib import Path
>>> myFiles = ['ATBS - Regex.html', 'ATBS - Input Validation.html', 'ATBS - Reading & Writing Files.html']     
>>> for filename in myFiles:
        print(Path(r'C:\Users\B3TINSKY\Documents\Code\B3tinsky.com\Articles', filename))
        
C:\Users\B3TINSKY\Documents\Code\B3tinsky.com\Articles\ATBS - Regex.html
C:\Users\B3TINSKY\Documents\Code\B3tinsky.com\Articles\ATBS - Input Validation.html
C:\Users\B3TINSKY\Documents\Code\B3tinsky.com\Articles\ATBS - Reading & Writing Files.html
```

### Joining Paths with /

Pretty much as we would sum a pair of numbers with the + sign, or concatenate a couple of strings, we can join paths (Poetic right?) with the / sign.

```python
>>> from pathlib import Path 

>>> Path('Germany') / 'France' / 'Russia'
WindowsPath('Germany/France/Russia')

>>> Path('Germany') / Path('France/Russia')
WindowsPath('Germany/France/Russia')

>>> Path('Germany') / Path('France', 'Russia')
WindowsPath('Germany/France/Russia')
```

One thing to keep in mind, is that when joining with the / symbol, one of the first two values must be a path object. 
The / operator evaluates from left to right, so thats why one of the first two must be a path object.

```python
>>> 'one' / 'two' / 'three'

Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
TypeError: unsupported operand type(s) for /: 'str' and 'str'
```

### Current Working Directory

The __Current Working Directory (cwd)__ is the directory where you are currently at. This means that if you want to manipulate a file in another directory, you have to call it with its path if you are not already in its __cwd__.
__*os.chdir*__ changes the directory you are currently on, so you can manipulate files in other directories.

```python
>>> from pathlib import Path
>>> import os

>>> Path.cwd()
WindowsPath('C:/Users/B3TINSKY/Documents/Code/Automate The Boring Stuff With Python')   

>>> os.chdir('C:\\Windows\\System32')
# If you change to a folder that does not exist
# Python will display an error

>>> Path.cwd()
WindowsPath('C:/Windows/System32')
```

### Home Directory

Everyone has a __Home Directory__ where they store there files. Our scripts will most likely have access and permissions to read files in the Home Directory, so it's a good idea to place files we plan on manipulating here.

```python
>>> Path.home()
WindowsPath('C:/Users/B3TINSKY')
```

### Absolute vs Relative Paths

- __Absolute__: Always begin from the root folder
- __Relative__: Relative to the program's __cwd__.

We can use a single dot to refer to the current folder and two dots to refer to the parent folder.

```output
CWD
C:/Users/B3TINSKY/Documents
-------------------------------------------------

Absolute
C:/Users/B3TINSKY/Documents/Code/Automate The Boring Stuff With Python  

Relative Path
Code/Automate The Boring Stuff With Python

./ (Current)
./Code/Automate The Boring Stuff With Python

../ (Parent)
C:/Users/B3TINSKY
```

### Creating New Folders

We can create new folders with code by using __os.makedirs()__ or __Path().mkdir()__ (this one can only make one directory at a time though). We just specify the path we want to create the folder(s) in. If we want to create folders inside folders, just keep adding them at the end of the path.

```python
>>> from pathlib import Path
>>> Path(r'C:\Users\B3TINSKY\Desktop\PyWorld').mkdir()
```

```output
DESKTOP
----------------------------------------------------------

PyWorld
```

```python
>>> import os
>>> os.makedirs(r'C:\Users\B3TINSKY\Desktop\PyWorld\PyLand\PyEstate')  
```

```output
DESKTOP
----------------------------------------------------------

PyWorld
    PyLand
        PyEstate
```

### Handling Absolute & Relative Paths

The __pathlib__ module, has several functions that can check for us if a given path is relative or absolute. In the next example we will use __is_absolute()__ to see if a given path is absolute or not.

```python
>>> Path.cwd()
WindowsPath('C:/Users/B3TINSKY/Documents')

>>>Path.cwd().is_absolute()
True
>>> Path('house/brick/phone').is_absolute()
False
```

To get an absolute path from a relative path, all we have to do is join the cwd with the relative path by using the /. This works because if we remember well, a relative path is just a path *relative to the current working directory*.

```python
>>> Path('my/relative/path')
WindowsPath('my/relative/path')

>>> Path.cwd() / Path('my/relative/path')
WindowsPath('C:/Users/B3TINSKY/Documents/my/relative/path')

>>> Path.home() / Path('my/relative/path')
WindowsPath('C:/Users/B3TINSKY/my/relative/path')
```

The __os.path__ also has much to offer with many useful functions. Either way I would always recommend reading documentation             for whatever you like to use most.

- __os.path.abspath(path)__: Will return a string of the absolute path of the given argument.
- __os.path.isabs(path)__: Will return True if the argument is an absolute path and False otherwise.
- __os.path.relpath(path, start)__: Will return a string of a relative path from the start path to path. If no start is provided, cwd will be assumed as start.

```python
>>> os.path.abspath('.')
'C:\\Users\\B3TINSKY\\Documents'

>>> os.path.abspath('.\\PythonScripts')
'C:\\Users\\B3TINSKY\\Documents\\PythonScripts'

>>> os.path.isabs('.')
False

>>> os.path.isabs(os.path.abspath('.'))
True

>>> os.path.relpath('C:\\Windows', 'C:\\')
'Windows'

>>> os.path.relpath('C:\\Windows', 'C:\\abc\\123')
'..\\..\\Windows'
```

### Getting the Parts of a File Path

A path has several segments and we can extract them as strings by using different __Path__ object attributes. A reason for doing this would be to construct paths based on components of other paths.

![PathParts](./PathParts.jpg)

- __Anchor__: Root folder of the filesystem
- (Windows) __Drive__: Single letter denoting a physical hard drive/storage device
- __Parent__: Folder that contains the file/folder
- __Name__: Name of the file, which is made of
    - __Stem__: Base name of the file
    - __Suffix__: Extension of the file

Good thing extracting these parts is actually easy to do. In the next example we will see how it's done.

```python
>>> p = Path('C:/Users/B3TINSKY/keylogger.txt')
    
>>> p.anchor
'C:\\'

>>> p.parent
WindowsPath('C:/Users/B3TINSKY')

>>> p.name
'keylogger.txt'

>>> p.stem
'keylogger'

>>> p.suffix
'.txt'

>>> p.drive
'C:'
```

An important feature that could be really helpful for us, is climbing up the "parent ladder" to reach a certain directory. The way we do this, is by using the __parents__ property and giving it an index on how far we need to *"climb"*.

```python
>>> Path.cwd()
WindowsPath('C:/Users/B3TINSKY/Documents/Code/B3tinsky.com/Articles')

>>> Path.cwd().parents[0]
WindowsPath('C:/Users/B3TINSKY/Documents/Code/B3tinsky.com')

>>> Path.cwd().parents[1]
WindowsPath('C:/Users/B3TINSKY/Documents/Code')

>>> Path.cwd().parents[2]
WindowsPath('C:/Users/B3TINSKY/Documents')

>>> Path.cwd().parents[3]
WindowsPath('C:/Users/B3TINSKY')

>>> Path.cwd().parents[4]
WindowsPath('C:/Users')

>>> Path.cwd().parents[5]
WindowsPath('C:/')
```

Similar functions can be used with the __os.path__ module, in which it divides each directory of the path you want in strings.
In the next example, we start from the basics, by returning only 2 parts, the __dir name__ and the __base name__.

- __Dir name__: Everything BEFORE the last slash/separator.
- __Base name__: Everything AFTER the last slash/separator, which is basically the filename.

```python
>>> virusfilepath = 'C:\\Windows\\System32\\thevirus.exe'

>>> os.path.basename(virusfilepath)
'thevirus.exe'

>>> os.path.dirname(virusfilepath)
'C:\\Windows\\System32'

>>> os.path.split(virusfilepath)
('C:\\Windows\\System32', 'thevirus.exe')

>>> (os.path.basename(virusfilepath), os.path.dirname(virusfilepath))
('C:\\Windows\\System32', 'thevirus.exe')

# It can also return every part as individual strings
>>> virusfilepath.split(os.sep)
['C:', 'Windows', 'System32', 'thevirus.exe']

# Also works with bare strings
>>> 'usr/bin'.split(os.sep)
['', 'usr', 'bin']
```

### Finding File Sizes & Folder Contents

What good is it to know filepaths, but dont even know what to do with the contents? Well the __os.path__ has some nice functions for us.
We will first check out __*os.path.getsize(path)*__ to know the size of a file or path (it returns the size in bytes).
Then we will check out the __*os.listdir(path)*__ which will help us a lot by telling us the contents of a directory (it returns a list of filename strings for each file in the path argument).

```python
# Remember to import os

>>> os.path.getsize('C:\Users\B3TINSKY\Documents\Code\B3tinsky.com\Entries\template.html')
995

>>> os.listdir('C:\\Users\\B3TINSKY\\Documents\\Code\\B3tinsky.com\\Entries')
['ATBS - Input Validation.html', 'ATBS - Reading And Writing Files.html', 'ATBS - Regex.html', 'linuxcommands.html', 'template.html']  
```

If for some reason the total size of the folder is needed we can just call the os.getsize with the path of the directory and not a specific file, or we can do it with a __for loop__, by adding the individual size of each file inside and adding it to a variable. In this way we can also manipulate more specific files an a given directory.

```python
# Initializing variables is always a good practice ;)
>>> directorySize = 0

>>> for filename in os.listdir('C:\\Users\\B3TINSKY\\Documents\\Code\\B3tinsky.com\\Entries'):
        directorySize += os.path.getsize(os.path.join('C:\\Users\\B3TINSKY\\Documents\\Code\\B3tinsky.com\\Entries', filename))   

>>> print(directorySize)
4096
```

### Modifying a List of Files with Glob

If we need to work on specific files, and can actually identify a pattern we can use a simplyfied version of [Regular Expressions](./atbsregex) called __Glob__. 
With the Glob method, a *Generator Object* is returned (With the results of the pattern you passed as argument), and then to see those files we need to list them.

```python
>>> p = Path('C:/Users/B3TINSKY/Documents')

>>> p.glob('*')
<generator object Path.glob at 0x00F5FDF0>

>>> list(p.glob('*'))
[WindowsPath('C:/Users/B3TINSKY/Documents/Books'), WindowsPath('C:/Users/B3TINSKY/Documents/Code')]   
```

Instead of the *, you could use any Regex pattern to suit your needs. 
In the next example we will make a loop with glop to cover more complex possibilites. 

```python
>>> p = Path('C:/Users/B3TINSKY/Desktop')

>>> for textFileObjPath in p.glob('*.txt'):
    # Do anything
    print(textFileObjPath) 
```

### Path Validity

As we may already know, an error in the code (or prompt) might make everything crash, and as you might've guessed, using an unexisting path will to. We can also validate if  So, to check if a path is valid, we have three functions to do the job:

- __exists()__: Returns True if the path exists or False if it does'nt
- __is_file()__: Returns True if the path exists AND is a file, or False otherwise
- __is_dir()__: Returns True if the path exists AND is a directory, or False otherwise

The __os.path__ also has functions for these purposes and these accept path objects as well as strings.

```python
>>> directoryPath = Path('C:/Windows')
>>> doesntexistPath = Path('C:/This/Path/Doesnt/Exist')
>>> calcFile = Path('C:/Windows/System32/calc.exe')
>>> dDrive = Path('D:/')

# os.path.exists() works as well
>>> directoryPath.exists()
True

# os.path.isdir() works as well
>>> directoryPath.is_dir()
True

>>> doesntexistPath.exists()
False

# os.path.isfile() works as well
>>> calcFile.is_file()
True

>>> calcFile.is_dir()
False

>>> dDrive.exists()
False
```

### Reading & Writing Files

Ok, now that we know enough about filepaths and how to move around our file system, we can now dive in to files themselves. We will focus only on plain text files (files that when opened we see human words, e.g. .txt, .html, .py) since for binary files (files that when opened we see computer words lol, e.g. .pdf, .jpeg, .xls, .exe) it's a whole different story with other modules that make things easier for us.

![WeenieTheHut](./WeenieHutMeme.jpg)

And as we have graduated from the __*Super Weenie Hut Jr's of filepaths*__, now we can transition to something more manly as the __*Weenie Hut Jr's for ACTUAL files*__.

```python
>>> from pathlib import Path

>>> filePath = Path('file.txt')

>>> filePath.write_text('Hello World!')
12  # Number of characters written

>>> filePath.read_text()
'Hello World!'
```

These functions, although useful, are pretty basic and have a basic functionality. The common way of doing it is with three other main functions:

- __open()__: Returns a file object
- __read() | write()__: Works on the file object
- __close()__: Closes the file object generated by open()

### Opening Files

To open files we use __open(Path)__, were we pass the path as an argument (it can be absolute or relative). It accepts it as path object or string. Once it opens the file it creates a *file object* and opens it in *reading __plaintext mode__* by default, but this can be changed by adding another argument.

```python
# With path obj as argument
>>> theFile = open(Path.home() / 'file.txt')

# With string as argument
>>> theFile = open('C:\\Windows\\Users\\B3TINSKY\\file.txt')

# With string as argument, specifying read mode
>>> theFile = open('C:\\Windows\\Users\\B3TINSKY\\file.txt', 'r')   
```

### Reading Files

Now that we have the file object lets read it >:D
We have two useful alternatives:

- __read()__: This will extract the whole contents of the file as a single string
- __readlines()__: Returns a list of strings. Each string is a line in the file. All of the lines (except the last one) end in a \n that represents an end of line special character

We will be using a file with this as its contents:

```output
When, in disgrace with fortune and men's eyes,
I all alone beweep my outcast state,
And trouble deaf heaven with my bootless cries,
And look upon myself and curse my fate,
```
```python
>>> sonnetFile = open(Path.home() / 'sonnet29.txt')

>>> sonnetFile.read()
'When, in disgrace with fortune and men's eyes,
I all alone beweep my outcast state,
And trouble deaf heaven with my bootless cries,
And look upon myself and curse my fate,'

>>> sonnetFile.readlines()
[When, in disgrace with fortune and men's eyes,\n', 
' I all alone beweep my    outcast state,\n', 
And trouble deaf heaven with my bootless cries,\n', 
And look upon myself and curse my fate,']
```

### Writing To Files

Ok, here things start to get exciting. We have two arguments for writing:
- __'w'__: This opens the file as write mode. This mode will overwrite EVERYTHING on the filor write normally if the file was blank.
- __'a'__: This opens the file in append mode. This will add text at the END of the file.
- __BOTH__ will create a blank file if the path doesnt exist

```python
# file.txt does not exist. It will be automatically created

>>> theFile = open('file.txt', 'w')
>>> theFile.write('Hello World!\n')
12 # Number of characters added
>>> theFile.close() 

>>> theFile = open('file.txt', 'a')
>>> theFile.write('Goodbye world :c')
28
>>> theFile.close()

>>> theFile = open('file.txt')
>>> theFileContent = theFile.read()
>>> theFile.close()

>>> print(theFileContent)
Hello World!
Goodbye world :c
```

### Saving Variables with Shelve

If you have not yet noticed, when you exit your program, everything done in it, *dissapears.*
Some times we would really like for things to stay the same next time we execute our program. Could you imagine having to change your settings every single time? Or having to start over a game every time you close it?
For this we have the __Shelve Module__, which allows us to store/save variables to __*binary shelve files (BSF).*__

- The module allows __open()__ to create a BSF with the information we saved to said file in the past.
- The module has a __save()__ function to save contents for later use onto a file.

```python
>>> import shelve

>>> shelfFile = shelve.open('myData') # myData is a filename
>>> dogs = ['Rex', 'Shiro', 'Roofus']
>>> shelfFile['dogs'] = dogs
>>> shelfFile.close()
```

It can be edited at any time as a dictionary (the 'dogs' at the end is like a key to the list values).
To later reopen a shelve file, just use the __open()__ and call the shelve file variable name you assigned it, and most important THE KEY to what you want to see in the saved file.

```python
>>> shelfFile = shelve.open('myData')

>>>shelfFile['dogs']
['Rex', 'Shiro', 'Roofus']

>>> shelfFile.close()
```

### Saving Variables with Pprint

Pprint stands for __Pretty Printing__, which makes things much more pleasant to read. When saving variables sometimes things can get messy and difficult to access. As a great tool/helper we can use the pprint module to help us out with some proper Python formating.
The __pprint.pprint()__ function will pretty print a list or dictionary and output it to the screen.
The __pprint.pformat()__ function will pretty print a list or dictionary and return it as a string.

```python
>>> import pprint

>>> countries = [{'name': 'Russia', 'desc': 'Cold'}, {'name': 'Africa', 'desc': 'Hot'}, {'name': 'Scotland', 'desc': 'Rainy'}]
>>> pprint.pformat(countries)
"[{'desc': 'Cold', 'name': 'Russia'}, {'desc': 'Hot', 'name': 'Africa'}, {'desc': 'Rainy', 'name': 'Scotland'}]"

>>> fileObj = open('daCountries.py', 'w')
>>> fileObj.write('countries = ' + pprint.pformat(countries) + '\n')
125

>>> fileObj.close()
```

Now to retrieve our things, we open it as if it were a module.
First we call it, then we use the keys we gave our dictionary as functions.
We can output specific entries based on index and key.

```python
>>> import daCountries

# Calling a whole dictionary
>>> daCountries.countries
[{'name': 'Russia', 'desc': 'Cold'}, 
{'name': 'Africa', 'desc': 'Hot'}, 
{'name': 'Scotland', 'desc': 'Rainy'}]

# Calling at a specific index
>>> daCountries.countries[0]
{'name': 'Russia', 'desc': 'Cold'}

# Calling a specific attribute of specific index
>>> daCountries.countries[0]['name']
'Russia'
```

### Projects

- Random Quiz Generator
- Password Manager
- Log file of something you want
- Regex search (Opens many files and searches for a Regex)