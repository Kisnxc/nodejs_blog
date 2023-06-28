const { response } = require('express');
const Idol = require('../models/Idol');
const { mongooseToObject } = require('../../util/mongoose');

class IdolController {
  // Get /idols/slug
  show(req, res, next) {

    Idol.findOne({ slug: req.params.slug })
      .then((idol) => {
        res.render('idols/show', {
          idol: mongooseToObject(idol)
        });
      })
      .catch(next);


  }

  // Get /idols/create
  create(req, res, next) {
    res.render('idols/create');
  }



  // POST /idols/stored
  stored(req, res, next) {
    req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
    const idol = new Idol(req.body);
        idol
          .save()
          .then(() => res.redirect('/home'))
          .catch(next);  
  };

  // Get /idols/edit
  edit(req, res, next) {
    Idol.findById(req.params.id)
      .then((idol) => {
        res.render('idols/edit', {
          idol: mongooseToObject(idol)
        });
      })
      .catch(next);
  }

  // [PUT] /idols/:id
  update(req, res, next) {
    req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
    Idol.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/idols'))
      .catch(next);
  }



  async delete(req, res, next) {
    const id = req.params.id;

    try {
      // Tìm bản ghi theo ID và đặt trường deleted thành true
      const idol = await Idol.delete({ _id: req.params.id });

      if (!idol) {
        // Nếu không tìm thấy bản ghi, trả về lỗi hoặc thông báo không tìm thấy
        return res.status(404).json({ error: 'Idol not found' });
      }
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  }


  // [DELETE] /idols/:id/force
  forceDestroy(req, res, next) {
    Idol.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [patch] /idols/:id/restore
  async restore(req, res, next) {
    const id = req.params.id;

    try {
      // Tìm bản ghi theo ID và đặt trường deleted thành true
      const idol = await Idol.findOneAndUpdateDeleted({ _id: id },
        { deleted: false, deletedAt: null },
        { new: true });
      if (!idol) {
        // Nếu không tìm thấy bản ghi, trả về lỗi hoặc thông báo không tìm thấy
        return res.status(404).json({ error: 'Idol not found' });
      }
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  }


  // [post] /idols/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {

      case 'delete':
        Idol.delete({ _id: { $in: req.body.idolIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;

      case 'restore':
        Idol.updateManyDeleted({  _id: { $in: req.body.idolIds }},
          { deleted: false, deletedAt: null },
          { new: true }
          )
          .then(() => res.redirect('back'))
          .catch(next);
        break;

      default:
        res.json({ message: "Action is invalid" })
    }

  }



}

module.exports = new IdolController();
