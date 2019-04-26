const router = require('koa-router')()
const fs = require('fs')

function addMapping(router,mapping) {
    for (let url in mapping) {
        if (url.startsWith('GET')) {
            router.get(url.substring(4),mapping[url])
        }else if (url.startsWith('POST')) {
            router.post(url.substring(5),mapping[url])
        }else {
            ctx.body=`<h1>url wrong:${url}</h1>`
        }
    }
}


function addFiles(router) {
    let files = fs.readdirSync(__dirname+'/controllers')
    let jsfiles = files.filter(f=>f.endsWith('js'))
    for (let js of jsfiles) {
        let mapping = require(__dirname+'/controllers/'+js)
        console.log(mapping)
        addMapping(router,mapping)
    }
}

module.exports=function () {
    addFiles(router)
    return router.routes()
}