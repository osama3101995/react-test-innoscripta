
# nextjs-test-innoscripta

**Introduction**
A React Project that makes use of the following libraries and APIs:

- axios
- scss
- Guardian API
- News API
- auth0
- react-router-dom


**Run Locally**

1. Open the directory of the repo and run `npm install`
2. Then copy and paste the ".env.example" file and rename it to ".env".  
3. Fill up the env file by creating credentials at auth0.com, newsapi.org, open-platform.theguardian.com/access Follow instructions on the main websites.
4. run `npm start` to run the project.

**Docker**

1. Install Docker Desktop
2. Make sure that you have set up the .env file correctly
3. Make sure that port 3000 is available. If not, change:
    `ports:
      - '3000:3000' #change port to your availability` 
2. Open terminal and simply type `docker-compose up`

