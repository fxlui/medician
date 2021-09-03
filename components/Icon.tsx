import React, { FC } from "react";
import { SvgProps, Color } from "react-native-svg";

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
import WalkSVG from "../assets/icons/walkSVG";

interface IconProps {
  name: string;
  props?: SvgProps;
}

export const Icon:FC<IconProps> = ({ name, props }) => {
  switch (name) {
    case "Appointment":
      return <AppointmentsSVG {...props} />;
    case "Brain":
      return <BrainSVG {...props} />;
    case "Breathe":
      return <BreatheSVG {...props} />;
    case "Cancel":
      return <CancelSVG {...props} />;
    case "Cold":
      return <ColdSVG {...props} />;
    case "Dizzy":
      return <DizzySVG {...props} />;
    case "Exercise":
      return <ExerciseSVG {...props} />;
    case "Hearing":
      return <HearingSVG {...props} />;
    case "Hot":
      return <HotSVG {...props} />;
    case "Itchy":
      return <ItchySVG {...props} />;
    case "Medication":
      return <MedicationSVG {...props} />;
    case "Nauseous":
      return <NauseousSVG {...props} />;
    case "Pain":
      return <PainSVG {...props} />;
    case "See":
      return <SeeSVG {...props} />;
    case "Sleep":
      return <SleepSVG {...props} />;
    case "Speak":
      return <SpeakSVG {...props} />;
    case "Toilet":
      return <ToiletSVG {...props} />;
    case "Walk":
      return <WalkSVG {...props} />;
    default:
      return <NotFoundSVG {...props} />;
  }
}