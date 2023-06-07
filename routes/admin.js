

const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();

router.get('/login', adminController.getLogins);
router.get('/edit-login/:loginId', adminController.getEditLogin);
router.post('/edit-login', adminController.postEditLogin);
router.post('/delete-login', adminController.postDeleteLogin);

module.exports = router;













// const path = require('path');

// const express = require('express');

// const adminController = require('../controllers/admin');

// const router = express.Router();

// // // /admin/add-product => GET
// // router.get('/add-product', adminController.getAddProduct);




//  // /admin/login=> GET
// router.get('/login', adminController.getLogins);

// // /admin/login/id
// router.get('/edit-login/:loginId', adminController.getEditAdmin);

// // /admin/login/edit -login
// router.post('/edit-login', adminController.getEditLogin);
// // /admin/login/delete -login
// router.post('/delete-login', adminController.postDeleteLogin);






// // // /admin/add-product => POST
// // router.post('/add-product', adminController.postAddProduct);

// // router.get('/edit-product/:productId', adminController.getEditProduct);

// // router.post('/edit-product', adminController.postEditProduct);

// // router.post('/delete-product', adminController.postDeleteProduct);

// module.exports = router;
