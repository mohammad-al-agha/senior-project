import ImageFileIconWhite from "../../assets/images/ImageFileW.svg";
import ImageFileIconBlack from "../../assets/images/ImageFileB.svg";
import PdfFileIcon from "../../assets/images/PdfFile.svg";
import TextFileIconWhite from "../../assets/images/TextFileW.svg";
import TextFileIconBlack from "../../assets/images/TextFileB.svg";
import FileIconWhite from "../../assets/images/FileW.svg";
import FileIconBlack from "../../assets/images/FileB.svg";
import PowerPointFileIcon from "../../assets/images/PowerPointFile.svg";
import VideoFileIconWhite from "../../assets/images/VideoFileW.svg";
import VideoFileIconBlack from "../../assets/images/VideoFileB.svg";
import ExcelFileIcon from "../../assets/images/ExcelFile.svg";
import WordFileIcon from "../../assets/images/WordFile.svg";
import CodeFileIconWhite from "../../assets/images/CodeFileW.svg";
import CodeFileIconBlack from "../../assets/images/CodeFileB.svg";
import AudioFileIconWhite from "../../assets/images/AudioFileW.svg";
import AudioFileIconBlack from "../../assets/images/AudioFileB.svg";
import ZipFileIconWhite from "../../assets/images/ZipFileW.svg";
import ZipFileIconBlack from "../../assets/images/ZipFileB.svg";
import { ThemeType } from "../core/types/themeTypes";

export const useFileIcon = (fileType: string, theme: ThemeType) => {
  const imageTypes = ["img", "png", "svg", "jpeg", "jpg"];
  const pdfTypes = ["pdf"];
  const wordTypes = ["doc", "docx"];
  const textTypes = ["txt"];
  const audioTypes = ["mp3", "wav", "ogg"];
  const videoTypes = ["mp4", "avi", "mkv"];
  const excelTypes = ["xls", "xlsx"];
  const powerpointTypes = ["ppt", "pptx"];
  const codeTypes = ["html", "css", "js", "java", "py"];
  const zipTypes = ["zip"];

  const includesAny = (types: string[]) =>
    types.some((type) => fileType.includes(type));

  if (includesAny(imageTypes)) {
    return theme === ThemeType.dark ? ImageFileIconWhite : ImageFileIconBlack;
  }

  if (includesAny(pdfTypes)) {
    return PdfFileIcon;
  }

  if (includesAny(wordTypes)) {
    return WordFileIcon;
  }

  if (includesAny(textTypes)) {
    return theme === ThemeType.dark ? TextFileIconWhite : TextFileIconBlack;
  }

  if (includesAny(audioTypes)) {
    return theme === ThemeType.dark ? AudioFileIconWhite : AudioFileIconBlack;
  }

  if (includesAny(videoTypes)) {
    return theme === ThemeType.dark ? VideoFileIconWhite : VideoFileIconBlack;
  }

  if (includesAny(excelTypes)) {
    return ExcelFileIcon;
  }

  if (includesAny(powerpointTypes)) {
    return PowerPointFileIcon;
  }

  if (includesAny(codeTypes)) {
    return theme === ThemeType.dark ? CodeFileIconWhite : CodeFileIconBlack;
  }

  if (includesAny(zipTypes)) {
    return theme === ThemeType.dark ? ZipFileIconWhite : ZipFileIconBlack;
  }

  return theme === ThemeType.dark ? FileIconWhite : FileIconBlack;
};
