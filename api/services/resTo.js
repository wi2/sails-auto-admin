var React = require('react')
  , Router = require('react-router')
  , Link = Router.Link;

module.exports = function(routes, wantsJSON, res, url, locals, state) {
  if (!wantsJSON) {
    Router.run(routes, url, (Root) => {
      if (state)
        locals.state = 'window.__ReactInitState__=' + JSON.stringify(state) + ';';
      res.view("layout", {
        locals: locals||{title:'',description:''},
        body: React.renderToString(<Root {...state} />) // no isomorphic: error with Link (react-router)
      });
    });
  } else if (state) {
    res.json(state);
  } else
    console.log("no state...")
}
