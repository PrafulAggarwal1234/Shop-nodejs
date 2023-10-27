

const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');

exports.getProducts = (req,res,next)=>{
    Product.findAll().then((result)=>{
        res.render('shop/products',{
            pageTitle:'Shop',
            prods: result,
            path:'/'
        })
    }).catch(err=>console.log(err));
}

exports.getIndex = (req,res,next)=>{
    Product.findAll().then((result)=>{
        res.render('shop/index',{
            pageTitle:'Shop',
            prods: result,
            path:'/'
        })
    }).catch(err=>console.log(err));
}

exports.getProduct = (req,res,next) =>{
    const prodId=req.params.id;
    Product.findByPk(prodId)
    .then((product)=>{
        res.render('shop/product',{
            pageTitle: product.title,
            product: product,
            path: '/products'
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.getCart=(req,res,next)=>{
    req.user.getCart()
    .then(cart=>{
        return cart.getProducts();
    })
    .then(products=>{
            res.render('shop/cart',{
                        pageTitle: 'Your Cart',
                        path:'/cart',
                        products: products
                })
    })
    .catch(err=>console.log(err));
}

exports.postCart=(req,res,next)=>{
    const prodId=req.body.productId;
    let fetchedCart;
    let newQuantity=1;
    req.user.getCart()
    .then(cart=>{
        fetchedCart=cart;
        return cart.getProducts({where: {id: prodId}});
    })
    .then(products=>{
        let product;
        if(products.length>0){
            product=products[0];
        }
        if(product){
            const oldQuantity = product.cartItem.quantity;
            newQuantity=oldQuantity+1;
            return product;
        }
        return Product.findByPk(prodId);
    })
    .then((product)=>{
        return fetchedCart.addProduct(product,{through:{quantity: newQuantity}});
    })
    .then(()=>res.redirect('/cart'))
    .catch(err=>console.log(err));
}

exports.postCartDeleteProduct=(req,res,next)=>{
    const prodId=req.body.id;
    req.user.getCart()
    .then(cart=>{
        return cart.getProducts({where: {id:prodId}});
    })
    .then(products=>{
        const product=products[0];
        return product.cartItem.destroy();
    })
    .then((result)=>{
        res.redirect('/cart');
    })
    .catch(err=>console.log(err)); 
};

exports.getCheckout = (req,res,next) =>{
    res.render('shop/checkout',{
        pageTitle:'Checkout',
        path: '/checkout',
    })
};

exports.postOrder = (req,res,next)=>{
    let fetchedCart;
    req.user.getCart()
    .then((cart)=>{
        fetchedCart=cart;
        return cart.getProducts();
    })
    .then(products=>{
        return req.user
        .createOrder({address: req.body.address})
        .then(order=>{
            return order.addProducts(products.map(product=>{
                product.orderItem = {quantity: product.cartItem.quantity};
                return product;
            }))
        })
    })
    .then(result=>{
        return fetchedCart.setProducts(null);

    })
    .then((result)=>{
        res.redirect('/orders');
    })
    .catch(err=>console.log(err))
};

exports.getOrders = (req,res,next) =>{
    req.user.getOrders({include: ['products']})
    .then(orders=>{
        console.log("orders: ",orders);
        res.render('shop/orders',{
            path:'/orders',
            pageTitle: 'Your Orders',
            orders:orders
        })
    })
    .catch(err=> console.log(err));
}



