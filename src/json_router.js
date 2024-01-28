import express from 'express';
import { export_metrics } from './metrics_agent';

export function do_config_json_output(app) {
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  const user_router = express.Router()
  user_router.get("/", (req, res) => {
    res.json({
      name: "John",
      age: 30,
    })
  })
  app.use("/api/user", user_router)

  const report_router = express.Router()
  report_router.get("/", (req, res) => {
    export_metrics() |>  res.json(#)
  })
  app.use("/api/report", report_router)

  return app
}
