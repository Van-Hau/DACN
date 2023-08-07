import { NextApiHandler, NextApiRequest } from 'next';
import formidable, { Files } from 'formidable';
import path from 'path';
import fs from 'fs';
import { FileWithPath } from 'react-dropzone';
var mv = require('mv');
export const config = {
    api: {
        bodyParser: false,
    },
};

const readFile = (
    req: NextApiRequest,
    saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const options: formidable.Options = {};
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), '/public/images');
    }
    options.maxFileSize = 4000 * 1024 * 1024;
    const form = formidable(options);
    return new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) reject(err);
            await saveFile(files.myImage, fields.fileName);
            resolve({ fields, files });
        });
    });
};
const saveFile = async (file: any, name: any) => {
    const data = fs.readFileSync(file.filepath);

    fs.writeFileSync(path.join(process.cwd() + '/public', '/images/') + name, data);
    await fs.unlinkSync(file.filepath);
    return;
};
const handler: NextApiHandler = async (req, res) => {
    // try {
    //     await fs.readdir(path.join(process.cwd() + '/public', '/images'));
    // } catch (error) {
    //     await fs.mkdir(path.join(process.cwd() + '/public', '/images'));
    // }
    await readFile(req, true);
    res.json({ done: 'ok' });
};

export default handler;
