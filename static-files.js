const path = require('path')
const mime = require('mime')
const fs = require('mz/fs')

function staticFiles(url, dir) {
    return async (ctx,next)=>{
        let rpath = ctx.request.path;
        
    //    判断是否以指定的url开头
        if (rpath.startsWith(url)) {
        //    获取文件完整路径
            let fpath = path.join(dir,rpath.substring(url.length))
        //    判断文件是否存在
            if (await fs.exists(fpath)) {
            //    查找文件的mime
                ctx.response.type = mime.lookup(rpath)
                ctx.response.body = fs.readFile(fpath)
            } else {
            //    跳转到下一个async
                next()
            }
        }
    }
}

module.exports = staticFiles