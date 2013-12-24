var express = require('express'),
    app = express(),
    path = require('path'),
    conf = require('./conf'),
    view = require('./view'),
    itunes = require('./itunes'),
    api = require('./api');

console.log(conf);

var init = function () {
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');
    app.locals({config: conf.app});
    app.use(express.compress());
    // upload turned off
    // app.use(express.bodyParser({uploadDir: '/tmp/test'}));
    app.use(express.static(path.join(__dirname, "../public")));
    app.use(express.favicon());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'booyakasha'}));
    app.use(express.errorHandler({
        dumpExceptions: false,
        showStack: false
    }));
}

app.configure(init);

app.all("*", function (req, res, next) {
    var caching = true;

    if (caching) {
        var expire = 60 * 60 * 24 * 4; // 5 days

        if ((req.url.indexOf("/js/") === 0)||
           (req.url.indexOf("/css/") === 0)||
           (req.url.indexOf("/img/") === 0)) {
            res.setHeader("Cache-Control", "public, max-age="+expire);
            res.setHeader("Expires", new Date(Date.now() + expire * 1000).toUTCString());
        }
    }
    res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
    next();
});

app.get('/', view.FullScreen);
app.get('/page/:page', view.PageView);

// demos
app.get('/live', view.Live); // Backbone Editor
app.get('/graph', view.Graph); // Raphael Graph
app.get('/canvas', view.Canvas); // Canvas Experiments
app.get('/transit', view.Transit); // Canvas Experiments
app.get('/search', view.SearchDemo); // Canvas Experiments

app.get('/search/:term', itunes.SearchTerm);
app.get('/multi-search/:term', itunes.SearchMultiCriteria);
app.get('/track', itunes.GetTrackList);
app.get('/track/:id', itunes.GetTrack);

// API
app.get('/api/timeline', api.GetTimeline);

app.get('/api/page', api.GetPageList);
app.post('/api/page', api.CreatePage);
app.get('/api/page/:id', api.GetPageById);
app.put('/api/page/:id', api.UpdatePage);
app.delete('/api/page/:id', api.DeletePage);

app.get('/api/text', api.GetTextList);
app.post('/api/text', api.CreateText);
app.get('/api/text/:id', api.GetText);
app.put('/api/text/:id', api.UpdateText);
app.delete('/api/text/:id', api.DeleteText);

// misc
app.get('/text', view.TextList);
app.get('/edit', view.PageEdit);

app.get('/api/doc', api.GetDocument);
app.get('/api/doc/:id', api.GetDocument);
app.post('/api/doc/:id', api.SaveDocument);

app.listen(conf.app.port);
console.log('Go to http://localhost:' + conf.app.port);
console.log('path: ', __dirname);
module.exports = app;