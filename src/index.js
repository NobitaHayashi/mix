import { log } from './log_agent'
import dotenv from 'dotenv'
import { do_build_connections } from './mysql_agent'
import express from 'express'
import { do_config_file_output } from './file_router'
import { do_config_json_output } from './json_router'
import { do_config_html_output } from './html_router'
import { do_record_time } from './metrics_agent'
import _ from './react_agent'
import nextjs from 'next'

const dev = process.env.NODE_ENV !== 'production';
const nextjs_app = nextjs({ dev });
const nextjs_handler = nextjs_app.getRequestHandler();

function do_start_express_app() {
  try {
    process.env.NODE_ENV
      |> # + ".env"
      |> {path: #}
      |> dotenv.config(#)
      // |> log(#)
    const {HOST, PORT, MYSQL_CONNECTIONS} = process.env
    const mysql_connections_info = JSON.parse(MYSQL_CONNECTIONS)
  
    const mysql_connections = do_build_connections(mysql_connections_info)
    // mysql_connections |> log(#)
    
    const app = express()
    app.get('*', (req, res) => {
      return nextjs_handler(req, res);
    });
  
    app.use((req, res, next) => {
      // req |> log(#)
      req.mysql_connections = mysql_connections
      next |> do_record_time(`${req.method} ${req.url}`, #) |> #()
    })
  
    app 
      |> do_config_file_output(#)
      |> do_config_json_output(#)
      |> do_config_html_output(#)
      |> #.listen(PORT, HOST, () => {
        "Server started at " + HOST + ":" + PORT |> log(#)
      })
  
  } catch(error) {
    log(error)
  }
}


nextjs_app.prepare().then(() => {
  do_start_express_app()
});


