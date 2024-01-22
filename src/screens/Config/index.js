import React from "react";
import { NoHeaderLayout } from "layouts";
import { LoadingComponent } from "components";
import * as S from "./styles";

const Config = () => {
  const screenLoading = false;
  return (
    <>
      <NoHeaderLayout>
        <S.Container>Config</S.Container>
      </NoHeaderLayout>

      {screenLoading && <LoadingComponent />}
    </>
  );
};

export default Config;
