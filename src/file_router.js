import express from 'express';
import {log} from "./log_agent"

const FILE_STROAGE = [
  __dirname + "/site",
]

export function do_config_file_output(app) {
  for(const file_path of FILE_STROAGE) {
    file_path |> "Registering" + # + " as public folder."  |> log(#)
    app.use("/", express.static(file_path))
  }
  return app
}