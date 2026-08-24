import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class FileUploadRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          resource_type: 'auto',
        },
        (error, result) => {
          if (error || !result) {
            const message =
              error instanceof Error
                ? error.message
                : 'Error al cargar imagen en Cloudinary';

            reject(new Error(message));
            return;
          }

          resolve(result);
        },
      );

      Readable.from(file.buffer).pipe(upload);
    });
  }
}
