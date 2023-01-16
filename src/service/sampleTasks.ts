import { ulid } from "ulid";
import { Paper } from "../types/roadmap";
import { Status } from "../types/status";

export const sampleTasks: Paper[] = [
  {
    id: ulid(),
    name: "Paper 1",
    // createdBy: "John",
    // createdAt: new Date(),
    // status: Status.NotStarted,
    level: 1,
    roadmaps: [
      {
          "rm": "16156e71e1044abeab5f724390a6cd9d",
          "level": 1,
          "difficulty": 1
      }
    ],
    // diffculty: 1,
    // level: 3,
    link: "https://arxiv.org/pdf/1207.0580.pdf",
    description: "https://arxiv.org/pdf/1207.0580.pdf",
    title: "Improving neural networks by preventing co-adaptation of feature detectors",
    // publish: 03/07/2021,
    // referenced_works: [],
    // related_works: [],
    // uid: "d9ba1cc190f344dd9ff1f7794db4c262"
  },
  // {
  //   id: ulid(),
  //   name: "Paper 2",
  //   description: "bcg.com",
  //   createdBy: "Sam",
  //   createdAt: new Date(),
  //   status: Status.NotStarted,
  //   level: 1,
  // },
  // {
  //   id: ulid(),
  //   name: "Paper 3",
  //   description: "abc.com",
  //   createdBy: "Sam",
  //   createdAt: new Date(),
  //   status: Status.InProgress,
  //   level: 1,
  // },
  // {
  //   id: ulid(),
  //   name: "Paper 4",
  //   description: "gey.com",
  //   createdBy: "Sam",
  //   createdAt: new Date(),
  //   status: Status.InProgress,
  //   level: 1,
  // },
  // {
  //   id: ulid(),
  //   name: "Paper 5",
  //   description: "hgh.com",
  //   createdBy: "Sam",
  //   createdAt: new Date(),
  //   status: Status.Finished,
  //   level: 1,
  // },
];
