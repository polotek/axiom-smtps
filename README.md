## Axiom Stack SMTPS Helper class

A helper class with settings for allowing you to send emails securely over smtps.  Right now it is specific to Gmail, but it can easily be a little more generalized.  I'll do that at some point.

## Installation

There is just one class representing the GMail transport.  Copy smtps.js into any Global prototype folder in your app.

There are also several properties that need to be set.  The properties in `app.properties` can be copied into the properties file of your app. Make sure to update the username and password.

You will need the latest version of JavaMail until the lib is updated in Axiom Stack.

<http://java.sun.com/products/javamail/downloads/index.html>

Replace `mail.jar` in your `$AXIOM_ROOT/lib` folder with the version from this package.

## Usage

    // This will pull the login credentials from your app.properties
    var gmailer = new GMail()
    
    /* you can also provide your username and password in code
       
       var gmail = new GMail(user, pass);
    */
    // sendMail(toArray, subjectStr, messageStr, ccArray, bccArray)
    gmailer.sendMail(['you@gmail.com', 'other_guy@gmail.com'], 'This is the Subject, 'I'm sending you and email message', ['me@gmail.com'], ['the_boss@gmail.com'])
    
Notice that right now toArray, ccArray and bccArray **must** be arrays.  Even if they only contain one item.  I plan to fix that as well.  They can be *array-like* as well.  Just need a length property.  Iterators are not supported yet.

## Future Changes

- Make the class more generic instead of gmail specific
- Allow configuring the email transport in code instead of pulling from properties each time.
- Allow passing in single address instead of arrays
- Allow specifying different parts of email separately, (i.e. `gmailer.setTo('you@gmail.com')` ) similar to current Axiom Mail extension.
