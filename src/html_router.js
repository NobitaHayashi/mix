import reactEngine from 'express-react-views';
import {log} from "./log_agent"


const pages = [
  {
    template: "Home",
    route: "/",
    props: {
      title: "Home",
    }
  },
  {
    template: "Component",
    route: "/component",
    props: {
      title: "Component",
    }
  }

]

export function do_config_html_output(app) {
  const templates_folder = __dirname + '/pages'
  templates_folder |> "Registering" + # + " as templates folder." |> log(#)
  "Don't use .jsx extension for template files to avoid reloading issues."|> log(#)
  app.set('views', templates_folder);
  app.set('view engine', 'js');
  app.engine('js', reactEngine.createEngine());
  for(const page of pages) {
    const {template, route, props} = page
    app.get(route, (req, res) => {
      res.render(template.toLocaleLowerCase(), props);
    });
  }
  return app;
}