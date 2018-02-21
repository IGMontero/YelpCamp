

var Campground = require("../models/campground");
var Comment = require("../models/comment");


var middlewareObj = {};

middlewareObj.checkCampgroundOwner = function(req,res,next){
    if(!req.isAuthenticated()){
        res.render("login");
    }else{
        Campground.findById(req.params.id,function(err,campground){
            if(err){
                console.log(err);
                req.flash("error","Campground not found.")
                res.redirect("back");
            }else{
                if(campground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You dont have permission to do that.");
                    res.redirect("back");
                }
            }
        })
    }
};

middlewareObj.checkCommentOwner = function(req,res,next){
    if(!req.isAuthenticated()){
        req.flash("error","You need to log in to do that.")
        res.redirect("back");
    }else{
        Comment.findById(req.params.comment_id,function(err,comment){
            if(err){
                req.flash("error","Something went wrong");
                res.redirect("back");
            }else{
                if(req.user._id.equals(comment.author.id)){
                    next();
                }else{
                    req.flash("error","You dont have permission to do that.");
                    res.redirect("back");
                }
            }
        })
    }
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to log in to do that.");
    res.redirect("/login")
}



module.exports = middlewareObj;
