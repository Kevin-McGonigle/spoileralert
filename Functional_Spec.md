**0. Table of contents**

**1. Introduction**

1.1 Overview

1.2 Business Context

1.3 Glossary

**2.General Description**

2.1 Product/System functions

2.2 User characteristics and objectives

2.3 Operational Scenarios

2.4 Constraints

**3. Functional Requirements**

3.1 Finding relevant content from a webpage

3.2 Determining if isolated text contains a spoiler

3.3 Blocking the desired content

3.4 Warning the user before entering a web page with several spoilers

3.4.1 Return to previous web page

3.4.2 Proceed to web page with blocking

3.4.3 Proceed to web page without blocking

**4.System Architecture**

4.1 System architecture diagram

**5.High Level Design**

5.1 Context Diagram

5.2 Logical Data Structure

**6. Preliminary Schedule**

**7.Appendices**













**1. Introduction**

1.1 Overview

Our chosen third year project is to design and implement a Google Chrome extension called SpoilerAlert that will detect and block text-based spoilers for the Marvel Cinematic Universe (MCU) and Game of Thrones (GoT) on a web page.

The extension will first parse the HTML for the web page and determine what elements of the web page contain references to either GoT or the MCU; using information such as character names, place names and franchise-specific language that will be stored in a SQL database. These elements will then  each be analysed to identify whether or not they contain spoilers. Elements that are determined to contain spoilers will subsequently be blocked using a graphical overlay. The graphical overlay will have an option to allow the user to reveal the underlying text, thus removing the overlay. In the case of a web page having been determined to contain several spoilers, the user will be redirected to an intermediate screen that will warn them that the page they are loading contains multiple spoilers. This will function in a similar way to how a browser or anti-virus program will inform the user about dangerous websites before allowing them to proceed. From this screen, the user can then return to safety (by sending them back to the previous website), proceed to the web page with the spoilers blocked or proceed without spoiler blocking. Additionally, the user will be able to stop SpoilerAlert from running or to whitelist certain sites such that they will not be scanned for spoilers in future.

We chose to limit the scope of our project to only search for spoilers regarding the MCU or GoT for a number of reasons. Firstly, both franchises are wildly successful and popular with both leaning heavily on cliffhangers and major plot twists, resulting in spoilers regularly appearing for both and thus possibly increasing the demand for a product like the one we will be creating. On top of this, both universes notably play host to characters with rather unique names, plenty of fictional locations and even language that is specific to the franchise. This will make the ease of reliably determining whether a block of text is in reference to MCU or GoT substantially greater than for shows with more common names, places and language.

We would like to be able to implement our extension to function correctly on Facebook and/or Twitter, where spoilers would be most commonly found. However, given the time constraints we will be facing for development and adopting the advice we have received from our supervisor, we will initially focus our efforts on a supporting a website with a simpler structure (e.g. joe.ie or lovindublin.com) and, if possible, then expand to implementing support for Facebook and/or Twitter.

We will be making use of the IMDbPY API, which will allow us the query the online IMDB database for the most up-to-date information about each universe directly from our back-end Python scripts. The reason for querying the database is that it is updated every 24 hours and will save us having to manually update our information for either universe. We will also be making use of the BeautifulSoup module and the Natural Language ToolKit platform for Python to assist us in parsing the HTML of a web page and determining whether the parsed elements contain spoilers respectively.

1.2 Business Context

As our product will be essentially entirely intended for personal use rather than for use as a business tool, there is a very limited business aspect to be considered. With regard to the possibility of earning money as the creators of the extension, there is the prospect of potentially selling space on the element that will block the spoiler to advertisers. However, we believe this could be construed as an acquisitive choice and it is unlikely that we will pursue it. Alternatively, there is also the possibility of monetising the extension on the Chrome Web Store, should we choose to do so.

1.3 Glossary

SpoilerAlert - The name given to the program being described in this document

MCU - Marvel Cinematic Universe

GoT - Game of Thrones

IMDB - Internet Movie Database, contains a record of all films and TV shows released.

NLP - Natural Language Processing

Universe - Can refer to the fictional setting created by either the MCU or GoT

HTML element - An individual component of a HTML page

**2. General Description**

2.1 Product / System Functions

From our reading online about text analysis, we have learned that there are several ways to extract information. Our implementation uses a natural language processing algorithm. The features/workflow of our product;

- Parse HTML of web page.
- Identify elements that are relevant to the MCU or GoT.
- Identify and block spoilers from those elements using a graphical overlay with an appropriate alt tag and colour contrast.
- Provide an option to reveal the element if it has been blocked.
- In the event where our product identifies many spoilers on a webpage, the user is notified that the page will contain many spoilers and may choose to return to their previous web page, continue and block the spoilers or continue without blocking spoilers.
- Enable/disable the extension at any time.

2.2 User Characteristics and Objectives

Our expected user community is all fans of either the MCU and GoT, regardless of any personal traits they may have. We make no assumptions of the accessibility of our users. Our product will operate under the assumption that the user does not want to see spoilers for any film or episode of the series, regardless of the release date. For example, the product will still identify and block spoilers for Iron Man which was first released in 2008. We expect the users to be experienced using Google Chrome and how to navigate the extensions menu.

The main requirement from a users perspective is that it blocks as many relevant relevant spoilers as possible. It should have minimal effect on the speed of loading the webpage.

Product wish list:

- Fully implement in Facebook and Twitter.
- 100% accuracy in its spoiler detection.
- User can tell our product that they have seen a film or season and that there is no longer a need to block spoilers for that specific content.
- Include a welcome window detailing how to use and configure settings for the product.

2.3 Operational Scenarios

There are several scenarios to consider over the course of our development.

2.3.1 Detect Spoilers

| **Use Case** | Detect Spoilers |
| --- | --- |
| **Goal in Context** | Parse the HTML of the web page being loaded and determine which elements of the HTML |
| **Preconditions** | The user has tried to load a new web page. |
| **Success End Condition** | All existing spoilers on the page are detected. |
| **Failed End Condition** | One or more spoilers remain undetected. |
| **Actors** | User, System |
| **Trigger** | A new web page that is not whitelisted is loaded. |
| **Description** | **Step** | **Action** |
|   | 1 | Traverse each textual element of the HTML for the web page. |
|   | 2 | For each element, search for references to MCU or GoT characters, places or universe-specific language by querying the IMDb database. |
|   | 3 | Append the element to a list of elements that contain relevant references. |
|   | 4 | For each element in the above list, using NLP, determine whether or not the text is judged as a spoiler or not. |
|   | 5 | Append the element to a list of elements that contain spoilers, to subsequently be blocked. |
| **Extensions** | **Step** | **Branching Action** |
|   | 3a | Disregard the element as it does not reference MCU or GoT. |
|   | 5a | Disregard the element as it has been judged as not containing a spoiler. |
| **Variations** | **Step** | **Branching Action** |
|   | 2 | An element can either contain no reference to MCU or GoT, a reference to MCU, a reference to GoT or (very rarely) a reference to both. |
|   | 4 | An element may either contain a spoiler or not. |

2.3.2 Block A Spoiler

| **Use Case** | Block a Spoiler |
| --- | --- |
| **Goal in Context** | Hide a single spoiler on the web page behind a graphic overlay. |
| **Preconditions** | The user has tried to load a new web page. The web page is not whitelisted and has been analysed. |
| **Success End Condition** | The spoiler is completely hidden behind the graphic overlay. |
| **Failed End Condition** | The spoiler is not hidden behind a graphic overlay. |
| **Actors** | User, System |
| **Trigger** | A spoiler was detected when analysing the HTML. |
| **Description** | **Step** | **Action** |
|   | 1 | Find the element that contains the spoiler in the HTML. |
|   | 2 | Determine the appropriate size for the graphical overlay. |
|   | 3 | Apply the graphical overlay over the HTML element. |

2.3.2.1 Reveal a Spoiler

| **Use Case** | Reveal a Spoiler |
| --- | --- |
| **Goal in Context** | Remove an existing graphical overlay to reveal the underlying spoiler. |
| **Preconditions** | A spoiler has been blocked by SpoilerAlert |
| **Success End Condition** | The graphical overlay is removed and the spoiler is shown. |
| **Failed End Condition** | The graphical overlay is not successfully removed. |
| **Actors** | User, System |
| **Trigger** | The user clicks the &quot;Reveal&quot; button on the graphical overlay |
| **Description** | **Step** | **Action** |
|   | 1 | Remove the graphical overlay. |

2.3.3 Block Entire Web Page

In the case where a large number of spoilers are detected, the user will be forewarned of the existence of multiple spoilers on the web page and will be given the option to return to safety or to proceed with or without blocking.

| **Use Case** | Block Entire Web Page |
| --- | --- |
| **Goal in Context** | Block entry to a web page that contains many spoilers. |
| **Preconditions** | The user has tried to load a new web page. The web page is not whitelisted and has been analysed. |
| **Success End Condition** | The user is presented the intermediate warning screen with the three options. |
| **Failed End Condition** | The user is not presented with a fully functional intermediate warning screen. |
| **Actors** | User, System |
| **Trigger** | Web page is detected to contain many spoilers. |
| **Description** | **Step** | **Action** |
|   | 1 | Redirect the user to the intermediate warning screen. |
|   | 2 | Wait for user&#39;s input on warning screen. |
|   | 3 | Return to the previous website. |
| **Extensions** | **Step** | **Branching Action** |
|   | 3a | Proceed to the desired web page without blocking the detected spoilers. |
|   | 3b | Proceed to the desired web page, blocking all detected spoilers in the process. |
| **Variations** | **Step** | **Branching Action** |
|   | 2 | The user may choose from any of the following options:
- Return to safety
- Proceed to web page without blocking
- Proceed to web page with blocking
 |

2.3.3.1 Return To Safety

| **Use Case** | Return to Safety |
| --- | --- |
| **Goal in Context** | Return to the previous web page |
| **Preconditions** | The web page that the user was trying to load contains many spoilers and has been blocked entirely by the intermediate warning screen. |
| **Success End Condition** | The user is redirected back to the previous page. |
| **Failed End Condition** | The user is not redirected back to the previous page. |
| **Actors** | User, System |
| **Trigger** | The user has clicked the &quot;Return To Safety&quot; option. |
| **Description** | **Step** | **Action** |
|   | 1 | Obtain the URL of the previous website. |
|   | 2 | Redirect the user to this website. |

2.3.3.2 Proceed with Spoilers Blocked

| **Use Case** | Proceed with Spoilers Blocked |
| --- | --- |
| **Goal in Context** | Proceed to the web page being loaded with all detected spoiler being blocked as normal |
| **Preconditions** | The web page that the user was trying to load contains many spoilers and has been blocked entirely by the intermediate warning screen. |
| **Success End Condition** | The web page is displayed with all spoilers blocked. |
| **Failed End Condition** | The web page is not displayed or is displayed with spoilers not being blocked |
| **Actors** | User, System |
| **Trigger** | The user has clicked the &quot;Proceed with Spoilers Blocked&quot; option. |
| **Description** | **Step** | **Action** |
|   | 1 | Block every detected spoiler on the page as described in use case 2.3.2. |
|   | 2 | Display the web page. |

2.3.3.3 Proceed without Spoilers Blocked

| **Use Case** | Proceed without Spoilers Blocked |
| --- | --- |
| **Goal in Context** | Proceed to the web page being loaded with all detected spoilers remaining unblocked. |
| **Preconditions** | The web page that the user was trying to load contains many spoilers and has been blocked entirely by the intermediate warning screen. |
| **Success End Condition** | The web page is displayed with all spoilers not hidden. |
| **Failed End Condition** | The web page is not displayed or is displayed with spoilers hidden. |
| **Actors** | User, System |
| **Trigger** | The user has clicked the &quot;Proceed without Spoilers Blocked&quot; option. |
| **Description** | **Step** | **Action** |
|   | 1 | Display the web page |

2.3.4 Disable SpoilerAlert

| **Use Case** | Disable SpoilerAlert |
| --- | --- |
| **Goal in Context** | Prevent SpoilerAlert from running until it has been re-enabled. |
| **Preconditions** | SpoilerAlert is enabled. |
| **Success End Condition** | SpoilerAlert is disabled. |
| **Failed End Condition** | SpoilerAlert remains enabled. |
| **Actors** | User, System |
| **Trigger** | The user has clicked &quot;Disable SpoilerAlert&quot; in the extension&#39;s menu. |
| **Description** | **Step** | **Action** |
|   | 1 | Prevent SpoilerAlert from running. |
|   | 2 | Change the Disable option to Enable. |

2.3.5 Enable SpoilerAlert

| **Use Case** | Enable SpoilerAlert |
| --- | --- |
| **Goal in Context** | Allow SpoilerAlert to run until it has been disabled. |
| **Preconditions** | SpoilerAlert is disabled. |
| **Success End Condition** | SpoilerAlert is enabled. |
| **Failed End Condition** | SpoilerAlert remains disabled. |
| **Actors** | User, System |
| **Trigger** | The user has clicked &quot;Enable SpoilerAlert&quot; in the extension&#39;s menu. |
| **Description** | **Step** | **Action** |
|   | 1 | Resume SpoilerAlert&#39;s function |
|   | 2 | Change the Enable option to Disable. |

2.3.6 Whitelist a Website/Web Page

| **Use Case** | Whitelist a Website/Page |
| --- | --- |
| **Goal in Context** | Add a website to SpoilerAlert&#39;s whitelist such that spoilers will not be blocked. |
| **Preconditions** | The website is not currently on SpoilerAlert&#39;s whitelist |
| **Success End Condition** | The website is added to the whitelist. Spoilers are no longer hidden on the website. |
| **Failed End Condition** | The website is not added to the whitelist. Spoilers remain hidden. |
| **Actors** | User, System |
| **Trigger** | The user has selected the &quot;Whitelist the Current Website&quot; |
| **Description** | **Step** | **Action** |
|   | 1 | Present the user with a prompt to specify how specific they wish the whitelist entry to be (ie. entire website or specific page(s)) |
|   | 2 | Update the whitelist to include the specified pattern. |

2.4 Constraints

2.4.1 Time

This particular project has a lot of room for development and there is a lot that must be done to perfect it, particularly with regard to the ability to successfully identify spoilers. With the deadlines in place, we have had to limit our product to only block spoilers related to the MCU and GoT and to only function for a simple website, possibly expanding to Facebook and/or Twitter if possible. However, providing sufficient time for development, we believe that we could feasibly build a working spoiler blocker for a much wider range of shows or films and with general support for any website.In addition, we are confident that we would be able to implement most, if not all, of the product wish list in section 2.2 should we be given enough time.

2.4.2 Subjectivity of Spoilers

A major obstacle that we face is the fact that there is no universally recognised definition for what constitutes a spoiler and thus we have to work under some assumptions for how our spoiler blocking will work. We are making the assumption that the user has seen no Marvel films or episodes of GoT and that a piece of text that could possibly spoil any part of each of the universe should be blocked. As well as that, a phrase that could be interpreted as a spoiler by one user may not be interpreted as a spoiler by another user. To account for this, we are going to implement a strict blocking algorithm, since we believe it would be better to block a potential spoiler than leave it visible, even if false positive results occur as a result of this.

2.4.3 Differing structures of websites

The widely differing structure of the HTML of different websites has prompted us to focus our efforts on simpler websites. Trying to implement our extension to work with Facebook for example, would be a much bigger challenge since it is obviously a much more complex website than a simpler blog site such as  joe.ie.

2.4.4 Testing

Testing is one of our constraints because there is a lack of a &#39;gold standard&#39; dataset that we can use to test our product. This is an issue due to subjectivity vs objectivity as mentioned in section 2.4.2 above. To cope with this, under the guidance of our supervisor, we have decided conduct a survey of users which will involve taking several pieces of text and asking the users to identify which blocks of text they believe to contain spoilers and to specify why. To ensure a fair sample, we will look to include an equal amount of users who have seen neither GoT or the selected MCU movies, users who have seen GoT but not the selected MCU movies, users who have not seen GoT but who have seen the selected MCU movies, and users who have seen both GoT and the selected MCU movies. We will then look for an agreeance between the subjects as to which pieces of text are spoilers and why. We are currently awaiting ethical approval before proceed with conducting this survey.

**3. Functional Requirements**

3.1 Finding relevant content from a web page

-  Description: Upon the request to load a web page, our product will immediately begin identifying elements that contain references to MCU and GoT.
-  Criticality: We believe that finding relevant material from a web page is one of the most critical components of our product, since we obviously cannot block spoilers based on the MCU and GoT if we cannot initially find content that contains material relating to either universe.
- Technical Issues: Gathering text from a html page by parsing it and formatting it correctly so that its contents can be analysed. Another issue is obviously correctly identifying when the contents of a HTML element match a particular universe using NLP.
- Dependencies with other requirements: As mentioned, this is the starting point for our product and it depends almost exclusively on the successful detection of relevant content to either universe.

3.2 Determining if isolated text contains a spoiler

- Description: Once the program has determined which elements of the web page contain references to MCU and GoT, it must then check each one and reliably determine whether or not the element contains a spoiler.
- Criticality: This is an essential part of the application and must not only be included but work reliably through careful training.
- Technical Issues: Implementing effective machine learning to reliably and successfully determine whether a block of text contains a spoiler.
- Dependencies with other requirements: This requirement relies heavily on requirement 3.1 to generate the input for analysing. Requirement 3.3 depends on this requirement to successfully determine what content contains spoilers so that the correct element(s) may be hidden.

3.3 Blocking the desired content

- Description: After successfully finding and identifying a HTML element that contains a spoiler, our product will then hide said element using a graphical overlay.
- Criticality: This component is, in our opinion, a fundamental feature of the product and thus it is crucial that it be implemented correctly.
- Technical Issues: Formatting the overlay correctly over elements of any dimensions, taking into account the font sizing and start and end points of the spoiler.
- Dependencies with other requirements: Text must be successfully classified as a spoiler before it can/should be blocked (Requirement 3.2).

3.4 Warning the user before entering a web page with several spoilers

- Description: Should the extension determine that the web page that the user is loading contains several spoilers, an intermediate screen should be displayed before the web page is displayed to inform the user that the page has many spoilers. The user will then be given the option to return to the previous page, to proceed to the website with the spoilers blocked or to proceed with no blocking.
- Criticality: This is a feature we would ideally like to implement, but is not strictly necessary to the system&#39;s success. Therefore it will have a lower priority than previous requirements.
- Technical Issues: We must figure out how to redirect the browser to display this screen before the web page itself is displayed and implement each subsequent option to provide the desired functionality.
- Dependencies with other requirements: For this to work, requirements 3.1 and 3.2 must me implemented successfully. For the option to progress with spoilers blocked, 3.3 must also be functional.

3.4.1 Return to previous web page

- Description: Should the user choose to &quot;Return to Safety&quot;, the web page that was set to be loaded will not be displayed and the browser will be redirected back to the previous web page.
- Criticality: This is a critical feature provided that requirement 3.4 has been implemented. Otherwise this requirement is redundant.
- Technical Issues: This requirement should not pose any substantial technical issues.
- Dependencies with other requirements: The existence of this feature relies entirely on the implementation of requirement 3.4.

3.4.2 Proceed to web page with blocking

- Description: Should the user choose this option, the web page will be displayed with the spoilers blocked as expected.
- Criticality: Provided that we have chosen to implement requirement 3.4, this will be a useful feature but not essential by any means. Otherwise, this feature would be redundant.
- Technical Issues: Due to the large volume of spoilers present on the page, the application must be careful when hiding them.
- Dependencies with other requirement: The existence of this feature relies entirely on the implementation of requirement 3.4.

3.4.3 Proceed to web page without blocking

- Description: Upon choosing this option, the user will proceed to the web page in question without the detected spoilers being hidden.
- Criticality: Similar to requirement 3.4.2 this is not an essential requirement to implement. However, provided that 3.4 has been implemented, we should look into implementing at least one but likely both methods of proceeding.
- Technical Issues: This requirement should not present any technical issues. It simply displays the page as it would if SpoilerAlert was disabled.
- Dependencies with other requirements: The existence of this feature relies entirely on the implementation of requirement 3.4.

3.5 Enable/Disable the extension

- Description: The user will have to option to disable and re-enable the extension as they see fit from the extension&#39;s menu (accessed by clicking the extension&#39;s icon in the top right of the browser). Disabling the extension will prevent any spoilers from being blocked until the extension is re-enabled.
- Criticality: This is a feature we would ideally like to implementbut it is very much external to the main goal of the extension and should therefore be viewed as optional.
- Technical Issues: The only slight issue that may be encountered with this requirement is ensuring that the state of the extension is stored and used again the next time the browser is opened.
- Dependencies with other requirements: This feature will have the ability to disable the functionality of requirements 3.1 - 3.4.

3.6 Adding a website/web page to the whitelist

- Description: The user will be able to add the current website/web page they are on to SpoilerAlert&#39;s whitelist, which will prevent spoilers from being blocked on that site/page in future. This will be done by choosing the &quot;Whitelist the Current Website&quot; option in the extension&#39;s menu and choosing the specificity of the pattern to whitelist in a subsequent prompt.
- Criticality: This feature is very much a peripheral feature and should not be implemented until the more essential requirements have been fulfilled.
- Technical Issues: The issue with this feature is similar to that of requirement 3.5 in that the whitelist must be stored for later use.
- Dependencies with other requirements: This feature requires features 3.1 - 3.4 to be implemented.



# 4. System Architecture

4.1 System Architecture diagram
![System Architecture Diagram](/Images/SystemArchitectureDesign.PNG)


**Website:** The website that is visited by the user. Our product will determine if the website visited by the user is a valid website that the product can begin parsing and analysing text.

**Back end python scripts:** In the case where the website is valid, the product will begin parsing the HTML of the web page and isolate text from each of the elements using python. It will then determine if any of the extracted text contains content that is related to either universe.

**IMDbPY:** This is an external API that we will use to retrieve the most up to date information about the MCU and GoT. The product will look for the names of characters, actors, episodes and films and will return these so that they can be used when analysing text to determine if it is relevant to either universe.

**Front end HTML/CSS/Javascript/Chrome Dev Tools:** In the case where a spoiler has successfully been detected, the front end tools will build an appropriately sized overlay to block a piece of text that contains a spoiler.

# 5. High-Level Design

**Context Diagram**

![Context Diagram](/Images/ContextDiagram.PNG)

Logical Data Structure

![Logical Data Structure](/Images/LDS.PNG)


State Machine for User accessed web page

![State Machine](/Images/StateMachineWebPage.PNG)

**6. Preliminary Schedule**

Below is a GANTT chart detailing our expected start/stop dates for each task that is required for this product. We intend to adopt an agile approach to our development by dividing tasks between ourselves and later merging their functionality.

![GANTT](/Images/Gantt.PNG)

**7. Appendices**

IMDbPY API

Perkins, J. (2014) _Python 3 Text Processing with NLTK 3 Cookbook._ Birmingham: Packt Publishing Ltd.

[https://imdbpy.sourceforge.io/](https://imdbpy.sourceforge.io/index.html)

Natural Language Toolkit (NLTK) Python Platform

https://www.nltk.org/

Google Chrome Development Tools

[https://developers.google.com/web/tools/chrome-devtools/](https://developers.google.com/web/tools/chrome-devtools/)

Beautiful Soup Python Module

[https://www.crummy.com/software/BeautifulSoup/bs4/doc/](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)