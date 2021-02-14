import { useState } from 'react';
import * as fs from 'fs';
import { defaultImage, ImageAdmin } from './interfaces';
import existingImages from './config/images.json';
const EXPORT_IMAGE_PATH = './config/out.json';

export const useApp = () => {
  const [futureImage, setFutureImage] = useState<ImageAdmin>(defaultImage);

  const adaptImageToJson = (image: ImageAdmin, number: number) => ({
    id: `${image.year}${image.month}${number < 10 ? `0${number}` : number}`,
    title: image.title,
    description: image.description,
    tags: image.tags,
  });

  const validateAndSendDataInJsonConfig = (futureImage: ImageAdmin) => {
    if (futureImage.month.length === 0) {
      console.error('Mois manquant');
      setError(true);
    } else {
      console.log('Ajout image', futureImage);
      const existingNumbersOfSameMonth = existingImages
        .filter(
          image => `${image.id}` === `${futureImage.year}${futureImage.month}`,
        )
        .map(image => parseFloat(`${image.id}`.slice(6, 8)));
      existingNumbersOfSameMonth.sort((a, b) => b - a);
      const newImageNumberInMonth = existingNumbersOfSameMonth[0] + 1;
      const newImage = adaptImageToJson(futureImage, newImageNumberInMonth);
      console.log([...existingImages, newImage]);
    }
  };

  const [error, setError] = useState<boolean>(false);

  return {
    futureImage,
    setFutureImage,
    error,
    validateAndSendDataInJsonConfig,
  };
};
