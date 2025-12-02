import express from 'express';
import { authMiddleware } from '../middlewares/auth';
import { adminMiddleware } from '../middlewares/admin';
import { investmentService } from '../services/investment.service';
import { ok } from '../utils/response';
import { withdrawalService } from '../services/withdrawal.service';

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

router.patch('/investments/:id/approve', async (req, res) => {
   const updated = await investmentService.approve(req.params.id);
   return ok(res, updated, 'Investment approved');
});

router.get('/investments/pending', async (_req, res) => {
   const list = await investmentService.listPendingInvestments();
   return ok(res, list, 'Pending investments');
});

router.post('/profits/process', async (_req, res) => {
   await investmentService.processDailyProfits();
   return ok(res, { processed: true }, 'Profits processed');
});

router.patch('/withdrawals/:id/approve', async (req, res) => {
   const updated = await withdrawalService.approve(req.params.id);
   return ok(res, updated, 'Withdrawal approved');
});

router.patch('/withdrawals/:id/reject', async (req, res) => {
   const updated = await withdrawalService.reject(req.params.id);
   return ok(res, updated, 'Withdrawal rejected');
});

router.patch('/withdrawals/:id/paid', async (req, res) => {
   const updated = await withdrawalService.markPaid(req.params.id);
   return ok(res, updated, 'Withdrawal marked as paid');
});

router.get('/withdrawals/pending', async (_req, res) => {
   const list = await withdrawalService.listPending();
   return ok(res, list, 'Pending withdrawals');
});

export default router;
