---
title: "ATBS - Regex"
date: "2020-01-03"
tags: ["ATBS", "Python"]
---
We all know and use the mighty *"CTRL + F"* to search for a specific word or sentence, but have you ever heard of *Regular Expressions?*
Regular Expressions, are basically that. Symbolically memorable patterns or expressions, that can be identified on sight. An example would be phone numbers, since no matter where you live, there are certain conventions that help you identify a phone number is in fact, a phone number. Conventions like hyphens (the placement depends on where you live), area codes and symbols. This way you quickly know what you are looking at.
```output
415-555-1234      @b3tinsky     helloImAmail@secretmail.com
4,155,551,234      b3tinsky     helloImAmail
```
Regex makes things much easier for programmers and non-programmers alike. It's a great thing to know, since you will most likely use software that accepts regex (MS Word, Excel, etc.) and it would improve your productivity by x10 :D It can be the difference in completing a task in 5 minutes or 2 hours. So without delaying any longer, lets do some coding!
### Finding patterns of text WITHOUT regex
The task at hand would be finding an american phone number (3numbers - 3numbers - 4numbers).
```python
def isPhoneNumber(text):
    if len(text) != 12:
        return False
    for i in range(0,3):
        if not text[i].isdecimal():
            return False
    if text[3] != '-':
       return False
    for i in range(4,7):
        if not text[i].isdecimal():
            return False
    if text[7] != '-':
        return False
    for i in range(8,12):
        if not text[i].isdecimal():
            return False
    return True

print('Is 415-555-4242 a phone number?')
print(isPhoneNumber('415-555-4242'))
print('Is MiamiHotline555 a phone number?')
print(isPhoneNumber('MiamiHotline555'))
```
```output
Is 415-555-4242 a phone number?
True
Is MiamiHotline555 a phone number?
False
```
What does this function do? It checks a piece of text (string) to see if it can be defined as a phone number. First it checks if the length of the input text is 12 (length of a phone number), then it checks that the area code (first 3 numbers) consists of only numbers, then that the next character must be a hyphen, and the rest of the function just checks it follows a phone number structure (3numbers -> hyphen -> 3numbers -> hyphen -> 4numbers). If it does, it returns True, and if not it returns False.
If you wanted to find the number in a bigger piece of text, we would have to change the code a little bit. We will change the last four lines so that the code can search the whole text, then when it finds a number, it does the same checks to see if its a phone number.
```python
message = 'Call me at 415-555-1011 tomorrow. 415-555-9999 is my office.'
 for i in range(len(message)):
     chunk = message[i:i+12]
     if isPhoneNumber(chunk):
         print('Phone number found: ' + chunk)
 print('Done')
```
```output
Phone number found: 415-555-1011
Phone number found: 415-555-9999
Done
```
As you can probably tell, this gets the job done, but it's terribly inefficient. When confronted against a huge piece of text, it will become very veeeeeeeeery slow. The main reason is in the way it works. It scans 12 characters to see if it matches the pattern of a phone number, and if not, it moves 1 character and repeats the process until it finishes the whole thing. With regex, the code might look like you can speak with a computer, but it will work very fast and can be much more efficient.
### Finding patterns of text WITH regex
The code we just created is very unefficient since it takes many lines of code to do something limited. Problems arise when you want to search for phone numbers that have a different format, for example: 
```output
415.555.4242    (415) 555-4242    415-555-4242 x99
```
We could add more lines of code to make it work with all types of phone numbers, but why bother? Having something like *regular expressions* makes life much easier. 
Regular Expressions or *Regex* for short, are descriptions of patterns of text. It uses symbol like language as in:
```output
\d  ->  Any Digit
\D  ->  Any Non-Digit
\w  ->  Any Word Character
\W  ->  Any Non-Word Character
\s  ->  Any Whitespace Character
\S  ->  Any Non-Whitespace Character
\b  ->  A word boundary
\B  ->  Non word boundary
 .  ->  Any single character
```
Meaning that if we wanted to recreate the same search pattern for the code we made earlier, we could do it as: 
```python
\d\d\d-\d\d\d-\d\d\d\d
```
But even then, regex allows even more abstraction to allow more powerful and versatile search patterns, such as:
```output
[abc]     ->  A single character of: a,b or c
[^abc]    ->  A character except: a,b or c
[a-z]     ->  A character in the range: a-z
[a-zA-Z]  ->  A character in the range: a-z or A-Z
[^a-z]    ->  A character not in the range: a-z
(...)     ->  Capture everything enclosed
(a|b)     ->  Match either a or b
a?        ->  Zero or one of 'a'
a*        ->  Zero or more of 'a'
a+        ->  One or more of 'a'
a{3}      ->  Exactly three of 'a'
a{3,}     ->  Three or more of 'a'
a{3,6}    ->  Between three and six of 'a'
```
So that means we can change our regex to:
```python
\d{3}-\d{3}-\d{4}
```
Before we get into it, lets remember the steps:
1. Import the regex module
2. Create a Regex object
3. Pass the string you want to search into the Regex object's search()
4. Call the Match object's group() to return a string of the matched text

### Creating Regex Objects
Everything related to regex for python is stored in a particular module called 're', so lets import it so we can get started.

```python
import re
```

First we have to use re.compile() to create a __regex object__ and pass our regex pattern as a string with the formatting flag 'r' which stands for __raw text__.

```python
phoneNumRegex = re.compile(r'\d\d\d-\d\d\d-\d\d\d\d')
```

### Matching Regex Objects
Now we need to use the Regex Object and do something with it. We will be using the *search()* method, which searches through the string it is passed for any matches to the regex. It will return *none* if the pattern is not found in the string. If it is found, it will return a __match object__, which has a __group()__ method to return the actual matched text in groups (more on that later).

```python
# mo: match objects
mo = phoneNumRegex.search('My number is 415-555-4242.')
print('Phone number found: ' + mo.group())
```

```output
Phone number found: 415-555-4242
```
Even though it looks complicated and kinda weird, we can see that it is MUCH shorter and still accomplishes the same thing.

### Grouping with parenthesis
Sometimes we would like to get a pattern inside a pattern while at the same time keeping the main one. So instead of making more regex objects or more code, we use groups. By grouping we segment parts of the regex object so that when we call it with the match object, you can choose a particular group or just the whole thing.
Continuing with our phone example, imagine we would like to find phone numbers, but also find area codes. Doing it with code would make it a bit tedious, since we would have to first find a number, and then store it somewhere, and from that number, then store its area code somewhere else, or use a dictionary, but even then it's more hassle than it needs to be. So what we are going to do, is use the same regex object we used earlier, but grouping it with parenthesis so you can see how it works.

```python
phoneNumRegex = re.compile(r'(\d\d\d)-(\d\d\d-\d\d\d\d)')
mo = phoneNumRegex.search('My number is 415-555-4242.')
print(mo.group(1))
print(mo.group(2))
print(mo.group(0))
print(mo.group())
```

```output
415
555-4242
415-555-4242
415-555-4242
```
If you want, you can get al the groups individually and use them as you see convenient.

```python
mo.groups()
```

```output
('415', '555-4242')
```

By using the mo.groups() method, you can assign groups to variables in the order they were made.

```python
areaCode, mainNumber = mo.groups()
print(areaCode)
print(mainNumber)
```

```output
415
555-4242
```

Some characters have a special meaning in regular expressions (like ( ) { } [ ] * + ? and more) so __if you need them inside your regular expression, you have to escape them with '\'__. For example if the phone we are looking for has it's area code inside a parenthesis, we would have to do something like this:

```python
phoneNumRegex = re.compile(r'(\(\d\d\d\)) (\d\d\d-\d\d\d\d)')
mo = phoneNumRegex.search('My number is (415) 555-4242.')
mo.group(1)
mo.group(2)
```

```output
(415)
555-4242
```

### Matching Multiple Groups

This character __|__ is called the pipe. It represents the OR statement. When searching the regex object you made, it will look first for the left side, and if it matches with anything in the text, it will become the entire match object, because it's one OR the other but not both.

```python
heroRegex = re.compile(r'Batman|Superman')
mo1 = heroRegex.search('Batman and Superman')
mo2 = heroRegex.search('Superman and Batman')
    
mo1.group()
mo2.group()
```

```output
Batman
Superman
```

```python
batRegex = re.compile(r'Bat(man|mobile|cave)')
mo = batRegex.search('Batmobile ran over Joker')    
mo.group()
mo.group(1)
```

```output
Batmobile
mobile
```

### Optional Matching

In some cases you want your regular expression to match something, but want to be open to the posibility of another pattern if it ever happens, in other words, its optional. In this case we use ? which signifies that whatever is inside or next to a group or character is optional (zero or one occasions).

```python
batRegex = re.compile(r'Bat(wo)?man')
mo1 = batRegex.search('The Adventures of Batman')
mo2 = batRegex.search('The Adventures of Batwoman')
mo1.group()
mo2.group()
```

```output
Batman
Batwoman
```

```python
phoneRegex = re.compile(r'(\d\d\d-)?\d\d\d-\d\d\d\d')
mo1 = phoneRegex.search('My number is 415-555-4242')
mo2 = phoneRegex.search('My number is 555-4242')
mo1.group()
mo2.group()
```

```output
415-555-4242
555-4242
```

Other special characters and bracket sequences work in pretty much the same way, just with different abilities (they are listed above or in the reference at the end of the article). When placed at the end of a group, whatever they represent will be applied to that group. As you keep layering new special characters or sequences to the right, their ability will be applied to the adjacent group to the left (even if it already has other special characters layered).

### The findall() Method

While search() has a match object of the FIRST matched text, the findall() returns the string of every match as a list (as long as there are no groups in the regular expression)

```python
phoneNumRegex = re.compile(r'\d\d\d-\d\d\d-\d\d\d\d')
phoneNumRegex.findall('Cell: 415-555-9999 Work: 212-555-0000')
```

```output
['415-555-9999', '212-555-0000']
```

If there ARE groups, it will return a list of tuples, where each tuple represents a found match and each item are the matched strings for each group in the regex.

```python
phoneNumRegex = re.compile(r'(\d\d\d)-(\d\d\d)-(\d\d\d\d)')
phoneNumRegex.findall('Cell: 415-555-9999 Work: 212-555-0000')
```

```output
[('415','555','9999'), ('212','555','0000')]
```

### Making Your Own Character Classes

Sometimes we want to match a specific set of characters, and the shorthand character classes (\s, \d, \w) are just too broad. In that case, we need to create our own character class by using square brackets, for example if we wanted to match only vowels, we would write something like this: \[aeiouAEIOU\]

```python
vowelRegex = re.compile(r'[aeiouAEIOU]')
vowelRegex.findall('RoboCop eats baby food. BABY FOOD.')
```

```output
['o','o','o','e','a','a','o','o','A','O','O']
```

### Substituting Strings With The Sub() Method

Regular expressions can not only find text patterns but can also substitute new text in place of the pattern. The way it works is the first argument is the thing that will replace any text that matches with your regex object, and the second argument is the text that will be searched through

```python
namesRegex = re.compile(r'Agent \w+')
namesRegex.sub('CLASSIFIED', 'Agent Carter gave the secret documents to Agent Zinskey.')
```

```output
CLASSIFIED gave the secret documents to CLASSIFIED.
```

Sometimes or in weird cases we might need to use part of the match itself. In this example we will use the first group (we can choose which group we want to use by escaping their position, i.e. \1 for the first group, \2 for second group, etc.) of our regex object, and substituting an undefined amount of \w word characters with four stars.

```python
agentNamesRegex = re.compile(r'Agent (\w)\w*')
agentNamesRegex.sub(r'\1****', 'Agent Alice told Agent Carol that Agent Eve knew Agent Bob was a double agent.')
```

```output
A**** told C**** that E**** knew B**** was a double agent.
```

### Complex Regular Expressions

Sometimes we want to match something really complicated and our regular expression can get really messy really quick. So to make things easier and make clean code, we will tell the *re.compile()* to ignore comments and whitespace in the regular expression. We do this by passing as a second argument the variable *re.VERBOSE*and by using a multiline string with a triple quote ('''), which will allow python to spread a regular expression over many lines and make it readable.
Now instead of this ungodly thing:

```python
phoneRegex = re.compile(r'((\d{3}|\(\d{3}\))?(\s|-|\.)?\d{3}(\s|-|\.)\d{4}(\s*(ext|x|ext.)\s*\d{2,5})?)')
```
We can beautify it with comments by doing this:
```python
phoneRegex = re.compile(r'''(
    (\d{3}|\(\d{3}\))?            # area code
    (\s|-|\.)?                    # separator
    \d{3}                         # first 3 digits
    (\s|-|\.)                     # separator
    \d{4}                         # last 4 digits
    (\s*(ext|x|ext.)\s*\d{2,5})?  # extension
    )''', re.VERBOSE)
```

### Combining re.VERBOSE, re.DOTALL & re.IGNORECASE

In some cases we might need to use two or even the three options, but *re.compile* only allows one. What we have to do to get around this is combining them with __the pipe |__.

```python
moneyRegex = re.compile('Dollar', re.IGNORECASE | re.DOTALL | re.VERBOSE)
```

### Exercises

I hate homework. Everybody hates homework. But homework is gold. Doing exercises, failing and learning by doing, is great and works like a charm. So if you want to learn and master __Regular Expressions__ I suggest trying out every flag, special character and bracket sequence at least once and see how they work.

- Try out every symbol
- Make a phone finder
- Make an email finder
- Replace bad words in the Django movie script (Fuck -> Frick)

### Reference

```output
General Tokens
-------------------------------------------------------
\n  ->  Newline
\r  ->  Carriage return
\t  ->  Tab
\0  ->  Null character

Anchors
-------------------------------------------------------
 ^  ->  Start of string
 $  ->  End of string
\A  ->  Start of string
\Z  ->  End of string
\b  ->  A word boundary   
\B  ->  A word boundary   

Meta Sequences
-------------------------------------------------------
 .   ->  Any single character   
\s   ->  Any whitespace character   
\S   ->  Any non-whitespace character   
\d   ->  Any digit   
\D   ->  Any non-digit   
\w   ->  Any word character   
\W   ->  Any non-word character   
\v   ->  Vertical whitespace character   
\n   ->  Match nth subpattern (n stands for a number, i.e. \2)
\xYY ->  Hex character YY
\ddd ->  Octal character ddd
[\b] ->  Backspace character
 \   ->  Makes any character literal

Quantifiers
-------------------------------------------------------
 a?     ->  Zero or one of a
 a*     ->  Zero or more of a
 a+     ->  One or more of a
 a{3}   ->  Exactly 3 of a
 a{3,}  ->  3 or more of a
 a{3,6} ->  Between 3 and 6 of a
 a*     ->  Greedy quantifier
 a*?    ->  Lazy quantifier

Group Constructs
-------------------------------------------------------
 (...)         ->  Capture everything enclosed
 (a|b)         ->  Match either a or b
 (?:...)       ->  Match everything enclosed
 (?#...)       ->  Comment
 (?P<name>...) ->  Named Capturing Group
 (?imsxXu)     ->  Inline modifiers
 (?(1)yes|no)  ->  Conditional statement
 (?P=name)     ->  Match subpattern 'name'
 (?=...)       ->  Positive Lookahead
 (?!...)       ->  Negative Lookahead
 (?<=...)      ->  Positive Lookbehind
 (?<!...)      ->  Negative Lookbehind
     
Character Classes
-------------------------------------------------------
 [abc]     ->  A single character of: a, b or c
 [^abc]    ->  A character except: a, b or c
 [a-z]     ->  A character in the range: a to z
 [^a-z]    ->  A character not in the range: a to z
 [a-zA-Z]  ->  A character in the range: a to z or A to Z
     
Flags/Modifiers
-------------------------------------------------------
 g  ->  Global
 m  ->  Multiline
 i  ->  Case insensitive
 x  ->  Ignore whitespace
 s  ->  Single line
 u  ->  Enable unicode support
 a  ->  Restrict matches to ASCII only
     
Substitution
-------------------------------------------------------
 \g<0>     ->  Complete match contents
 \0        ->  Complete match contents
 \1        ->  Contents in capture group 1
 $1        ->  Contents in capture group 1
 ${foo}    ->  Contents in capture group 'foo'
 \x20      ->  Hexadecimal replacement values
 \x{06fa}  ->  Hexadecimal replacement values
 \t        ->  Tab
 \r        ->  Carriage return
 \n        ->  Newline
 \f        ->  Form-feed
 \U        ->  Uppercase Transformation
 \L        ->  Lowercase Transformation
 \E        ->  Terminate any Transformation
```