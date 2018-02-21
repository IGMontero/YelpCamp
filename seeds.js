var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
var data = [
    {
        name:"Camp1",
        images:[
              "https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5314322.jpg",
              "https://cdn.pixabay.com/photo/2016/09/05/12/48/camping-1646504_960_720.jpg",
              "https://images.unsplash.com/photo-1487730116645-74489c95b41b?dpr=1&auto=format&fit=crop&w=376&h=251&q=60&cs=tinysrgb"
            ],
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus nisi at nisi venenatis malesuada. Nunc tincidunt ultricies enim sed fermentum. Sed malesuada massa at laoreet congue. Pellentesque mollis non risus malesuada sodales. Donec dignissim massa ac fermentum suscipit."
    },{
        name:"Camp2",
        images:[
            "https://www.cityofspearfish.com/PRF/Campground/Campground%201scaled.jpg",
            "https://onmilwaukee.com/images/articles/ca/camping/camping_fullsize_story1.jpg",
            "https://i.pinimg.com/474x/47/1e/6b/471e6bd6e7486467b00b550410a09b2b--camping--camping-site.jpg"
            ],
        description:"This one is cool too"
    },{
        name:"Camp3",
        images:[
            "https://threerivers-drupal.s3.us-east-2.amazonaws.com/public/2017-03/CL_camping_Billboard_01.jpg",
            "https://http2.mlstatic.com/carpas-de-3-personas-iglu-camping-con-avance-D_NQ_NP_444125-MLU25374377025_022017-F.jpg"
            ],
        description:"Cool bro"
    }
    ];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }/*else{
            console.log("Campgrounds Removed");
            //Remove all comments
            Comment.remove({},function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Comments Removed");
                   //Insert data.
                    data.forEach(function(seed){
                        Campground.create(seed,function(err,campground){
                            if(err){
                                console.log(err);
                            }else{
                                console.log("Campground "+seed.name+" inserted.");
                                //Add comments:
                                Comment.create({
                                    text:"Comment1",
                                    author:"user1"
                                },function(err,comment){
                                    if(err){
                                        console.log(err);
                                    }else{
                                        campground.comments.push(comment._id);
                                        campground.save();
                                        console.log("Comment added.");
                                        
                                    }
                                })
                            }
                        })
                    })
                }
            })
            
        }*/
    })
}

module.exports = seedDB;