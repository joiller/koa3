const Koa = require('koa')
const parse = require('koa-bodyparser')
const template = require('./templating')
const controller = require('./controller')
const app = new Koa()
const isProduction = process.env.NODE_ENV === 'production'

app.use(async (ctx,next)=>{
    await next()
})

app.use(parse())
let staticFiles = require('./static-files')
app.use(staticFiles('/static/',__dirname+'/static'))

app.use(template('views',{
    noCache:!isProduction,
    watch:!isProduction
}))

app.use(controller())
console.log(controller())
app.listen(3000)
