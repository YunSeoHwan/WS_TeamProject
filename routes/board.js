const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { User, Post } = require('../models');
const { Op } = require('sequelize');

const qs = require('qs');

router.post('/',isLoggedIn, async (req, res, next) => {
  try {
    const { purpose, field, time , frequency , method , shortText ,longText} = req.body;
    
    console.log('-----------------------------------------------------');
    console.log(req.body);
    console.log(req.user.id);
    console.log('-----------------------------------------------------');
    
    const post = await Post.create({
      purpose: purpose,
      field: field,
      time: time,
      frequency: frequency,
      method: method,
      shortText: shortText, 
      longText: longText
      ,UserId: req.user.id
    });

    console.log(post);

    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/view",isLoggedIn, async (req, res, next) => {
  try {
    const { purpose, field, time , frequency , method } = qs.parse(req.query);
    console.log('-----------------------------------------------------');
    console.log('req.body  ' +  req.body);
    console.log('req.url  ' +  req.url);
    console.log('req.query  ' +  req.query);
    console.log('req.user.userid  ' +  req.user.userid);
    console.log('purpose  ' +  purpose);
    console.log('field  ' +  field);
    console.log('time  ' +  time);
    console.log('frequency  ' +  frequency);
    console.log('method  ' +  method);
    console.log('-----------------------------------------------------');

    const posts = await Post.findAll({ 
      where: {
        [Op.or]: [
          {
            purpose: {
                  [Op.like]: "%" + purpose + "%"
              }
          },
          {
            field: {
                  [Op.like]: "%" + field + "%"
              }
          },
          {
            time: {
                  [Op.like]: "%" + time + "%"
              }
          },
          {
            frequency: {
                  [Op.like]: "%" + frequency + "%"
              }
          },
          {
            method: {
                  [Op.like]: "%" + method + "%"
              }
          }
       ]
      },
      order: [['createdAt', 'DESC']],
      include: [
       {
          model: User,
          as: 'Likers',
          attributes: ['id', 'userid','name'],
        },
        {
          model: User,
          attributes: ['id', 'userid','email'],
        },
      ],

    });

    res.render('board_view', {
      studys: posts
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/:postId/join', isLoggedIn, async (req, res, next) => { // POST /post/1/join
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId/join', isLoggedIn, async (req, res, next) => { // DELETE /post/1/join
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;