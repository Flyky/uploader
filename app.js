const Koa = require('koa')
const router = require('koa-router')()
const multer = require('koa-multer')

const fs = require('fs')

const app = new Koa()

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/received/')
    },
    filename: (req, file, cb) => {
        // let fileFormat = (file.originalname).split('.')
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

let upload = multer({
    storage: storage,
    limits: {fileSize: Infinity}
})

router.get('/upload', async (ctx, next) => {
    ctx.response.type = 'text/html'
    ctx.response.body = fs.createReadStream('./views/index.html')

    await next()
})

router.post('/upload/uploadinging', upload.single('inputFile'), async (ctx, next) => {
    filename = ctx.req.file.filename
    ctx.response.type = 'text/html'
    // ctx.body = {  
    //     filename: filename//返回文件名  
    // } 
    ctx.body = `上传完成： ${filename}`
    console.log({filename: filename})
})

app.use(router.routes())

app.listen(3011)
console.log('listen on port 3011\n please visit on http://localhost/upload')
