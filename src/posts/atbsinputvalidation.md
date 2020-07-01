---
title: "ATBS - Input Validation"
date: "2020-01-17"
---
If you have any experience with programming, you probably already know that annoying moment when you ask someone to test 
your code, and that person does something you thought no able minded human being would even try. That is an "Another day, another bug" type of situation. 
Now you have the task to fix your code JUST IN CASE somebody else using it tries that, and then other           possible malfunctions arise and you fix them as well. The problem is that at some point your "preventive" code might make things more breakable in the long run and extremely tedious. For this we can use __Input Validation__ in Python to prevent wrong inputs that would break our code.

Faulty Inputs

----------------------------------------------------------------------

Asking for age: 250, -19, 99999, 0, 'Eight' 

(Making it negative would add money to account)

Money withdrawal: -2500

----------------------------------------------------------------------
 
An example of how a *manual input validation* for checking a valid age would look like:
```python
# This code will prompt you for your age
# until you enter a valid one

while True:
    print('Enter your age: ')
    age = input()
    try:
        age = int(age)
    except:
        print('Please use numeric digits.')
        continue
    if age < 1:
        print('Please enter a positive number.')
        continue
    break

print(f'Your age is {age}.')
```

### PyInputPlus Module
This module is __input()__ on steroids. It gives the good ol' input() new superpowers by allowing it to analyze different types of data and reprompt the user for a valid input, and it can also give a fixed amount of tries or even timeouts.

The __PyInputPlus Module__ is not part of the Python Standard Library, which means you will have to install it on your own using [Pip](https://www.w3schools.com/python/python_pip.asp) (pip install --user pyinputplus).
```python
import pyinputplus
```
All of these, will reprompt the user if invalid input was given.
```output
inputStr()      - Just like input() with the module's features. 
                  Able to pass a custom validtion function to it.

inputNum()      - Makes sure that the user enters a number as input.
                  Returns an int or float (depends on the input).

inputChoice()   - Ensures that the user enters one of the
                  provided choices.

inputMenu()     - Similar to inputChoice(), but it provides a 
                  menu with numbered/lettered choices.

inputDatetime() - Ensures the input is a date and time 
    
inputYesNo()    - Ensures the input is a 'yes' or 'no'. 
    
inputBool()     - Ensures the input is a 'True' or 'False'.
                  Returns a boolean value.

inputEmail()    - Ensures the input is a valid email.
    
inputFilepath() - Ensures the input is a valid filepath and
                  filename. It can optionally check that a 
                  file with that name exists.
                      
inputPassword() - Same as input(), but displays * characters 
                  as the user types for privacy reasons.
```
```python
# The 'as pyip' gives the module an alias for ease of use

>>> import pyinputplus as pyip
>>> response = pyip.inputNum()
ten
'ten' is not a number.
7
>>> response
7
```
Unlike the normal input(), with the PyInputPlus module it returns a real number. Also, we can give a string for the prompt just like in the normal input().
```python
>>> response = input('Enter a number: ')
Enter a number: 13
>>> response
'13'

#######################################################

>>> import pyinputplus as pyip
>>> response = pyip.inputInt(prompt='Enter a number: ')
Enter a number: Bruh
'Bruh' is not an integer.
Enter a number: 13
>>> response
13
```
### Min, Max, greaterThan, lessThan
The __inputNum(), inputInt() and inputFloat()__ accept different conditional arguments such as Min, Max, etc.
```python
>>> import pyinputplus as pyip

>>> response = pyip.inputNum(prompt='Enter a number: ', min=5)
Enter a number: 1
Input must be at minimum 5.
Enter a number: 10
>>> response
10

#######################################################

>>> response = pyip.inputNum(prompt='Enter a number: ', greaterThan=0)
Enter a number: -420
Input must be greater than 0.
Enter a number: 69
>>> response
69
    
#######################################################

>>> response = pyip.inputNum(prompt='Enter a number: ', min=1, lessThan=11)     
Enter a number: 0
Input must be at minimum 1.
Enter a number: 25
Input must be less than 11.
Enter a number: 7
>>> response
7
```
### Blank Keyword Argument
By default, blank inputs are not allowed, but by enabling them with the blank=True argument they can. A reason we would want to allow blank inputs is if we want to make an option or question optional.

```python
>>> import pyinputplus as pyip
    
>>> response = pyip.inputNum(prompt='Enter a number: ')
Enter a number: 
Blank values are not allowed
Enter a number: 35
>>> response
35

#######################################################

>>> response = pyip.inputNum(prompt='Enter a number: ', blank=True)     
Enter a number: 
>>> response
''
```
### Limit, Timeout & Default
----------------------------------------------------------------------

By default the PyInputPlus functions will continue to ask (prompt) the user for a different answer indefinetly. If we want to limit the number of attempts, we can use several keywords such as __Limit or Timeout__.

----------------------------------------------------------------------
>
```python
>>> import pyinputplus as pyip

>>> response = pyip.inputNum(prompt='Enter a number: ', limit=2)
Enter a number: Ok
'Ok' is not a number.
Enter a number: Sorry
'Sorry' is not a number.
Traceback (most recent call last):
    --snip--
pyinputplus.RetryLimitException

#######################################################

>>> response = pyip.inputNum(prompt='Enter a number: ', timeout=10)     
Enter a number: 10 
(It took the user 30 seconds of waiting)
Traceback (most recent call last):
    --snip--
pyinputplus.TimeoutException
```
> 
----------------------------------------------------------------------

When using these arguments, we can also use a __*default*__ value on which our code will fall back on instead of a __traceback error__.

----------------------------------------------------------------------
>
```python
>>> response = pyip.inputNum(prompt='Enter a number: ' ,limit=2, default='N/A')     
Enter a number: lol
'lol' is not a number.
Enter a number: lmao
'lmao' is not a number.
    
>>> response
'N/A'
```
What a boring world would it be if we could'nt use [Regular Expressions](./atbsregex) to validate an input. 

We are able tu validate if an input is valid or not by using the __allowRegexes__ and __blockRegexes__ arguments.

In the next example we will use a regex to allow Roman numbers in addition to usual numbers.
(This regex will accept roman numerals even if they are in wrong order.)
```python
>>> import pyinputplus as pyip

>>> response = pyip.inputNum(prompt='Enter a number: ',allowRegexes=[r'(I|V|X|L|C|D|M)+', r'zero'])      
Enter a number: XIII
>>> response
'XIII'

>>> response = pyip.inputNum(prompt='Enter a number: ', allowRegexes=[r'(i|v|x|l|c|d|m)+', r'zero'])
Enter a number: xiii
>>> response
'xiii'
```
PyInputPlus can also use regexes to block different inputs. In the next example we will use a regex that rejects numbers that end with certain numbers.
```python
>>> import pyinputplus as pyip

>>> response = pyip.inputNum(prompt='Enter a number: ',
blockRegexes=[r'[02468]$'])         

Enter a number: 28
This response is invalid
Enter a number: 10   
This response is invalid
Enter a number: 11
    
>>> response
11
```
We can also use both arguments for better input validation as we can see in the next example.
```python
>>> import pyinputplus as pyip
    
>>> response = pyip.inputStr(prompt='Mention a cool superhero:',
allowRegexes=[r'batman', 'spiderman'], blockRegexes=[r'superman'])  

Mention a cool superhero: superman
This response is invalid.
Mention a cool superhero: batman
    
>>> response
'batman'
```
### Custom Validation Functions with inputCustom()
Sometimes even with all these features its not enough and we may need something *hand made*... some artisan crafted code if you will. In those cases the PyInputPlus module allows your own Input Validating code as arguments with the inputCustom(). As every other function, it comes with several rules and syntax.
- Accepts a single string argument of what user enters
- Raises and exception if the input string fails
- Returns __None__ or no return statement, if the inputCustom() should return the striunchanged.
- Returns a non-__None__ value if inputCustom() should return a different string from tone the user entered.
- Its passed as the first argument to inputCustom()
We will first define a new function and pass the function itself as an argument to inputCustom().

```python
>>> import pyinputplus as pyip

>>> def addsUpToTen(numbers):
        numbersList = list(numbers)
        
        for i, digit in enumerate(numbersList): 
          numbersList[i] = int(digit)

        if sum(numbersList) != 10:
          raise Exception('The digits must add up to 10, not %s.' 
          %(sum(numbersList)))

        return int(numbers) # Return an int form of numbers.    

# No parentheses after      
>>> response = pyip.inputCustom(addsUpToTen) 
123
The digits must add up to 10, not 6.
1235
The digits must add up to 10, not 11.
1234

# inputStr() returned and int, not a string.
>>> response
1234
>>> response = pyip.inputCustom(addsUpToTen)
hi
Invalid literal for int() with base 10: 'h'
73
>>> response
73
```
### Projects
- How to keep an idiot busy
- Multiplication Quiz
- Small story text-based game
- Personality Test