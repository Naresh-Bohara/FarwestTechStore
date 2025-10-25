# Project Setup 
- Get in the location where you want to setup your project
- Install vite via npm or yarn or pnpm or bun 

## Vite Setup via Yarn
- cmd: ```yarn create vite <foldername>```
- Once the process is complete, 
- get inside ```<foldername>``` 
    - ```cd <foldername>```
- install packages 
    - ``` yarn ```
- Once the installation is done, run the code
    - ``` yarn run dev```
    - This will host your FE to a link 


## Web Development 
### SDLC (Software Development Lifecycle)
- Analysis and Requirement Gathering 
    - Ecommerce 
- Designing 
    - Wireframe design 
        - Done by client or Project Owner or designer 
    - UI/UX Developer 
        - Branding ux defintion, Mock desgin 
            - figma, canva, photoshops, AI
    - Prototype 
        - Desginer, UI/UX developer
        - figma, canva, html/css
    - Slicing 
        - Convert React components, html css,
        - Designer, FE Developer
    - Integration 
        - FE Developer
- Developement 
    - BE Develop 
    - FE Integration 
- Testing 
    - Testers/QA testing 
        - Unit test 
        - Functional Test 
- Deployment 
    - Live 
        - Alpha
        - Beta
        - Live (Production)
- Maintainence 
    - Monitor 
- New Feature Development 
    - Cycle repeate

## Agile Process
- Sprint 
- Scrum 

## Design 
- HTML css 

## Responsiveness breakpoints
- xs 
    - smart watch, lower resolution smart phones
- sm 
    - mobile device 
- md 
    - tablets, landscape mode phones
- lg 
    - ipads, laptops 
- xl 
    - gaming pc, monitors, laptops
- xxl 
    - Tv, smart boards, hoarding boards, print media, Retina display 

### To use tailwind
- install tailwind in your project 
    - yarn add -D tailwindcss autoprefixer postcss
- create tailwind config 
    - npx tailwindcss init -p
    - it will create tailwin.config.js and postcss.config.js in root
- change tailwind config 
    - ```export default {
            content: [
                "./index.html",
                "./src/**/*.{js,jsx,ts,tsx}",
            ],
            theme: {
                extend: {},
            },
            plugins: [],
            }```
    - add tailwind css to your main css file 
        - ```@tailwind base;
            @tailwind components;
            @tailwind utilities;```
- start your server 
    - ```yarn run dev```

## flowbite use 
- ``` yarn add flowbite flowbite-react```
- tailwind config change to add flowbite 
    - ```content: [
            ...<old content>
            "./node_modules/flowbite/**/*.js"
        ],
        ...
        plugins: [
            require("flowbite/plugin")
        ]```
    - flobite-react to use 
        - import flowbite from "flowbite-react/tailwind"
        - change config tailwind 
            ```content: [
                ...<old content>
                flowbite.content()
            ],
            ...
            plugins: [
                require("flowbite/plugin"),
                flowbite.plugin()
            ]```

## Folder Struture 
```node_modules/```
```public/```
    ```...```
```src/```
    ```assets/```       ``` the job of this folder is to maintain css, images, or any external resources required```
        ```css/```      ``` to store global or main css ```
            ```*.css```
        ```images/```   ``` this directory will store all the images required for the project ```
    ```components/```   ``` to store all the UI Components of the project ```
        ```....```
    ```pages/```        ``` to store all the pages , every url is a page and a page contains multiple UI Components```
        ```...```
    ```config/```      ``` to store the configurations ```
        ```...```
    ```services/```     ``` to store the base services or other services for project ```
        ```...```
    ```context/```      ``` to store all the context and context based componets in this directory ```
        ```...```
    ```reducers/```     ``` to store all the redux that we are going to use ```
        ```...```
    ```utilities/```    ``` to store those files and folders that does not requires any other services or configurations```
        ```...```


## Form 
- Design 
- Validation
- Action (Submission, errors and handling)


### Form-input
- type attribute 
    - text, email(text@text), number, date(YYYY-MM-DD), time(HH:ii AM/PM), datetime-local(YYYY-MM-DD HH:ii AM/PM), file, url(http/s://www.**), checkbox(multiple choice multiple selection), radio(multiple options but single selection),  submit, reset, button, tel(only supported by safari on mac), range, hidden, ...
NOTE: all the fields must have name attribute and should be unique(except exceptions)
- validation 
    - required, checked, selected, min, max, ....
- placeholder
- defaultValue or value

### TextArea 
- ```<textarea rows='' cols='' ...></textarea>```

### Select-Options 
- ```<select ....>```
```<option value="value to send">Label</option>```
```</select>```

### Button 
- ```<button type="submit|reset|button">Label</button>```

### Label
- ```<label htmlFor='id'>Value</label>```


## Validate 
- BE 
- FE 
- Database level


# Send or Receive 
- To and from server
- Client Server Architecture 
- Client Requests Data 
- Server Respond Client 

- Server Directly client Push data (Bi-directional Communication, socket.io)
    - Real time applications 
    - chat applications 

## Communiction
- Medium Request ====> API (Applicatio programming Interface)
- HTTP protocol based methods 
    - TCP/IP - UDP
- 5 methods, API methods, Http vverbs
    - get, post, put, patch, delete
    - CRUD Operation 
        - Create
            - post
        - Read 
            - get,post
        - Update 
            - put/patch
        - Delete
            - delete

## Vacation Homework
- Some design 
    - Home page design complete 
    - category list 
    - Product Detail Page
    - Cart page 
    - Profile page

/admin
- CRUD Pages 
    - Banner 
        - /banner/create =====> Form TO create a Banner
        - /banner =====> Table to list
    - Brand
        - 

        Title               Slug                Image                   status                          Actions
        ------------------------------------------------------------------------------------------------------------------------
        Apple              apple                url                     Active/Inactive                 icon for edit /delete


    - Category 
    - Product
    - User
    - Order
        - /order
        

## Server Side program 
- language 
    - js - nodejs 
        - express js 
    - php
    - python 
    - .net 
    - java

### API (REST method, SOAP based, Graphql)
- Representational Stateless Transfer
- Research, 
    - Server Nodejs
    - REST API 
    - Communication 
    - MVC Pattern (VVVVVVVVVVVI)     
    - monolithic vc microservice based architecture

### XMLHTTP request (XHR)
- XMLHttpRequest class
- fetch() nodejs
- axios

## Banenr Content
- Banner Title
- Image
- Link
- Status
- Description
- StartDate
- EndDate


## Banner Data (software development)
- DDD (Design driven development)
- TDD (Test driven development)
- BDD (Behavioural/business driven development)



<!-- We can use instead of ckeditor draft.js or tinyMCE -->


## Socket Programing:

                Socket Server

client (node)       client (node)       client (node)       client (node)       client (node)



## Agile
- Process (Starting phase complete timeframe)
- Iterative Development
- Every day => Standup Meeting (15 min)
  - Yesterday's work
  - What you are working on today
  - If any issues, raise them
- Task start estimates

Project Duration: 3 months [Sprint Board, Kanban Board]
- Starting day => Kickoff Meeting
  - PM overview
  - PM tasks define
  - Estimates (in hours, story points)  
    - Example: Login screen = 4h  
    - Example: Task Z = 8h
- On board
- Sprint duration: 1 week / 15 days
- Monday => Sprint Planning Meeting
- Friday => Retrospective Meeting


### Agile Process Overview
## Key Concepts
- **Process:** Define starting phase and complete timeframe.
- **Iterative Development:** Work in repeated cycles (sprints) to progressively deliver features.
- **Daily Standup Meetings (15 min):**  
  Each team member discusses:  
  - Work completed yesterday  
  - Work planned for today  
  - Any blockers/issues
- **Task Estimation:** Provide start estimates for tasks (in hours or story points).

---

## Project Duration
- **Total Duration:** 3 months  
- **Boards:** Sprint Board, Kanban Board  

---

## Key Meetings

### Kickoff Meeting (Project Start)
- Project Manager (PM) overview  
- Task definition and assignment  
- Task estimation  
  - Example: Login screen = 4h  
  - Example: Task Z = 8h  

### Sprint Planning Meeting (Every Monday)
- Plan tasks for the upcoming sprint  

### Retrospective Meeting (Every Friday)
- Review progress and discuss improvements  

---

## Sprint Cycle
- **Duration per Sprint:** 1–2 weeks  
- **Board Updates:** Track task progress on the Sprint/Kanban board  


### PMT:
- jira
- trello
- clickup
- zoho


## interview
 - techinical round....
 - REPL
 - async-await
 - middleware
 - garbage collector 
 - global error handler
 - js hoisting
 - packages (redux) (global storage in react)
 - createAsyncThunk (to hanndle async in redux)
 - cors
 - xsrf / csrf
 - throttle 
 - rate limiter

 //////////////////////////////////////////////////////////

 - forget-password endnpoint, userlistingn fronntend user managemnt .....enndpints...
