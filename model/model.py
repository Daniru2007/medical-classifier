import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

df = pd.read_csv("Disease and symptoms dataset.csv")

print("Shape:", df.shape)
df.head()

print(df.columns.tolist())
X = df.drop("diseases", axis=1).values
y = df["diseases"].values

encoder = LabelEncoder()
y = encoder.fit_transform(y)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = tf.keras.Sequential([
    tf.keras.layers.Dense(512, activation="relu", input_shape=(X.shape[1],)),
    tf.keras.layers.Dense(256, activation="relu"),
    tf.keras.layers.Dense(128, activation="relu"),
    tf.keras.layers.Dense(len(np.unique(y)), activation="softmax")
])

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

model.summary()

history = model.fit(
    X_train, y_train,
    validation_data=(X_test, y_test),
    epochs=30,
    batch_size=64
)

loss, acc = model.evaluate(X_test, y_test)
print("Test accuracy:", acc)

symptom_columns = df.drop("diseases", axis=1).columns.tolist()

def predict_disease(symptoms):
    input_vec = np.zeros(len(symptom_columns))

    for s in symptoms:
        s = s.strip().lower()
        if s in symptom_columns:
            idx = symptom_columns.index(s)
            input_vec[idx] = 1

    probs = model.predict(input_vec.reshape(1, -1))[0]

    top3 = np.argsort(probs)[-3:][::-1]
    
    results = []
    for i in top3:
        results.append((encoder.inverse_transform([i])[0], probs[i]))

    return results
model.save("disease_model.keras")