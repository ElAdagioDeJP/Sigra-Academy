import express, {json} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { SETTINGS } from './config/settings.config.mjs';
import controlRouter from './src/modules/access-control-I/control.route.mjs';
import { getUser as getUserModel } from './src/modules/access-control-I/control.model.mjs';

// Se inicializan el servidor express
const app = express();

app.use(cors({
    origin: '*',
    crendentials: true
}));
app.use(json());
app.use(morgan('dev'));

// Rutas
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Montar rutas de access-control
app.use('/api/access-control', controlRouter);

// Ruta de prueba rápida: GET /test/users?id=1
app.get('/test/users', async (req, res) => {
    const id = Number(req.query.id)
    if (!id || Number.isNaN(id)) return res.status(400).json({ message: 'Query param id is required and must be a number' })

    try {
        const user = await getUserModel(id)
        if (!user) return res.status(404).json({ message: 'User not found' })
        return res.status(200).json(user)
    } catch (error) {
        console.error('Test route error:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

// Montamos el servidor
app.listen(SETTINGS.PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${SETTINGS.PORT}`);
})