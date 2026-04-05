import { Router } from 'express';
import { authenticateAdmin } from '../middlewares/auth.js';
import * as menuController from '../controllers/menuController.js';
import * as cartController from '../controllers/cartController.js';
import * as orderController from '../controllers/orderController.js';

const router = Router();

router.post('/login', async (request, response, next) => {
  // Simple admin login - expand with bcrypt
  const { email, password } = request.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    response.json({ token });
  } else {
    next(new ApiError(401, 'Invalid credentials'));
  }
});

router.get('/menu', authenticateAdmin, menuController.fetchMenuItems);
router.post('/menu', authenticateAdmin, menuController.createMenuItemHandler);
router.put('/menu/:id', authenticateAdmin, menuController.updateMenuItemHandler);
router.delete('/menu/:id', authenticateAdmin, menuController.deleteMenuItemHandler);

router.get('/orders', authenticateAdmin, orderController.fetchOrders);
// Add more...

export default router;

