const Product = require('../Models/product');

exports.getAddProduct = (req, res, next) => {
   res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
   });
};

exports.postAddProduct = (req, res, next) => {
   const title = req.body.title;
   const imgUrl = req.body.imageUrl;
   const price = req.body.price;
   const description = req.body.description;
   const product = new Product(null, title, imgUrl, description, price);
   product
      .save()
      .then(() => {
         res.redirect('/');
      })
      .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
   const editMode = req.query.edit;
   if (!editMode) {
      return res.redirect('/');
   }
   const prodID = req.params.productId;
   Product.findByID(prodID, (product) => {
      if (!product) {
         res.redirect('/');
      }
      res.render('admin/edit-product', {
         pageTitle: 'Add Product',
         path: '/admin/add-product',
         editing: editMode,
         product: product,
      });
   });
};

exports.postEditProduct = (req, res, next) => {
   const prodID = req.body.productID;
   const updatedTitle = req.body.title;
   const updatedImgUrl = req.body.imageUrl;
   const updatedPrice = req.body.price;
   const updatedDesc = req.body.description;
   const UpdatedProduct = new Product(
      prodID,
      updatedTitle,
      updatedImgUrl,
      updatedDesc,
      updatedPrice
   );
   UpdatedProduct.save();
   res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
   Product.fetchAll()
      .then(([rows, fileData]) => {
         res.render('admin/products', {
            prods: rows,
            pageTitle: 'Admin Products',
            path: '/admin/products',
         });
      })
      .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
   const prodID = req.body.productId;
   Product.deleteByID(prodID);
   res.redirect('/admin/products');
};
