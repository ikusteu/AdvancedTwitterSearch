/**
 *
 *  Simple proxy used to override browser CORS policy
 *
 *  -takes in primary request(inbound request)
 *  -parses secondary request(outbound request) from primary with authorization header
 *  -makes a secondary request and passes response from secondary to primary with basic CORS headers
 *
 */
// import from node modules
import http from "http"
import { URL } from "url"
import axios from "axios"

const serverFunction = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  // init cors headers and write them to primary response headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Allow-Headers": "Authorization",
    "Access-Control-Max-Age": 2592000,
  }

  // get method from primary request
  type AxiosMethod = NonNullable<Parameters<typeof axios>[1]>["method"]
  const method = req.method as AxiosMethod

  // if preflight request, respond with cors headers
  if (method?.toLowerCase() == "options") {
    res.writeHead(200, corsHeaders)
    res.end()
  } else {
    // get secondary url to be passed to outbound request
    const secondaryUrl = new URL(req.url?.replace("/", "") as string).href

    // get authorization header from req
    const authorization = req.headers.authorization || ""

    // make secondary request and pass response to primary response
    if (secondaryUrl) {
      axios(secondaryUrl, {
        method,
        headers: {
          authorization,
        },
      })
        .then((success) => {
          res.writeHead(200, corsHeaders)
          res.end(JSON.stringify(success.data.data))
        })
        .catch((err) => {
          res.writeHead(400, corsHeaders)
          if (typeof err == "string") {
            res.end(err)
          } else {
            res.end(JSON.stringify(err, null, 2))
          }
        })
    }
  }
}

const server = http.createServer(serverFunction)

server.listen(
  {
    port: 4000,
  },
  () => {
    console.log("listening on port 4000")
  }
)
