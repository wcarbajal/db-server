import sys
import json
from pathlib import Path
import torch

# Carga el modelo YOLOv5 (ajusta la ruta a tu modelo)
model = torch.hub.load('ultralytics/yolov5', 'custom', path='bpmn_yolov5.pt')

def detect(image_path):
    results = model(image_path)
    detections = []
    for *box, conf, cls in results.xyxy[0]:
        detections.append({
            "clase": model.names[int(cls)],
            "bbox": [float(x) for x in box],
            "confianza": float(conf)
        })
    return detections

if __name__ == "__main__":
    image_path = sys.argv[1]
    output = detect(image_path)
    print(json.dumps(output))