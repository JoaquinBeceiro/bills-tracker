import React, { useState } from "react";
import { NoHeaderLayout } from "layouts";
import * as S from "./styles";
import SpreadsheetScreenshot from "rsc/img/spreadsheetScreenshot.png";
import LoginScreenshot from "rsc/img/loginScreenshot.png";
import IosInstall from "rsc/img/iosInstall.png";
import AndroidInstall from "rsc/img/androidInstall.png";
import GithubIcon from "rsc/icons/github.svg";
import { useHistory } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

const Guide = () => {
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(1);

  const Step1 = (
    <S.Container>
      <S.Title>Install</S.Title>
      <S.Pharagraph>
        If you are on <S.Mark>IOS</S.Mark>, open the site on Safari, click on
        the Share button and select “Add to Home Screen” from the popup. Lastly,
        tap "Add" in the top right corner.
      </S.Pharagraph>

      <S.ImageContainer>
        <img src={IosInstall} alt="IOS install screenshot" />
      </S.ImageContainer>

      <S.Pharagraph>
        If you are on <S.Mark>Andriod</S.Mark>, open the site on Chrome, press
        the “three dot” icon in the upper right to open the menu. Select “Add to
        Home screen” and then press the “Add” button in the popup.
      </S.Pharagraph>

      <S.ImageContainer>
        <img src={AndroidInstall} alt="Andriod install screenshot" />
      </S.ImageContainer>
    </S.Container>
  );

  const Step2 = (
    <S.Container>
      <S.Title>Create a spreadsheet</S.Title>
      <S.Pharagraph>
        Create a new Google Spreadsheet or copy from{" "}
        <S.Link
          href="https://docs.google.com/spreadsheets/d/1zR8NCRoiVZszVN1FlqUdSk9r9jfn_h_eR3gYCgJuvqY/copy"
          target="_blank"
        >
          here
        </S.Link>
        . Copy the spreadsheet ID/URL, you will need it later.
      </S.Pharagraph>

      <S.ImageContainer>
        <img src={SpreadsheetScreenshot} alt="Spreadsheet screenshot" />
      </S.ImageContainer>

      <S.Pharagraph>
        The ID is on the URL of the spreadsheet.
        https://docs.google.com/spreadsheets/d/
        <S.Mark>1qffzsCf2siRv-loAAMLeGzsSsmwcT3odSfmXBASO0fg</S.Mark>/edit#gid=0
      </S.Pharagraph>

      <S.Pharagraph>You can also use the full URL.</S.Pharagraph>
    </S.Container>
  );

  const Step3 = (
    <S.Container>
      <S.Title>Onboarding process</S.Title>
      <S.Strong>Insert data into onboarding fields.</S.Strong>
      <S.OrderList>
        <li>Insert your name in the "NAME" field</li>
        <li>Insert the Spreadsheet ID or URL</li>
        <S.ImageContainer>
          <img src={LoginScreenshot} alt="Login screenshot" />
        </S.ImageContainer>
        <li>Click "Login" and magic!</li>
      </S.OrderList>
    </S.Container>
  );

  const Step4 = (
    <S.Container>
      <S.Title>Information</S.Title>
      <S.Pharagraph>
        You can use the app with shared data if 2 or more users enter the same
        SpreadsheetID.
      </S.Pharagraph>
      <S.Strong>
        BillsTracker don’t save or track any information about you.{" "}
      </S.Strong>
      <S.Pharagraph>
        All the data entered in the application belongs only and solely to the
        user, BillsTracker does not store any type of information since we do
        not have a database to do so.
      </S.Pharagraph>
      <S.Pharagraph>
        The code of the app is public and open source, we just use back-end for
        login purpose, the rest it’s just front-end.
      </S.Pharagraph>
      <S.Pharagraph>
        If you want to collaborate or support the project in any way, feel free
        to do so through the GitHub profile
      </S.Pharagraph>
      <S.GithubLink href="https://github.com/JoaquinBeceiro" target="_blank">
        <img src={GithubIcon} alt="Github icon" />
        Go to GitHub!
      </S.GithubLink>
    </S.Container>
  );

  const steps = [
    { number: 1, step: Step1 },
    { number: 2, step: Step2 },
    { number: 3, step: Step3 },
    { number: 4, step: Step4 },
  ];

  const handleNextStep = () => {
    if (activeStep !== steps[steps.length - 1].number) {
      setActiveStep(activeStep + 1);
    } else {
      history.push("/onboarding");
    }
  };

  const handlePrevStep = () => {
    if (activeStep !== 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir === "Left") {
        handleNextStep();
      }

      if (eventData.dir === "Right") {
        handlePrevStep();
      }
    },
  });

  return (
    <NoHeaderLayout>
      <S.Content {...handlers}>
        {steps.find(({ number }) => number === activeStep).step}
        <S.Footer>
          <S.Navigator onClick={handlePrevStep}>
            {activeStep !== 1 && "Previous"}
          </S.Navigator>
          <S.StepsContainer>
            {steps.map(({ number }, index) => (
              <S.Step
                key={`step-${index}`}
                active={number === activeStep}
              ></S.Step>
            ))}
          </S.StepsContainer>
          <S.Navigator next={true} onClick={handleNextStep}>
            {activeStep !== steps[steps.length - 1].number ? "Next" : "Finish"}
          </S.Navigator>
        </S.Footer>
      </S.Content>
    </NoHeaderLayout>
  );
};

export default Guide;
