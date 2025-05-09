import React from "react";

import { useTranslation } from "react-i18next";

import viewportIcon from "@src/assets/viewport-icon.svg";
import { ExampleRedux } from "@src/components/atom/exampleRedux/ExampleSection";
import { ContentPage } from "@src/components/template/contentPage/ContentPage";
import { useContent } from "@src/i18n/useContent";
import { useAppDispatch, useAppSelector } from "@src/state/store";
import { cleanHtml } from "@src/utils/cleanHtml";

import {
  handleChangeText,
  handleCreateAccount,
  handleLogin,
  handleLogout,
} from "./home.helper";

import type { IHomeProps } from "./home.type";

export const Home = (props: IHomeProps) => {
  const { user } = props;

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const reduxText = useAppSelector((state) => {
    return state.home.example;
  });

  const i18nContent = useContent("home.md");

  const viewportTip = cleanHtml(
    t("home:viewportTip", {
      icon: `<img src="${viewportIcon}" alt="viewport icon" />`,
    })
  );

  const pageContent = (
    <div data-testid="pageContent">
      <ExampleRedux
        buttonLabel={t("home:changeText")}
        exampleText={reduxText}
        onChangeText={() => {
          handleChangeText(dispatch);
        }}
      />

      <div data-testid="i18nContent">{i18nContent}</div>
    </div>
  );

  return (
    <ContentPage
      title={t("home:pagesInStorybook")}
      headerProps={{
        loginBarProps: {
          user: user,
          onLogin: handleLogin,
          onLogout: handleLogout,
          onCreateAccount: handleCreateAccount,
          welcomeText: t("common:welcome"),
          loginText: t("common:login"),
          logoutText: t("common:logout"),
          signupText: t("common:signup"),
        },
      }}
      content={pageContent}
      tipBoxProps={{
        label: t("common:tip"),
        text: viewportTip,
      }}
    />
  );
};
