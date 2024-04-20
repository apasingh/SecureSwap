from absl import logging

import matplotlib.pyplot as plt
import numpy as np
from PIL import Image, ImageOps
from scipy.spatial import cKDTree
from skimage.feature import plot_matches
from skimage.measure import ransac
from skimage.transform import AffineTransform
from six import BytesIO

import tensorflow as tf

import tensorflow_hub as hub
from six.moves.urllib.request import urlopen

def download_and_resize(name, url, new_width=256, new_height=256):
  path = tf.keras.utils.get_file(url.split('/')[-1], url)
  image = Image.open(path)
  image = ImageOps.fit(image, (new_width, new_height), Image.LANCZOS)
  return image

image1 = download_and_resize('image_1.jpg', IMAGE_1_URL)
image2 = download_and_resize('image_2.jpg', IMAGE_2_URL)

plt.subplot(1,2,1)
plt.imshow(image1)
plt.subplot(1,2,2)
plt.imshow(image2)

delf = hub.load('https://tfhub.dev/google/delf/1').signatures['default']

def run_delf(image):
  np_image = np.array(image)
  float_image = tf.image.convert_image_dtype(np_image, tf.float32)

  return delf(
      image=float_image,
      score_threshold=tf.constant(100.0),
      image_scales=tf.constant([0.25, 0.3536, 0.5, 0.7071, 1.0, 1.4142, 2.0]),
      max_feature_num=tf.constant(1000))


result1 = run_delf(image1)
result2 = run_delf(image2)

match_images(image1, image2, result1, result2)

























# import matplotlib.pyplot as plt
# import numpy as np
# import os
# import random
# import tensorflow as tf
# from pathlib import Path
# from keras import applications
# from keras import layers
# from keras import losses
# from keras import ops
# from keras import optimizers
# from keras import metrics
# from keras import Model
# from keras.applications import resnet


# target_shape = (200, 200)

# cache_dir = Path(Path.home()) / ".keras"
# anchor_images_path = cache_dir / "left"
# positive_images_path = cache_dir / "right"

# def preprocess_image(filename):
#     """
#     Load the specified file as a JPEG image, preprocess it and
#     resize it to the target shape.
#     """

#     image_string = tf.io.read_file(filename)
#     image = tf.image.decode_jpeg(image_string, channels=3)
#     image = tf.image.convert_image_dtype(image, tf.float32)
#     image = tf.image.resize(image, target_shape)
#     return image


# def preprocess_triplets(anchor, positive, negative):
#     """
#     Given the filenames corresponding to the three images, load and
#     preprocess them.
#     """

#     return (
#         preprocess_image(anchor),
#         preprocess_image(positive),
#         preprocess_image(negative),
#     )

# # We need to make sure both the anchor and positive images are loaded in
# # sorted order so we can match them together.
# anchor_images = sorted(
#     [str(anchor_images_path / f) for f in os.listdir(anchor_images_path)]
# )

# positive_images = sorted(
#     [str(positive_images_path / f) for f in os.listdir(positive_images_path)]
# )

# image_count = len(anchor_images)

# anchor_dataset = tf.data.Dataset.from_tensor_slices(anchor_images)
# positive_dataset = tf.data.Dataset.from_tensor_slices(positive_images)

# # To generate the list of negative images, let's randomize the list of
# # available images and concatenate them together.
# rng = np.random.RandomState(seed=42)
# rng.shuffle(anchor_images)
# rng.shuffle(positive_images)

# negative_images = anchor_images + positive_images
# np.random.RandomState(seed=32).shuffle(negative_images)

# negative_dataset = tf.data.Dataset.from_tensor_slices(negative_images)
# negative_dataset = negative_dataset.shuffle(buffer_size=4096)

# dataset = tf.data.Dataset.zip((anchor_dataset, positive_dataset, negative_dataset))
# dataset = dataset.shuffle(buffer_size=1024)
# dataset = dataset.map(preprocess_triplets)

# # Let's now split our dataset in train and validation.
# train_dataset = dataset.take(round(image_count * 0.8))
# val_dataset = dataset.skip(round(image_count * 0.8))

# train_dataset = train_dataset.batch(32, drop_remainder=False)
# train_dataset = train_dataset.prefetch(tf.data.AUTOTUNE)

# val_dataset = val_dataset.batch(32, drop_remainder=False)
# val_dataset = val_dataset.prefetch(tf.data.AUTOTUNE)

# def visualize(anchor, positive, negative):
#     """Visualize a few triplets from the supplied batches."""

#     def show(ax, image):
#         ax.imshow(image)
#         ax.get_xaxis().set_visible(False)
#         ax.get_yaxis().set_visible(False)

#     fig = plt.figure(figsize=(9, 9))

#     axs = fig.subplots(3, 3)
#     for i in range(3):
#         show(axs[i, 0], anchor[i])
#         show(axs[i, 1], positive[i])
#         show(axs[i, 2], negative[i])


# visualize(*list(train_dataset.take(1).as_numpy_iterator())[0])

# base_cnn = resnet.ResNet50(
#     weights="imagenet", input_shape=target_shape + (3,), include_top=False
# )

# flatten = layers.Flatten()(base_cnn.output)
# dense1 = layers.Dense(512, activation="relu")(flatten)
# dense1 = layers.BatchNormalization()(dense1)
# dense2 = layers.Dense(256, activation="relu")(dense1)
# dense2 = layers.BatchNormalization()(dense2)
# output = layers.Dense(256)(dense2)

# embedding = Model(base_cnn.input, output, name="Embedding")

# trainable = False
# for layer in base_cnn.layers:
#     if layer.name == "conv5_block1_out":
#         trainable = True
#     layer.trainable = trainable


# class DistanceLayer(layers.Layer):
#     """
#     This layer is responsible for computing the distance between the anchor
#     embedding and the positive embedding, and the anchor embedding and the
#     negative embedding.
#     """

#     def __init__(self, **kwargs):
#         super().__init__(**kwargs)

#     def call(self, anchor, positive, negative):
#         ap_distance = ops.sum(tf.square(anchor - positive), -1)
#         an_distance = ops.sum(tf.square(anchor - negative), -1)
#         return (ap_distance, an_distance)


# anchor_input = layers.Input(name="anchor", shape=target_shape + (3,))
# positive_input = layers.Input(name="positive", shape=target_shape + (3,))
# negative_input = layers.Input(name="negative", shape=target_shape + (3,))

# distances = DistanceLayer()(
#     embedding(resnet.preprocess_input(anchor_input)),
#     embedding(resnet.preprocess_input(positive_input)),
#     embedding(resnet.preprocess_input(negative_input)),
# )

# siamese_network = Model(
#     inputs=[anchor_input, positive_input, negative_input], outputs=distances
# )


# class SiameseModel(Model):
#     """The Siamese Network model with a custom training and testing loops.

#     Computes the triplet loss using the three embeddings produced by the
#     Siamese Network.

#     The triplet loss is defined as:
#        L(A, P, N) = max(‖f(A) - f(P)‖² - ‖f(A) - f(N)‖² + margin, 0)
#     """

#     def __init__(self, siamese_network, margin=0.5):
#         super().__init__()
#         self.siamese_network = siamese_network
#         self.margin = margin
#         self.loss_tracker = metrics.Mean(name="loss")

#     def call(self, inputs):
#         return self.siamese_network(inputs)

#     def train_step(self, data):
#         # GradientTape is a context manager that records every operation that
#         # you do inside. We are using it here to compute the loss so we can get
#         # the gradients and apply them using the optimizer specified in
#         # `compile()`.
#         with tf.GradientTape() as tape:
#             loss = self._compute_loss(data)

#         # Storing the gradients of the loss function with respect to the
#         # weights/parameters.
#         gradients = tape.gradient(loss, self.siamese_network.trainable_weights)

#         # Applying the gradients on the model using the specified optimizer
#         self.optimizer.apply_gradients(
#             zip(gradients, self.siamese_network.trainable_weights)
#         )

#         # Let's update and return the training loss metric.
#         self.loss_tracker.update_state(loss)
#         return {"loss": self.loss_tracker.result()}

#     def test_step(self, data):
#         loss = self._compute_loss(data)

#         # Let's update and return the loss metric.
#         self.loss_tracker.update_state(loss)
#         return {"loss": self.loss_tracker.result()}

#     def _compute_loss(self, data):
#         # The output of the network is a tuple containing the distances
#         # between the anchor and the positive example, and the anchor and
#         # the negative example.
#         ap_distance, an_distance = self.siamese_network(data)

#         # Computing the Triplet Loss by subtracting both distances and
#         # making sure we don't get a negative value.
#         loss = ap_distance - an_distance
#         loss = tf.maximum(loss + self.margin, 0.0)
#         return loss

#     @property
#     def metrics(self):
#         # We need to list our metrics here so the `reset_states()` can be
#         # called automatically.
#         return [self.loss_tracker]
  
# siamese_model = SiameseModel(siamese_network)
# siamese_model.compile(optimizer=optimizers.Adam(0.0001))
# siamese_model.fit(train_dataset, epochs=10, validation_data=val_dataset)

# sample = next(iter(train_dataset))
# visualize(*sample)

# anchor, positive, negative = sample
# anchor_embedding, positive_embedding, negative_embedding = (
#     embedding(resnet.preprocess_input(anchor)),
#     embedding(resnet.preprocess_input(positive)),
#     embedding(resnet.preprocess_input(negative)),
# )

# cosine_similarity = metrics.CosineSimilarity()

# positive_similarity = cosine_similarity(anchor_embedding, positive_embedding)
# print("Positive similarity:", positive_similarity.numpy())

# negative_similarity = cosine_similarity(anchor_embedding, negative_embedding)
# print("Negative similarity", negative_similarity.numpy())








# import tensorflow as tf

# # Load the Siamese network
# model = tf.keras.models.load_model("siamese_network.h5")

# # Load the two images
# image1 = tf.keras.preprocessing.image.load_img("../assets/image1.jpg")
# image2 = tf.keras.preprocessing.image.load_img("../assets/image2.jpg")

# # Convert the images to tensors
# image1 = tf.keras.preprocessing.image.img_to_array(image1)
# image2 = tf.keras.preprocessing.image.img_to_array(image2)

# # Expand the dimensions of the tensors
# image1 = tf.expand_dims(image1, axis=0)
# image2 = tf.expand_dims(image2, axis=0)

# # Predict the similarity score
# similarity_score = model([image1, image2])

# # Check if the two images contain the same object
# if similarity_score > 0.5:
#   print("The two images contain the same object.")
# else:
#   print("The two images do not contain the same object.")