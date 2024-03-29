import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadSingleFile(file?: Express.Multer.File): Promise<CloudinaryResponse> {
    if (!file) {
      return Promise.resolve(null);
    }
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadOptions = {
        folder: 'racv',
      };
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer)?.pipe(uploadStream);
    });
  }
  uploadMultipleFiles(files: Express.Multer.File[]): any {
    return Promise.all(
      files.map((file) => {
        return new Promise<CloudinaryResponse>((resolve, reject) => {
          const uploadOptions = {
            folder: 'racv',
          };
          const uploadStream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );
          streamifier.createReadStream(file.buffer)?.pipe(uploadStream);
        });
      }),
    );
  }
}
