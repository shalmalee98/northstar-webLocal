import { TaggedTemplateExpression } from "typescript";
import { Status } from "./status";

export interface Roadmap {
  uid: string;
  name: string;
  rating: number;
  author: string;
  tags: Object;
  levels: number;
  public: Boolean;
  // status: Status;
  // createdBy: string;
  // createdById: string;
  // createdAt: Date;
  // updatedAt?: Date;
  tasks: Paper[];
}

export interface NewRoadmap {
  // uid: string;
  description: string;
  name: string;
  author: string;
  email: string;
  levels: number;
  tags: Array<string>;
  rating: number;
  public: boolean;
}

export interface Paper {
  id: string;
  name: string;
  roadmaps: Array<Object>;
  // link: string;
  title: string;
  description: string;
  // diffculty: number;
  // publish: Date;
  // referenced_works: Object;
  // related_works: Object;
  // status: Status;
  // createdAt: Date;
  // createdBy?: string;
  level: number;
  link: string;
}

export const Roadmap = undefined;
