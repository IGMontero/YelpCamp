var express = require("express");
var router = express.Router();
var middleware = require("../middleware")
var Campground = require("../models/campground");

//INDEX
router.get("/",function(req,res){
     Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/campgrounds",{campgrounds:campgrounds});
        }
    })
})
//CREATE
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
})

router.post("/",middleware.isLoggedIn,function(req,res){
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price:req.body.price,
        author:{
            id:req.user._id,
            username:req.user.username
        }
    },function(err,camp){
        if(err){
            console.log(err);
        }else{
            req.flash("success","Campground created.");
            camp.save();
            res.redirect("campgrounds/campgrounds");
        }
    })
})
//SHOW
router.get("/:id",middleware.isLoggedIn,function(req,res){
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
             res.render("campgrounds/show",{campground:campground , currentUser:req.user});
        }
    })
})

//EDIT
router.get("/:id/edit",middleware.checkCampgroundOwner,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/edit",{campground:campground})
        }
    })
})

//UPDATE
router.put("/:id",middleware.checkCampgroundOwner,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+campground._id);
        }
    })
})

//DELETE
router.delete("/:id",middleware.checkCampgroundOwner,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds/:id");
        }else{
            req.flash("success","Campground deleted.");
            res.redirect("/campgrounds")
        }
    })
})



module.exports = router;