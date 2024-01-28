import { Counter, Timer } from "metrics";

const metric_register = {

};

function do_register_metric(name, metric) {
  const cached = metric_register[name];
  if (cached) {
    return cached;
  } else {
    metric.name = name;
    metric_register[name] = metric;
    return metric;
  }
}

export function do_record_count(name, callback) {
  return function() {
    callback.apply(this, arguments); 
    new Counter() |> do_register_metric(name + "counts", #) |> #.inc();
  }
}


export function do_record_time(name, callback) {
  return function() {
    const start = Date.now();
    callback.apply(this, arguments); 
    const end = Date.now();
    new Timer() |> do_register_metric(name + "execution_time_ms", #) |> #.update(end - start);
  }
}

export function export_metrics() {
  const metrics = metric_register |> Object.values(#)
  const metric_output = []
  for (const metric of metrics) {
    const metric_data = metric.printObj()
    metric_data.name = metric.name
    metric_output.push(metric_data)
  }
  return metric_output;
}
