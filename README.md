# Google cloud system mail notification example  

How can I be notified when Blackpink concerts tickets sale become available?  
I quickly thought about Google Drive and AppsScript:  
 * I could creat a script that scrap the web where the ticket will be published using a Google SpreadSheet as support for tracking and dectecting new city tickets sale.  
 * Schedule script execution every 6 hours.  

The problem with this approach was that the content about ticket in the web is dynamic generated so, we needed a headless browser to get the content.

## This is where google cloud comes in...
After some searching about accomplish dynamic web scrapping in AppsScript, I found this [reddit](https://www.reddit.com/r/GoogleAppsScript/comments/o1ccmy/comment/h22ulnf/?utm_source=share&utm_medium=web2x&context=3), this is where Google Cloud Functions and Puppeteer come in.  

## The approach
The approach is the same as the beginning but, we add a new element: Google Cloud Function.  
Building a function using node.js and puppeteer(a library that use a headless browser) to scrap the data related to tickets, we will be able to check if there is a new posted data about concert city and its tickets sale.

So we build:  
- A Google cloud function to parse data and return a json.
- A SpreadSheet used to store cities so we can check if there are new ones.
- An AppsScript function which will take care of:
    * Calling the GCF
    * Check if there is new city ticket information.
    * Send mail notifying the new data if is the case.
- A six hour activator for the AppsScript function.

>The full AppsScript code is in the file [apps-script-code.txt](./apps-script-code.txt)


# References  
1. Idea from [redit](https://www.reddit.com/r/GoogleAppsScript/comments/o1ccmy/comment/h22ulnf/?utm_source=share&utm_medium=web2x&context=3)
2. [How to use puppeteer on Google Cloud Functions](https://www.youtube.com/watch?v=i8THvr03FaY)

3. [Cómo extraer datos de un sitio web utilizando Node.js y Puppeteer](https://www.digitalocean.com/community/tutorials/how-to-scrape-a-website-using-node-js-and-puppeteer-es)

4. [gcloud cli installation](https://cloud.google.com/sdk/docs/install)

    ```javascript
    // login to gcloud 
    gcloud auth login

    // set a project
    gcloud config set project PROJECT_ID

    ```
