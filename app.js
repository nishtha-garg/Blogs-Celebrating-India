var express =require("express");
var app =express();

var methodOverride=require("method-override");
app.use(methodOverride("_method"))

var bodyparser= require("body-parser")
app.use(bodyparser.urlencoded({extended:true}))

app.set("view engine","ejs")
app.use(express.static("public"))

var mongoose=require("mongoose")
// mongoose.connect("mongodb://localhost/blog_app")
mongoose.connect("mongodb://ngarg5:Nishtha1234#@ds251518.mlab.com:51518/blogs_celebrating_india")

var blogSchema=new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date, default:Date.now}
})

var Blog=mongoose.model("Blog",blogSchema);

// Blog.create({
//     title:"First Blog",
//     image:"http://images.all-free-download.com/images/graphiclarge/cup_of_coffee_198136.jpg",
//     body:"Hello, this is my first blog and I am really excited about writing it"

// })



//redirecting the main page to index page
app.get("/",function(req,res){
    res.render("homepage");
})


//INDEX- lists all the blogs from the database and display them
app.get("/blogs",function(req,res){
    //find all the blogs from the database and display them
    Blog.find({},function(err,allBlogs){
        if(err){
            console.log("error in the index request");
            console.log(err);
        }else{
            res.render("index",{blogs:allBlogs});
        }
    })

})

//NEW- shows the form page for new blog
app.get("/blogs/new",function(req,res){
    res.render("new")
})

//CREATE-create a new blog in the database and redirects to index page
app.post("/blogs",function(req,res){
    Blog.create(req.body.blog,function(err,newBlog){
        if(err){
            console.log("error in the create request")
            console.log(err)
        }else{
            res.redirect("/blogs")
        }
    })
})

//SHOW--displays the information about a particular blog
app.get("/blogs/:id",function(req,res){
    //find the blog with the help of its ID and redirect it
    console.log(req.params.id)
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs")
        }else{
            res.render("show",{blog:foundBlog})
        }
    })
})


//EDIt
app.get("/blogs/:id/edit",function(req,res){
    //find the blog with the help of its ID and redirect it
    console.log(req.params.id)
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs")
        }else{
            res.render("edit",{blog:foundBlog})
        }
    })
})

//UPDATE
app.put("/blogs/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,foundBlog){
        if(err){
            res.redirect("/blogs")
        }else{
            res.redirect("/blogs/"+req.param.id)
        }
    })
})

//DELETE
app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogs")
        }else{
            res.redirect("/blogs")
        }
    })
})

app.get("/author", function(req,res){
    res.render("author")
})

app.listen(process.env.PORT||3000,process.env.IP,function(){
    console.log("The server is running")
})
