const nunjucks = require('nunjucks')

function creatEnv(path, opts) {
    console.log('creating env')
    let
        noCache = opts.noCache||false,
        autoescape = opts.autoescape||false,
        watch = opts.watch||false,
        throwOnUndefined = opts.throwOnUndefined||false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path,{
                noCache:noCache,
                watch:watch
            }),
            {
                autoescape:autoescape,
                throwOnUndefined:throwOnUndefined
            }
        )
    if (opts.filters) {
        for (let f in opts.filters) {
            env.addFilter(f,opts.filters[f])
        }
    }
    return env
}

function template(path,opts) {
    let env = creatEnv(path,opts)
    // console.log(env)
    return async (ctx,next)=>{
        console.log('a request')
        ctx.render = function (view,model) {
            ctx.response.body = env.render(view,Object.assign({},ctx.state||{},model||{}))
            ctx.response.type = 'text/html'
        }
        await next()
    }
}

module.exports = template