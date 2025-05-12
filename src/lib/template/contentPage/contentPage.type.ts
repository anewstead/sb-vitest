import type { ITipBoxProps } from "@src/lib/atom/tipBox/tipBox.type";
import type { IHeaderProps } from "@src/lib/organism/header/header.type";
import type { IContent } from "@src/common/i18n/i18n.type";

export type IContentPageProps = {
  title: string;
  content: IContent;
  tipBoxProps: ITipBoxProps;
  headerProps: IHeaderProps;
};
