module.exports = {
    'POST /signin':async (ctx,next)=>{
        let
            email=ctx.request.body.email||'',
            password = ctx.request.body.password||''
        if (email === '781225147@qq.com'&&password===123) {
            ctx.render('signin-ok.nunj',{
                title: 'sign in ok',
                name: 'jhl'
            })
        }else {
            ctx.render('signin-failed',{
                title: 'sign in failed'
            })
        }
    }
}