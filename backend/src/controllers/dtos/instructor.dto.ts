import { MediaSectionTypes } from "../../core/types/mediaSection.types";

export interface AddCommentForTargetDTO {
  courseId: string;
  studentId: string;
  comment: string;
}

export type PostMaterialDTO = {
  courseId: string;
  description?: string;
  fileSection: MediaSectionTypes;
  dueTime: Date;
};

export type SendAnnouncementDTO = {
  courseId: string;
  message: string;
};
