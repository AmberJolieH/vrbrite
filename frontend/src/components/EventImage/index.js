import React from "react";
import { ReactComponent as Alpine } from "../../images/alpine.svg";
import { ReactComponent as Club } from "../../images/club.svg";
import { ReactComponent as Nordic } from "../../images/nordic.svg";
import { ReactComponent as Snowshoe } from "../../images/snowshoe.svg";
import { ReactComponent as SpecialEvent } from "../../images/special-event.svg";
import { ReactComponent as VirtualChallenge } from "../../images/virtual-challenge.svg";
import { ReactComponent as Virtual } from "../../images/virtual.svg";

const componentMap = {
	Alpine: Alpine,
	"Club Membership": Club,
	Nordic: Nordic,
	Snowshoe: Snowshoe,
	"Special Event": SpecialEvent,
	"Virtual Challenge": VirtualChallenge,
	Virtual: Virtual,
};

const EventImage = ({ name, ...rest }) => {
	const Component = componentMap[name] || Nordic;
	return <Component alt={name} {...rest} />;
};

export default EventImage;
