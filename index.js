const express = require('express');
const app = express();
const path = require('path');
const collection = require("./mongodb");
const paycollection = require("./mongodb");

const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');



let messages = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Routes
app.get('/', function (req, res) {
    res.render("index");
});

app.get('/login', function (req, res) {
    res.render("login");
});

app.get('/register', function (req, res) {
    res.render("register");
});



app.get('/cart', function (req, res) {
    res.render("cart");
});
app.get('/about', function (req, res) {
    res.render("about");
});

app.get('/contact', function (req, res) {
    res.render("contact", { messages });
});
app.get('/emailerr', function (req, res) {
    res.render("emailerr");
});
app.get('/loader.html', function (req, res) {
    res.render("loader");
});
app.get('/shop', function (req, res) {
    res.render("shop");
});
app.get('/sproduct-2.html', function (req, res) {
    res.render("sproduct-2");
});
app.get('/search', function (req, res) {
    res.render("search");
});
app.get('/sproduct', function (req, res) {
    res.render("sproduct");
});
app.get('/thankyou.html', function (req, res) {
    res.render("thankyou");
});
// app.delete('/delete-message/:id', async (req, res) => {
//     const messageId = req.params.id;
  
//     try {
//       // Remove the message from your database
//       await MessageModel.findByIdAndDelete(messageId);
//       res.status(200).send('Message deleted');
//     } catch (error) {
//       res.status(500).send('Error deleting the message');
//     }
//   });


app.post("/pay", async function (req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const data = {
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
           
        };

       

        await collection.insertMany([data]);

        res.render("index", { user: data });
    } catch (error) {
      
        res.status(500).send("Error registering user");
    }
});

app.post("/register", async function (req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const data = {
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
           
        };

       

        await collection.insertMany([data]);

        res.render("index", { user: data });
    } catch (error) {
      
        res.status(500).send("Error registering user");
    }
});



app.post("/login", async function (req, res) {
    try {
       

        const user = await collection.findOne({ name: req.body.name, email: req.body.email });
        
        if (user) {
          
            
            const isMatch = await bcrypt.compare(req.body.password, user.password);
         
            
            if (isMatch) {
                res.render("index", { user: user });
            } else {
                
                res.render("wpassword");
            }
        } else {
           
            res.render("emailerr");
        }
    } catch (error) {
       
        res.status(500).send("Error logging in user");
    }
});

app.get("/index", async (req, res) => {
    res.render("index", { user: { name: '', email: '' } });
});


// app.get('/', function (req, res) {
//     fs.readdir(`./files`, function(err,files){
//       res.render('index', {files: files});
   
//     })
//   })
  
//   app.get('/file/:filename', function (req, res) {
//     fs.readFile(`./files/${req.params.filename}`, "utf-8" ,function(err, filedata){
//      res.render('show', {filename: req.params.filename, filedata: filedata});
//     })
//   })
  
//   app.get('/edit/:filename', function (req, res) {
//     res.render('edit', {filename: req.params.filename});
  
  
//   })
  
//   app.post('/edit', function(req, res) {
//      fs.rename(`./files/${req.body.previous}`, `./files/${req.body.newname}`, function(err){
//       res.redirect("/");
//      })
  
//    });
  
//   app.post('/c', function(req, res) {
//     fs.writeFile(`./files/${req.body.title.split('').join('')}`, req.body.details, function(){
//       res.redirect('/')
//     })
//    });
  
app.post('/submit-form', (req, res) => {
    const { name, email, subject, message } = req.body;
  
    // Save the message
    const newMessage = { name, email, subject, message };
    messages.push(newMessage);
  
    // Send the new message back to the client
    res.json(newMessage);
  });
  

const PORT = 3000
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});
