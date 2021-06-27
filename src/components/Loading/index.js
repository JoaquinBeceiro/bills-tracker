import React from "react";
import Lottie from "react-lottie";
import bouncingCoin from "../../rsc/lottie/bouncingCoin.json";

import { Container } from "./styles";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: bouncingCoin,
};

const Loading = () => {
  return (
    <Container>
      <Lottie
        options={defaultOptions}
        height={200}
        width={200}
        isStopped={false}
        isPaused={false}
      />
    </Container>
  );
};

export default Loading;
