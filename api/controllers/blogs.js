const mongoose = require('mongoose');
const Blog = require('../models/blog');

//create blog post

exports.createBloges = (req, res, next)=>{
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        author: req.body.author,
        blogImage: req.body.blogImage
      });
          blog.save()
              .then(result => {
                res.status(201).json({
                  status: "success",
                  message: " Blog Created",
                  CreatedBlog: {
                      title: result.title,
                      subtitle: result.subtitle,
                      content: result.content,
                      author: result.author,
                      blogImage: result.blogImage,
                      _id: result._id,
                      request: {
                          type: 'GET',
                          url: "http://localhost:5000/api/v1/blogs/" + result._id
                      }
                  }
                });
              })
              .catch(err => {
                res.status(500).json({
                  status: "fail",
                  error: err
                });
              });
    }

//get single blog
    exports.getBlog = (req, res, next)=>{
        const id = req.params.blogId;
        Blog.findById(id)
          .select('title subtitle content blogImage author _id')
          .exec()
          .then(doc => {
            if (doc) {
              res.status(200).json({
                status: "success",
                  blog: doc,
                  request: { 
                      type: 'GET',
                      url: 'http://localhost:5000/api/v1/blogs'
                  }
              });
            } else {
              res
                .status(404)
                .json({ message: "No valid entry found for provided ID" });
            }
          })
          .catch(err => {
            res.status(500).json({ error: err });
          });
    }

//get all blogs
    exports.getBlogs = (req, res, next)=>{
        Blog.find()
        .select('title subtitle content blogImage author _id')
        .exec()
        .then(docs => {
          const response = {
            count: docs.length,
            status:"success",
            data:{
            blogs: docs.map(doc => {
              return {
                title: doc.title,
                subtitle: doc.subtitle,
                content: doc.content,
                blogImage: doc.blogImage,
                author: doc.author,
                _id: doc._id,
                request: {
                  type: "GET",
                  url: "http://localhost:5000/api/v1/blogs/" + doc._id
                }
              };
            })}
          };
          res.status(200).json(response);
        })
      .catch(err =>{
          res.status(500).json({
              error:err
          });
      });
    }

    //update blog
    exports.updateBlog = (req, res, next)=>{
        const id = req.params.blogId;
        const updateOps = {};
        for(const ops of req.body){
            updateOps[ops.proName] = ops.value;
        }
        Blog.updateOne({ _id: id}, {$set: updateOps})
        .exec()
        .then(result =>{
            res.status(200).json({
              status: "success",
              data: {
              message:"Blog updated"
              }
            });
        })
        .catch(err =>{
           res.status(500).json({
               error: err
           });
        });
    }

    //delete blog
    exports.deleteBlog = (req, res, next)=>{
        const id = req.params.blogId;
        Blog.remove({ _id: id})
        .exec()
        .then(result =>{
            res.status(200).json({
                message:"Blog deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    }
