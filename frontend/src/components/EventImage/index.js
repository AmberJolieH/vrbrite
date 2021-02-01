import React from "react";
import { ReactComponent as Shopping } from "../../images/Shopping.svg";
import { ReactComponent as Adventure } from "../../images/Adventure.svg";
import { ReactComponent as Fitness } from "../../images/Fitness.svg";
import { ReactComponent as Art } from "../../images/Art .svg";
import { ReactComponent as Restaurant } from "../../images/Restaurant.svg";
import { ReactComponent as Education } from "../../images/Education.svg";


const componentMap = {
    Shopping: Shopping,
    Adventure: Adventure,
    Fitness: Fitness,
    Art: Art,
    Restaurant: Restaurant,
    Education: Education,
    Virtual: Virtual,
};

const EventImage = ({ name, ...rest }) => {
    const Component = componentMap[name] || Fitness;
    return <Component alt={name} {...rest} />;
};

export default EventImage;