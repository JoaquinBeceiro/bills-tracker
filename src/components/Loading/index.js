import React from "react";
import Lottie from "react-lottie-player";
import bouncingCoin from "../../rsc/lottie/bouncingCoin.json";

import { Container } from "./styles";

const Loading = () => {
  return (
    <Container>
      <Lottie
        animationData={bouncingCoin}
        play
        style={{ width: 200, height: 200 }}
      />
    </Container>
  );
};

export default Loading;
