import cv2
import numpy as np 

def check_double_jpeg_compression(image_data):
    # Load the image as grayscale
    image = cv2.imdecode(np.frombuffer(image_data, np.uint8), cv2.IMREAD_GRAYSCALE)

    # Encode and decode the image twice
    _, encoded_image1 = cv2.imencode('.jpg', image)
    _, encoded_image2 = cv2.imencode('.jpg', encoded_image1)

    # Calculate the mean squared error (MSE) between the original and twice-encoded images
    mse = np.mean((image - cv2.imdecode(encoded_image2, cv2.IMREAD_GRAYSCALE))**2)

    # Set a threshold to determine if double compression is present
    threshold = 2000  # Adjust this threshold based on your specific scenario

    return mse > threshold

