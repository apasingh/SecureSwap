// code created with help from ClaudeAI 

import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

const ImageComparison = () => {
  const [model, setModel] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [detectedObjects1, setDetectedObjects1] = useState([]);
  const [detectedObjects2, setDetectedObjects2] = useState([]);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      const model = await cocoSsd.load();
      setModel(model);
    };
    loadModel();
  }, []);

  const detectObjects = async (image, setDetectedObjects) => {
    if (model) {
      const imgTensor = tf.browser.fromPixels(image);
      const predictions = await model.detect(imgTensor);
      setDetectedObjects(predictions);
      imgTensor.dispose();
    }
  };

  const handleImage1Change = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        setImage1(img);
        detectObjects(img, setDetectedObjects1);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        setImage2(img);
        detectObjects(img, setDetectedObjects2);
      };
    };
    reader.readAsDataURL(file);
  };

  const compareObjects = () => {
    if (detectedObjects1.length === 0 || detectedObjects2.length === 0) {
      return;
    }

    const matchingObjects = detectedObjects1.filter((obj1) => {
      return detectedObjects2.some((obj2) => {
        const iouThreshold = 0.75; // Adjust this value to change the similarity threshold
        const box1 = obj1.bbox;
        const box2 = obj2.bbox;
        const iou = calculateIoU(box1, box2);
        return iou >= iouThreshold && obj1.class === obj2.class;
      });
    });

    console.log('Matching objects:', matchingObjects);
  };

  const calculateIoU = (box1, box2) => {
    const [x1, y1, width1, height1] = box1;
    const [x2, y2, width2, height2] = box2;

    const x1_max = x1 + width1;
    const y1_max = y1 + height1;
    const x2_max = x2 + width2;
    const y2_max = y2 + height2;

    const x_max = Math.min(x1_max, x2_max);
    const y_max = Math.min(y1_max, y2_max);
    const x_min = Math.max(x1, x2);
    const y_min = Math.max(y1, y2);

    const intersection = Math.max(0, x_max - x_min) * Math.max(0, y_max - y_min);
    const union = (width1 * height1) + (width2 * height2) - intersection;

    return intersection / union;
  };

  return (
    <div>
      <input type="file" onChange={handleImage1Change} ref={image1Ref} />
      {image1 && <img src={image1.src} alt="Image 1" />}
      <input type="file" onChange={handleImage2Change} ref={image2Ref} />
      {image2 && <img src={image2.src} alt="Image 2" />}
      <button onClick={compareObjects}>Compare Objects</button>
    </div>
  );
};

export default ImageComparison;