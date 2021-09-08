import React, { FC } from "react";
import { SvgProps } from "react-native-svg";

import AppointmentsSVG from "../assets/icons/appointmentsSVG";
import BrainSVG from "../assets/icons/brainSVG";
import BreatheSVG from "../assets/icons/breatheSVG";
import CancelSVG from "../assets/icons/CancelSVG";
import ColdSVG from "../assets/icons/coldSVG";
import DizzySVG from "../assets/icons/dizzySVG";
import ExerciseSVG from "../assets/icons/exerciseSVG";
import HearingSVG from "../assets/icons/hearingSVG";
import HotSVG from "../assets/icons/hotSVG";
import ItchySVG from "../assets/icons/itchySVG";
import MedicationSVG from "../assets/icons/medicationSVG";
import NauseousSVG from "../assets/icons/nauseousSVG";
import PainSVG from "../assets/icons/painSVG";
import SeeSVG from "../assets/icons/seeSVG";
import SleepSVG from "../assets/icons/sleepSVG";
import SpeakSVG from "../assets/icons/speakSVG";
import ToiletSVG from "../assets/icons/toiletSVG";
import NotFoundSVG from "../assets/icons/notFoundSVG";
import AddSVG from "../assets/icons/AddSVG";
import SmellSVG from "../assets/icons/SmellSVG";
import TimeSVG from "../assets/icons/timeSVG";
import CheckmarkSVG from "../assets/icons/checkmarkSVG";
import IgnoreSVG from "../assets/icons/ignoreSVG";
import WalkSVG from "../assets/icons/walkSVG";
import EditSVG from "../assets/icons/editSVG";
import MoreSVG from "../assets/icons/moreSVG";
import { Animated } from "react-native";
interface AnimatedProps extends SvgProps {
  animatedValue?: Animated.AnimatedInterpolation;
}

interface IconProps {
  name: string;
  props?: AnimatedProps;
}

export const Icon: FC<IconProps> = ({ name, props }) => {
  switch (name.toLocaleLowerCase()) {
    case "appointment":
      return <AppointmentsSVG {...props} />;
    case "brain":
      return <BrainSVG {...props} />;
    case "breathe":
      return <BreatheSVG {...props} />;
    case "cancel":
      return <CancelSVG {...props} />;
    case "cold":
      return <ColdSVG {...props} />;
    case "dizzy":
      return <DizzySVG {...props} />;
    case "exercise":
      return <ExerciseSVG {...props} />;
    case "hear":
      return <HearingSVG {...props} />;
    case "hot":
      return <HotSVG {...props} />;
    case "itchy":
      return <ItchySVG {...props} />;
    case "medication":
      return <MedicationSVG {...props} />;
    case "nauseous":
      return <NauseousSVG {...props} />;
    case "pain":
      return <PainSVG {...props} />;
    case "see":
      return <SeeSVG {...props} />;
    case "sleep":
      return <SleepSVG {...props} />;
    case "speak":
      return <SpeakSVG {...props} />;
    case "toilet":
      return <ToiletSVG {...props} />;
    case "walk":
      return <WalkSVG {...props} />;
    case "add":
      return <AddSVG {...props} />;
    case "smell":
      return <SmellSVG {...props} />;
    case "time":
      return <TimeSVG {...props} />;
    case "checkmark":
      return <CheckmarkSVG {...props} />;
    case "ignore":
      return <IgnoreSVG {...props} />;
    case "edit":
      return <EditSVG {...props} />;
    case "more":
      return <MoreSVG {...props} />;
    default:
      return <NotFoundSVG {...props} />;
  }
};

export default Icon;
