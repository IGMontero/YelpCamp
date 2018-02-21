var express = require("express");
var router = express.Router({mergeParams:true});

var middleware = require("../middleware")

var Campground = require("../models/campground");
var Comment = require("../models/comment");

//NEW
router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    })
})

//CREATE
router.post("/",middleware.isLoggedIn,function(req,res){
    var comment = req.body.comment;
    Comment.create({
        text:comment.text,
        author:{
            id:req.user._id,
            username:req.user.username
        }
    },function(err,comment){
        if(err){
            req.flash("error","Something went wrong.");
            console.log(err);
        }else{
            comment.save();
            Campground.findById(req.params.id,function(err,campground){
                if(err){
                    console.log(err);
                    res.redirect("back");
                }else{
                    campground.comments.push(comment._id);
                    campground.save();
                    res.redirect("/campgrounds/"+req.params.id);
                }
            })
        }
    })
})


//EDIT
router.get("/:comment_id/edit",middleware.checkCommentOwner,function(req,res){
    Comment.findById(req.params.comment_id,function(err,comment){
        if(err){
            console.log(err);
            res.redirect("back")
        }else{
            res.render("comments/edit",{comment:comment , campgroundId:req.params.id});
        }
    })
})

//UPDATE
router.put("/:comment_id",middleware.checkCommentOwner,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,comment){
        if(err){
            console.log(err);
            res.redirect("/campgrounds/"+req.params.id);
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//DELETE
router.delete("/:comment_id",middleware.checkCommentOwner,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("/campgrounds/"+req.params.id);
        }else{
            req.flash("success","Comment deleted.");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})



module.exports = router;