const Product = require('../models/product');
exports.getAddProduct =  (req,res,next)=>{
    res.render('admin/edit-product',{pageTitle:"ADD PRODUCT",
    path: '/admin/add-product',
    editing: false
});
};

exports.postAddProduct = (req,res)=>{
    
    const product=new Product(
        req.body.title,
        req.body.price,
        req.body.desc,
        req.body.imageUrl,
        null,
        req.user._id
    )
    product.save()
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
   Product.findById(prodId)
   .then((product)=>{
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

    const product = new Product(req.body.title,req.body.price,req.body.desc,req.body.imageUrl,req.body.id);
    product.save()
    .then(result=>{
        res.redirect('/admin/products');
    })
    .catch(err=>console.log(err));
}

exports.postDeleteProduct = (req,res,next) =>{
    const prodId=req.body.id;
    Product.deleteById(prodId)
    .then(result=>{
        res.redirect('/admin/products');
    })
    .catch(err=>console.log(err));
}

exports.getProducts = (req,res) =>{
    Product.fetchAll()
    .then((products)=>{
       res.render('admin/products',{
        pageTitle: 'Admin Prooducts',
        prods: products,
        path: '/admin/products'
       })
    })
    .catch(err=>console.log(err));
   
}