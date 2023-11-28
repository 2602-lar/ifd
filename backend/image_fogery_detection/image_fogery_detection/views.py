from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import *
import cv2
import numpy as np
import base64

from . import auxillary_function

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Add custom claims
        token['username'] = user.username
        
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
  
@csrf_exempt
@api_view(['POST'])
def image_operation(request):
    data = dict(request.data)
    operation = data['operation'][0]

    # Detecting compression
    if operation == 'Compression-Detection':
        image_file = data['image'][0]
        image_data = image_file.read()

        # Detect double JPEG compression
        is_double_compressed = auxillary_function.check_double_jpeg_compression(image_data)

        # Return the result
        return JsonResponse({'is_double_compressed': is_double_compressed})

    # Metadata analysis
    elif operation == 'Metadata-Analysis':
        image_file = data['image'][0]
        image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

        # Perform metadata analysis
        metadata = auxillary_function.analyze_metadata(image)
        
        # Return the metadata
        return JsonResponse({'metadata': metadata})

    # CRF artifact detection
    elif operation == 'CFA-artifact detection':
        image_file = data['image'][0]
        image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

        # Perform CRF artifact detection
        artifacts = auxillary_function.detect_cfa_artifacts(image)

        # Return the artifacts
        return JsonResponse({'artifacts': artifacts})

    # Checking for noise variance
    elif operation == 'noise-inconsistency':
        image_file = data['image'][0]
        image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_GRAYSCALE)

        # Calculate noise variance
        variance = np.var(image)

        # Return the noise variance value
        return JsonResponse({'variance': variance})

    # Checking for copy-move
    elif operation == 'Copy-Move':
        image_file = data['image'][0]
        image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

        # Perform copy-move forgery detection
        result_image = auxillary_function.detect_copy_move(image)

        # Encode the result image to base64
        encoded_image = encode_image(result_image)

        # Return the base64 encoded image
        return JsonResponse({'encoded_image': encoded_image})

    # Error-Level Analysis
    elif operation == 'Error-Level Analysis':
        image_file = data['image'][0]
        image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

        # Perform error-level analysis
        error_levels = auxillary_function.analyze_error_levels(image)

        # Return the error levels
        return JsonResponse({'error_levels': error_levels})

    # Image Extraction
    elif operation == 'Image-Extraction':
        image_file = data['image'][0]
        image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

        # Perform image extraction
        extracted_image = auxillary_function.extract_image(image)

        # Encode the extracted image to base64
        encoded_image = encode_image(extracted_image)

        # Return the base64 encoded image
        return JsonResponse({'encoded_image': encoded_image})

    # String Extraction
    elif operation == 'String-Extraction':
        image_file = data['image'][0]
        image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

        # Perform string extraction
        extracted_text = auxillary_function.extract_text(image)

        # Encode the extracted text to base64
        encoded_text = encode_text(extracted_text)

        # Return the base64 encoded text
        return JsonResponse({'encoded_text': encoded_text})


@csrf_exempt
@api_view(['GET'])
def app_home(request):
    # Read the image from the HopeApp
    image_file = open('path_to_homeapp_image.jpg', 'rb')  # Provide the correct path to the image from the HopeApp
    image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    # Perform desired image operation
    # For example, let's perform metadata analysis
    metadata = auxillary_function.analyze_metadata(image)

    # Display the output image on the App Home
    output_image = metadata  # Replace this with the actual output image from the image operation

    # Encode the output image to base64
    encoded_image = encode_image(output_image)

    # Return the base64 encoded image
    return JsonResponse({'encoded_image': encoded_image})


def encode_image(image):
    # Convert the image to base64 encoding
    _, buffer = cv2.imencode('.jpg', image)
    encoded_image = base64.b64encode(buffer).decode('utf-8')

    return encoded_image


def encode_text(text):
    # Convert the text to base64 encoding
    encoded_text = base64.b64encode(text.encode('utf-8')).decode('utf-8')

    return encoded_text


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        data= dict(serializer.validated_data)
        serializer.save(password = make_password(data['password']))

    def perform_update(self, serializer):
        serializer.save()

    def destroy(self, request, id=None):
        user = User.objects.get(id=id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @api_view(['GET', 'POST'])
    def users(request):
        queryset = User.objects.all()
        serializers = UserSerializer(queryset, many=True)
        return Response(serializers.data)
