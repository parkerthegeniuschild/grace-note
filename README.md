## INSTALL STEPS

#### Create new file name `.env` in the root folder of the project.<br />

#### Copy contents of `.env.example` and paste into the newly created file. If you are using a remote databse, then replace all missing values with yours. <br />

#### Run the command `yarn install --frozen-lockfile` from terminal.<br />

#### Run `yarn dev` to start it in development mode.<br />

#### Run `yarn build` followed by `yarn start` to simulate production mode.<br/><br/>

## ENDPOINTS

### Test:

Confirm that everything is running by hitting: <br>
`GET /api/v1` <br/>
This should return a welcome message. All furthers request must prepend the base path `/api/v1` in the url.

### Search and Store Airings:

This will search and store airings without the top-tier preferred images in the database. <br />
`GET: /lineups/search` <br/>
`QUERY PARAMETERS: api_key<String>, postalCode<String>, country<String>, lineupsAmount<1>`
<br />
Note that this request might take a long time, because it does a deep search. Therefore, it will be return a URI which can be used to check for data while the search process is handle off-request.
For testing purposes, please add `lineupsAmount: 1` to query parameters to return a small set of result.

### Fetch Airings:

This will retrieve airings that were gotten from the previous search after the results are available and populated. You should wait a while before calling this endpoint because it takes a while to perfom the searches. A search made too soon will result in an empty result. <br />
`GET: /airings/missingpreferredimage` <br />
`QUERY PARAMS: currentPage<Number>, limit<Number>, sort<String>`

### Update Airing:

This will add the missing preferred image for an airing and will also correct the image category. <br />
`PATCH: /airings/missingpreferredimage/:airingId` <br/>
`BODY PARAMS: uri: <String>`
