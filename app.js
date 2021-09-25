const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const {requireAuth, checkUser} = require('./middlewares/authMiddleware')

const app = express()


const dbURL =' mongodb+srv://sekoyilmaz:<password>@nodeblog.idq1i.mongodb.net/node-blog?retryWrites=true&w=majority '
mongoose.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology: true})


.then((result)=> app.listen(3000))
.catch((err)=> console.log(err))

app.set('view engine', 'ejs')


app.use(express.static('public'))
app.use(express.urlencoded({extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())



app.get('*',checkUser)

app.get('/',(req,res) =>{
res.redirect('/blog')
})

app.use('/',authRoutes)
app.use('/admin',requireAuth,adminRoutes)
app.use('/blog',blogRoutes)

app.get('/about',(req,res) =>{
res.render('about',{title:'Hakkımda'})
})


app.get('about-us',(req,res)=>{
  res.redirect('about')
})

app.use((req,res)=> {
  res.status(404 ).render('404',{title:'Sayfa bulunamadı'})
})
