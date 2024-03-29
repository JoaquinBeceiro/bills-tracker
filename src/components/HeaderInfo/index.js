import React from "react";
import { HeaderBoxComponent } from "components";
import * as S from "./styles";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const HeaderInfo = ({ data }) => {
  return (
    <S.Container>
      <Carousel
        autoPlay={false}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        renderIndicator={(clickHandler, isSelected) => (
          <S.Indicator onClick={clickHandler} isSelected={isSelected} />
        )}
      >
        {data ? (
          data
            .filter((item) => item !== null)
            .map(
              (
                { primaryValue, secondaryValue, title, arrowIcon, info },
                index
              ) => (
                <HeaderBoxComponent
                  key={`header-item-${index}`}
                  primaryValue={primaryValue}
                  secondaryValue={secondaryValue}
                  title={title}
                  arrowIcon={arrowIcon}
                  info={info}
                />
              )
            )
        ) : (
          <HeaderBoxComponent />
        )}
      </Carousel>
    </S.Container>
  );
};

export default HeaderInfo;
