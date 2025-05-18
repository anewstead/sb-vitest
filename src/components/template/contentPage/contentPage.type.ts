import type { ITipBoxProps } from "@src/components/atom/tipBox/tipBox.type";
import type { IHeaderProps } from "@src/components/organism/header/header.type";
import type { IContent } from "@src/i18n/i18n.type";

export type IContentPageProps = {
  title: string;
  content: IContent;
  tipBoxProps: ITipBoxProps;
  headerProps: IHeaderProps;
};
