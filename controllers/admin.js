const Product = require('../models/product');
exports.getAddProduct =  (req,res,next)=>{
    res.render('admin/edit-product',{pageTitle:"ADD PRODUCT",
    path: '/admin/add-product',
    editing: false
});
};

exports.postAddProduct = (req,res)=>{
    req.user
    .createProduct({
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        desc: req.body.desc
    })
    .then(result=>{
        console.log("Product Created!")
        res.redirect('/admin/products');
    })
    .catch(err=>console.log(err));
   
}
exports.getEditProduct =  (req,res,next)=>{
    const editMode=req.query.edit;
   if(!editMode){
    return res.redirect('/');
   }
   const prodId=req.params.productId;
//    Product.findByPk(prodId)
   req.user.getProducts({where: {id: prodId}})
   .then((products)=>{
    const product=products[0];
    if(!product){
        return res.redirect('/');
    }
   res.render('admin/edit-product',{
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: true,
    product:product
   })
   })
   .catch(err=>console.log(err));
};

exports.postEditProduct = (req,res,next)=>{
    Product.update({ 
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        desc: req.body.desc
    },
    {
        where:{
            id: req.body.id
        }
    })
    .then(result=>{
        res.redirect('/admin/products');
    })
    .catch(err=>console.log(err));
}

exports.postDeleteProduct = (req,res,next) =>{
    const prodId=req.body.id;
    Product.destroy({
        where:{
            id:prodId
        }
    })
    .then(result=>{
        res.redirect('/admin/products');
    })
    .catch(err=>console.log(err));
}

exports.getProducts = (req,res) =>{
    req.user.getProducts()
    .then((products)=>{
       res.render('admin/products',{
        pageTitle: 'Admin Prooducts',
        prods: products,
        path: '/admin/products'
       })
    })
    .catch(err=>console.log(err));
   
}