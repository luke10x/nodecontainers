# Even shorter version
Hello, my name is Luke
and I am an instructor at 10X Developer.

In this video I will guide you through the process of
how to setup a monorepo structure for distributed platform,
that consists of React frontend and Express.js backend.
Both written in typescript, because typescript is 10x javascript,
but the same principle applies for applications
 written in any language,
because I will run everything in Docker, it does not really matter...
In fact I don't even have Node.js installed.
Nothing like node, npm, npx, deno, or anything like that,
is installed on my machine.
Instead all required dependencies are packed inside docker containers.

This is a detailed HOWTO video, explaining the whole process by example,
for your convenience, the rest of this video is divided into 5 steps.
In the description, you will find the timestamp links,
you can jump directly into a specific step, if you only interested in that topic.

Here is what I am going to talk about in each of these steps.

- First I want to start with explaining what exactly I mean when I say *"Monorepo"*

- Second, I will show how we generate a *react application* using create-react-app
  without node.js installed on the host machine;

- then, I will configure *docker-compose*
  to run the development environment, using *Makefile*
  to save us from typing those long Docker commands with all these arguments;
  
- And then hen I will bootstrap a small *Express.js* http service,
  with some very simple REST endpoint;

- Finally, will write some React code using *fetch API*
  to show how does it exactly look, when the frontend calls the backend,
  so we all gonna see both components working together;

So this is the plan, and I hope you find this useful. 
Please subscribe to the 10x Developer channel,
hit the like button for this video, so that I can see if there is any interest,
and I can provide more content like this.

Soon, you will have a clear idea
how you can bootstrap a monorepo using docker-compose.
This is what I actually do when I need to start a new project.
In fact, this video is just repeating the very beginning, of exactly what i did,
in order to setup my latest fullstack project called TAXX.

I started TAXX project, just for myself
to stay on top of my tasks,
and I actually use this application every day.
Before I was using the Bullet Journal analogue system created by Ryder Carroll.
It helped me get organized and become 10 times more productive.

But then I realized that I actually need a digital system, or an App,
because I kept forgetting to to take my paper notebook wherever I go,
and my phone, I always have it with me...

In this video I am using TAXX, as a refence example,
pretending that I am coding it for the first time,
just to explain to you,
what does it take to build the software like this from scratch.

So when I started to develop this project,
I said, OK, there is going to be just one
repository on github to store all the code.

And this is basically what is a monorepo...

## 1. monorepo

It is important to understand, that there are 2 different types of Monorepo.

Colossal monorepo and Platform monorepo.

I would say when you hear this word - "monorepo",
it most likelly refferst to the Colossal monorepo...

You may have heard that some big companies like google, facebook or twitter,
use their gigantic monorepos to store all their code and digital assets, what not. 


We are talking about massive amounts of storage,
billions of lines of code, they estimate that at google their repository takes more than 80 terabytes,
and their build pipelines are more complex than a gas works factory. 

They have good reasons to use this setup
But besides of these big players, for the rest of the industry
it would not be a practical solution,
In fact it could be overkill. 

I think it was Open Source ways of development and Package managers that pushed
the rest of the software industry into using a somewhat completely opposite approach.
Where they don't use monorepo at all, 
in other words they use polyrepo.

Where every component, even a smallest library, has a separate repository for their code.
Which results in having your code spread across so many different repositories.
Which sometimes, also results in complexity, and leads to dependency hell situations.
"Hello world" react application has like a 1000 dependent libraries...
Many companies also follow this open source pattern for their internal products 

Lately, it has become a trend to use *platform monorepos*.
Where essentially code that runs together is kept together.
*This is the  type of a monorepo*
*that I want to talk about in this video*.

It can be convenient when you have a distributed application,
especially in microservices, or shared libraries used from different packages.
It makes it easy to onboard new developers to a project,
Allows refactoring across services with more confidence.
And avoids version incompatibilities.

So I hope now we are on the same page what
I mean when I say "monorepo".
So we can go ahead and start organizing our code one directory,
containing multiple different products.

# React aplication

First we will start with a React application,
because when you think about it, in case of TAXX,
users are interacting with a web app.

So to create a web application I  would normaly use 'npx create-react-application'
and yeah, of course I want to use typescript ere...

but a-a-a, I said there is no node.js installed on this computer.
this command would not work.

Luckily I have docker ere...

So I can wrap npx command into docker container
...made from node.js image...
...I would mount, the process working directory,
which is root directory for this monorepo,
as a volume inside specific location in the docker container,
and use that specific location as process working directory
for the command that is executed inside the container.

this command will take a while to execute,
so what is happening ere, in a nutshell:

- say it is my pc
- and if you take a look in the difectory tree, in my home directory
- you can see the 'taxx' directory, that is going to be a root for our monorepo.
- Lets say it is almost empty, at the moment,
  just with this license file inside it
- now what happens if we start a docker container,
- inside that container is a file system of the node image.
  the container can only access only files inside its own filesystem.
- unless we define some diretory as a mountpoint for a volume,
  in this case it is that /temp directory
- And then we mount the taxx directory, from the host filesystem,
  (the filesystem of my computer), to the temp mountpoint inside the node container.
- so that when docker container looks at its temp directory,
  it is actually looking at the taxx directory on the host machine.
  of course docker container does not understand it,
  it thinks that the world ends where its filesystem ends...
  but the mounted volume actually points to a location on my host machine.
- and if we run that npx command, inside the container,
  and the command would create the app directory with the new application inside.
  effectively it is creating a directory inside the taxx directory on my computer.
- and when the container exits, the created app directory stays in the taxx root.
  This is how we can run npx command that requires node,
  using node that comes with the docker container,
  so that there is no need to install node on my computer.
  And after the npx command exits,
  the container is destroyed, because it did its job, generated files for us,
  everything what existed in its filesystem dissapears,
  exept the vouleme that was mounted from the filesystem
  external to this docker container. 

So the container is no more, but the generated files are with us.

good!!!

Now that we have a react application, let's see how can we run it,
because we don't have node.js here - all right.

## 3. docker-compose and Makefile

So we using a docker-compose, a tool that is used to describe how docker containers run together.
for that we need to create a docker-compose.yml file.

So let me just touch this file to create it.

It is funny how you touch something that does not exist, and by doing so you create it.
Uh, I wish I could *touch* money like that.

You can, of course, do it from inside Visual Studio Code,
but touching is a more pleasing experience.

Anyway let me open the file,
So we will be using docker composer version 3.7 format,

And in the services section let me define our first service, this will run the development server of the react application, let’s call service “app”

Let it use node image,

We will mount the generated app directory as a mounted volume, all volumes in TAXX-Stack containers will be mounted on slash-mnt subdirectories...

We will use this mounted volume as a process working directory.

Bash will be used as an entry point.

And we will execute the command `npm start`, notice that we need “CI=true” environment variable.

And we need to set up the port forwarding so that requests to localhost 3000, could reach the 
docker container. 

This configuration will start create-react-app development server, that will serve the javascript application, and will keep reloading it on any change to the source files.

When you done configuring it this section, you can go back to the black window.

From here we will simply run 
Docker-compose up 
To start the react application server.


When it is up you can just access the localhost on port 3000 to see that the web application is up and running.
#### 3.2 makefile

To remember and type all these docker-compose commands,
Can be tricky, I suggest to automate them with GNU Make,
Which is also like a form of live documentation.

Touch a Makefile with these targets:
Up-app: # to start the container, notice the -d ,- it will make it run in the background...
 
Logs: since it runs in the background we need to run this separate command to put tail on its logs
 
Install-app: install command we only need to run after cloning the repo from git, or after updating npm dependencies
 
Into-app: is sometimes is useful to shell into a running container, say to debug or monitor something
 
Unrootify: because the files are rootified, when they created inside docker. 
   Notice the double bucks, sometimes we need extra escaping inside the Makefiles.  


## 4. Express.js application

Ok, so TAXX application use Sync backend service,
so that it can sync the task updates accross my devices.

Let's just go ahead and introduce a small REST backend,
in this example monorepo setup.

And let's call it Sync - just like in TAXX project.

So we create a directory for it...

And we will change into this directory, and run npm init

But again we are running it in docker,
notice now we can just mount directly into sync directory, which is a workdir for the process executed in the container.

We can see this command generated a package.json for the sync server.

In docker-compose yaml, just copy over the service definition boilerplate

We need to replace:
App with sync
Remove this CI=true
We will use port 4000 for the backend sync server
Looks good,

Now lets make copies of some tasks in Makefile to work with the sync service
So we create new tasks:
Up-sync
Install-sync
Into-sync
and then combined:
Up #for all services
And combined install # also running install for all services



Now when we do `make up logs` we clearly see the sync server crashed while running npm start.



So we simply make into-sync

It does not have start script. Not surprising actually unlike with react app, it will not be fully generated for us, we need to actually create this app.

Install some dependencies:

    npm install express cors

Then some development dependencies:

    npm install --save-dev nodemon typescript ts-node ## @types/node


So let’s now introduce that missing script it is right here in package.json

To save this file we may need unrootify it again

//We will add nodemon --exec ts-node src/index.ts

We will run nodemon which will monitor source files and execute ts-node when the
y change,
and this will be an entrypoint to our app, lets create a directory and touch the file!

So in this new file:

    // 1. We import those dependencies
    import * as express from 'express';
    import * as cors from 'cors';
    
    // 2. Create an express applcation
    const app = express();
    
    // 3. Make it possible to call this service from anywhere from now
    app.use(cors());
    
    // 5. Now when handle HTTP requests to this sync API
    app.get( "/", ( req, res ) => {
    res.send( "ðŸ”„ sync server is active!" );
    });
    
    // 4. Express will listen on port 4000,
    // When it starts - we will see a message in the logs
    const port = 4000;
    app.listen( port, () => {
    console.log( `ðŸ”„ server running on http://localhost:${ port }` );
    });


Save the file, unrootify if necessary

<!-- Try `npm start` while you shelled into the sync container

Ok, it says its running, -->


Now if we exit from here,
now just:

make up-sync logs

And, yes it works!

## 5. FETCH API


Now this is the cherry on the cake, 
I will make these two component the frontend app, and the sync backend
to work together.

Well essentially it is just an AJAX call, 
that the react app will be making into the synch backend.

## ----
So this is it - the application is up and functional,
And that is all what I wanted to show you this time.

And before I say bye for now I would like to ask you
to leave your comments, what do you think.

I am planning to upload more videos,
explaining how do you create a fullstack application like TAXX
from scratch, from the bottom to the top.

If you have specific area what you want to be covered first,
again, please let me know in the comment section.

And also just to show that you are interested
so I can keep uploading more content,
please,
smash the subscribe button, so that I can see that someone is really waiting
for the new videos to come,
and believe, this means a lot to me.

So this is it now, see you later.

