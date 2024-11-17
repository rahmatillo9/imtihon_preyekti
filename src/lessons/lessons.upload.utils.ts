
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

export const filename = (req, file, callback) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
};

export const fileFilter = (req, file, callback) => {
  const isValidType = file.mimetype.startsWith('video/');
  if (isValidType) {
    callback(null, true);
  } else {
    callback(
      new BadRequestException('Invalid format! Only video files are allowed.'),
      false,
    );
  }
};
