import {Task} from "./LabelStudioPolygonDrawer";

export const bboxTask: Task = {
  "annotations": [{
    "completed_by": {
      "username": "yonomitt",
      "first_name": "Yono",
      "last_name": "Mittlefehldt",
      "avatar": "https://dagshub.com/avatars/9550"
    },
    "result": [{
      "id": "lRtMfojMoT",
      "type": "rectanglelabels",
      "value": {
        "x": 32.05758333333335,
        "y": 21.815499999999986,
        "width": 20.70309999999997,
        "height": 78.18449999999999,
        "rotation": 0,
        "rectanglelabels": ["squirrel"]
      },
      "origin": "manual",
      "to_name": "image",
      "from_name": "label",
      "image_rotation": 0,
      "original_width": 1024,
      "original_height": 683
    },
      {
        "id": "TKHJrxtPow",
        "type": "rectanglelabels",
        "value": {
          "x": 0.0,
          "y": 53.958349999999896,
          "width": 63.28119999999999,
          "height": 39.375033333333384,
          "rotation": 0,
          "rectanglelabels": ["squirrel"]
        },
        "origin": "manual",
        "to_name": "image",
        "from_name": "label",
        "image_rotation": 0,
        "original_width": 640,
        "original_height": 480
      }],
    "was_cancelled": false,
    "ground_truth": false,
    "created_at": "2022-11-04T07:27:40.285910Z",
    "updated_at": "2022-11-04T07:27:40.285910Z",
    "lead_time": 42.0,
    "prediction": {},
    "parent_prediction": null,
    "parent_annotation": null
  }],
  "drafts": [],
  "predictions": [],
  "data": {"image": "repo://1eb9746540c818a1ce027d2b1837dd69693b91a5/data/images/val/backyard_squirrels_000030.jpg"},
  "meta": {}
}
