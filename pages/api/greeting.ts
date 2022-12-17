import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors';

const cors = Cors({
    methods: ['GET'],
})

type Data = {
    greeting: string
}

function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Data>) {
    await runMiddleware(req, res, cors)

    const { name } = req.query;

    res.status(200).json({ greeting: `Well hello there, ${name}!` })
}