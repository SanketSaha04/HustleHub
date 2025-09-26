import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.id };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication invalid' });
    }
};
// import jwt from 'jsonwebtoken';

// export const auth = (req, res, next) => {
//     const authHeader = req.header('Authorization');
//     if (!authHeader) {
//         return res.status(401).json({ message: 'No token, authorization denied.' });
//     }

//     try {
//         const token = authHeader.replace('Bearer ', '');
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
//         // Attach the full decoded payload to the request
//         req.user = decoded; 

//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Token is not valid.' });
//     }
// };