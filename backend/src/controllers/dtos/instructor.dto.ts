import { MediaSectionTypes } from "../../core/types/mediaSection.types";

export interface AddCommentForTargetDTO {
  courseId: string;
  studentId: string;
  comment: string;
}

export type PostMaterialDTO = {
  courseId: string;
  materialComment?: string;
  fileSection: MediaSectionTypes;
  dueTime: Date;
};

export type SendAnnouncementDTO = {
  courseId: string;
  message: string;
};
