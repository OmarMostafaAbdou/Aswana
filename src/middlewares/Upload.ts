import multer, { FileFilterCallback } from "multer";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import CustomError from "helpers/Errors";

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (!file.mimetype.startsWith("image/")) {
    return (new CustomError("هذا الملف ليس صورة", 400), false);
  }
  cb(null, true);
};

const storage = multer.memoryStorage();
const upload = multer({ storage, fileFilter });

export const imageUploadMiddleware = (modelFolder: string) => {
  const multerHandler = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
  ]);

  return async (req: Request, res: Response, next: NextFunction) => {
    multerHandler(req, res, async (err: any) => {
      if (err) return next(err);

      const folderPath = path.join("uploads", modelFolder);
      const pendingImages: { path: string; buffer: Buffer }[] = [];

      // Handle single image
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      if (files?.image?.[0]) {
        const file = files.image[0];
        const filename = `${uuidv4()}.webp`;
        const fullImagePath = path.join(folderPath, filename);

        const image = sharp(file.buffer);
        const metadata = await image.metadata();

        let resized = image;
        if ((metadata.width ?? 0) < 400 || (metadata.height ?? 0) < 400) {
          resized = image.resize({ width: 400, height: 400, fit: "cover" });
        }

        const buffer = await resized.toFormat("webp").toBuffer();
        req.body.image = `${modelFolder}/${filename}`;
        pendingImages.push({ path: fullImagePath, buffer });
      }

      // Handle gallery
      if (files?.gallery?.length > 0) {
        const imagePaths: string[] = [];

        for (const file of files.gallery) {
          const filename = `${uuidv4()}.webp`;
          const fullImagePath = path.join(folderPath, filename);

          const image = sharp(file.buffer);
          const metadata = await image.metadata();

          let resized = image;
          if ((metadata.width ?? 0) < 400 || (metadata.height ?? 0) < 400) {
            resized = image.resize({ width: 400, height: 400, fit: "cover" });
          }

          const buffer = await resized.toFormat("webp").toBuffer();
          pendingImages.push({ path: fullImagePath, buffer });
          imagePaths.push(`${modelFolder}/${filename}`);
        }

        req.body.gallery = imagePaths;
      }

      // Store all pending images
      (req as any).pendingImages = pendingImages;

      // Override res.send to save images on successful response
      const originalSend = res.send;
      res.send = function (body?: any): Response {
        if (res.statusCode < 400) {
          if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
          }

          const pending = (req as any).pendingImages;
          if (pending?.length > 0) {
            for (const img of pending) {
              fs.writeFileSync(img.path, img.buffer);
            }
          }
        }

        return originalSend.call(this, body);
      };

      next();
    });
  };
};
