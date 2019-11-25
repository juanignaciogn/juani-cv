import { Router } from 'express';
import index from '../pages/index';

const router = Router({ mergeParams: true });

router.get('/', index);

export default router;
