// src/components/ImageResizer.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ImageResizer = () => {
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [targetSizeKB, setTargetSizeKB] = useState('');
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!image) return alert("Please select an image.");
    if (!width && !height && !targetSizeKB) return alert("Please fill at least one field.");

    const formData = new FormData();
    formData.append('image', image);
    if (width) formData.append('width', width);
    if (height) formData.append('height', height);
    if (targetSizeKB) formData.append('targetSizeKB', targetSizeKB);

    setLoading(true);
    try {
      const response = await axios.post(
        'https://image-resizer-api-4z3q.onrender.com/resize',
        formData,
        { responseType: 'blob' }
      );``      
      const blob = new Blob([response.data]);
      const imageUrl = URL.createObjectURL(blob);
      setProcessedImage(imageUrl);
    } catch (err) {
      alert('Failed to process image');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg mt-10">
      <div className="mb-6">
  <label
    htmlFor="file-upload"
    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
  >
    Upload Image
  </label>

  <div className="flex items-center gap-4">
    <label
      htmlFor="file-upload"
      className="cursor-pointer inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded shadow-sm transition"
    >
      Choose File
    </label>

    <span className="text-sm text-gray-500 dark:text-gray-400">
      {image ? image.name : 'No file chosen'}
    </span>
  </div>

  <input
    id="file-upload"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => setImage(e.target.files[0])}
  />
</div>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <input
          type="number"
          placeholder="Width (px)"
          className="p-2 rounded border dark:bg-gray-700"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
        <input
          type="number"
          placeholder="Height (px)"
          className="p-2 rounded border dark:bg-gray-700"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Size (KB)"
          className="p-2 rounded border dark:bg-gray-700"
          value={targetSizeKB}
          onChange={(e) => setTargetSizeKB(e.target.value)}
        />
      </div>

      <button
        onClick={handleUpload}
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded w-full"
      >
        {loading ? 'Processing...' : 'Submit'}
      </button>

      {processedImage && (
        <div className="mt-6 text-center">
          <img
            src={processedImage}
            alt="Processed"
            className="max-w-sm mx-auto rounded shadow mb-4"
          />
          <a
            href={processedImage}
            download="processed-image.jpg"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageResizer;
