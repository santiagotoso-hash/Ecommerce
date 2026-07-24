import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';
import 'multer';

const toStream = require('buffer-to-stream');
@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result);
          } else {
            reject(new Error('No se recibió respuesta de Cloudinary'));
          }
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }
}
