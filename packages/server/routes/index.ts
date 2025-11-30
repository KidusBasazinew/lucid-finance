import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import packageRoute from './package.route';
import investmentRoute from './investment.route';
import transactionRoute from './transaction.route';
import referralRoute from './referral.route';
import walletRoute from './wallet.route';
import withdrawalRoute from './withdrawal.route';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/packages', packageRoute);
router.use('/investments', investmentRoute);
router.use('/transactions', transactionRoute);
router.use('/referrals', referralRoute);
router.use('/wallet', walletRoute);
router.use('/withdrawals', withdrawalRoute);

export default router;
