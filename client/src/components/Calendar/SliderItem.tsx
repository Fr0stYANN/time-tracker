import {Slider} from "antd";

type Property = {
    dayType: string;
    setWorksHours: (v: number)=>void;
}

const SliderItem = ({dayType, setWorksHours} : Property) => {

    const sliderEnabled = () => {
        return (
            <Slider
                defaultValue={6}
                onChange={(hour)=>setWorksHours(hour)}
                dots={true}
                min={1} max={8}
            />
        )
    }

    const sliderDisabled = () => {
        setWorksHours(0);
        return(
            <Slider
                value={0}
                disabled={true}
                dots={true}
                min={0} max={8}
            />
        )
    }

    return dayType == "Holiday" || dayType == "Day Off"
        ? sliderDisabled() : sliderEnabled();
}

export default SliderItem;