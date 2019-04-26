module.exports = {
    'GET /':async (ctx,next)=>{
        console.log('index')
        ctx.render('.views/index,nunj',{
            title:'Welcome'
        })
    }
}