import { Router} from 'express';

const router = Router({ mergeParams: true });

router.get('/', (req, res) => {
    res.send(200, 'ok');
})

export default router;
